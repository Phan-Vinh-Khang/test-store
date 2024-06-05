import { createSlice } from '@reduxjs/toolkit'
export const reducer = createSlice({
    name: 'reducerDataLogin',
    initialState: {},//chỉ ref dc đến obj?
    reducers: { //tuong tu action.type
        setLoginReducer: (state, action) => {//state o function này sẽ ref vào initialState
            if (action.payload == undefined)//ko có data để ref vào thì logout
                return {}

            // Object.assign(state, action.payload)//gán data vào state
            state = { ...action.payload }
            console.log(state);

            return state;
        },
    } //export properties ref den func trong var reducer ra để sử dụng trong func dispatch
})
export const { setLoginReducer } = reducer.actions
export default reducer.reducer