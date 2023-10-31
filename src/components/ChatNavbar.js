import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const ChatNavbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="chat-navbar">
      <span className="logo">Yk Chat</span>
      <div className="user-profile">
        <img src={currentUser.photoURL} alt='profile'></img>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  );
}

export default ChatNavbar
