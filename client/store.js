import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'
import { composeWithDevTools } from 'redux-devtools-extension'

// const COLLECTED_COIN = 'COLLECTED_COIN'
const COINS_REQUEST = 'COINS_REQUEST'
const COINS_SUCCESS = 'COINS_SUCCESS'
const COINS_FAILURE = 'COINS_FAILURE'
const COIN_UPDATE = 'COIN_UPDATE'
const COIN_UPDATED = 'COIN_UPDATED'
const COIN_UPDATE_FAIL = 'COIN_UPDATE_FAIL'

const coinsRequest = () => ({
    type: COINS_REQUEST,
})
const coinsSuccess = coins => ({
    type: COINS_SUCCESS,
    payload: coins,
})
const coinsFailure = error => ({
    type: COINS_FAILURE,
    payload: error,
})

const coinUpdate = () => ({
    type: COIN_UPDATE,
})
const coinUpdated = newCoin => ({
    type: COIN_UPDATED,
    payload: newCoin,
})
const coinUpdateFail = error => ({
    type: COIN_UPDATE_FAIL,
    payload: error,
})

// thunk creators
export const requestCoins = () => async dispatch => {
    dispatch(coinsRequest())
    try {
        const { data: coins } = await axios.get('/api/coins')
        dispatch(coinsSuccess(coins))
    } catch (err) {
        dispatch(coinsFailure(err))
    }
}

export const updateCoin = coinDiff => async dispatch => {
    dispatch(coinUpdate())
    try {
        // console.log('coin diff object in front end:', coinDiff)
        const { data: changedCoin } = await axios.put(
            `/api/coins/${coinDiff.id}`,
            coinDiff
        )
        // console.log('changed coin from backend:', changedCoin)
        dispatch(coinUpdated(changedCoin))
    } catch (err) {
        dispatch(coinUpdateFail(err))
    }
}

const initialState = {
    coins: [],
    loading: false,
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (
        action.type // coins: [], loading: Bool, error: null | Error
    ) {
        case COINS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case COINS_SUCCESS:
            return {
                ...state,
                coins: action.payload,
                loading: false,
                error: null,
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
    composeWithDevTools(
        applyMiddleware(logger, thunks.withExtraArgument({ axios }))
    )
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

// store.dispatch(updateCoin({ id: 2, name: 'Euro' }))
