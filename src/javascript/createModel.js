import { createStore } from './createStore.js';
import { mapMovie } from './mapMovie.js';

export const createModel = () =>
  createStore(
    {
      count: 0,
      results: [],
      error: false,
      searches: [
        'Star Wars',
        'Kung Fury',
        'Back to the Future',
        'Matrix',
        'Terminator',
      ],
    },
    (store) => ({
      search: async (currentState, searchTerm) => {
        store.setState({
          count: 0,
          results: [],
          error: false,
          searches: [searchTerm].concat(
            currentState.searches.filter((term) => term !== searchTerm)
          ),
        });

        try {
          const data = await fetch(
            `http://www.omdbapi.com/?type=movie&apikey=9aa6fe89&s=${searchTerm}`
          ).then((r) => r.json());

          return data.Response === 'True'
            ? {
                count: data.totalResults,
                results: data.Search.map(mapMovie),
              }
            : { error: data.Error };
        } catch (error) {
          return { error };
        }
      },
      removeTag: (currentState, searchTerm) => {
        return {
          searches: currentState.searches.filter((term) => term !== searchTerm),
        };
      },
    })
  );
