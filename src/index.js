import axios from 'axios';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { getImagesMarkup } from './js/markup';
import { ImagesApiService } from './js/img-api';
import { LoadMoreBtn } from './js/load-more';
import { MessagesNoti } from './js/messages';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

const imagesApiService = new ImagesApiService();
const messagesNoti = new MessagesNoti();
const loadMoreBtn = new LoadMoreBtn('load-more', onLoadMoreBtn);
const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchFormEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  clearImgGallery();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (imagesApiService.query === '') {
    return messagesNoti.getInfo();
  }

  imagesApiService.resetPage();

  try {
    const { hits, totalHits } = await imagesApiService.fetchImages();
    if (totalHits === 0) {
      return messagesNoti.getWarning();
    }
    messagesNoti.getSuccess(totalHits);

    renderPictures(hits);
    simpleLightBox.refresh();
    loadMoreBtn.show();

    searchFormEl.reset();
    if (totalHits < imagesApiService.perPage) {
      loadMoreBtn.hide();
    }
  } catch (error) {
    messagesNoti.getFailure();
  }
}
async function onLoadMoreBtn() {
  loadMoreBtn.loading();
  try {
    const { hits } = await imagesApiService.fetchImages();
    renderPictures(hits);
    simpleLightBox.refresh();
    loadMoreBtn.endLoading();

    if (hits.length < imagesApiService.perPage) {
      loadMoreBtn.hide();
      messagesNoti.getSuccess(totalHits);
    }
  } catch (error) {
    return messagesNoti.getFailure();
  }
}

function renderPictures(data) {
  const markupGallery = getImagesMarkup(data);
  galleryEl.insertAdjacentHTML('beforeend', markupGallery);
}

function clearImgGallery() {
  galleryEl.innerHTML = '';
}
