package microservises.mssegurity.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import microservises.mssegurity.Repositories.UserRepository;
import microservises.mssegurity.Services.JSONResponsesService;
import microservises.mssegurity.Models.User;;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JSONResponsesService jsonResponsesService;

    @SuppressWarnings("unused")
    @GetMapping("")
    public ResponseEntity<?> index() {
        try {
            if (this.userRepository.findAll() != null) {
                List<User> users = this.userRepository.findAll();
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
}
