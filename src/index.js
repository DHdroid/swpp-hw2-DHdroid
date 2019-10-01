import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import articleReducer from './store/reducers/articleReducer'
import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import detailReducer from './store/reducers/detailReducer';
const rootReducer = combineReducers({
    ar: articleReducer,
    dr: detailReducer
});
const logger = store => next => action => {
    try {
        return next(action);
    } catch(err) {
        console.error('Caught error');
    }
}
const store = createStore(rootReducer,applyMiddleware(logger, thunk));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
