import { createSlice } from '@reduxjs/toolkit'
const initstate = {
    input: {
        email: undefined,
        password: undefined
    },
    dataUser: {
        id: undefined,
        name: undefined
    }
};
const rootReducer = (state = initstate, action) => {
    console.log('test: ', state, action)
    switch (action.type) {
        case 'login':
            return {
                ...state,
                dataUser: {
                    id: action.data.id,
                    name: action.data.name
                }
            }
        case 'loginInput/email':
            return {
                ...state,
                input: {
                    ...state.input,
                    email: action.data
                }
            }
        case 'loginInput/password':
            return {
                ...state,
                input: {
                    ...state.input,
                    password: action.data
                }
            }
        default:
            return state;
    }
}
export default rootReducer