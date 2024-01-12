const initialState = {
  create: [],
  list: [],
  delete: [],
  download: [],
  getById: [],
  buttonEvent: false,
  ArrowButtonEvent: false,
  NavigateEvent: false,
  Bold: false,
  Italic: false,
  Underline: false,
  selectedText:[]
};

function NoteReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case "NOTE_CREATE":
      return { ...state, create: action.payload };
    case "NOTE_LIST":
      return { ...state, list: action.payload };
    case "DELETE_NOTE_ID":
      return { ...state, delete: action.payload };
    case "NOTE_DOWNLOAD":
      return { ...state, download: action.payload };
    case "NOTE_GET_BY_ID":
      return { ...state, getById: action.payload };
    case "NOTE_SAVE":
      return { ...state, saved: action.payload };
    case "NOTE_BOOLEAN":
      return { ...state, buttonEvent: action.payload };
    case "NOTE_ARROW_BOOLEAN":
      return { ...state, ArrowButtonEvent: action.payload };
    case "NOTE_NAVIGATE":
      return { ...state, NavigateEvent: action.payload };
    case "NOTE_BOLD":
      return { ...state, Bold: action.payload };
    case "NOTE_ITALIC":
      return { ...state, Italic: action.payload };
    case "NOTE_UNDERLINE":
      return { ...state, Underline: action.payload };
      case "NOTE_SELECTED":
      return { ...state, selectedText: action.payload };

    default:
      return state;
  }
}
export default NoteReducer;
