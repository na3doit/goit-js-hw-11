import axios from 'axios';

const API_KEY = '33815515-6e147ea7b72d099d608f79cec';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }
  async fetchImages() {
    const options = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: this.perPage,
      page: this.page,
    });

    const { data } = await axios(`${options}`);
    this.page += 1;
    return data;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
