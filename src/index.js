import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { getImagesMarkup } from './js/markup';
import { ImagesApiService } from './js/img-api';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

const imagesApiService = new ImagesApiService();
const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchFormEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  clearImgGallery();
}

function clearImgGallery() {
  galleryEl.innerHTML = '';
}
