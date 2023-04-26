import { isEscapeKey } from './utils.js';
import { validator } from './form-vaidation.js';
import { addScale, resetScale } from './form-scale-picture.js';
import { addFilters, resetFilters } from './form-filters-picture.js';
import { sendForm } from './api.js';
import { showSuccess } from './success.js';
import { showError } from './error.js';
import { clearError } from './form-vaidation.js';

const formElement = document.querySelector('#upload-select-image');
const overlayElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = overlayElement.querySelector('#upload-cancel');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');
const buttonSubmitElement = formElement.querySelector('.img-upload__submit');
const fileChooserElement = document.querySelector('#upload-file');
const previewElement = document.querySelector('.img-upload__preview')
  .children[0];

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

function openModal() {
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeModal() {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function disabledButtonSubmitElement() {
  buttonSubmitElement.disabled = true;
  buttonSubmitElement.textContent = 'Сохряняю...';
}

function unDisabledButtonSubmitElement() {
  buttonSubmitElement.disabled = false;
  buttonSubmitElement.textContent = 'Сохранить';
}

function onPopupEscKeydown(event) {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeForm();
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

function clearForm() {
  formElement.reset();
}

function submitForm(event) {
  event.preventDefault();
  if (validator.validate()) {
    disabledButtonSubmitElement();
    sendForm(
      () => {
        showSuccess('Форма успешно отправлена');
        closeForm();
        unDisabledButtonSubmitElement();
      },
      (message) => {
        showError(message);
        closeForm(false);
        unDisabledButtonSubmitElement();
      },
      new FormData(event.target)
    );
  }
}

function closeForm(isClearData = true) {
  closeModal();

  document.removeEventListener('keydown', onPopupEscKeydown);
  closeButtonElement.removeEventListener('click', closeForm);
  hashtagInputElement.removeEventListener('keydown', stopPropagation);
  descriptionInputElement.removeEventListener('keydown', stopPropagation);
  if (isClearData) {
    clearForm();
    resetFilters();
    resetScale();
    clearError();
  }

  formElement.removeEventListener('submit', submitForm);
}

function showUploadFileForm() {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }
  addFilters();
  openModal();
  addScale();

  formElement.addEventListener('submit', submitForm);
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButtonElement.addEventListener('click', closeForm);
  hashtagInputElement.addEventListener('keydown', stopPropagation);
  descriptionInputElement.addEventListener('keydown', stopPropagation);
}
export { showUploadFileForm };
