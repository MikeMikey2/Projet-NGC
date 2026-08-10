import React, {  useState } from 'react';
import './Userlist.css';
import sidebar_icon from '../Assets/sidebard.png';
import moon_icon from '../Assets/moon.png';
import sun_icon from '../Assets/sun.png';
import * as Icons from "lucide-react";

/**
 *
 *
 * @return {*} 
 */
const Userlist = () => {
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
                   {navItems.map(({ name, icon: Icon }) => (
                  <li key={name} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-100">
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
            </div>
            )
}
export default Userlist;
