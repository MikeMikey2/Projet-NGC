    import React, { useState } from "react";
    import './Dashboard.css';
    import sidebar_icon from '../Assets/sidebard.png';
    import moon_icon from '../Assets/moon.png';
    import sun_icon from '../Assets/sun.png';
    import * as Icons from "lucide-react";

    const Dashboard = () => {
        // 1. Inversion de l'état pour pouvoir ouvrir ET fermer
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const navItems = [
            { name: "Dashboard", icon: Icons.Home },
            { name: "My projects", icon: Icons.FolderOpen },
            { name: "Free projects", icon: Icons.Gift },
            { name: "Users", icon: Icons.Users },
            { name: "Document", icon: Icons.FileText },
            { name: "Settings", icon: Icons.Settings }
        ]
        const[darkmode, setDarkmode] = useState(false)

        return (
            <div className="flex bg-gray-100 h-screen">
            {/* Sidebar corrigée avec les espaces et "lg:" */}
            <div className={`fixed bg-white w-64 h-screen shadow-md transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
                   <div className="p-4 flex justify-between items-center">
                       <div className="text-xl font-bold">logo</div>
                          <button onClick={() => setSidebarOpen(false)}>X</button>
                       </div>
                        <button className="p-4" onClick={() => setSidebarOpen(false)}>Fermer</button>

            {/* La navbar déplacée ICI, à l'intérieur de la sidebar */}
                <ul className="p-4 space-y-2">
                   {navItems.map(({ name, icon: Icon }) => (
                  <li key={name} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span>{name}</span>
                  </li>
                    ))}
                </ul>
            </div>
                    {/*Darkmode button*/}
                       {darkmode?( <button className="p-2 bg-black self-start " onClick={()=>setDarkmode(false)}><img src={sun_icon} alt="Sun" className="img"/></button> )

                       :(<button className="p-2 bg-black self-start" onClick={()=>setDarkmode(true)}><img src={moon_icon} alt="Moon" className="img"/></button> 
                        
                       )}
            {/* Main content */}
            <main className="flex-1 p-4">
                <header className="bg-white p-4 flex justify-between items-center shadow-md"> 
                {/* 2. Utilisation d'une fonction toggle (!sidebarOpen) */}
                <button className="p-2 text-xl font-bold" onClick={() => setSidebarOpen(true)}>
                    <img src={sidebar_icon} alt="Sidebar" className="img" />
                </button>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                </header>
            </main>
            </div>
        );
    };

    export default Dashboard;
