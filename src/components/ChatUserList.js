import React, { useEffect, useState } from 'react'
import ChatUser from './ChatUser';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from '../firebase';

const ChatUserList = () => {
  const {currentUser} = useContext(AuthContext);
  const [userChats, setUserChats] = useState();

  useEffect(()=>{
    const getUsersList = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setUserChats(doc.data());
      });
      return () => {
        unsub();
      };
    }
    currentUser.uid && getUsersList()
  },[currentUser.uid])
  return (
    <div className="users-list-wrapper">
      {userChats &&
        Object.entries(userChats).map((chat) => {
          return <ChatUser key={chat[0]} {...chat[1]} />;
        })}
    </div>
  );
}

export default ChatUserList
