import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'
import { composeWithDevTools } from 'redux-devtools-extension';

// const COLLECTED_COIN = 'COLLECTED_COIN'

const initialState = {
  coins: [{
    id: 1,
    name: 'Tuppence',
    origin: 'England'
  }, {
    id: 2,
    name: "Franc",
    origin: 'France'
  }, {
    id: 3,
    name: "Gold Sacagawea Dollar",
    origin: 'USA'
  }]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    logger,
    thunks
      .withExtraArgument({axios})
  ))
)

export default store
