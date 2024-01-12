const initialState = {
  Added: [],
  lists :[],
  delete:[],
  data:[]
};

function FavoriteReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_FAVORITE":
      return { ...state, Added: payload };
    case "RETRIEVE_FAVORITE":
      return { ...state, lists: action.payload };
    case "DELETE_FAVORITE":
      // return { Added: [...state.Added.filter((Add) => Add !== payload)] };
      return { ...state, delete: action.payload };
    case "FAVORITE_EMPTY":
       return { ...state, lists:''}
    default:
      return state;
      case "FAVORITE_DEFAULT":
      return { ...state, data: action.payload}
  }
}
export default FavoriteReducer;
