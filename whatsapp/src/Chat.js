import { AttachFile, MoreVert, SearchOutlined, SettingsInputAntenna } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import './Chat.css'
import MicIcon from '@mui/icons-material/Mic';


function Chat() {
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        <p className="chat_message">
          <span className="chat_name"> Song </span>

          Hello 

          <span className="chat_timestamp">
            {new Date().toUTCString()}
          </span>
        </p>

        <p className="chat_message chat_reciever">
          <span className="chat_name"> Steven </span>

          Whats Up 

          <span className="chat_timestamp">
            {new Date().toUTCString()}
          </span>
        </p>
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input placeholder="Type a message" type="text"/>
          <button type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat