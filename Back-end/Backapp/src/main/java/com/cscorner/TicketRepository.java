package com.cscorner;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    List<Ticket> findByAuteur_IdUtilisateur(Integer idUtilisateur);
}