import Notiflix from 'notiflix';

export class MessagesNoti {
  constructor() {}
  getInfo() {
    return Notiflix.Notify.info('Please, enter your request');
  }

  getSuccess(totalHits) {
    return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  getFailure() {
    return Notiflix.Notify.failure('Something is wrong...');
  }
  getWarning() {
    return Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
