import { createSlice } from '@reduxjs/toolkit'
const dataLabel = {
    dataLabel: true
}
export const reducer = createSlice({
    name: 'reducerDataLabel',
    initialState: dataLabel,//chỉ ref dc đến obj?
    reducers: { //tuong tu action.type
        changeLabelReducer: (state) => { //chính tên func này sẽ là type nếu như trong reducer cu
            state.dataLabel = !state.dataLabel
        },
    } //export properties ref den func trong var reducer ra để sử dụng trong func dispatch
})
export const { changeLabelReducer } = reducer.actions
export default reducer.reducer