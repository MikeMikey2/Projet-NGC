import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
import sidebar_icon from '../../Assets/sidebard.png';
import moon_icon from '../../Assets/moon.png';
import sun_icon from '../../Assets/sun.png';
import * as Icons from "lucide-react";

interface NavItem {
  name: string;
  icon: Icons.LucideIcon;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: Icons.Home, path: "/Dashboard" },
  { name: "My projects", icon: Icons.FolderOpen, path: "/Myprojects" },
  { name: "Free projects", icon: Icons.Gift, path: "/Freeprojects" },
  { name: "Users", icon: Icons.Users, path: "/Userlist" },
  { name: "Document", icon: Icons.FileText, path: "/Document" },
];

const stats = [
  { title: "Projets actifs", value: "24", change: "+12%", icon: Icons.FolderOpen, tone: "blue" },
  { title: "Utilisateurs", value: "128", change: "+8%", icon: Icons.Users, tone: "green" },
  { title: "Tickets ouverts", value: "17", change: "-3%", icon: Icons.FileText, tone: "amber" },
  { title: "Satisfaction", value: "94%", change: "+2%", icon: Icons.Star, tone: "purple" }
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkmode, setDarkmode] = useState(false);
  const navigate = useNavigate();

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
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDarkmode(!darkmode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <img src={darkmode ? sun_icon : moon_icon} alt="Theme Toggle" className="w-6 h-6" />
            </button>
            <div className="bg-blue-600 text-white font-semibold w-10 h-10 rounded-full flex items-center justify-center">AD</div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map(({ title, value, change, icon: Icon, tone }) => (
            <div key={title} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  tone === 'blue' ? 'bg-blue-100 text-blue-600' :
                  tone === 'green' ? 'bg-green-100 text-green-600' :
                  tone === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-violet-100 text-violet-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">{change}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</h3>
            </div>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activité récente</h2>
            <div className="space-y-4">
              {['Nouveau projet CRM', 'Ticket urgent corrigé', 'Mise à jour de la sécurité', 'Validation du document client'].map((item, index) => (
                <div key={item} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">{item}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Il y a {index + 1}h</p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tâches prioritaires</h2>
            <div className="space-y-3">
              {[
                { label: 'Validation des accès', done: true },
                { label: 'Mise en production V2', done: false },
                { label: 'Revue documentaire', done: true },
                { label: 'Support client', done: false }
              ].map(({ label, done }) => (
                <div key={label} className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-700/50 px-3 py-2">
                  <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${done ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200'}`}>
                    {done ? 'Terminé' : 'En cours'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
