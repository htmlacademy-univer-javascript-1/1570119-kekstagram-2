import { renderThumbnail } from './thumbnail.js';
import { debounce, shuffleArray } from './utils.js';

const picturesElement = document.querySelector('.pictures');
const filtersImageElement = document.querySelector('.img-filters');
const formFilterElement = document.querySelector('.img-filters__form');

const filters = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

let defaultPosts = [];

function clearPosts() {
  picturesElement.querySelectorAll('.picture').forEach((pictureElement) => {
    pictureElement.remove();
  });
}

function compareByComments(postA, postB) {
  return postB.comments.length - postA.comments.length;
}

const onActiveFilter = debounce((evt) => {
  if (!evt.target.className.includes('img-filters__button')) {
    return;
  }
  const id = evt.target.getAttribute('id');

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

function onShowActiveFilter(evt) {
  if (!evt.target.className.includes('img-filters__button')) {
    return;
  }
  formFilterElement.querySelectorAll('button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
}

function showFilters(posts) {
  defaultPosts = [...posts];
  filtersImageElement.classList.remove('img-filters--inactive');
  formFilterElement.addEventListener('click', onShowActiveFilter);
  formFilterElement.addEventListener('click', onActiveFilter);
}

export { showFilters };
