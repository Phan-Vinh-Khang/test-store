import { configureStore } from '@reduxjs/toolkit'
import { legacy_createStore } from 'redux'
import rootReducer from './reducer'
import reducer from './reducer2'
const store = configureStore({
    reducer: reducer//useSelector() sẽ ref vào data reducer này
})
export default store