import { createSlice } from '@reduxjs/toolkit'
if (!sessionStorage.getItem('search')) {
    sessionStorage.setItem('search', '')
}
export const redux = createSlice({
    name: 'reduxSearch',
    initialState: { data: sessionStorage.getItem('search') },
    reducers: {
        setSearch: (state, action) => {
            state.data = action.payload
            sessionStorage.setItem('search', action.payload)
        }
    }
})
export const { setSearch } = redux.actions
export default redux.reducer