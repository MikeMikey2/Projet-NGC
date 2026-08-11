import React, {   useState } from 'react';
import './Userlist.css';
import sidebar_icon from '../Assets/sidebard.png';
import moon_icon from '../Assets/moon.png';
import sun_icon from '../Assets/sun.png';
import edit_icon from '../Assets/edit.png';
import delete_icon from '../Assets/delete.png';
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
            <main className="flex-1 p-4">
                                <header className="bg-white p-4 flex justify-between items-center shadow-md dark:text-gray-100 dark:bg-gray-900"> 
                {/* 2. Utilisation d'une fonction toggle (!sidebarOpen) */}
                <button className="p-2 text-xl font-bold" onClick={() => setSidebarOpen(true)}>
                    <img src={sidebar_icon} alt="Sidebar" className="img" />
                </button>
                <h1 className="text-2xl font-bold">Userlist</h1>
                <div className="bg-gray-300 w-10 h-10 rounded-full">
                </div>
                </header>
                <button>Ajouter</button>
                <div className="user-table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Role</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Admin</td>
                                <td>John</td>
                                <td>Doe</td>
                                <td>john.doe@example.com</td>
                                <td>2023-01-01</td>
                                <td>
                                    <button className="action-button edit"><img src={edit_icon} alt="Edit" className="img"/></button>
                                    <button className="action-button delete"><img src={delete_icon} alt="Delete" className="img"/></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            </div>
            )
} 
export default Userlist;
