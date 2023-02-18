const searchFormEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const submitBtnEl = document.querySelector('button');

searchFormEl.addEventListener('submit', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();
}
