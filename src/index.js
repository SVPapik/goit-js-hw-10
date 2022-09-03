import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { getRefs } from './js/getRefs';
import {
  clearCountryInfo,
  clearCountryList,
  markupList,
  markupInfo,
} from './js/countriesMarkup';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
  clearCountryList();
  clearCountryInfo();
  const inputValue = evt.target.value.trim();
  if (!inputValue) {
    clearCountryInfo();
    clearCountryList();
    return;
  }
  fetchCountries(inputValue).then(onFetchSuccess).catch(onFetchError);
}

function onFetchSuccess(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (data.length >= 2 && data.length <= 10) {
    clearCountryInfo();
    markupList(data);
  }
  if (data.length === 1) {
    clearCountryList();
    markupInfo(data);
  }
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}
