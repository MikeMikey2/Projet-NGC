package com.cscorner;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "commentaire")
public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comment")
    private Integer idComment;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    @Column(name = "date_comment")
    private LocalDate dateComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur auteur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ticket", nullable = false)
    private Ticket ticket;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "commentaire_destinataire",
        joinColumns = @JoinColumn(name = "id_comment"),
        inverseJoinColumns = @JoinColumn(name = "id_utilisateur")
    )
    private Set<Utilisateur> destinataires = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        this.dateComment = LocalDate.now();
    }

    // --- Getters et Setters ---

    public Integer getIdComment() { return idComment; }
    public void setIdComment(Integer idComment) { this.idComment = idComment; }

    public String getContenu() { return contenu; }
    public void setContenu(String contenu) { this.contenu = contenu; }

    public LocalDate getDateComment() { return dateComment; }

    public Utilisateur getAuteur() { return auteur; }
    public void setAuteur(Utilisateur auteur) { this.auteur = auteur; }

    public Ticket getTicket() { return ticket; }
    public void setTicket(Ticket ticket) { this.ticket = ticket; }

    public Set<Utilisateur> getDestinataires() { return destinataires; }
    public void setDestinataires(Set<Utilisateur> destinataires) { this.destinataires = destinataires; }
}