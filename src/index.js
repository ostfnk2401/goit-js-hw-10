import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

// const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const createCountryCard = (country) => {
    const { name, capital, population, languages, flags } = country;
    const languageList = languages.map((lang) => lang.name).join(', ');
    const officialName = name?.official ?? 'Unknown';
    return `
      <div class="card">
        <img class="card-img-top" src="${flags.svg}" alt="${officialName} flag">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text"><strong>Capital:</strong> ${capital}</p>
          <p class="card-text"><strong>Population:</strong> ${population.toLocaleString()}</p>
          <p class="card-text"><strong>Languages:</strong> ${languageList}</p>
        </div>
      </div>
    `;
  };
  
const createCountryList = (countries) => {
  const countryItems = countries.map(
    (country) =>
      `<div class="country-item"><img src="${country.flags.svg}" alt="${country.name} flag">${country.name}</div>`
  );
  return countryItems.join('');
};

const handleSearch = () => {
    const searchTerm = searchBox.value.trim();
    if (!searchTerm) {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      return;
    }
  
    fetchCountries(searchTerm)
      .then((countries) => {
        if (!countries) { 
          return;
        }
        if (countries.length > 10) {
          Notify.info('Too many matches found. Please enter a more specific name.');
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
          return;
        }
        if (countries.length > 1 && countries.length <= 10) {
          countryInfo.innerHTML = '';
          countryList.insertAdjacentHTML('beforeend', createCountryList(countries));
          return;
        }
        if (countries.length === 1) {
          countryList.innerHTML = '';
          countryInfo.insertAdjacentHTML('beforeend', createCountryCard(countries[0]));
          return;
        }
        Notify.failure('Country not found');
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
      })
      .catch((error) => {
        Notify.failure('Oops, something went wrong! Please try again.');
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        console.log(error);
      });
  };
  

searchBox.addEventListener('input', debounce(handleSearch, 300));