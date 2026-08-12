import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './loginSignUp.css'
import user_icon from '../Assets/user.png'    
import password_icon from '../Assets/password.png'
import email_icon from '../Assets/email.png'

interface RoleOption {
  idRole: number;
  nomRole: string;
}

const LoginSignUp = () => {
  const [action, setAction] = useState("signup")
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [nom, setNom] = useState("")
  const [roles, setRoles] = useState<RoleOption[]>([])
  const [roleId, setRoleId] = useState("")
  const [erreur, setErreur] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:8080/api/roles")
      .then(res => res.json())
      .then(data => {
        // Sécurité : s'assurer que data est bien un tableau avant de mettre à jour le state
        if (Array.isArray(data)) {
          setRoles(data)
        } else {
          setRoles([])
        }
      })
      .catch(() => setRoles([]));
  }, []);

  const handleLogin = () => {
    setErreur("")
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, motDePasse })
    })
      .then(res => res.text())
      .then(reponse => {
        if (reponse === "Connexion réussie") {
          navigate("/dashboard")
        } else {
          setErreur(reponse)
        }
      })
      .catch(() => setErreur("Erreur de connexion au serveur"))
  }

  const handleRegister = () => {
    setErreur("")
    setMessage("")
    fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom: nom, email, motDePasse, roleId: Number(roleId) })
    })
      .then(res => res.text())
      .then(reponse => {
        if (reponse === "Inscription réussie") {
          setMessage("Compte créé ! Vous pouvez vous connecter.")
          setAction("login")
        } else {
          setErreur(reponse)
        }
      })
      .catch(() => setErreur("Erreur de connexion au serveur"))
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>  
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "login" ? null : (
          <>
            <div className="input">
              <img src={user_icon} alt="" className="user_icon"/>
              <input type="text" placeholder="Username" value={nom} onChange={e => setNom(e.target.value)} />
            </div>
            <div className="input">
              <select value={roleId} onChange={e => setRoleId(e.target.value)}>
                <option value="">Choisir un rôle</option>
                {Array.isArray(roles) && roles.map(r => (
                  <option key={r.idRole} value={r.idRole}>{r.nomRole}</option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="input">
          <img src={email_icon} alt="" className="user_icon"/>
          <input type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" className="user_icon"/>
          <input type="password" placeholder="Password" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />
        </div>
      </div>
      {erreur && <div style={{ color: "red", marginTop: "10px" }}>{erreur}</div>}
      {message && <div style={{ color: "green", marginTop: "10px" }}>{message}</div>}
      {action === "signup" ? null : <div className="forgot-password">Lost password? <span>Click here !</span></div>}
      <div className="submit-container">
        <div className={action === "login" ? "submit gray" : "submit"} onClick={() => setAction("signup")}>SignUp</div>
        <div className={action === "signup" ? "submit gray" : "submit"} onClick={() => setAction("login")}>Login</div>
      </div>
      <div className="submit-container" style={{ marginTop: "15px" }}>
        {action === "login"
          ? <div className="submit" onClick={handleLogin}>Access</div>
          : <div className="submit" onClick={handleRegister}>Send</div>}
      </div>
    </div>
  )
}

export default LoginSignUp;