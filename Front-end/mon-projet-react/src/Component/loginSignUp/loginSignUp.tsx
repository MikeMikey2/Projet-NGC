import React, { useEffect, useState } from "react"
import './loginSignUp.css'
import user_icon from '../Assets/user.png'    
import password_icon from '../Assets/password.png'
import email_icon from '../Assets/email.png'

const loginSignUp = ()=>{
    const[action, setAction] = useState("signup")
    useEffect(() => {
  fetch("http://localhost:8080/hello")
    .then(res => res.text())
    .then(data => console.log(data));
}, []);
return(
    <div className="container">
        <div className="header">
           <div className="text">{action}</div>  
           <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="login" ? <div></div> :<div className="input">
                <img src={user_icon} alt="" className="user_icon"/>
                <input type="text" placeholder="Username"/>
            </div>}
            
            <div className="input">
                <img src={email_icon} alt="" className="user_icon"/>
                <input type="text" placeholder="Enter your email"/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" className="user_icon"/>
                <input type="password" placeholder="Password"/>
            </div>
        </div>
        {action==="signup" ? <div></div> :<div className="forgot-password">Lost password?<span>Click here !</span></div>}
        
        <div className="submit-container">
            <div className={action==="login" ? "submit gray" : "submit"} onClick={()=>{setAction("signup")}}>SignUp</div>
            <div className={action==="signup" ? "submit gray" : "submit"} onClick={()=>{setAction("login")}}>Login</div>
        </div>
    </div>
)
}
export default loginSignUp;