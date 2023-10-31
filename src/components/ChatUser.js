import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatUser = ({ userInfo, date }) => {
  const { dispatch } = useContext(ChatContext);

  const handleSelect = () => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div className="chat-user" onClick={() => handleSelect()}>
      <img src={userInfo.photoURL} alt="user"></img>
      <div className="user-info">
        <span className="user-name">{userInfo.displayName}</span>
        <p className="user-last-message">{userInfo.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatUser;
