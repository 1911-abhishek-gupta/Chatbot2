import React, { useRef, useState } from 'react'
import "./login.css";
import axios from 'axios';

const Login = ({ setUser }) => {

    const email = useRef();
    const name = useRef();
    const Department = useRef();

    const [isYes, setIsYes] = useState(null);
    const [isTrue, setIsTrue] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isYes === "yes"){
            try {
                const res = await axios.get("/login/" + email.current.value);
                setUser(res.data);
                console.log(res.data);
                setIsTrue(true);
                if (!res.data) {
                    setIsTrue(false);
                    setTimeout(() => {
                        setIsTrue(true);
                    }, 1000);
                }
            } catch (err) {
                console.log(err);
                setIsTrue(false);
                setTimeout(() => {
                    setIsTrue(true);
                }, 1000);
            }
        }else{

            const res = {
                name : name.current.value,
                department : Department.current.value,
                email : email.current.value
            }

            if(res.name === "" || res.department === "" || res.email === ""){
                setIsTrue(false)
                setTimeout(() => {
                    setIsTrue(true);
                }, 1000);
            }else{
                setUser(res);
                setIsTrue(true);
            }

        }

    }

    const handleClick = (e) => {
        setIsYes(e.target.value);
    }

    console.log(isYes);


    return (
        <div className='loginBox'>
            <div className="loginBoxWrapper">
                <div className="loginBoxTop">
                    IREPS
                    <p style={{ fontSize: "20px", marginBottom: "30px" }}>
                        Query Module
                    </p>
                </div>
                <div className="loginBoxBottom">
                    <form className='loginBoxBottom' onSubmit={handleSubmit}>
                        <div className="loginBoxBottomText">
                            <p>Do you have a user account on IREPS?</p>
                            <div className="loginBoxRadios">

                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" name="answer" value="yes" onClick={handleClick} />
                                        Yes
                                    </label>
                                    <label class="radio">
                                        <input type="radio" name="answer" value="no" onClick={handleClick} />
                                        No
                                    </label>
                                </div>


                            </div>

                        </div>

                        {
                            isYes === "yes"
                                ?
                                <div className="yes">
                                    <input type="email" placeholder='Enter Your email' className="loginBoxInput" ref={email} />
                                    {!isTrue && <div className='errMessage'>Email not registered</div>}
                                    <button className='loginBoxButton' type='submit' onClick={handleSubmit}> Login </button>
                                </div>
                                :
                                <div className="no">
                                    <input type="text" placeholder='Enter Your Name' className="loginBoxInput" ref={name} required/>
                                    <input type="Email" placeholder='Enter Your Email' className="loginBoxInput" ref={email} required/>
                                    <select name="" id="" className='loginBoxInput'  ref={Department} required>
                                        <option disabled value="" selected>Select Department</option>
                                        <option value="Vendor/Contractor/Auction Bidder">Vendor/Contractor/Auction Bidder</option>
                                        <option value="Railway/Departmental User" >Railway/Departmental User </option>
                                    </select>

                                    {!isTrue && <div className='errMessage'>Name, Department or Email missing</div>}

                                    <button className='loginBoxButton' type='submit' onClick={handleSubmit}> Login </button>
                                </div>
                        }

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login