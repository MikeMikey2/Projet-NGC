    package com.cscorner;

    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.Table;

    @Entity
    @Table(name = "utilisateur")
    public class Utilisateur {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer idUtilisateur;

        private String nomUtilisateur;
        private String prenomUtilisateur;
        private String email;
        private String motDePasse;

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
    }
