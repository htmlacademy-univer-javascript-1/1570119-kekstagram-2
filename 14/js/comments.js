import { paginate } from './utils.js';

let currentPage = 0;
const PER_PAGE = 5;
let commentsPost = [];

const bigPictureElement = document.querySelector('.big-picture');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');

const templateCommentElement = document
  .querySelector('#comment')
  .content.querySelector('.social__comment');
const countDisplayElement = bigPictureElement.querySelector(
  '.comments-count__display'
);
const buttonLoaderElement = document.querySelector('.comments-loader');

const commentsListElement = document.querySelector('.social__comments');

function clearCommentList() {
  commentsListElement.innerHTML = '';
}

/**
 * @param {Object} comment
 * @param  {string} comment.id - id комментария
 * @param  {string} comment.avatar - ссылка на автар пользователя.
 * @param  {string} comment.message - сообщение пользователя.
 * @param  {string} comment.name - имя пользователя
 * @return {void}
 */

function createComment({ avatar, message, name }) {
  const commentElement = templateCommentElement.cloneNode(true);
  const elementImg = commentElement.querySelector('.social__picture');
  elementImg.src = avatar;
  elementImg.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
}

function appendComments(comments) {
  comments.forEach((comment) => {
    const newComment = createComment(comment);
    commentsListElement.append(newComment);
  });
}

function updateCommentListCount() {
  const displayedCommentsCount = commentsListElement.children.length;
  countDisplayElement.textContent = displayedCommentsCount;

  if (displayedCommentsCount >= commentsPost.length) {
    buttonLoaderElement.classList.add('hidden');
    buttonLoaderElement.removeEventListener('click', renderComments);
  }
}

buttonLoaderElement.removeEventListener('click', renderComments);

function renderComments() {
  currentPage++;
  const comments = paginate(commentsPost, currentPage, PER_PAGE);
  appendComments(comments);
  updateCommentListCount();
}

function getCommentWordForm(count) {
  if (count !== 1) {
    return 'комментариев';
  }
  return 'комментария';
}

function addComments(comments) {
  commentsPost = [...comments];
  commentsCountElement.textContent = comments.length;
  commentsCountElement.nextSibling.textContent = ` ${getCommentWordForm(
    comments.length
  )}`;
  renderComments();

  buttonLoaderElement.addEventListener('click', renderComments);
}

function removeComments() {
  clearCommentList();
  currentPage = 0;
  commentsPost = [];

  buttonLoaderElement.removeEventListener('click', renderComments);

  buttonLoaderElement.classList.remove('hidden');
}

export { addComments, removeComments };
