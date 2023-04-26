import { renderFullScreenPicture } from './img-viewer.js';

const templatePictureElement = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const pictureListElement = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

function renderThumbnail(posts) {
  posts.forEach((post) => {
    const { url, likes, comments } = post;
    const pictureElement = templatePictureElement.cloneNode(true);

    const elementNumberOfLikes =
      pictureElement.querySelector('.picture__likes');
    const elementNumberOfComments =
      pictureElement.querySelector('.picture__comments');
    const elementImg = pictureElement.querySelector('.picture__img');

    elementImg.src = url;
    elementNumberOfLikes.textContent = likes;
    elementNumberOfComments.textContent = comments.length;
    pictureListFragment.append(pictureElement);

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (evt.target.tagName === 'IMG') {
        renderFullScreenPicture(post);
      }
    });
  });

  pictureListElement.append(pictureListFragment);
}
export { renderThumbnail };
