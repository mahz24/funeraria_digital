package microservises.mssegurity.Controllers;

import jakarta.servlet.http.HttpServletResponse;
import microservises.mssegurity.Models.Session;
import microservises.mssegurity.Models.User;
import microservises.mssegurity.Repositories.SessionRepository;
import microservises.mssegurity.Repositories.UserRepository;
import microservises.mssegurity.Services.EncryptionService;
import microservises.mssegurity.Services.JSONResponsesService;
import microservises.mssegurity.Services.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Random;

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
    @Autowired
    private SessionRepository theSessionRepository;
    @Value("${ms-notifications.base-url}")
    private String baseUrlNotifications;

    @PostMapping("/login")
    public User login(@RequestBody User theUser, final HttpServletResponse response) throws IOException {
        try {
            User actualUser = this.theUserRepository.getUserByEmail(theUser.getEmail());
            if (actualUser != null &&
                    actualUser.getPassword().equals(this.theEncryptionService.convertSHA256(theUser.getPassword()))) {
                Random random = new Random();
                int token2FA = random.nextInt(9000) + 1000;
                Session newSession = new Session(token2FA, actualUser);
                this.theSessionRepository.save(newSession);
                System.out.println(newSession);

                // mandar el token2FA con el correo del usuario

                RestTemplate restTemplate = new RestTemplate();
                String urlPost = baseUrlNotifications + "email_2FA";
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                String requestBody = "{\"email\":\"" + actualUser.getEmail() + "\",\"token2FA\":\"" + token2FA + "\"}";
                HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
                ResponseEntity<String> res = restTemplate.postForEntity(urlPost, requestEntity, String.class);
                System.out.println(res.getBody());
                return actualUser;
            } else if (actualUser != null) {
                response.setStatus(400);
                return null;
            } else {
                response.setStatus(400);
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/2FA-login/{userId}")
    public HashMap<String, Object> factorAuthetication(@RequestBody Session theSession, @PathVariable String userId) {
        HashMap<String, Object> theResponse = new HashMap<>();
        try {
            int secondFactor_token = theSession.getToken2FA();
            User theUser = theUserRepository.getUserById(userId);
            Session thePrincipalSession = theSessionRepository.getSessionbyUserId(userId, secondFactor_token);

            if (thePrincipalSession != null) {
                String token = this.theJwtService.generateToken(theUser);
                thePrincipalSession.setToken(token);
                this.theSessionRepository.save(thePrincipalSession);
                theUser.setPassword("");
                System.out.println(thePrincipalSession);
                theResponse.put("token", token);
                theResponse.put("User", theUser);
                return theResponse;
            } else if (theUser != null) {
                return theResponse;
            } else {
                return theResponse;
            }
        } catch (Exception e) {
            return theResponse;
        }
    }

    @PatchMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody User user) {
        try {
            User current = theUserRepository.getUserByEmail(user.getEmail());
            if (current != null) {
                String genPass = generateRandomPassword(10);
                current.setPassword(theEncryptionService.convertSHA256(genPass));
                theUserRepository.save(current);
                RestTemplate restTemplate = new RestTemplate();
                String urlPost = baseUrlNotifications + "email_reset_password";
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                String requestBody = "{\"email\":\"" + user.getEmail() + "\",\"new_password\":\"" + genPass + "\"}";
                HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
                ResponseEntity<String> res = restTemplate.postForEntity(urlPost, requestEntity, String.class);
                System.out.println(res.getBody());
                this.jsonResponsesService.setData(current);
                this.jsonResponsesService.setMessage("Contraseña cambiada con exito, por favor revisa tu correo");
                return ResponseEntity.status(HttpStatus.OK).body(this.jsonResponsesService.getFinalJSON());
            } else {
                this.jsonResponsesService.setMessage("El usuario no se encuentra registrado en la base de datos");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.jsonResponsesService.getFinalJSON());
            }
        } catch (Exception e) {
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setError(e.toString());
            this.jsonResponsesService.setMessage("Error al generar una nueva contraseña");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(this.jsonResponsesService.getFinalJSON());
        }
    }

    public static String generateRandomPassword(int len) {
        // Rango ASCII – alfanumérico (0-9, a-z, A-Z)
        final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();

        // En cada iteración del bucle, elegimos aleatoriamente un carácter del rango
        // ASCII
        // y lo agregamos a la instancia `StringBuilder`
        for (int i = 0; i < len; i++) {
            int randomIndex = random.nextInt(chars.length());
            sb.append(chars.charAt(randomIndex));
        }

        return sb.toString();
    }
}
