import { createSlice } from '@reduxjs/toolkit'
if (!sessionStorage.getItem('listOrder')) {
    sessionStorage.setItem('listOrder', JSON.stringify({ listOrder: [] }))
}
export const redux = createSlice({
    name: 'reduxListOrder',
    initialState: JSON.parse(sessionStorage.getItem('listOrder')),
    reducers: { //1  object de ref vao init
        setlistOrder: (state, action) => {
            sessionStorage.setItem('listOrder', JSON.stringify({ listOrder: action.payload }))
            return action.payload;
        }
    }
})
export const { setlistOrder } = redux.actions
export default redux.reducer