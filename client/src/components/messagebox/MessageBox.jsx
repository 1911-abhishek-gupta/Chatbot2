import React, { useEffect, useRef, useState } from 'react'
import "./messageBox.css"
import Message from '../message/Message'
import axios from "axios"

import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';

const MessageBox = ({ user }) => {

    const [messages, setMessages] = useState([]);
    const [option, setOption] = useState("module");
    const [file, setFile] = useState(null);
    const [queryFile,setQueryFile] = useState(null);
    const desc = useRef();
    const [query, setQuery] = useState("");

 
        const user_query = {
            name: user.name,
            department: user.department,
            email: user.email,
            query_: "",
            desc: null,
            file: ""
        }



    useEffect(() => {
        const message = {
            message: "Welcome " + user.name,
        }

        setMessages(prev => [...prev, message]);
    }, [user])
    
    useEffect(() => {

        const fetchMessage = async () => {

            if (option === "Submit") {

                user_query.query_ = query;
                user_query.desc = desc.current.value;

                if(queryFile){
                    user_query.file = queryFile.name;
                }

                console.log(user_query);

                try{

                    const res = await axios.post("/messages/query/submit",user_query);
                    console.log(res.data);
                    
                    const message = {
                        message: "Your query is submitted succesfully and you query id = " + res.data.q_id,
                    }

                    setMessages(prev => [...prev, message]);


                }catch(err){
                    console.log(err);
                    setOption("notSubmit");

                }

            } else {

                try {
                    const res = await axios.get("/messages/" + option);
                    console.log(res.data);
                    if (res.data) {
                        setMessages(prev => [...prev, res.data]);
                    }
                    else {
                        const message = {
                            message: "Sorry no information regarding this right now",
                        }

                        setMessages(prev => [...prev, message]);

                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }

        fetchMessage();
    }, [option])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMessage = {
            own: true,
            message: desc.current.value,
        }

        if (file) {
            newMessage.file = file.name;
            console.log(file);
        }

        setMessages((prev) => [...prev, newMessage]);
        

        setFile(null);
        setOption("submit1")
    }


    return (
        <div className='messageBox'>
            <div className="messageBoxWrapper">
                <div className="messageBoxTop">
                    <div >
                        {messages.map(message => (
                            message && <Message message={message} setOption={setOption} setMessages={setMessages} setQuery ={setQuery} query={query}/>
                        ))
                        }

                    </div>
                </div>
            </div>
            {file && (
                <div className="shareImgContainer">
                    <iframe src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <CancelIcon className='shareCancel' onClick={() => setFile(null)} />
                </div>
            )}

            <hr />


            <form className="messageBoxBottom" onSubmit={handleSubmit}>
                <textarea className='chatMessageInput' placeholder='Query Description ...' ref={desc} ></textarea>
                <label htmlFor='file' className='chatSubmitShare'>
                    <AttachFileIcon className='shareIcon' />
                </label>
                <button className="chatSubmitButton" type='submit'>Send</button>
                <input style={{ display: "none" }} type='file' id="file" accept='.pdf' onChange={(e) =>{

                    console.log(e.target.files);

                    setFile(e.target.files[0]);
                    setQueryFile(e.target.files[0]);
                }
                } />
            </form>
        </div>
    )
}

export default MessageBox