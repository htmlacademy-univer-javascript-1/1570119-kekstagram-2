const templatePictureElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureListElement = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

const renderThumbnail = (posts) => {
  posts.forEach(({ url, likes, comments }) => {
    const pictureElement = templatePictureElement.cloneNode(true);

    const elementNumberOfLikes = pictureElement.querySelector('.picture__likes');
    const elementNumberOfComments = pictureElement.querySelector('.picture__comments');
    const elementImg = pictureElement.querySelector('.picture__img');

    elementImg.src = url;
    elementNumberOfLikes.textContent = likes;
    elementNumberOfComments.textContent = comments.length;

    pictureListFragment.append(pictureElement);
  });

  pictureListElement.append(pictureListFragment);
};
export { renderThumbnail };
