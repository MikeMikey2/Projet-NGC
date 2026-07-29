import React, { useState } from "react"
import '.loginSignUp.css'
import user_icon from '../Assets/user.png'
import password_icon from '../Assets/password.png'
import email_icon from '../Assets/email.png'

const loginSignUp = ()=>{
return(
    <div className="container">
        <div className="header">
           <div className="text">SignUp</div>  
           <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="" className="user_icon"/>
                <input type="text" placeholder="Username"/>
            </div>
            <div className="email">
                <img src={email_icon} alt="" className="user_icon"/>
                <input type="text" placeholder="Email"/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" className="user_icon"/>
                <input type="password" placeholder="Password"/>
            </div>
        </div>
    </div>
)
}