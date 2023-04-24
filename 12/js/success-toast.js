import { isEscapeKey } from './utils.js';

const templateSuccessToast = document
  .querySelector('#success')
  .content.querySelector('.success');

const onCloseOutside = (event) => {
  const successElement = document.querySelector('.success');
  event.stopPropagation();
  if (event.target === successElement) {
    closeSuccessToast();
  }
};

function closeSuccessToast() {
  document.querySelector('.success').remove();
  document.removeEventListener('click', onCloseOutside);
}

const showSuccessToast = (text) => {
  const successFragment = document.createDocumentFragment();
  const successElement = templateSuccessToast.cloneNode(true);
  const titleElement = successElement.querySelector('.success__title');
  const buttonElement = successElement.querySelector('.success__button');

  titleElement.textContent = text;

  buttonElement.addEventListener(
    'click',
    (evt) => {
      evt.preventDefault();
      closeSuccessToast();
    },
    { once: true }
  );

  document.addEventListener(
    'keydown',
    (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        closeSuccessToast();
      }
    },
    { once: true }
  );

  document.addEventListener('click', onCloseOutside);
  successFragment.append(successElement);

  document.body.append(successFragment);
};

export { showSuccessToast, closeSuccessToast };
