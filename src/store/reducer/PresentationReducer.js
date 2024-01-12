const initialState = {
    presentation:[]
      };
      
      function PresentationReducer(state = initialState, action) {
        const { type } = action;
      
        switch (type) {
          
          case "RETRIEVE_PRESENTATION":
            return { ...state, presentation: action.payload }
            case "PRESENTATION_EMPTY":
        return { ...state, presentation:''}
          default:
            return state;
        }
      }
      export default PresentationReducer;