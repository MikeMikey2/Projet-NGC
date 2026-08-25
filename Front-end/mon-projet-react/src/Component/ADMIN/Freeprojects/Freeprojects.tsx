import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Freeprojects.css';
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
  { name: "Dashboard", icon: Icons.Home, path: "/dashboard" },
  { name: "My projects", icon: Icons.FolderOpen, path: "/myprojects" },
  { name: "Free projects", icon: Icons.Gift, path: "/Freeprojects" },
  { name: "Users", icon: Icons.Users, path: "/Userlist" },
  { name: "Document", icon: Icons.FileText, path: "/document" },
];

interface Ticket {
  id: number;
  titre: string;
  priorite: "Basse" | "Moyenne" | "Haute" | "Critique";
  statut: "Ouvert" | "En cours" | "Résolu" | "Affecté" | "Clôturé";
  affecteA: string;
}

const ticketsStatiques: Ticket[] = [
  { id: 1, titre: "Bug affichage facture", priorite: "Haute", statut: "En cours", affecteA: "A. Kamga" },
  { id: 2, titre: "Accès module RH", priorite: "Moyenne", statut: "Affecté", affecteA: "S. Nono" },
  { id: 3, titre: "Mise à jour serveur", priorite: "Basse", statut: "Résolu", affecteA: "Admin" },
  { id: 4, titre: "Panne imprimante étage 2", priorite: "Critique", statut: "Ouvert", affecteA: "Non affecté" },
  { id: 5, titre: "Demande accès VPN", priorite: "Basse", statut: "Clôturé", affecteA: "S. Nono" },
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'Critique':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'Haute':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'Moyenne':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    default:
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Ouvert':
      return 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200';
    case 'En cours':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'Résolu':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Clôturé':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    default:
      return 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200';
  }
};

const FreeProjects = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkmode, setDarkmode] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("");
  const [filtrePriorite, setFiltrePriorite] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setSidebarOpen(false);
    navigate(path);
  };

  const ticketsFiltres = ticketsStatiques.filter((ticket) => {
    const matchRecherche = ticket.titre.toLowerCase().includes(recherche.toLowerCase());
    const matchStatut = filtreStatut === "" || ticket.statut === filtreStatut;
    const matchPriorite = filtrePriorite === "" || ticket.priorite === filtrePriorite;
    return matchRecherche && matchStatut && matchPriorite;
  });

  const handleNouveauTicket = () => {
    navigate('/Addprojects');
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
            <h1 className="text-2xl font-bold">Free projects</h1>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDarkmode(!darkmode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <img src={darkmode ? sun_icon : moon_icon} alt="Theme Toggle" className="w-6 h-6" />
            </button>
            <div className="bg-blue-600 text-white font-semibold w-10 h-10 rounded-full flex items-center justify-center">AD</div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <p className="text-gray-600 dark:text-gray-400">Suivi des projets et demandes de maintenance.</p>
          <button onClick={handleNouveauTicket} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Icons.Plus className="w-5 h-5" /> Nouveau projet
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="flex-1 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={filtreStatut}
              onChange={(e) => setFiltreStatut(e.target.value)}
              className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Statut</option>
              <option value="Ouvert">Ouvert</option>
              <option value="Affecté">Affecté</option>
              <option value="En cours">En cours</option>
              <option value="Résolu">Résolu</option>
              <option value="Clôturé">Clôturé</option>
            </select>

            <select
              value={filtrePriorite}
              onChange={(e) => setFiltrePriorite(e.target.value)}
              className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Priorité</option>
              <option value="Basse">Basse</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Haute">Haute</option>
              <option value="Critique">Critique</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ticketsFiltres.map((ticket) => (
            <div key={ticket.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getPriorityBadge(ticket.priorite)}`}>
                  {ticket.priorite}
                </span>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <Icons.MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">#{ticket.id} - {ticket.titre}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getStatusBadge(ticket.statut)}`}>
                    {ticket.statut}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Icons.User className="w-4 h-4 text-gray-400" />
                  {ticket.affecteA}
                </span>
                <span className="flex items-center gap-1">
                  <Icons.Clock3 className="w-4 h-4 text-gray-400" />
                  Aujourd’hui
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FreeProjects;