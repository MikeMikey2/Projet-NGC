    import React, { useState } from "react"
    import { useNavigate } from "react-router-dom"
    import './Dashboard.css';
    import sidebar_icon from '../Assets/sidebard.png';
    import moon_icon from '../Assets/moon.png';
    import sun_icon from '../Assets/sun.png';
    import * as Icons from "lucide-react";
/**
 *
 *
 * @return {*} 
 */
interface NavItem {
          name: string;
          icon: Icons.LucideIcon;
          path: string;
        }
const navItems: NavItem[] = [
            { name: "Dashboard", icon: Icons.Home, path: "/dashboard" },
            { name: "My projects", icon: Icons.FolderOpen, path: "/my-projects" },
            { name: "Free projects", icon: Icons.Gift, path: "/free-projects" },
            { name: "Users", icon: Icons.Users, path: "/users" },
            { name: "Document", icon: Icons.FileText, path: "/document" },
            { name: "Settings", icon: Icons.Settings, path: "/settings" }
    ]   
const Dashboard = () => {
        // 1. Inversion de l'état pour pouvoir ouvrir ET fermer
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const[darkmode, setDarkmode] = useState(false)
        //navigation
        const navigate = useNavigate()
        // Définition de l'interface pour les items du menu
        

        const handlenavigation = (path: string) => {
            setSidebarOpen(false); // Fermer la sidebar lors de la navigation
            navigate(path);
        }   
        return (
            <div className={"flex bg-gray-100 h-screen " + (darkmode ? "dark" : "") + " dark:bg-gray-900"}>
            {/* Sidebar corrigée avec les espaces et "lg:" */}
            <div className={`fixed bg-white w-64 h-screen shadow-md transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} dark:bg-gray-900`}>
                   <div className="p-4 flex justify-between items-center">
                       <div className="text-xl font-bold dark:text-gray-100">logo</div>
                          <button className="text-xl font-bold dark:text-gray-100" onClick={() => setSidebarOpen(false)}>X</button>
                       </div>
                        <button className="p-4 dark:text-gray-100" onClick={() => setSidebarOpen(false)}>Fermer</button>

            {/* La navbar déplacée ICI, à l'intérieur de la sidebar */}
                <ul className="p-4 space-y-2">
                   {navItems.map(({ name, icon: Icon, path }) => (
                  <li key={name} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-100"
                  onClick={() => handlenavigation(path)}
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span>{name}</span>
                  </li>
                    ))}
                </ul>
            </div>
                    {/*Darkmode button*/}
                       {darkmode?( <button  onClick={()=>setDarkmode(false)}><img src={sun_icon} alt="Sun" className="img"/></button> )

                       :(<button  onClick={()=>setDarkmode(true)}><img src={moon_icon} alt="Moon" className="img"/></button> 
                        
                       )}
            {/* Main content */}
            <main className="flex-1 p-4">
                <header className="bg-white p-4 flex justify-between items-center shadow-md dark:text-gray-100 dark:bg-gray-900"> 
                {/* 2. Utilisation d'une fonction toggle (!sidebarOpen) */}
                <button className="p-2 text-xl font-bold" onClick={() => setSidebarOpen(true)}>
                    <img src={sidebar_icon} alt="Sidebar" className="img" />
                </button>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
                    {/*All cards*/}
                    <div className="bg-white p-6 shadow-lg rounded-lg dark:bg-gray-800">
                        <h2 className="text-xl font-bold dark:text-gray-100">Card 1</h2>
                        <p className="text-lg p-1 text-gray-700 dark:text-gray-100">Description for Card 1</p>
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-lg dark:bg-gray-800">
                        <h2 className="text-xl font-bold dark:text-gray-100">Card 2</h2>
                        <p className="text-lg p-1 text-gray-700 dark:text-gray-100">Description for Card 2</p>
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-lg dark:bg-gray-800 ">
                        <h2 className="text-xl font-bold dark:text-gray-100">Card 3</h2>
                        <p className="text-lg p-1 text-gray-700 dark:text-gray-100">Description for Card 3</p>
                    </div>
                </div>
            </main>
            </div>
        );
    };

    export default Dashboard;
