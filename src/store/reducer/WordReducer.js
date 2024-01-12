const initialState = {
word:[],
edit:""
  };
  
  function WordReducer(state = initialState, action) {
    const { type } = action;
  
    switch (type) {
      
      case "RETRIEVE_WORD":
        return { ...state, word: action.payload }
      case "EDIT_WORD":
        return { ...state, edit: action.payload }
        case "WORD_EMPTY":
        return { ...state, word:''}
      default:
        return state;
    }
  }
  export default WordReducer;