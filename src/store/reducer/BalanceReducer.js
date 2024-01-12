const initialState = {
    balance:[]
  };
  
  function BalanceReducer(state = initialState, action) {
    const { type } = action;
  
    switch (type) {
      
      case "RETRIEVE_BALANCE":
        return { ...state, balance: action.payload }
      default:
        return state;
    }
  }
  export default BalanceReducer;