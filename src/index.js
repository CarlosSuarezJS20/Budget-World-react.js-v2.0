import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Redux
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import itemsReducer from './store/reducer/items';
import auth from './store/reducer/auth';
import filtersReducer from './store/reducer/filters';
import thunk from 'redux-thunk';
import TagManager from 'react-gtm-module';

//devTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	itemsR: itemsReducer,
	authR: auth,
	filtersR: filtersReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

const tagManagerArgs = {
	gtmId: 'GTM-5K84JR9',
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,

	document.getElementById('root')
);
registerServiceWorker();
