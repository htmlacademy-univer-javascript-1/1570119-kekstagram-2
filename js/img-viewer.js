const bigPictureElement = document.querySelector('.big-picture');
const templateCommentElement = document
  .querySelector('#comment')
  .content.querySelector('.social__comment');
const commentsListElement = document.querySelector('.social__comments');
const closeButtonBigPictureElement = bigPictureElement.querySelector('.big-picture__cancel');

/**
 * @param {Object} comment
 * @param  {string} comment.id - id комментария
 * @param  {string} comment.avatar - ссылка на автар пользователя.
 * @param  {string} comment.message - сообщение пользователя.
 * @param  {string} comment.name - имя пользователя
 * @return {void}
 *
 */

const createComment = ({ avatar, message, name }) => {
  const commentElement = templateCommentElement.cloneNode(true);
  const elementImg = commentElement.querySelector('.social__picture');
  elementImg.src = avatar;
  elementImg.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};
const toggleFullScreenPicture = () => {
  document.body.classList.toggle('modal-open');
  bigPictureElement.classList.toggle('hidden');
};

const closeEscape = (event) => {
  if (event.code === 'Escape' && !bigPictureElement.classList.contains('hidden')) {
    toggleFullScreenPicture();
  }
};

const closeFullScreenPicture = () => {
  closeButtonBigPictureElement.addEventListener('click', toggleFullScreenPicture);
  document.addEventListener('keydown', closeEscape);
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


const renderFullScreenPicture = (post) => {
  commentsListElement.innerHTML = '';

  const { url, description, likes, comments } = post;

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;

  comments.forEach((comment) => {
    const newComment = createComment(comment);
    commentsListElement.append(newComment);
  });

  toggleFullScreenPicture();
  closeFullScreenPicture();
};

export { renderFullScreenPicture };
