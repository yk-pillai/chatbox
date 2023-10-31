import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const ChatMessage = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { state } = useContext(ChatContext);
  const scroll = useRef();

  useEffect(()=>{
    scroll.current.scrollIntoView();
  },[message])

  const timeAgo = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Note: Month is 0-indexed, so we add 1
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

    return {
      time: `${hours}:${minutes}`,
      date: `${day}/${month}/${year}`
    }
  };
  return (
    <div
    ref={scroll}
      className={
        "message-wrapper" + (currentUser.uid === message.owner ? " owner" : "")
      }
    >
      <div className="message-sender">
        <img
          src={
            currentUser.uid === message.owner
              ? currentUser.photoURL
              : state.user.photoURL
          }
          alt="chat"
        ></img>
        <span className="message-time">{timeAgo(message.time).date}</span>
      </div>
      <div className="message-text">
        <p>{message.message}</p>
        <div className="time">{timeAgo(message.time).time}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
