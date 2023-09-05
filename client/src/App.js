import React from 'react';
import './App.css';
import Chatbox from './components/chatbox/chatbox';
import MessageIcon from '@mui/icons-material/Message';

import { useState } from 'react';

function App() {

  const [toggle,setToggle] = useState(false);

  return (
    <div className="App">
  
    { toggle && <Chatbox/>}

    <div className="chatboxToggler" onClick={() => setToggle(!toggle) }>
      <div className="chatboxButton">
          <MessageIcon/>
      </div>
    </div>
   
    </div>
  );
}

export default App;
//https://colorhunt.co/palette/f6f4eb91c8e4749bc24682a9