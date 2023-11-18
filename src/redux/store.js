import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, legacy_createStore } from 'redux'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import sessionStorage from 'redux-persist/lib/storage/session';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './reducer'
import reducer from './reducer2'
import reducerChangeLabelLogin from './reducerChangeLabelLogin'
import reduxLogin from './reducerLogin'
import reduxOrder from './reduxOrder'
import reduxSearch from './reduxSearch';
import reduxPages from './reduxPages';
const persisConfigLocal = {
    key: 'root',
    storage: storage,
    whitelist: ['dataLogged']
}
const persisConfigSession = {
    key: 'root',
    storage: sessionStorage,
}
let dataReducer = combineReducers({
    checkStickyHeader: reducer,
    changeLabelLogin: reducerChangeLabelLogin,
    dataLogged: reduxLogin,
    listOrder: reduxOrder,
    search: reduxSearch,
    page: reduxPages
})//obj datastatic reducer
const store = configureStore({
    reducer: persistReducer(persisConfigLocal, dataReducer)
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