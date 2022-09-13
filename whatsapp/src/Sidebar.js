import React from 'react'
import "./Sidebar.css"
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar, IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from "@mui/icons-material"
import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebar_header">
          <Avatar src='https://as1.ftcdn.net/v2/jpg/02/85/47/64/1000_F_285476473_CKbQ386Hc3HWzJ0Rdda9wNBoWID1EkzH.jpg'/> 
          <div className="sidebar_headerRight">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="sidebar_search">
          <div className="sidebar_searchContainer">
            <SearchOutlined />
            <input placeholder="Search or start new chat" type="text" />
          </div>
        </div>
        <div className="sidebar_chats">
          <SidebarChat />
        </div>
    </div>
  )
}

export default Sidebar