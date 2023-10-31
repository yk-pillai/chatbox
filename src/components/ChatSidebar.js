import React from 'react'
import ChatNavbar from './ChatNavbar'
import ChatUserSearch from './ChatUserSearch'
import ChatUserList from './ChatUserList'

const ChatSidebar = () => {
  return (
    <div className='chat-sidebar'>
      <ChatNavbar/>
      <ChatUserSearch/>
      <ChatUserList/>
    </div>
  )
}

export default ChatSidebar
