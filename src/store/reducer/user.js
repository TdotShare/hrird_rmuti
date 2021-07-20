const initialState = {
    data: {},
    authenticate: false,
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'addUser':
            return {
                ...state,
                data: action.payload
            }
        case 'deleteUser':
            return {
                ...state,
                data: {}
            }
        case 'loginAuth':
            return {
                ...state,
                authenticate: true
            }
        case 'logoutAuth':
            return {
                ...state,
                authenticate: false
            }
        default:
            return state
    }
}

export default reducer;