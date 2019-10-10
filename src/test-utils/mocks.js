import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           


const getArticleReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);
const getDetailReducer = jest.fn(
    initialState => (state = initialState, action) => {
      switch (action.type) {
        default:
          break;
      }
      return state;
    }
);
const getLoginReducer = jest.fn(
    initialState => (state = initialState, action) => {
      switch (action.type) {
        default:
          break;
      }
      return state;
    }
);

export const getMockStore = (initialState) => {
  const mockArticleReducer = getArticleReducer(initialState);
  const mockDetailReducer = getDetailReducer(initialState);
  const mockLoginReducer = getLoginReducer(initialState);
  const rootReducer = combineReducers({
    ar: mockArticleReducer,
    dr: mockDetailReducer,
    lr: mockLoginReducer,
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk)));
  return mockStore;
}
