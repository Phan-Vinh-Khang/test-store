import { createSlice } from '@reduxjs/toolkit'
const dataLogin = {}//1 obj chưa có var properties nếu muốn thêm 1 proeprties cho obj ref vào obj đó và su dung .varproperties sẽ tự thêm varproperties cho obj
//obj.name sẽ thêm 1 var properties cho obj
export const reducer = createSlice({
    name: 'reducerDataLogin',
    initialState: dataLogin,//chỉ ref dc đến obj?
    reducers: { //tuong tu action.type
        setLoginReducer: (state, action) => { //chính tên func này sẽ là type nếu như trong reducer cu
            if (action.payload == undefined)//ko có data để ref vào thì logout
                return {}
            const {//nếu có data để ref vào thì login
                name,
                email,
                avatar,
                adress,
            } = action.payload //var obj sẽ ref vào datastatic obj và các varproperties trong varobj sẽ tìm các varproperties trong datastatic tương úng để ref vào, nếu varproperties trong varobj ko tìm thấy varproperties trong obj datastatic tuong ung sẽ ref vào undefine
            state.name = name
            state.email = email
            state.avatar = avatar
            state.adress = adress
        },
    } //export properties ref den func trong var reducer ra để sử dụng trong func dispatch
})
export const { setLoginReducer, setLogoutReducer } = reducer.actions
export default reducer.reducer