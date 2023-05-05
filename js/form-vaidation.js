import { isCorrectLength } from './utils.js';

const MAX_HASHTAGS = 5;
const DESCRIPTION_MAX_LENGTH = 140;

const formElement = document.querySelector('#upload-select-image');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');

export const validator = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field__error'
});

validator.addValidator(
  hashtagInputElement,
  validateHashtags,
  'Допускаются только буквы и числа. Не должны повторяться. Хэштегов может быть не больше 5 через пробел.'
);

validator.addValidator(
  descriptionInputElement,
  validateDescription,
  'Максимальное количество символов - 140'
);

function validateDescription(value) {
  return isCorrectLength(value, DESCRIPTION_MAX_LENGTH);
}

function validateHashtags(value) {
  if (value.length === 0) {
    return true;
  }
  const regex = /^#[a-zA-Z0-9]{1,19}$/;

  const tags = value.trim().split(/\s+/);

  if (tags.length > MAX_HASHTAGS) {
    return false;
  }

  const tagSet = new Set();

  for (let tag of tags) {
    if (!regex.test(tag)) {
      return false;
    }

    tag = tag.toLowerCase();

    if (tagSet.has(tag)) {
      return false;
    }
    tagSet.add(tag);
  }

  return true;
}

function clearError() {
  const errorElement = document.querySelector(
    '.img-upload__field-wrapper--invalid'
  );
  if (errorElement) {
    errorElement.classList.remove('img-upload__field-wrapper--invalid');
    errorElement.querySelector(
      '.pristine-error.img-upload__field__error'
    ).innerText = '';
  }
}

export { clearError };
