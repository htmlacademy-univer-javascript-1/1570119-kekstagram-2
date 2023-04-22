import { isEscapeKey } from './utils.js';
import { validator } from './form-vaidation.js';

const form = document.querySelector('#upload-select-image');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('#upload-cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
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
  if (!validator.validate()) {
    form.submit();
  }
};

function closeForm() {
  clearForm();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  closeButton.removeEventListener('click', closeForm);
  hashtagInput.removeEventListener('keydown', stopPropagation);
  descriptionInput.removeEventListener('keydown', stopPropagation);
  form.removeEventListener('submit', submitForm);
}

const showUploadFileForm = () => {
  openModal();
  form.addEventListener('submit', submitForm);

  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', closeForm);
  hashtagInput.addEventListener('keydown', stopPropagation);
  descriptionInput.addEventListener('keydown', stopPropagation);
};
export { showUploadFileForm };
