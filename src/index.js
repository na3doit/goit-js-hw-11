import axios from 'axios';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { getImagesMarkup } from './js/markup';
import { ImagesApiService } from './js/img-api';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

const imagesApiService = new ImagesApiService();
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
    searchFormEl.reset();
    renderPictures(hits);
    simpleLightBox.refresh();

    // функция, которая загружает дополнительные элементы
    function loadMore() {
      // код для загрузки новых элементов
      renderPictures(totalHits);
    }

    // функция, которая определяет, когда пользователь прокрутил до конца страницы
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMore();
      }
    }

    // добавляем обработчик события для прокрутки страницы
    window.addEventListener('scroll', handleScroll);
  } catch (error) {
    Notiflix.Notify.failure('Something is wrong...');
  }
}

function renderPictures(data) {
  const markupGallery = getImagesMarkup(data);
  galleryEl.insertAdjacentHTML('beforeend', markupGallery);
}

function clearImgGallery() {
  galleryEl.innerHTML = '';
}