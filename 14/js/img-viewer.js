import { isEscapeKey } from './utils.js';
import { addComments, removeComments } from './comments.js';

const bigPictureElement = document.querySelector('.big-picture');

const closeButtonBigPictureElement = bigPictureElement.querySelector(
  '.big-picture__cancel'
);

function openModal() {
  document.body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');
}

function onPopupEscKeydown(event) {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeModal();
  }
}

function removeModalCloseListeners() {
  document.removeEventListener('keydown', onPopupEscKeydown);
  closeButtonBigPictureElement.removeEventListener('click', closeModal);
}

function closeModal() {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  removeModalCloseListeners();

  removeComments();
}

function addModalCloseListeners() {
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButtonBigPictureElement.addEventListener('click', closeModal);
}

/**
 * @param {Object} post
 * @param {string} post.id - id поста
 * @param {string} post.url - ссылка на картинку
 * @param {string} post.description - описание поста
 * @param {number} post.likes - количество лайков на посте.
 * @param {Array<comment>} post.comments - комметарии к посту
 * @return {Void}
 */

function renderFullScreenPicture(post) {
  const { url, description, likes, comments } = post;

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  addComments(comments);

  openModal();
  addModalCloseListeners();
}

export { renderFullScreenPicture };
