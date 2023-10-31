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
const persisConfigLocal = {
    key: 'root',
    storage: storage,
    whitelist: [
        'dataLogged',
        // 'listOrder'//neu vay thi khi thuc thi /product roi mo lai tab /checkout se err
        // /product state redux se la dang object ko phai arr ohject va propertie la product ko phai listproduct, neu thuc thi /checkout se err
    ],
}
const persisConfigSession = {
    key: 'root',
    storage: sessionStorage,
    stateReconciler: autoMergeLevel2,
    whitelist: [
        'listOrder'
    ],
}
let dataReducer = combineReducers({
    checkStickyHeader: reducer,
    changeLabelLogin: reducerChangeLabelLogin,
    dataLogged: persistReducer(persisConfigLocal, reduxLogin),
    listOrder: persistReducer(persisConfigSession, reduxOrder)
})//obj datastatic reducer
const store = configureStore({
    reducer: dataReducer
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