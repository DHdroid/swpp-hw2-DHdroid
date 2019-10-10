 
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           

import detailReducer from './reducers/detailReducer';
import articleReducer from './reducers/articleReducer';
import loginReducer from './reducers/loginReducer';


const rootReducer = combineReducers({
  dr:detailReducer,
  ar:articleReducer,
  lr:loginReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)));

export default store;