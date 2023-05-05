const DEFAULT_FILTER_VALUE = 100;

const previewPhotoElement = document.querySelector('.img-upload__preview');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsRadioElement = document.querySelector('.img-upload__effects');

class Filter {
  constructor(name, step, minValue, maxValue, measurement, filter) {
    this.name = name;
    this.step = step;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.measurement = measurement;
    this.filter = filter;
  }
}

const filters = {
  none: new Filter('none', 1, 0, 100, '', ''),
  marvin: new Filter('marvin', 1, 0, 100, '%', 'invert'),
  chrome: new Filter('chrome', 0.1, 0, 1, '', 'grayscale'),
  sepia: new Filter('sepia', 0.1, 0, 1, '', 'sepia'),
  phobos: new Filter('phobos', 0.1, 0, 3, 'px', 'blur'),
  heat: new Filter('heat', 0.1, 1, 3, '', 'brightness')
};

let currentFilter = filters.none;
let currentFilterClass = '';
let currentFilterValue = DEFAULT_FILTER_VALUE;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100
  },

  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

function removeFilter() {
  previewPhotoElement.style['filter'] = '';
  sliderElement.classList.add('visually-hidden');
}

function updateSliderOptions(filter) {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: filter.minValue,
      max: filter.maxValue
    },
    start: filter.maxValue,
    step: filter.step
  });
}

function applyFilter(filter) {
  currentFilterClass = `effects__preview--${filter.name}`;
  previewPhotoElement.classList.add(currentFilterClass);
  previewPhotoElement.style[
    'filter'
  ] = `${filter.filter}(${filter.maxValue}${filter.measurement})`;
  sliderElement.classList.remove('visually-hidden');
}

function changeFilter(filter) {
  if (currentFilterClass !== '') {
    previewPhotoElement.classList.remove(currentFilterClass);
  }
  currentFilter = filter;
  currentFilterValue = filter.maxValue;

  if (filter.name !== 'none') {
    applyFilter(filter);
  } else {
    removeFilter();
  }
  effectLevelValueElement.value = currentFilterValue;

  updateSliderOptions(filter);
}

function changeFilterValue(value) {
  currentFilterValue = value;
  previewPhotoElement.style[
    'filter'
  ] = `${currentFilter.filter}(${value}${currentFilter.measurement})`;
}

function handleEffectRadioChange(evt) {
  const filterName = evt.target.value;
  changeFilter(filters[filterName]);
}

function resetRadiosValue() {
  const filterRadiosElement =
    effectsRadioElement.querySelectorAll('.effects__radio');
  filterRadiosElement.forEach((element) => {
    element.checked = false;
  });
  filterRadiosElement[0].checked = true;
}

function resetFilters() {
  changeFilter(filters.none);
  resetRadiosValue();
  effectsRadioElement.removeEventListener('change', handleEffectRadioChange);
}

effectsRadioElement.addEventListener('change', handleEffectRadioChange);

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectLevelValueElement.value = sliderValue;
  changeFilterValue(sliderValue);
});

function addFilters() {
  if (currentFilter === filters.none) {
    sliderElement.classList.add('visually-hidden');
  }
  effectsRadioElement.addEventListener('change', handleEffectRadioChange);
}

export { resetFilters, addFilters };
