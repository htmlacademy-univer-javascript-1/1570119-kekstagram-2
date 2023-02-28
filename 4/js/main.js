const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    throw new RangeError('Числа в диапазоне должны быть положительными');
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isCorrectLength = (str, maxLength) => str.length <= maxLength;

getRandomInt(2, 5);
isCorrectLength('academy', 5);
