import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ADD_DATA, CHANGE_STATE, CHANGE_TYPE } from './lib/types';
const states = process.env.STATES.split(' ').map((st) => {
  return st.replace('-', ' ')
})
const initialState = {
  data: null,
  initState: states[0], 
  initType: 'micro'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return Object.assign({}, state, { data: action.payload });
    case CHANGE_TYPE:
      return Object.assign({}, state, { initType: action.payload });
    case CHANGE_STATE:
      return Object.assign({}, state, { initState: action.payload });
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
