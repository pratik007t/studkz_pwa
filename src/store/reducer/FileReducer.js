const initialState = {
    file:[],
    URL:[],

      };
      
      function FileReducer(state = initialState, action) {
        const { type } = action;
      
        switch (type) {
          
          case "RETRIEVE_FILE":
            return { ...state, file: action.payload }
            case "RETRIEVE_FILE_URL":
            return { ...state, URL: action.payload }

          default:
            return state;
        }
      }
      export default FileReducer;