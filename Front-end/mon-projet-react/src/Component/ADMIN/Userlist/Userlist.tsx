import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Userlist.css';
import sidebar_icon from '../../Assets/sidebard.png';
import moon_icon from '../../Assets/moon.png';
import sun_icon from '../../Assets/sun.png';
import * as Icons from "lucide-react";

interface NavItem {
  name: string;
  icon: Icons.LucideIcon;
  path: string;
}

interface Role {
  idRole: number;
  nomRole: string;
  typeRole?: string;
}

interface Utilisateur {
  idUtilisateur: number;
  nomUtilisateur: string;
  prenomUtilisateur: string;
  email: string;
  dateInsc: string;
  role: Role[];  
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: Icons.Home, path: "/dashboard" },
  { name: "My projects", icon: Icons.FolderOpen, path: "/myprojects" },
  { name: "Free projects", icon: Icons.Gift, path: "/Freeprojects" },
  { name: "Users", icon: Icons.Users, path: "/Userlist" },
  { name: "Document", icon: Icons.FileText, path: "/document" },
];


const Userlist = () => {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkmode, setDarkmode] = useState(false);
  const navigate = useNavigate();

  

  const loadUsers=async () =>{
  try{
    const response = await fetch('http://localhost:8080/api/utilisateur/utilisateurs');
    const data = await response.json();
    setUsers(data);
  }  catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
     }
  }
  useEffect(() => {
    loadUsers();
  }, []);

  const handleNavigation = (path: string) => {
    setSidebarOpen(false);
    navigate(path);
  };

  return (
    <div className={`flex bg-gray-100 min-h-screen ${darkmode ? "dark bg-gray-900" : ""}`}>
      <aside className={`fixed top-0 left-0 bg-white w-64 h-screen shadow-md transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} dark:bg-gray-800`}>
        <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
          <div className="text-xl font-bold dark:text-gray-100">Gest Admin</div>
          <button className="text-gray-500 dark:text-gray-300" onClick={() => setSidebarOpen(false)}>
            <Icons.X className="w-6 h-6" />
          </button>
        </div>

        <ul className="p-4 space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <li
              key={name}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => handleNavigation(path)}
            >
              <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <header className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm dark:bg-gray-800 dark:text-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <img src={sidebar_icon} alt="Sidebar" className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">Utilisateurs</h1>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDarkmode(!darkmode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <img src={darkmode ? sun_icon : moon_icon} alt="Theme Toggle" className="w-6 h-6" />
            </button>
            <div className="bg-blue-600 text-white font-semibold w-10 h-10 rounded-full flex items-center justify-center">AD</div>
          </div>
        </header>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">Liste des comptes et accès du système.</p>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Icons.Plus className="w-5 h-5" /> Ajouter
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">#</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">Role</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">Nom</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">Prénom</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">Créé</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
              <tr key={user.idUtilisateur} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/60">
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.idUtilisateur}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex flex-wrap gap-1">
                    {user.role?.map((r) => (
                     <span
                       key={r.idRole}
                      className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium"
                      >
                        {r.nomRole}
                     </span>
                       ))}
                  </div>
               </td>
               <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.nomUtilisateur}</td>
               <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.prenomUtilisateur}</td>
               <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
               <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.dateInsc}</td>
               <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
               <div className="flex items-center gap-2">
                 <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-300">
                   <Icons.Pencil className="w-4 h-4" />
                 </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-300">
                  <Icons.Trash2 className="w-4 h-4" />
                </button>
               </div>
               </td>
              </tr> 
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Userlist;
