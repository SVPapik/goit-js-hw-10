const URL = 'https://restcountries.com/v3.1/name/';
const SEARCH_PARAMS = 'fields=name,capital,population,flags,languages';
export function fetchCountries(name) {
  return fetch(`${URL}${name}?${SEARCH_PARAMS}`).then(response => {
    if (!response.ok || response.status === 404) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
