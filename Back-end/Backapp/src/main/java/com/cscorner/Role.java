package com.cscorner;

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
    private Integer idRole;

    private String nomRole;
    private String typeRole;

    public Integer getIdRole() { return idRole; }
    public void setIdRole(Integer id) { this.idRole = id; }
    public String getNomRole() { return nomRole; }
    public void setNomRole(String nom) { this.nomRole = nom; }
    public String getTypeRole() { return typeRole; }
    public void setTypeRole(String type) { this.typeRole = type; }
} 
