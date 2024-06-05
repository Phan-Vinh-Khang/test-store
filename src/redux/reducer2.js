import { createSlice } from '@reduxjs/toolkit'
const dataStateWeb = {
    checkStickyHeader: true
}
export const reducer = createSlice({
    name: 'reducerCheckStickyHeader',
    initialState: dataStateWeb,//chỉ ref dc đến obj?
    reducers: { //tuong tu action.type
        unStickyHeader: (state, action) => { //chính tên func này sẽ là type nếu như trong reducer cu
            state.checkStickyHeader = false
        },
        StickyHeader: (state) => {
            state.checkStickyHeader = true
        },
    } //export properties ref den func trong var reducer ra để sử dụng trong func dispatch
})
export const { unStickyHeader, StickyHeader } = reducer.actions
export default reducer.reducer

// function reducer(state = dataStateWeb, action) {
//     switch (action.type) {
//         case 'checkStickyHeader': {
//             if (action.data == '/detail')
//                 return {
//                     ...dataStateWeb,
//                     checkStickyHeader: false
//                 };
//             else return {
//                 ...dataStateWeb,
//                 checkStickyHeader: true
//             };
//         }
//         default:
//             return true
//     }
// }
// export default reducer;