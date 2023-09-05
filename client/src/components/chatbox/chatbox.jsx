import React, { useState } from 'react'
import "./chatbox.css"
import Topbar from '../topbar/Topbar'
import MessageBox from '../messagebox/MessageBox'
import Login from '../login/Login'

const Chatbox = () => {

  const [user, setUser] = useState(null);

  return (
    <div className='chatboxContainer'>
        <Topbar />
      <div className="chatboxWrapper">
        {!user && <Login setUser={setUser} />}
        {user && <MessageBox user={user} />}
      </div>
    </div>
  )
}

export default Chatbox