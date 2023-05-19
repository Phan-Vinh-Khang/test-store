const dataStateWeb = {
    checkStickyHeader: true
}
function reducer(state = dataStateWeb, action) {
    switch (action.type) {
        case 'checkStickyHeader': {
            if (action.data == '/detail')
                return {
                    ...dataStateWeb,
                    checkStickyHeader: false
                };
            else return {
                ...dataStateWeb,
                checkStickyHeader: true
            };
        }
        default:
            return true
    }
}
export default reducer;