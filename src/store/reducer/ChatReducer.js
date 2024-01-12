const initialState = {
  chatList: [],
  conversation: [],
  send: [],
  topUser: [],
  chatURL: [],
  deleteChat: [],
  archiveChat: [],
  archiveList: [],
  restore: [],
  selectedData: [],
  userProfile: [],
  deletedMsg: [],
  FileManager: [],
  reply: [],
  message: [],
  image_path: [],
  readMessage: [],
  profile: null,
  isLoading: false,
  updateData: [],
  conversationUserId: false,
  lastSeen:[],
  chatDot:[]


};

function ChatReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "CHAT_LIST":
      return { ...state, chatList: action.payload };
    case "A_CHAT_LIST":
      return { ...state, chatList: {...state.chatList, aChatList : action.payload } };
    case "CHAT_CONVERSATION_LIST":
      return { ...state, conversation: action.payload };
    case "SEND_MSG":
      return { ...state, send: action.payload };
    case "TOP_UP_LIST":
      return { ...state, topUser: action.payload };
    case "RETRIEVE_CHAT_FILE_URL":
      return { ...state, chatURL: action.payload };
    case "DELETE_CHAT":
      return { ...state, deleteChat: action.payload };
    case "ARCHIVE_LIST":
      return { ...state, archiveList: action.payload };
    case "RESTORE":
      return { ...state, restore: action.payload };
    case "SELECTED_MESSAGE":
      return { ...state, selectedData: action.payload };
    case "REPLY_MESSAGE":
      return { ...state, reply: action.payload };
    case "USER_PROFILE":
      return { ...state, userProfile: action.payload };
    case "DELETE_MESSAGE":
      return { ...state, deletedMsg: action.payload };
    case "FILE_MANAGER":
      return { ...state, FileManager: action.payload };
    case "MESSAGE_RESPONSE1":
      const data = {
        ...state?.conversation,
        aChatOpen: [...state?.conversation?.aChatOpen, action.payload],
      };
      return { ...state, conversation: data };

    case "MESSAGE_RESPONSE":
      // Create a copy of the conversation object from the current state
      const updatedConversation = { ...state?.conversation };
    
      // Check if there is an object with msgId "test" in the conversation
      const testMsgIndex = updatedConversation.aChatOpen.findIndex(
        (msg) => msg.msgID === "test"
      );
    
      // console.log({testMsgIndex});
      if (testMsgIndex !== -1) {
        // If a message with msgId "test" exists, replace it with the new object
        updatedConversation.aChatOpen[testMsgIndex] = action.payload;
      } else {
        // If there is no message with msgId "test", add the new message to the aChatOpen array
        updatedConversation.aChatOpen.push(action.payload);
      }
    
      // Return a new state object with the updated conversation
      return { ...state, conversation: updatedConversation };

    case "MESSAGE_READ_RESPONSE":
      const updatedArr = state?.conversation?.aChatOpen?.map((obj) =>
        obj.msgID === action.payload?.msgID ? { ...obj, isReaded: "1" } : obj
      );
      return {
        ...state,
        conversation: { ...state?.conversation, aChatOpen: updatedArr },
      };
    case "MESSAGE_READ_RESPONSE_FOR_ALL":
      const updatedData = state?.conversation?.aChatOpen?.map((obj) => ({
        ...obj,
        isReaded: "1",
      }));
      return {
        ...state,
        conversation: { ...state?.conversation, aChatOpen: updatedData },
      };
    case "RETRIEVE_RESPONSE_IMAGE_PATH":
      return { ...state, image_path: action.payload };
    case "READ_MESSAGE":
      return { ...state, readMessage: action.payload };
    case "CONVERSATION_OPEN":
      return { ...state, conversationUserId: action.payload.userId };
    case "CONVERSATION_CLOSE":
      return { ...state, conversationUserId: false };
      case "LAST_SEEN":
      return { ...state, lastSeen: action.payload  };
      case "CHAT_DOT":
      return { ...state, chatDot: action.payload  };

 
      

    default:
      return state;
  }
}
export default ChatReducer;
