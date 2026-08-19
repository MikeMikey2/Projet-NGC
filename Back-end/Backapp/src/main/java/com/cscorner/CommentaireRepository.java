package com.cscorner;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentaireRepository extends JpaRepository<Commentaire, Integer> {

    List<Commentaire> findByTicket_IdTicketOrderByDateCommentDesc(Integer idTicket);

    List<Commentaire> findByDestinataires_IdUtilisateurOrderByDateCommentDesc(Integer idUtilisateur);
}