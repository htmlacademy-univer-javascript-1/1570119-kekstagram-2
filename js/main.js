import { NAMES, COMMENT_SENTENCES, DESCRIPTION_SENTENCES } from './data.js';

const MAX_COMMENTS_PER_POST = 5;

const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    throw new RangeError('Числа в диапазоне должны быть неотрицательными');
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isCorrectLength = (str, maxLength) => str.length <= maxLength;

// https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
// eslint-disable-next-line arrow-body-style
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// eslint-disable-next-line arrow-body-style
const getRandomElementOfArr = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

// eslint-disable-next-line arrow-body-style
const createComments = (count) => {
  return Array.from({ length: count }, () => ({
    id: generateUniqueId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomElementOfArr(COMMENT_SENTENCES),
    name: getRandomElementOfArr(NAMES)
  }));
};

const createPost = (id) => ({
  id,
  url: `photos/${id}`,
  description: getRandomElementOfArr(DESCRIPTION_SENTENCES),
  likes: getRandomInt(25, 200),
  comments: createComments(getRandomInt(1, MAX_COMMENTS_PER_POST))
});

const generatePosts = Array.from({ length: 25 }, (_, id) => createPost(id + 1));
// console.log(generatePosts);
export { isCorrectLength, generatePosts };
