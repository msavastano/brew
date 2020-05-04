import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ADD_DATA } from './lib/types';

const initialState = {
  data: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return Object.assign({}, state, { data: action.payload });
    default:
      return state;
  }
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}
