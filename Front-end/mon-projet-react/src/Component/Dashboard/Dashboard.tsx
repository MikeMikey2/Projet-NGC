import React, { useState } from "react";
import './Dashboard.css';
import sidebar_icon from '../Assets/sidebard.png';

const Dashboard = () => {
    // 1. Inversion de l'état pour pouvoir ouvrir ET fermer
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-gray-100 h-screen">
           {/* Sidebar corrigée avec les espaces et "lg:" */}
            <div className={`fixed bg-white w-64 h-screen shadow-md transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} lg:translate-x-0 lg:static`}>
                {/* Optionnel : Un bouton à l'intérieur pour fermer sur mobile */}
                <button className="p-4 lg:hidden" onClick={() => setSidebarOpen(false)}>Fermer</button>
            </div>

           {/* Main content */}
           <main className="flex-1 p-4">
            <header className="bg-white p-4 flex justify-between items-center shadow-md"> 
               {/* 2. Utilisation d'une fonction toggle (!sidebarOpen) */}
               <button className="p-2 text-xl font-bold" onClick={() => setSidebarOpen(true)}>
                  <img src={sidebar_icon} alt="Sidebar" />
               </button>
               <h1 className="text-2xl font-bold">Dashboard</h1>
               <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
            </header>
           </main>
        </div>
    );
};

export default Dashboard;
