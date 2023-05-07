const initstate = {
    id: undefined,
    name: undefined
};
const rootReducer = (state = initstate, action) => {
    console.log('test: ', state, action)
    switch (action.type) {
        case 'login':
            return {
                id: action.data.id,
                name: action.data.name //useSelector sẽ return obj ở đây
            }
        default:
            return state;
    }
}
export default rootReducer