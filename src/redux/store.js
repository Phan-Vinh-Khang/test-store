import { configureStore } from '@reduxjs/toolkit'
import { legacy_createStore } from 'redux'
import rootReducer from './reducer'
import reducer from './reducer2'
const store = configureStore({
    reducer: reducer//useSelector() sẽ ref vào data reducer này
    //useSelector() sẽ ref vào var properties reducer,var properties reducer ref vào ref dc import,var dc import ref vào func reducer
    //useSelector()->var reducer->var reducer->func reducer
    //useSelector()->func reducer
})
export default store