const PROTO_SCALE_STEP = 25;
const PHOTO_SCALE_DEFAULT = 100;
const PHOTO_SCALE_MAX = 100;
const PHOTO_SCALE_MIN = 25;

const controlScaleSmaller = document.querySelector('.scale__control--smaller');
const controlScaleBigger = document.querySelector('.scale__control--bigger');
const controlScaleInput = document.querySelector('.scale__control--value');
const previewPhoto = document.querySelector('.img-upload__preview');

let photoScaleValue = PHOTO_SCALE_DEFAULT;

const setScalePhoto = (value) =>
  (previewPhoto.style.transform = `scale(${value / 100})`);

const handleBiggerScale = () => {
  if (photoScaleValue + PROTO_SCALE_STEP >= 100) {
    photoScaleValue = PHOTO_SCALE_MAX;
    controlScaleInput.value = `${photoScaleValue}%`;
    setScalePhoto(photoScaleValue);
    return;
  }
  photoScaleValue += PROTO_SCALE_STEP;
  controlScaleInput.value = `${photoScaleValue}%`;
  setScalePhoto(photoScaleValue);
};

const handleSmallerScale = () => {
  if (photoScaleValue - PROTO_SCALE_STEP <= PHOTO_SCALE_MIN) {
    photoScaleValue = PHOTO_SCALE_MIN;
    controlScaleInput.value = `${photoScaleValue}%`;
    setScalePhoto(photoScaleValue);
    return;
  }

  photoScaleValue -= PROTO_SCALE_STEP;
  controlScaleInput.value = `${photoScaleValue}%`;
  setScalePhoto(photoScaleValue);
};

const addScale = () => {
  controlScaleBigger.addEventListener('click', handleBiggerScale);
  controlScaleSmaller.addEventListener('click', handleSmallerScale);
};

const resetScale = () => {
  photoScaleValue = PHOTO_SCALE_DEFAULT;
  controlScaleInput.value = `${photoScaleValue}%`;
  controlScaleBigger.removeEventListener('click', handleBiggerScale);
  controlScaleSmaller.removeEventListener('click', handleSmallerScale);
  setScalePhoto(photoScaleValue);
};

export { addScale, resetScale };
