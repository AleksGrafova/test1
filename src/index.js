// App
import { createModel } from './javascript/createModel.js';
import { createViewModel } from './javascript/createViewModel.js';
import { createView } from './javascript/createView.js';

// Components
import './javascript/currentYear.js';
import './javascript/movieCard.js';

const model = createModel();
const view = createView();
const viewModel = createViewModel(model);

// ViewModel -> View
viewModel.bindCount(view.renderCount);
viewModel.bindError(view.renderError);
viewModel.bindResults(view.renderList);
viewModel.bindSearches(view.renderSearchList);

// View -> ViewModel
view.onSearchSubmit(viewModel.handleSearchSubmit);
view.onTagClick(viewModel.handleTagClick);
view.onTagRemove(viewModel.handleTagRemove);

// Init app
viewModel.init();

model.subscribe(console.log);

export function poisk() {
    let str = document.getElementsByClassName('input__native').value;
    if (str.length > 0) {
        view.onSearchSubmit(str);
    }
};
