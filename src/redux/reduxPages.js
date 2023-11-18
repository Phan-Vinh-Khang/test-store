import { createSlice } from '@reduxjs/toolkit'
if (!sessionStorage.getItem('page')) {
    sessionStorage.setItem('page', 1)
}
export const redux = createSlice({
    name: 'reduxPages',
    initialState: { page: sessionStorage.getItem('page') },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
            sessionStorage.setItem('page', action.payload)
        }
    }
})
export const { setPage } = redux.actions
export default redux.reducer