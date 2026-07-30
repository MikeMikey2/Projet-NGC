import React, { useState } from "react"
import './loginSignUp.css'
import user_icon from '../Assets/user.jpeg'    
import password_icon from '../Assets/password.png'
import email_icon from '../Assets/email.png'

const loginSignUp = ()=>{
    const[action, setAction] = useState("signup")
    
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
            <div className="input">
                <img src={email_icon} alt="" className="user_icon"/>
                <input type="text" placeholder="Enter your email"/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" className="user_icon"/>
                <input type="password" placeholder="Password"/>
            </div>
        </div>
        <div className="forgot-password">Lost password?<span>Click here !</span></div>
        <div className="submit-container">
            <div className="submit">SignUp</div>
            <div className="submit">Login</div>
        </div>
    </div>
)
}
export default loginSignUp;