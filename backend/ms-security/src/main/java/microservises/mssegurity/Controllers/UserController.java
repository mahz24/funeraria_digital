package microservises.mssegurity.Controllers;

import java.security.SecureRandom;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import microservises.mssegurity.Repositories.RoleRepository;
import microservises.mssegurity.Repositories.UserRepository;
import microservises.mssegurity.Services.JSONResponsesService;
import microservises.mssegurity.Models.Role;
import microservises.mssegurity.Models.User;
import microservises.mssegurity.Services.EncryptionService;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JSONResponsesService jsonResponsesService;
    @Autowired
    private RoleRepository theRoleRepository;
    @Autowired
    private EncryptionService thEncryptionService;
    @Value("${ms-notifications.base-url}")
    private String baseUrlNotifications;

    @SuppressWarnings("unused")
    @GetMapping("")
    public ResponseEntity<?> index() {
        try {
            List<User> users = this.userRepository.findAll();
            if (users != null && users.size() > 0) {
                this.jsonResponsesService.setData(users);
                this.jsonResponsesService.setMessage("Lista de Usuarios encontrada correctamente");
                return ResponseEntity.status(HttpStatus.OK)
                        .body(this.jsonResponsesService.getFinalJSON());
            } else {
                this.jsonResponsesService.setMessage("No hay usuarios registrados");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
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

    @PutMapping("{userId}/role/{roleId}")
    public ResponseEntity<?> matchRole(@PathVariable String userId, @PathVariable String roleId) {
        try {
            User theActualUser = this.userRepository
                    .findById(userId)
                    .orElse(null);
            Role theActualRole = this.theRoleRepository
                    .findById(roleId)
                    .orElse(null);
            if (theActualUser != null && theActualRole != null) {
                theActualUser.setRole(theActualRole);
                User newUser = this.userRepository.save(theActualUser);
                this.jsonResponsesService.setData(newUser);
                this.jsonResponsesService.setMessage("Rol asignado al usuario con éxito");
                return ResponseEntity.status(HttpStatus.OK).body(this.jsonResponsesService.getFinalJSON());
            } else {
                this.jsonResponsesService.setData(null);
                this.jsonResponsesService.setMessage("No se encontro al usuario o el rol no existe");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.jsonResponsesService.getFinalJSON());
            }
        } catch (Exception e) {
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setMessage("Error al buscar usuario");
            this.jsonResponsesService.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(this.jsonResponsesService.getFinalJSON());
        }

    }

    @PutMapping("{userId}/unmatch-role/{roleId}")
    public ResponseEntity<?> unMatchRole(@PathVariable String userId, @PathVariable String roleId) {
        try {
            User theActualUser = this.userRepository
                    .findById(userId)
                    .orElse(null);
            Role theActualRole = this.theRoleRepository
                    .findById(roleId)
                    .orElse(null);
            if (theActualUser != null
                    && theActualRole != null
                    && theActualUser.getRole().get_id().equals(roleId)) {
                theActualUser.setRole(null);
                User newUser = this.userRepository.save(theActualUser);
                this.jsonResponsesService.setData(newUser);
                this.jsonResponsesService.setMessage("Se designo el rol al usuario con éxito");
                return ResponseEntity.status(HttpStatus.OK).body(this.jsonResponsesService.getFinalJSON());
            } else {
                this.jsonResponsesService.setData(null);
                this.jsonResponsesService.setMessage("No se encontro al usuario o el rol no existe");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.jsonResponsesService.getFinalJSON());
            }
        } catch (Exception e) {
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setMessage("Error al buscar usuario");
            this.jsonResponsesService.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(this.jsonResponsesService.getFinalJSON());
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {
        try {
            User user = this.userRepository.findById(id).orElse(null);
            if (user != null) {
                this.jsonResponsesService.setData(user);
                this.jsonResponsesService.setMessage("Usuario encontrado con éxito");
                return ResponseEntity.status(HttpStatus.OK).body(this.jsonResponsesService.getFinalJSON());
            } else {
                this.jsonResponsesService.setData(null);
                this.jsonResponsesService.setMessage("No se encontro al usuario buscado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.jsonResponsesService.getFinalJSON());
            }
        } catch (Exception e) {
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setMessage("Error al buscar usuario");
            this.jsonResponsesService.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(this.jsonResponsesService.getFinalJSON());
        }
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody User newUser) {
        try {
            newUser.setPassword(thEncryptionService.convertSHA256(newUser.getPassword()));
            User user = this.userRepository.save(newUser);
            this.jsonResponsesService.setData(user);
            this.jsonResponsesService.setMessage("Usuario añadido satisfactoriamente");
            return ResponseEntity.status(HttpStatus.CREATED).body(this.jsonResponsesService.getFinalJSON());
        } catch (Exception e) {
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setError(e.toString());
            this.jsonResponsesService.setMessage("Error al crear al usuario");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(this.jsonResponsesService.getFinalJSON());
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            User user = this.userRepository.findById(id).orElse(null);
            if (user != null) {
                this.userRepository.delete(user);
                this.jsonResponsesService.setMessage("Usuario eliminado satisfactoriamente");
                return ResponseEntity.status(HttpStatus.OK).body(this.jsonResponsesService.getFinalJSON());
            } else {
                this.jsonResponsesService.setData(null);
                this.jsonResponsesService.setMessage("No se encontró al usuario");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.jsonResponsesService.getFinalJSON());
            }
        } catch (Exception e) {
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setError(e.toString());
            this.jsonResponsesService.setMessage("Error al eliminar al usuario");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(this.jsonResponsesService.getFinalJSON());
        }
    }

    @PatchMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody User user){
        try {
            User current = userRepository.getUserByEmail(user.getEmail());
            if (current != null) {
                String genPass = generateRandomPassword(10);
                current.setPassword(thEncryptionService.convertSHA256(genPass));
                userRepository.save(current);
                RestTemplate restTemplate= new RestTemplate();
                String urlPost = baseUrlNotifications + "email_reset_password";
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                String requestBody = "{\"email\":\"" + user.getEmail() +"\",\"new_password\":\"" + genPass + "\"}";
                HttpEntity<String> requestEntity = new HttpEntity<>(requestBody,headers);
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.jsonResponsesService.getFinalJSON());
        }
    }

    public static String generateRandomPassword(int len) {
        // Rango ASCII – alfanumérico (0-9, a-z, A-Z)
        final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();

        // En cada iteración del bucle, elegimos aleatoriamente un carácter del rango ASCII
        // y lo agregamos a la instancia `StringBuilder`
        for (int i = 0; i < len; i++) {
            int randomIndex = random.nextInt(chars.length());
            sb.append(chars.charAt(randomIndex));
        }

        return sb.toString();
    }
}
