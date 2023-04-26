import { isEscapeKey } from './utils.js';

const templateSuccess = document
  .querySelector('#success')
  .content.querySelector('.success');

function onCloseOutside(event) {
  const successElement = document.querySelector('.success');
  event.stopPropagation();
  if (event.target === successElement) {
    closeSuccess();
  }
}

function onCloseModalKeydown(event) {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeSuccess();
  }
}
function closeSuccess() {
  document.querySelector('.success').remove();
  document.removeEventListener('click', onCloseOutside);
  document.removeEventListener('keydown', onCloseModalKeydown);
}

function showSuccess(text) {
  const successFragment = document.createDocumentFragment();
  const successElement = templateSuccess.cloneNode(true);
  const titleElement = successElement.querySelector('.success__title');
  const buttonElement = successElement.querySelector('.success__button');

  titleElement.textContent = text;

  buttonElement.addEventListener(
    'click',
    (evt) => {
      evt.preventDefault();
      closeSuccess();
    },
    { once: true }
  );

  document.addEventListener('keydown', onCloseModalKeydown);

  document.addEventListener('click', onCloseOutside);
  successFragment.append(successElement);

  document.body.append(successFragment);
}

export { showSuccess, closeSuccess };
