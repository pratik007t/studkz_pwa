const initialState = {
    loader: false
}

function ModelLoaderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MODEL_LOADER':
            return { ...state, loader: action.payload}
        default:
            return state;
    }
}
export default ModelLoaderReducer;
