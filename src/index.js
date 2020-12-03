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
import thunk from 'redux-thunk';

//devTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	itemsR: itemsReducer,
	authR: auth,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter basename="/budget-world">
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
