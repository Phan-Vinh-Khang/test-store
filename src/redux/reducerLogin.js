import { createSlice } from '@reduxjs/toolkit'
export const reducer = createSlice({
    name: 'reducerDataLogin',
    initialState: {},//chỉ ref dc đến obj?
    reducers: { //tuong tu action.type
        setLoginReducer: (state, action) => {//state o function này sẽ ref vào initialState
            if (action.payload == undefined)//ko có data để ref vào thì logout
                return {}
            return { ...state, ...action.payload }//state sẽ ref vào initialState, action.payload sẽ ref vào data return từ dispatch
        },
    } //export properties ref den func trong var reducer ra để sử dụng trong func dispatch
})
export const { setLoginReducer } = reducer.actions
export default reducer.reducer