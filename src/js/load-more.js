export class LoadMoreBtn {
  constructor(className, onLoadMore) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<button type="button" class="${className}">Load more</button>`
    );
    this.loadMoreBtn = document.querySelector(`.${className}`);
    this.loadMoreBtn.addEventListener('click', onLoadMore);
    this.hide();
  }

  hide() {
    this.loadMoreBtn.style.display = 'none';
  }

  show() {
    this.loadMoreBtn.style.display = 'block';
  }

  loading() {
    this.loadMoreBtn.textContent = 'Loading...';
  }

  endLoading() {
    this.loadMoreBtn.textContent = 'Load more';
  }
}
