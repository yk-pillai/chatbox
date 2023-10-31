import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    chatId: null,
    user: {}
  }
  const { currentUser } = useContext(AuthContext);
  const ChatReducer = (state, action) => {
    switch(action.type){
      case "CHANGE_USER":
        return{
          user: action.payload,
          chatId: (currentUser.uid>action.payload.uid)? currentUser.uid+action.payload.uid:action.payload.uid+currentUser.uid
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(ChatReducer, INITIAL_STATE)
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
