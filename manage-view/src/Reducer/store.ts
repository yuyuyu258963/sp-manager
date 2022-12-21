
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

// @ts-ignore
import reducer from './reducer.ts'

export default createStore(reducer, applyMiddleware(thunk))