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
    @Column(name = "id_role") 
    private Long idRole;

    @Column(name = "nom_role") 
    private String nomRole;

    @Column(name = "type_role") 
    private String typeRole;

    // Getters & Setters
    public Long getIdRole() { return idRole; }
    public void setIdRole(Long idRole) { this.idRole = idRole; }

    public String getNomRole() { return nomRole; }
    public void setNomRole(String nomRole) { this.nomRole = nomRole; }

    public String getTypeRole() { return typeRole; }
    public void setTypeRole(String typeRole) { this.typeRole = typeRole; }
}