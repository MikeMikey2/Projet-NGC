import React, { useState } from "react"
import './Dashboard.css'

const Dashboard = ()=>{
    return(
        <div className="title">
            <div><h1>Dashboard</h1>
             <button className="button">Logout</button>
            </div>
            <div className="content">
                <div className="card">18</div>
                <div className="card">7</div>
                <div className="card">42</div>
                <div className="card">1.8j</div>
            </div>
        </div>
    )
}
export default Dashboard;