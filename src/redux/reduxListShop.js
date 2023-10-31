import { createSlice } from '@reduxjs/toolkit'
export const redux = createSlice({
    name: 'reduxShop',
    initialState: {},
    reducers: {
        setShop: (state, action) => {
            const { name } = action.payload
            state.name = name
        },
    }
})
export const { setListShop } = redux.actions
export default redux.reducer