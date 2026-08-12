package com.cscorner;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
    @Entity
    @Table(name = "utilisateur")
    public class Utilisateur {
        @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
    name = "Utilisateur_Role",
    joinColumns = @JoinColumn(name = "id_utilisateur"),
    inverseJoinColumns = @JoinColumn(name = "id_role")
)

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer idUtilisateur;

        private String nomUtilisateur;
        private String prenomUtilisateur;
        private String email;
        private String motDePasse;
        private Set<Role> roles = new HashSet<>();

        public Integer getIdUtilisateur() {
            return idUtilisateur;
        }
        public void setIdUtilisateur(Integer idUtilisateur) {
            this.idUtilisateur = idUtilisateur;
        }
        public String getNomUtilisateur() {
            return nomUtilisateur;
        }
        public void setNomUtilisateur(String nomUtilisateur) {
            this.nomUtilisateur = nomUtilisateur;
        }
        public String getPrenomUtilisateur() {
            return prenomUtilisateur;
        }
        public void setPrenomUtilisateur(String prenomUtilisateur) {
            this.prenomUtilisateur = prenomUtilisateur;
        }
        public String getEmail() {  
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }
        public String getMotDePasse() {
            return motDePasse;
        }
        public void setMotDePasse(String motDePasse) {
            this.motDePasse = motDePasse;
        }
        public Set<Role> getRoles() { return roles; }
        public void setRoles(Set<Role> roles) { this.roles = roles; }
    }
