import { isCorrectLength } from './utils.js';

const form = document.querySelector('#upload-select-image');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const DESCRIPTION_MAX_LENGTH = 140;
const MAX_HASHTAGS = 5;

export const validator = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field__error'
});

validator.addValidator(
  hashtagInput,
  validateHashtags,
  'Допускаются только буквы и числа. Не должны повторяться. Хэштегов может быть не больше 5 через пробел.'
);

validator.addValidator(
  descriptionInput,
  validateDescription,
  'Максимальное количество символов - 140'
);

function validateDescription(value) {
  return isCorrectLength(value, DESCRIPTION_MAX_LENGTH);
}

function validateHashtags(value) {
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
