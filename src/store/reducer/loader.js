const initialState = {
    loader: false
}

function LoaderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LOADER':
            return { ...state, loader: action.payload}
        default:
            return state;
    }
}
export default LoaderReducer;
