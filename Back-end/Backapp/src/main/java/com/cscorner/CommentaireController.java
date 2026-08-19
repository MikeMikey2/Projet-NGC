package com.cscorner;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/commentaires")
public class CommentaireController {

    @Autowired
    private CommentaireRepository commentaireRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @PostMapping
    public Object envoyerCommentaire(@RequestBody CommentaireRequest requete) {
        Optional<Ticket> ticket = ticketRepository.findById(requete.getIdTicket());
        if (ticket.isEmpty()) {
            return "Projet (ticket) introuvable";
        }

        Optional<Utilisateur> auteur = utilisateurRepository.findById(requete.getIdAuteur());
        if (auteur.isEmpty()) {
            return "Auteur introuvable";
        }

        if (requete.getIdsDestinataires() == null || requete.getIdsDestinataires().isEmpty()) {
            return "Sélectionnez au moins un destinataire";
        }

        Set<Utilisateur> destinataires = requete.getIdsDestinataires().stream()
            .map(utilisateurRepository::findById)
            .filter(Optional::isPresent)
            .map(Optional::get)
            .collect(Collectors.toSet());

        Commentaire commentaire = new Commentaire();
        commentaire.setTicket(ticket.get());
        commentaire.setAuteur(auteur.get());
        commentaire.setContenu(requete.getContenu());
        commentaire.setDestinataires(destinataires);

        commentaireRepository.save(commentaire);
        return "Commentaire envoyé";
    }

    @GetMapping("/projet/{idTicket}")
    public List<Commentaire> getCommentairesProjet(@PathVariable Integer idTicket) {
        return commentaireRepository.findByTicket_IdTicketOrderByDateCommentDesc(idTicket);
    }

    @GetMapping("/recus/{idUtilisateur}")
    public List<Commentaire> getCommentairesRecus(@PathVariable Integer idUtilisateur) {
        return commentaireRepository.findByDestinataires_IdUtilisateurOrderByDateCommentDesc(idUtilisateur);
    }
}   
