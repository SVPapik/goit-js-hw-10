import { getRefs } from './getRefs';

const refs = getRefs();

export function clearCountryList() {
  refs.countryList.innerHTML = '';
}

export function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}

export function markupList(data) {
  return data
    .map(({ name, flags }) => {
      refs.countryList.insertAdjacentHTML(
        'afterbegin',
        `
      <li><img scr="${flags.svg}" alt="${name.official}" width="60" height="40">${name.official}</li>`
      );
    })
    .join('');
}

export function markupInfo(data) {
  return data
    .map(({ name, flags, population, capital, languages }) => {
      refs.countryInfo.insertAdjacentHTML(
        `<img src="${flags.png}" alt="${name.official}" width="320"><h1>${name.official}</h1><p>${capital}</p><p>${population}</p><p>${languages}</p>`
      );
    })
    .join('');
}
