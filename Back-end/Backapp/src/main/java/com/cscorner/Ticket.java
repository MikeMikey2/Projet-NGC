package com.cscorner;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ticket")
    private Integer idTicket;

    private String titre;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    private String statut;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur auteur;

    @PrePersist
    protected void onCreate() {
        if (this.dateDebut == null) {
            this.dateDebut = LocalDate.now();
        }
    }

    // --- Getters et Setters ---

    public Integer getIdTicket() { return idTicket; }
    public void setIdTicket(Integer idTicket) { this.idTicket = idTicket; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDate dateDebut) { this.dateDebut = dateDebut; }

    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }

    public Utilisateur getAuteur() { return auteur; }
    public void setAuteur(Utilisateur auteur) { this.auteur = auteur; }
}
