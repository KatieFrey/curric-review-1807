import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'
import { composeWithDevTools } from 'redux-devtools-extension';

// const COLLECTED_COIN = 'COLLECTED_COIN'
const COINS_REQUEST = 'COINS_REQUEST'
const COINS_SUCCESS = 'COINS_SUCCESS'
const COINS_FAILURE = 'COINS_FAILURE'

const coinsRequest = () => ({
  type: COINS_REQUEST
})
const coinsSuccess = (coins) => ({
  type: COINS_SUCCESS,
  payload: coins
})
const coinsFailure = (error) => ({
  type: COINS_FAILURE,
  payload: error
})

const initialState = {
  coins: [],
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) { // coins: [], loading: Bool, error: null | Error
    case COINS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case COINS_SUCCESS:
      return {
        ...state,
        coins: action.payload,
        loading: false,
        error: null
      }
    case COINS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
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

// setTimeout(() => {
//   store.dispatch(coinsRequest())
//   setTimeout(() => {
//     store.dispatch(coinsSuccess([
//       {id: 1, name: 'Franc', origin: 'France'}
//     ]))
//     // store.dispatch(coinsFailure(Error('oh noessss!!!!')))
//   }, 3000)
// }, 3000)
