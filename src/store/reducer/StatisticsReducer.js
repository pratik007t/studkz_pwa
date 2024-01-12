const initialState = {
    statistics:[]
  };
  
  function StatisticsReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      
      case "RETRIEVE_STATISTICS":
        return { ...state, statistics: action.payload }
        case "STATISTICS_EMPTY":
        return { ...state, statistics:''}
      default:
        return state;
    }
  }
  export default StatisticsReducer;