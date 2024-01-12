const initialState = {
    bought:[]
  };
  
  function BoughtReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      
      case "RETRIEVE_BOUGHT":
        return { ...state, bought: action.payload }
        case "BOUGHT_EMPTY":
        return { ...state, bought:''}

      default:
        return state;
    }
  }
  export default BoughtReducer;