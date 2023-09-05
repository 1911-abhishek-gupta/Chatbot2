import React, { useEffect, useRef } from 'react'
import "./message.css";
import data from '../../data';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


const Message = ({message,setOption,setMessages,setQuery,query}) => {

  const scrollRef= useRef();

  const handleClick  = (e) =>{

    if(e.target.value !== "Submit"){
      setQuery(query + "," + e.target.value);
    }

    if(data.includes(e.target.value)){
      setOption("description");
    }
else{
  setOption(e.target.value);
}


    const message = {
      message : e.target.value,
      own: true,
    }

    setMessages((prev) => [...prev,message]);

  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
}, [message])


  return (
    
    <div className={message.own?"message own":"message"}>
    <div className="messageWrapper" ref={scrollRef}>
        <div className="messageTop">
            <img className='messageAvatar' src={message.own?"../../assets/noAvatar.png":"../../assets/indianrailwayslogo.png"} alt="" />
            <div className="messageTop2">
            
            <p className='messageText'>{message.file?<div className='pdf'><PictureAsPdfIcon/>{message.file}</div>:message.message}</p>
            
            </div>
        </div>
            <div className="messageBottom">
              <div className="option">
                {message.options?.map(o=>{
                  return(
                    <a href={message.link} target='_blank' rel='noreferrer'>
                    <button className='messageOption'  value={o} onClick={handleClick}>
                    {o}
                    </button>
                    </a>
                  )
                })}
              </div>
            </div>
    </div>
 </div> 

  )
}

export default Message