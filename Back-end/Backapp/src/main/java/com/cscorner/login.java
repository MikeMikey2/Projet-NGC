package com.cscorner;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class login {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/api/login")
    public String seConnecter(@RequestBody LoginRequest requete) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByEmail(requete.getEmail());
        if (utilisateur.isPresent() && utilisateur.get().getMotDePasse().equals(requete.getMotDePasse())) {
            return "Connexion réussie";
        } else {
            return "Email ou mot de passe incorrect";
        }
    }

    @GetMapping("/api/roles")
    public List<Role> listerRoles() {
        return roleRepository.findAll();
    }

    @PostMapping("/api/register")
    public String sInscrire(@RequestBody RegisterRequest requete) {
        if (utilisateurRepository.findByEmail(requete.getEmail()).isPresent()) {
            return "Cet email est déjà utilisé";
        }

        Optional<Role> role = roleRepository.findById(requete.getRoleId());
        if (role.isEmpty()) {
            return "Rôle invalide";
        }

        Utilisateur nouvelUtilisateur = new Utilisateur();
        nouvelUtilisateur.setNomUtilisateur(requete.getNom());
        nouvelUtilisateur.setPrenomUtilisateur(requete.getPrenom());
        nouvelUtilisateur.setEmail(requete.getEmail());
        nouvelUtilisateur.setMotDePasse(requete.getMotDePasse());

        Set<Role> roles = new HashSet<>();
        roles.add(role.get());
        nouvelUtilisateur.setRoles(roles);

        utilisateurRepository.save(nouvelUtilisateur);
        return "Inscription réussie";
    }
}