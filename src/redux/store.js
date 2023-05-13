import { configureStore } from '@reduxjs/toolkit'
import { legacy_createStore } from 'redux'
import rootReducer from './reducer'
const store = configureStore({ reducer: rootReducer })
export default store