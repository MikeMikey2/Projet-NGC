package com.cscorner;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Role") // <-- Indique à Hibernate d'utiliser la table "Role" avec majuscule
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role") // Liqueur la colonne SQL id_role
    private Long idRole;

    @Column(name = "nom_role") // Liqueur la colonne SQL nom_role
    private String nomRole;

    @Column(name = "type_role") // Liqueur la colonne SQL type_role
    private String typeRole;

    // Getters & Setters
    public Long getIdRole() { return idRole; }
    public void setIdRole(Long idRole) { this.idRole = idRole; }

    public String getNomRole() { return nomRole; }
    public void setNomRole(String nomRole) { this.nomRole = nomRole; }

    public String getTypeRole() { return typeRole; }
    public void setTypeRole(String typeRole) { this.typeRole = typeRole; }
}