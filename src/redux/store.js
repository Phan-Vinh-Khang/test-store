import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, legacy_createStore } from 'redux'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducer'
import reducer from './reducer2'
import reducerChangeLabelLogin from './reducerChangeLabelLogin'
import reducerLogin from './reducerLogin'
const persisConfig = {
    key: 'root',
    storage,
    whitelist: ['dataLogged'],
}
let dataReducer = combineReducers({
    checkStickyHeader: reducer,
    changeLabelLogin: reducerChangeLabelLogin,
    dataLogged: reducerLogin
})//obj datastatic reducer
const store = configureStore({
    reducer: persistReducer(persisConfig, dataReducer)
    // reducer: {
    //     checkStickyHeader: reducer,
    //     changeLabelLogin: reducerChangeLabelLogin
    // }
    // reducer: reducer//useSelector() sẽ ref vào data reducer này
    //useSelector() sẽ ref vào var properties reducer,var properties reducer ref vào ref dc import,var dc import ref vào func reducer
    //useSelector()->var reducer->var reducer->func reducer
    //useSelector()->func reducer
})
export default store
export const persistor = persistStore(store)