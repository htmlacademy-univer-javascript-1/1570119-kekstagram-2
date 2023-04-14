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

export {
  generateUniqueId,
  getRandomElementOfArr,
  isCorrectLength,
  getRandomInt
};
