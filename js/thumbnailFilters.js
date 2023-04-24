import { renderThumbnail } from './thumbnail.js';
import { debounce, shuffleArray } from './utils.js';

const picturesElement = document.querySelector('.pictures');

const clearPosts = () => {
  picturesElement.querySelectorAll('.picture').forEach((pictureElement) => {
    pictureElement.remove();
  });
};

const filters = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

let defaultPosts = [];

const filtersImageElement = document.querySelector('.img-filters');
const formFilter = document.querySelector('.img-filters__form');

const compareByComments = (postA, postB) =>
  postB.comments.length - postA.comments.length;

const onActiveFilter = debounce((event) => {
  if (!event.target.className.includes('img-filters__button')) {
    return;
  }
  const id = event.target.getAttribute('id');

  if (filters.default === id) {
    clearPosts();
    renderThumbnail(defaultPosts);
  }
  if (filters.random === id) {
    clearPosts();
    const shuffleArr = shuffleArray(defaultPosts.slice()).slice(0, 10);
    renderThumbnail(shuffleArr);
  }
  if (filters.discussed === id) {
    clearPosts();
    const discussedArr = defaultPosts.slice().sort(compareByComments);
    renderThumbnail(discussedArr);
  }
});
const showActiveFilter = (event) => {
  if (!event.target.className.includes('img-filters__button')) {
    return;
  }
  formFilter.querySelectorAll('button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  event.target.classList.add('img-filters__button--active');
};

const showFilters = (posts) => {
  defaultPosts = [...posts];
  filtersImageElement.classList.remove('img-filters--inactive');
  formFilter.addEventListener('click', showActiveFilter);
  formFilter.addEventListener('click', onActiveFilter);
};

export { showFilters };
