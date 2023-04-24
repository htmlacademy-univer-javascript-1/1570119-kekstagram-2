import { isEscapeKey } from './utils.js';
import { showUploadFileForm } from './form.js';

const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

const closeErrorToast = () => {
  document.querySelector('.error').remove();
};

const onCloseOutside = (event) => {
  event.stopPropagation();
  const errorElement = document.querySelector('.error');
  if (event.target === errorElement) {
    closeErrorToast();
  }
};

const onCloseEscError = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeErrorToast();
  }
};

const onCloseErrorClick = (event) => {
  event.preventDefault();
  closeErrorToast();
};

const onOpenChangeFile = () => {
  document.querySelector('#upload-file').click();
  closeErrorToast();
  document
    .querySelector('#upload-file')
    .addEventListener('change', showUploadFileForm);
};

const showErrorToast = (errorText, isErrorOnGetData = false) => {
  const errorFragment = document.createDocumentFragment();
  const errorElement = errorTemplate.cloneNode(true);
  const titleElement = errorElement.querySelector('.error__title');
  const buttonElement = errorElement.querySelector('.error__button');
  if (isErrorOnGetData) {
    buttonElement.textContent = 'Закрыть';
  }

  titleElement.textContent = errorText;

  if (isErrorOnGetData) {
    buttonElement.addEventListener('click', onCloseErrorClick);
  } else {
    buttonElement.addEventListener('click', onOpenChangeFile);
  }

  document.addEventListener('keydown', onCloseEscError);

  errorFragment.append(errorElement);
  document.body.append(errorFragment);

  document.addEventListener('click', onCloseOutside);
};

export { showErrorToast, closeErrorToast };
