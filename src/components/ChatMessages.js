import { useContext, useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { ChatContext } from "../context/ChatContext";
import { onSnapshot,doc } from "firebase/firestore";
import { db } from "../firebase";

const ChatMessages = () => {
  const {state} = useContext(ChatContext)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    };
    state.chatId && getMessages();
  }, [state.chatId]);
  return (
    <div className="chat-messages">
      {messages.map((mes) => {
        return <ChatMessage message={mes} key={mes.id}/>;
      })}
    </div>
  );
}

export default ChatMessages
