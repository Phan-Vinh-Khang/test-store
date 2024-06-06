import { createSlice } from '@reduxjs/toolkit'
if (!sessionStorage.getItem('search')) {
    sessionStorage.setItem('search', '')
}
export const redux = createSlice({
    name: 'reduxSearch',
    initialState: sessionStorage.getItem('search'),
    reducers: {
        setSearch: (state, action) => {
            sessionStorage.setItem('search', action.payload)
            return action.payload;
        }
    }
})
export const { setSearch } = redux.actions
export default redux.reducer