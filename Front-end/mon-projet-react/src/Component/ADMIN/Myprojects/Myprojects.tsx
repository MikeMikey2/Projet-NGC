import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Myprojects.css';
import sidebar_icon from '../../Assets/sidebard.png';
import moon_icon from '../../Assets/moon.png';
import sun_icon from '../../Assets/sun.png';
import * as Icons from "lucide-react";

interface NavItem {
  name: string;
  icon: Icons.LucideIcon;
  path: string;
}

// Interface calquée sur la table `ticket` de la base de données
interface Ticket {
  id_ticket: number;
  titre: string;
  description: string;
  date_debut: string;
  statut: 'En cours' | 'Terminé' | 'En attente' | 'Urgent' | string;
  id_utilisateur: number;
  nom_utilisateur?: string; // Issu de la jointure avec `utilisateur`
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: Icons.Home, path: "/dashboard" },
  { name: "My projects", icon: Icons.FolderOpen, path: "/myprojects" },
  { name: "Free projects", icon: Icons.Gift, path: "/Freeprojects" },
  { name: "Users", icon: Icons.Users, path: "/Userlist" },
  { name: "Document", icon: Icons.FileText, path: "/document" },
];

const Myprojects = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkmode, setDarkmode] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  // Simulation du chargement des données depuis l'API MySQL
  useEffect(() => {
    // Exemple d'intégration : fetch('/api/tickets').then(res => res.json()).then(data => setTickets(data));
    const fetchedTickets: Ticket[] = [
      {
        id_ticket: 1,
        titre: "Maintenance de la BDD Gest",
        description: "Optimisation des index sur la table ticket et commentaire.",
        date_debut: "2026-08-19",
        statut: "En cours",
        id_utilisateur: 1,
        nom_utilisateur: "Yombi Mbele"
      },
      {
        id_ticket: 2,
        titre: "Implémentation des rôles RBAC",
        description: "Lier les permissions aux rôles utilisateur_role.",
        date_debut: "2026-08-19",
        statut: "En attente",
        id_utilisateur: 2,
        nom_utilisateur: "Guy Laroche"
      }
    ];
    setTickets(fetchedTickets);
  }, []);

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Terminé":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "En cours":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
    }
  };

  return (
    <div className={`flex bg-gray-100 min-h-screen ${darkmode ? "dark bg-gray-900" : ""}`}>
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bg-white w-64 h-screen shadow-md transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} dark:bg-gray-800`}>
        <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
          <div className="text-xl font-bold dark:text-gray-100">Gest Admin</div>
          <button className="text-gray-500 dark:text-gray-300" onClick={() => setSidebarOpen(false)}>
            <Icons.X className="w-6 h-6" />
          </button>
        </div>

        <ul className="p-4 space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <li key={name} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700" onClick={() => { setSidebarOpen(false); navigate(path); }}>
              <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm dark:bg-gray-800 dark:text-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <img src={sidebar_icon} alt="Sidebar" className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">Gestion des Tickets / Projets</h1>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDarkmode(!darkmode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <img src={darkmode ? sun_icon : moon_icon} alt="Theme Toggle" className="w-6 h-6" />
            </button>
            <div className="bg-blue-600 text-white font-semibold w-10 h-10 rounded-full flex items-center justify-center">
              AD
            </div>
          </div>
        </header>

        {/* Barre d'action */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Liste des projets assignés aux administrateurs.
          </p>
        </div>

        {/* Grille de projets / tickets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id_ticket} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getStatusBadge(ticket.statut)}`}>
                    {ticket.statut}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <Icons.MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  #{ticket.id_ticket} - {ticket.titre}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                  {ticket.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Icons.User className="w-4 h-4 text-gray-400" />
                  {ticket.nom_utilisateur}
                </span>
                <span className="flex items-center gap-1">
                  <Icons.Calendar className="w-4 h-4 text-gray-400" />
                  {ticket.date_debut}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Myprojects;