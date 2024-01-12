const initialState = {
  search: '',
  lists: [],
  is_clicked_in_like_chain : true,
  commonMainChain:[],
  previousMainChain:[],
  likeChain:[],
  result: [],
  pdf: [],
  fontSize:[],
  filter:[],
  selectedFilterItems:[],
  invoiceData:[],
  sparkFilter:[],
  selectedSparkFilterItems:[],
  setTime:[],
  support:[],
  binaryFileInfo:[],
  binaryFile:[]
};

function SearchReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "RETRIEVE_SEARCH":
      return { ...state, lists: action.payload };
    case "SEARCH_TEXT":
      return { ...state, search: action.payload };
    case "RETRIEVE_DATA":
      return { ...state, result: action.payload };
    case "RETRIEVE_DATA_BY_PDF":
      return { ...state, pdf: action.payload };
      case "FONT_SIZE":
      return { ...state, fontSize: action.payload };
      case "FILTER_DATA":
      return { ...state, filter: action.payload };
      case "SELECTED_FILTER_ITEM":
      return { ...state, selectedFilterItems: action.payload};
      case "INVOICE_DATA":
      return { ...state, invoiceData: action.payload };
      case "MAIN_CHAIN":
      return state. is_clicked_in_like_chain ?  { ...state, commonMainChain: action.payload } : state;
      case "LIKE_CHAIN":
      return { ...state, likeChain: action.payload, is_clicked_in_like_chain:false};
      case "PREVIOUS_CHAIN":
      return { ...state, previousMainChain: action.payload };
    case "SPARK_FILTER_DATA":
    return{...state, sparkFilter: action.payload}
    case "SELECTED_SPARK_FILTER_ITEM":
    return { ...state, selectedSparkFilterItems: action.payload};
    case "SUPPORT_DATA":
    return { ...state, support: action.payload};
    case "SET_TIME":
      return { ...state, setTime: action.payload};
      case "BINARY_FILE_INFO":
      return { ...state, binaryFileInfo: action.payload };
      case "BINARY_FILE":
      return { ...state, binaryFile: action.payload };
      case "CLICKED_ON_LIKE_CHAIN":
      return { ...state, is_clicked_in_like_chain: true };
    default:
      return state;
  }
}
export default SearchReducer;
