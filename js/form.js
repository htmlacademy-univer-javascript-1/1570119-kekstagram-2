import { isEscapeKey } from './utils.js';
import { validator } from './form-vaidation.js';
import { addScale, resetScale } from './form-scale-picture.js';
import { addFilters, resetFilters } from './form-filters-picture.js';
import { sendForm } from './api.js';
import { showSuccessToast } from './success-toast.js';
import { showErrorToast } from './error-toast.js';

const form = document.querySelector('#upload-select-image');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('#upload-cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const buttonSubmit = form.querySelector('.img-upload__submit');

const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const disabledButtonSubmit = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Сохряняю...';
};

const unDisabledButtonSubmit = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Сохранить';
};

const onPopupEscKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeForm();
  }
};

const stopPropagation = (event) => {
  event.stopPropagation();
};

const clearForm = () => {
  form.reset();
};

const submitForm = (event) => {
  event.preventDefault();
  if (validator.validate()) {
    disabledButtonSubmit();
    sendForm(
      () => {
        showSuccessToast('Форма успешно отправлена');
        closeForm();
        unDisabledButtonSubmit();
      },
      (message) => {
        showErrorToast(message);
        closeForm(false);
        unDisabledButtonSubmit();
      },
      new FormData(event.target)
    );
  }
};

function closeForm(clearData = true) {
  closeModal();

  document.removeEventListener('keydown', onPopupEscKeydown);
  closeButton.removeEventListener('click', closeForm);
  hashtagInput.removeEventListener('keydown', stopPropagation);
  descriptionInput.removeEventListener('keydown', stopPropagation);
  if (clearData) {
    clearForm();
    resetFilters();
    resetScale();
  }

  form.removeEventListener('submit', submitForm);
}

const showUploadFileForm = () => {
  addFilters();
  openModal();
  addScale();

  form.addEventListener('submit', submitForm);
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', closeForm);
  hashtagInput.addEventListener('keydown', stopPropagation);
  descriptionInput.addEventListener('keydown', stopPropagation);
};
export { showUploadFileForm };
