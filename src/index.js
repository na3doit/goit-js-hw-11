import axios from 'axios';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { getImagesMarkup } from './js/markup';
import { ImagesApiService } from './js/img-api';
import { LoadMoreBtn } from './js/load-more';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

const imagesApiService = new ImagesApiService();
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
    return Notiflix.Notify.info('Please, enter your request');
  }
  imagesApiService.resetPage();

  try {
    const { hits, totalHits } = await imagesApiService.fetchImages();
    if (totalHits === 0) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    renderPictures(hits);
    simpleLightBox.refresh();
    loadMoreBtn.show();
    searchFormEl.reset();
  } catch (error) {
    Notiflix.Notify.failure('Something is wrong...');
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
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
  } catch (error) {
    return Notiflix.Notify.failure('Something is wrong...');
  }
}

function renderPictures(data) {
  const markupGallery = getImagesMarkup(data);
  galleryEl.insertAdjacentHTML('beforeend', markupGallery);
}

function clearImgGallery() {
  galleryEl.innerHTML = '';
}
