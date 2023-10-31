import Threedot from "../images/more.png"
import VideoCam from "../images/cam.png"
import AddUser from "../images/add.png"
import Attach from "../images/attach.png"
import Document from "../images/img.png"
import ChatMessages from "./ChatMessages"
import { useContext, useState } from "react"
import { ChatContext } from "../context/ChatContext"
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext"
import { v4 as uuid } from "uuid";
import ChatDashboard from "./ChatDashboard"

const Chat = () => {
  const {state} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);
  const [chatInput, setChatInput] = useState("");

  const handleChatSubmit = async () => {
    setChatInput("");
    await updateDoc(doc(db, "chats", state.chatId), {
      messages: arrayUnion({
        id: uuid(),
        owner: currentUser.uid,
        message: chatInput,
        time: Timestamp.now().seconds,
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [state.chatId + ".userInfo.lastMessage"]: chatInput,
      [state.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", state.user.uid), {
      [state.chatId + ".userInfo.lastMessage"]: chatInput,
      [state.chatId + ".date"]: serverTimestamp(),
    });
  }
  if(!state.chatId) return <ChatDashboard/>
  return (
    <div className="chat">
      <div className="chat-nav">
        <span className="chat-name">{state.user.displayName}</span>
        <div className="chat-icons">
          <img src={VideoCam} alt="video"></img>
          <img src={AddUser} alt="add-user"></img>
          <img src={Threedot} alt="options"></img>
        </div>
      </div>
      <ChatMessages/>
      <div className="chat-input">
        <input type="text" placeholder="Type something..." onChange={(e)=>setChatInput(e.target.value)} value={chatInput}></input>
        <div className="input-utility">
          <img src={Attach} alt="attach"></img>
          <img src={Document} alt="document"></img>
          <button onClick={()=>handleChatSubmit()}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat
