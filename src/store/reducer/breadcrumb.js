const initialState = {
    title: {},
    path: [],
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'setTitle':
            return {
                ...state,
                title: action.payload
            }
        case 'setPath':
            return {
                ...state,
                path : action.payload
            }
        default:
            return state
    }
}

export default reducer;