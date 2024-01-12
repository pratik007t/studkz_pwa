const initialState = {
    expand: '',
    imageLoader: false
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_EXPAND':
            return { ...state, expand: action.expand }
        case 'SET_IMAGE_LOADER':
            return { ...state, imageLoader: action.imageLoader }
        default:
            return state;
    }
}

export default userReducer;
