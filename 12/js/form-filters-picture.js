const DEFAULT_FILTER_VALUE = 100;

const previewPhoto = document.querySelector('.img-upload__preview');
const effectLevelValue = document.querySelector('.effect-level__value');
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

const removeFilter = () => {
  previewPhoto.style['filter'] = '';
  sliderElement.classList.add('visually-hidden');
};

const updateSliderOptions = (filter) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: filter.minValue,
      max: filter.maxValue
    },
    start: filter.maxValue,
    step: filter.step
  });
};

const applyFilter = (filter) => {
  currentFilterClass = `effects__preview--${filter.name}`;
  previewPhoto.classList.add(currentFilterClass);
  previewPhoto.style[
    'filter'
  ] = `${filter.filter}(${filter.maxValue}${filter.measurement})`;
  sliderElement.classList.remove('visually-hidden');
};

const changeFilter = (filter) => {
  if (currentFilterClass !== '') {
    previewPhoto.classList.remove(currentFilterClass);
  }
  currentFilter = filter;
  currentFilterValue = filter.maxValue;

  if (filter.name !== 'none') {
    applyFilter(filter);
  } else {
    removeFilter();
  }
  effectLevelValue.value = currentFilterValue;

  updateSliderOptions(filter);
};

const changeFilterValue = (value) => {
  currentFilterValue = value;
  previewPhoto.style[
    'filter'
  ] = `${currentFilter.filter}(${value}${currentFilter.measurement})`;
};

const handleEffectRadioChange = (event) => {
  const filterName = event.target.value;
  changeFilter(filters[filterName]);
};

const resetRadiosValue = () => {
  const filterRadios = effectsRadioElement.querySelectorAll('.effects__radio');
  filterRadios.forEach((element) => {
    element.checked = false;
  });
  filterRadios[0].checked = true;
};

const resetFilters = () => {
  changeFilter(filters.none);
  resetRadiosValue();
  effectsRadioElement.removeEventListener('change', handleEffectRadioChange);
};

effectsRadioElement.addEventListener('change', handleEffectRadioChange);

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  changeFilterValue(sliderValue);
});

const addFilters = () => {
  if (currentFilter === filters.none) {
    sliderElement.classList.add('visually-hidden');
  }
  effectsRadioElement.addEventListener('change', handleEffectRadioChange);
};

export { resetFilters, addFilters };
