const initialState = {
    board:[]
      };
      
      function BoardReducer(state = initialState, action) {
        const { type } = action;
      
        switch (type) {
          
          case "RETRIEVE_BOARD":
            return { ...state, board: action.payload }
          default:
            return state;
        }
      }
      export default BoardReducer;