package microservises.mssegurity.Controllers;

import jakarta.servlet.http.HttpServletResponse;
import microservises.mssegurity.Models.User;
import microservises.mssegurity.Repositories.UserRepository;
import microservises.mssegurity.Services.EncryptionService;
import microservises.mssegurity.Services.JSONResponsesService;
import microservises.mssegurity.Services.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private EncryptionService theEncryptionService;
    @Autowired
    private JwtService theJwtService;
    @Autowired
    private JSONResponsesService jsonResponsesService;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody User theUser, final HttpServletResponse response) throws IOException {
        try {
            String token = "";
            User actualUser = this.theUserRepository.getUserByEmail(theUser.getEmail());
            if (actualUser != null &&
                    actualUser.getPassword().equals(this.theEncryptionService.convertSHA256(theUser.getPassword()))) {
                token = this.theJwtService.generateToken(actualUser);
                this.jsonResponsesService.setData(token);
                this.jsonResponsesService.setMessage("Acceso exitoso, el token es: ");
                return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(this.jsonResponsesService.getFinalJSON());
            } else {
                this.jsonResponsesService.setMessage("Acceso denegado, correo y/o contraseña incorrectas");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                        .body(this.jsonResponsesService.getFinalJSON());
            }
        } catch (Exception e) {
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setError(e.toString());
            this.jsonResponsesService.setMessage("Error al buscar usuarios");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(this.jsonResponsesService.getFinalJSON());
        }

    }
}
