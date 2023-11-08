import { createSlice } from '@reduxjs/toolkit'
export const redux = createSlice({
    name: 'reduxPages',
    initialState: {},
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        }
    }
})
export const { setPage } = redux.actions
export default redux.reducer