import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Freeprojects.css';
import sidebar_icon from '../../Assets/sidebard.png';
import moon_icon from '../../Assets/moon.png';
import sun_icon from '../../Assets/sun.png';
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
  { name: "My projects", icon: Icons.FolderOpen, path: "/myprojects" },
  { name: "Free projects", icon: Icons.Gift, path: "/Freeprojects" },
  { name: "Users", icon: Icons.Users, path: "/Userlist" },
  { name: "Document", icon: Icons.FileText, path: "/document" },
  { name: "Settings", icon: Icons.Settings, path: "/settings" }
]

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
]


const FreeProjects = () => {
  // --- État sidebar / dark mode / navigation ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkmode, setDarkmode] = useState(false)
  const navigate = useNavigate()

  const handlenavigation = (path: string) => {
    setSidebarOpen(false); // Fermer la sidebar lors de la navigation
    navigate(path);
  }

  // --- État liste de tickets ---
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("");
  const [filtrePriorite, setFiltrePriorite] = useState("");

  const ticketsFiltres = ticketsStatiques.filter(ticket => {
    const matchRecherche = ticket.titre.toLowerCase().includes(recherche.toLowerCase())
    const matchStatut = filtreStatut === "" || ticket.statut === filtreStatut
    const matchPriorite = filtrePriorite === "" || ticket.priorite === filtrePriorite
    return matchRecherche && matchStatut && matchPriorite
  })

  const handleNouveauTicket = () => {
    navigate('/Addprojects'); // Naviguer vers la page d'ajout de ticket
  }

  return (
    <div className={"flex bg-gray-100 h-screen " + (darkmode ? "dark" : "") + " dark:bg-gray-900"}>
      {/* Sidebar */}
      <div className={`fixed bg-white w-64 h-screen shadow-md transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} dark:bg-gray-900`}>
        <div className="p-4 flex justify-between items-center">
          <div className="text-xl font-bold dark:text-gray-100">logo</div>
          <button className="text-xl font-bold dark:text-gray-100" onClick={() => setSidebarOpen(false)}>X</button>
        </div>
        <button className="p-4 dark:text-gray-100" onClick={() => setSidebarOpen(false)}>Fermer</button>

        <ul className="p-4 space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <li
              key={name}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-100"
              onClick={() => handlenavigation(path)}
            >
              <Icon className="w-5 h-5 text-gray-600" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dark mode button */}
      {darkmode ? (
        <button onClick={() => setDarkmode(false)}><img src={sun_icon} alt="Sun" className="img" /></button>
      ) : (
        <button onClick={() => setDarkmode(true)}><img src={moon_icon} alt="Moon" className="img" /></button>
      )}

      {/* Main content */}
      <main className="flex-1 p-4">
        <header className="bg-white p-4 flex justify-between items-center shadow-md dark:text-gray-100 dark:bg-gray-900">
          <button className="p-2 text-xl font-bold" onClick={() => setSidebarOpen(true)}>
            <img src={sidebar_icon} alt="Sidebar" className="img" />
          </button>
          <h1 className="text-2xl font-bold">Freeprojects</h1>
          <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
        </header>

        {/* Barre d'outils tickets */}
        <div className="tickets-toolbar flex gap-4 p-4">
          <input
            type="text"
            placeholder="Rechercher un ticket..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="tickets-search"
          />

          <select
            value={filtreStatut}
            onChange={e => setFiltreStatut(e.target.value)}
            className="tickets-filter"
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
            onChange={e => setFiltrePriorite(e.target.value)}
            className="tickets-filter"
          >
            <option value="">Priorité</option>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
            <option value="Critique">Critique</option>
          </select>

          <button className="tickets-btn-nouveau" onClick={handleNouveauTicket}>
            + Nouveau ticket
          </button>
        </div>

        {/* Tableau des tickets */}
        <table className="tickets-table w-full">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Priorité</th>
              <th>Statut</th>
              <th>Affecté à</th>
            </tr>
          </thead>
          <tbody>
            {ticketsFiltres.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.titre}</td>
                <td>
                  <span className={`badge badge-priorite-${ticket.priorite.toLowerCase()}`}>
                    {ticket.priorite}
                  </span>
                </td>
                <td>{ticket.statut}</td>
                <td>{ticket.affecteA}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4"></div>
      </main>
    </div>
  )
}

export default FreeProjects