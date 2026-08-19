package com.cscorner;

import java.util.List;

public class CommentaireRequest {
    private Integer idTicket;
    private Integer idAuteur;
    private String contenu;
    private List<Integer> idsDestinataires;

    public Integer getIdTicket() { return idTicket; }
    public void setIdTicket(Integer idTicket) { this.idTicket = idTicket; }

    public Integer getIdAuteur() { return idAuteur; }
    public void setIdAuteur(Integer idAuteur) { this.idAuteur = idAuteur; }

    public String getContenu() { return contenu; }
    public void setContenu(String contenu) { this.contenu = contenu; }

    public List<Integer> getIdsDestinataires() { return idsDestinataires; }
    public void setIdsDestinataires(List<Integer> idsDestinataires) { this.idsDestinataires = idsDestinataires; }
}