import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { getRefs } from './getRefs';
import {
  clearCountryInfo,
  clearCountryList,
  markupInfo,
  markupList,
} from './countriesMarkup';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

clearCountryList();
clearCountryInfo();

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));
function onInputSearch(evt) {
  const inputValue = evt.target.value.trim();
  if (!inputValue) {
    clearCountryInfo();
    clearCountryList();
    return;
  }
  fetchCountries(inputValue).then(onFetchSuccess).catch(onFetchError);
}

function onFetchSuccess(data) {
  if (data.length >= 2 && data.length <= 10) {
    markupList(data);
    clearCountryInfo();
  }
  if (data.length < 2) {
    markupInfo(data);
    clearCountryList();
  }
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}
