package com.cscorner;

public class LoginResponse {
    private boolean success;
    private String message;
    private String role;
    private Integer idUtilisateur;
    private String nomUtilisateur;
    private String prenomUtilisateur;

    public LoginResponse(boolean success, String message, String role, Integer idUtilisateur, String nomUtilisateur, String prenomUtilisateur) {
        this.success = success;
        this.message = message;
        this.role = role;
        this.idUtilisateur = idUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
        this.prenomUtilisateur = prenomUtilisateur;
    }
    //Getters
    public boolean isSuccess() {return success;}
    public String getMessage() {return message;}
    public String getRole() {return role;}
    public Integer getIdUtilisateur() {return idUtilisateur;}
    public String getNomUtilisateur() {return nomUtilisateur;}
    public String getPrenomUtilisateur() {return prenomUtilisateur;}

}
