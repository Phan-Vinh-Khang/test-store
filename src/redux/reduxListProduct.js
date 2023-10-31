import { createSlice } from '@reduxjs/toolkit'
export const redux = createSlice({
    name: 'reduxProduct',
    initialState: {},
    reducers: {
        setDataProduct: (state, action) => {
            state.product = action.payload
        },
    }
})
export const { setListProduct } = redux.actions
export default redux.reducer