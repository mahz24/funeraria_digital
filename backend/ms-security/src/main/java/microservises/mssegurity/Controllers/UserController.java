package microservises.mssegurity.Controllers;

import java.util.List;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import microservises.mssegurity.Repositories.RoleRepository;
import microservises.mssegurity.Repositories.UserRepository;
import microservises.mssegurity.Services.JSONResponsesService;
import microservises.mssegurity.Models.Role;
import microservises.mssegurity.Models.User;
import microservises.mssegurity.Services.EncryptionService;

@CrossOrigin
@RestController
@RequestMapping("/users")
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

    @GetMapping("")
    public List<User> index(final HttpServletResponse response) {
        try {
            List<User> users = this.userRepository.findAll();
            if (users != null && users.size() > 0) {
                return users;
            } else {
                response.setStatus(400);
                return users;
            }
        } catch (Exception e) {
            response.setStatus(400);
            return null;
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
    public User findById(@PathVariable String id) { // es ResponseEntity
        try {
            User user = this.userRepository.findById(id).orElse(null);
            if (user != null) {
                this.jsonResponsesService.setData(user);
                this.jsonResponsesService.setMessage("Usuario encontrado con éxito");
                //return ResponseEntity.status(HttpStatus.OK).body(this.jsonResponsesService.getFinalJSON());
                return user;
            } else {
                this.jsonResponsesService.setData(null);
                this.jsonResponsesService.setMessage("No se encontro al usuario buscado");
                return user;
            }
        } catch (Exception e) {
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setMessage("Error al buscar usuario");
            this.jsonResponsesService.setError(e.toString());
            return null;
        }
    }

    @PostMapping("")
    public User create(@RequestBody User newUser, final HttpServletResponse response) {
        try {
            User Nuser = this.userRepository.getUserByEmail(newUser.getEmail());
            if(Nuser == null){
                newUser.setPassword(thEncryptionService.convertSHA256(newUser.getPassword()));
                response.setStatus(200);
                User user = this.userRepository.save(newUser);
                return  user;
            }else{
                return null;
            }
        } catch (Exception e) {
            response.setStatus(500);
            return null;
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
}
