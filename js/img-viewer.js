import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const templateCommentElement = document
  .querySelector('#comment')
  .content.querySelector('.social__comment');
const commentsListElement = document.querySelector('.social__comments');
const closeButtonBigPictureElement = bigPictureElement.querySelector(
  '.big-picture__cancel'
);
const buttonLoader = document.querySelector('.comments-loader');
const countDisplayElement = bigPictureElement.querySelector(
  '.comments-count__display'
);

const commentsCountElement = bigPictureElement.querySelector('.comments-count');

let currentPage = 0;
const PER_PAGE = 5;
let commentsPost = [];

const clearCommentList = () => {
  commentsListElement.innerHTML = '';
};

const openModal = () => {
  document.body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');
};

const onPopupEscKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeModal();
  }
};

/**
 * @param {Object} comment
 * @param  {string} comment.id - id комментария
 * @param  {string} comment.avatar - ссылка на автар пользователя.
 * @param  {string} comment.message - сообщение пользователя.
 * @param  {string} comment.name - имя пользователя
 * @return {void}
 */

const createComment = ({ avatar, message, name }) => {
  const commentElement = templateCommentElement.cloneNode(true);
  const elementImg = commentElement.querySelector('.social__picture');
  elementImg.src = avatar;
  elementImg.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const appendComments = (comments) => {
  comments.forEach((comment) => {
    const newComment = createComment(comment);
    commentsListElement.append(newComment);
  });
};

const updateCommentListCount = () => {
  const displayedCommentsCount = commentsListElement.children.length;
  countDisplayElement.textContent = displayedCommentsCount;

  if (displayedCommentsCount >= commentsPost.length) {
    buttonLoader.classList.add('hidden');
    buttonLoader.removeEventListener('click', renderComments);
  }
};

function renderComments() {
  currentPage++;
  const comments = paginate(commentsPost, currentPage, PER_PAGE);
  appendComments(comments);
  updateCommentListCount();
}

const removeModalCloseListeners = () => {
  document.removeEventListener('keydown', onPopupEscKeydown);
  closeButtonBigPictureElement.removeEventListener('click', closeModal);
};

function closeModal() {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  removeModalCloseListeners();

  buttonLoader.removeEventListener('click', renderComments);

  clearCommentList();
  currentPage = 0;
  commentsPost = [];
  buttonLoader.classList.remove('hidden');
}

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].slice(startIndex, startIndex + pageSize);
}

const addModalCloseListeners = () => {
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButtonBigPictureElement.addEventListener('click', closeModal);
};

/**
 * @param {Object} post
 * @param {string} post.id - id поста
 * @param {string} post.url - ссылка на картинку
 * @param {string} post.description - описание поста
 * @param {number} post.likes - количество лайков на посте.
 * @param {Array<comment>} post.comments - комметарии к посту
 * @return {Void}
 */

const getCommentWordForm = (count) => {
  if (count === 1) {
    return 'комментарий';
  } else if (count > 1 && count < 5) {
    return 'комментария';
  } else {
    return 'комментариев';
  }
};

const renderFullScreenPicture = (post) => {
  const { url, description, likes, comments } = post;

  commentsPost = [...comments];

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  commentsCountElement.textContent = comments.length;
  commentsCountElement.nextSibling.textContent = ` ${getCommentWordForm(
    comments.length
  )}`;

  renderComments();

  buttonLoader.addEventListener('click', renderComments);

  openModal();
  addModalCloseListeners();
};

export { renderFullScreenPicture };
