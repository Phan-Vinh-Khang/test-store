import { createSlice } from '@reduxjs/toolkit'
export const redux = createSlice({
    name: 'reduxListOrder',
    initialState: { listOrder: [{ shop: {} }] },
    reducers: {
        setlistOrder: (state, action) => {
            state.listOrder = action.payload
        }
    }
})
export const { setlistOrder } = redux.actions
export default redux.reducer