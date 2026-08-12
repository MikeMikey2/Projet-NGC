package com.cscorner;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role") // <-- Fait le lien avec id_role dans MySQL
    private Integer idRole;

    @Column(name = "nom_role") // <-- Fait le lien avec nom_role dans MySQL
    private String nomRole;

    @Column(name = "type_role") // <-- Fait le lien avec type_role dans MySQL
    private String typeRole;

    // Getters & Setters
    public Integer getIdRole() { return idRole; }
    public void setIdRole(Integer id) { this.idRole = id; }

    public String getNomRole() { return nomRole; }
    public void setNomRole(String nom) { this.nomRole = nom; }

    public String getTypeRole() { return typeRole; }
    public void setTypeRole(String type) { this.typeRole = type; }
}