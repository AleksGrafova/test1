import { clearNode } from './clearContainer.js';
import { getDeclension } from './getDeclension.js';

const dMovies = getDeclension('фильм', 'фильма', 'фильмов');

export const createView = () => {

  const resultsContainer = document.querySelector('.search-result__list');
  const resultsHeading = document.querySelector('.found');

  // Tags list
  const searchTags = document.querySelector('.history');

  // Form
  const searchForm = document.querySelector('.input__container');
  const searchInput = document.querySelector('.input__native');

  // Renderers
  const renderList = (results) => {
    const list = document.createDocumentFragment();

    results.forEach((movieData) => {
      const movie = document.createElement('movie-card');

      movie.poster = movieData.poster;
      movie.title = movieData.title;
      movie.year = movieData.year;
      movie.link = movieData.link;

      list.appendChild(movie);
    });

    clearNode(resultsContainer);
    resultsContainer.appendChild(list);
  };

  const renderSearchList = (terms) => {
    const list = document.createDocumentFragment();

    terms.forEach((movie) => {
      const tag = document.createElement('a');
      tag.classList.add('search__tag');
      tag.href = `/?search=${movie}`;
      tag.textContent = movie;
      tag.dataset.movie = movie;
      tag.ondblclick = function () {
        this.remove('');
        console.log('dblclick')
      }

      list.appendChild(tag);
    });

    clearNode(searchTags);
    searchTags.appendChild(list);
  };

  const renderCount = (count) => {
    if (count === 0) {
      resultsHeading.textContent = `Загрузка`;
      document.querySelector('.main').style.cursor = 'wait';
    }
    if (count !== 0) {
      resultsHeading.textContent = `Нашли ${count} ${dMovies(count)}`;
      document.querySelector('.main').style.cursor = 'default'
    }
  };

  const renderError = (error) => {
    resultsHeading.textContent = error;
  };

  // Events
  const onSearchSubmit = (_listener) => {
    const listener = (event) => {
      event.preventDefault();
      _listener(searchInput.value);
      searchInput.value = '';
    };

    searchForm.addEventListener('submit', listener);

    return () => searchForm.removeEventListener('submit', listener);
  };

  const onTagClick = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.classList.contains('search__tag') && !event.altKey) {
        _listener(event.target.dataset.movie);
      }
    };

    searchTags.addEventListener('click', listener);
    return () => searchTags.removeEventListener('click', listener);
  };

  const onTagRemove = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.classList.contains('search__tag') && event.altKey) {
        _listener(event.target.dataset.movie);
      }
    };

    searchTags.addEventListener('click', listener);
    return () => searchTags.removeEventListener('click', listener);
  };

  return {
    renderList,
    renderCount,
    renderError,
    renderSearchList,
    onSearchSubmit,
    onTagClick,
    onTagRemove,
  };
};
