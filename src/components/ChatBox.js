import React from 'react'
import Chat from './Chat'
import ChatSidebar from './ChatSidebar'

const ChatBox = () => {
  return (
    <div className='chatbox-container'>
      <div className='chatbox-wrapper'>
        <ChatSidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default ChatBox
