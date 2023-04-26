function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    throw new RangeError('Числа в диапазоне должны быть неотрицательными');
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isCorrectLength(str, maxLength) {
  return str.length <= maxLength;
}

// https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
// eslint-disable-next-line arrow-body-style
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// eslint-disable-next-line arrow-body-style
function getRandomElementOfArr(elements) {
  return elements[getRandomInt(0, elements.length - 1)];
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export {
  generateUniqueId,
  getRandomElementOfArr,
  isCorrectLength,
  getRandomInt,
  isEscapeKey,
  paginate,
  debounce,
  shuffleArray
};
