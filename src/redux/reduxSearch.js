import { createSlice } from '@reduxjs/toolkit'
export const redux = createSlice({
    name: 'reduxSearch',
    initialState: {},
    reducers: {
        setSearch: (state, action) => {
            state.data = action.payload
        }
    }
})
export const { setSearch } = redux.actions
export default redux.reducer