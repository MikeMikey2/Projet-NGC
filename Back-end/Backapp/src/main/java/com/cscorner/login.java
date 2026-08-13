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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Permet l'accès depuis n'importe quel port front-end (3000, 5173, etc.)
public class login {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/login")
    public String seConnecter(@RequestBody LoginRequest requete) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByEmail(requete.getEmail());
        if (utilisateur.isPresent() && utilisateur.get().getMotDePasse().equals(requete.getMotDePasse())) {
            return "Connexion réussie";
        } else {
            return "Email ou mot de passe incorrect";
        }
    }

    @GetMapping("/roles")
    public List<Role> listerRoles() {
        return roleRepository.findAll();
    }

    @PostMapping("/register")
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