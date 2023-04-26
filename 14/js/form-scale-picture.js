const PROTO_SCALE_STEP = 25;
const PHOTO_SCALE_DEFAULT = 100;
const PHOTO_SCALE_MAX = 100;
const PHOTO_SCALE_MIN = 25;

const controlScaleSmallerElement = document.querySelector(
  '.scale__control--smaller'
);
const controlScaleBiggerElement = document.querySelector(
  '.scale__control--bigger'
);
const controlScaleInputElement = document.querySelector(
  '.scale__control--value'
);
const previewPhotoElement = document.querySelector('.img-upload__preview');

let photoScaleValue = PHOTO_SCALE_DEFAULT;

function setScalePhoto(value) {
  return (previewPhotoElement.style.transform = `scale(${value / 100})`);
}

function handleBiggerScale() {
  if (photoScaleValue + PROTO_SCALE_STEP >= 100) {
    photoScaleValue = PHOTO_SCALE_MAX;
    controlScaleInputElement.value = `${photoScaleValue}%`;
    setScalePhoto(photoScaleValue);
    return;
  }
  photoScaleValue += PROTO_SCALE_STEP;
  controlScaleInputElement.value = `${photoScaleValue}%`;
  setScalePhoto(photoScaleValue);
}

function handleSmallerScale() {
  if (photoScaleValue - PROTO_SCALE_STEP <= PHOTO_SCALE_MIN) {
    photoScaleValue = PHOTO_SCALE_MIN;
    controlScaleInputElement.value = `${photoScaleValue}%`;
    setScalePhoto(photoScaleValue);
    return;
  }

  photoScaleValue -= PROTO_SCALE_STEP;
  controlScaleInputElement.value = `${photoScaleValue}%`;
  setScalePhoto(photoScaleValue);
}

function addScale() {
  controlScaleBiggerElement.addEventListener('click', handleBiggerScale);
  controlScaleSmallerElement.addEventListener('click', handleSmallerScale);
}

function resetScale() {
  photoScaleValue = PHOTO_SCALE_DEFAULT;
  controlScaleInputElement.value = `${photoScaleValue}%`;
  controlScaleBiggerElement.removeEventListener('click', handleBiggerScale);
  controlScaleSmallerElement.removeEventListener('click', handleSmallerScale);
  setScalePhoto(photoScaleValue);
}

export { addScale, resetScale };
