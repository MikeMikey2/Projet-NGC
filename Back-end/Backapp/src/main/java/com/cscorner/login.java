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
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Permet l'accès depuis n'importe quel port front-end (3000, 5173, etc.)
public class login {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private RoleRepository roleRepository;

   @PostMapping("/login")
public ResponseEntity<LoginResponse> seConnecter(@RequestBody LoginRequest requete) {
    Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByEmail(requete.getEmail());

    if (utilisateurOpt.isEmpty() || !utilisateurOpt.get().getMotDePasse().equals(requete.getMotDePasse())) {
        return ResponseEntity.status(401)
                .body(new LoginResponse(false, "Email ou mot de passe incorrect", null, null, null, null));
    }

    Utilisateur utilisateur = utilisateurOpt.get();

    // On prend le premier rôle trouvé (à adapter si un utilisateur peut avoir plusieurs rôles actifs)
    String roleType = utilisateur.getRoles().stream()
            .findFirst()
            .map(Role::getTypeRole)
            .orElse(null);

    LoginResponse response = new LoginResponse(
            true,
            "Connexion réussie",
            roleType,
            utilisateur.getIdUtilisateur(),
            utilisateur.getNomUtilisateur(),
            utilisateur.getPrenomUtilisateur()
    );

    return ResponseEntity.ok(response);
 }
}