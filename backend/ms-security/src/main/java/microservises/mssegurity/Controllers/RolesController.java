package microservises.mssegurity.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import microservises.mssegurity.Models.Role;
import microservises.mssegurity.Repositories.RoleRepository;
import microservises.mssegurity.Services.JSONResponsesService;

@CrossOrigin
@RestController
@RequestMapping("/api/roles")
public class RolesController {
    @Autowired
    private RoleRepository theRoleRepository;
    @Autowired
    private JSONResponsesService theJsonResponse;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        try {
            if (this.theRoleRepository.findAll() != null) {
                List<Role> roles = theRoleRepository.findAll();
                this.theJsonResponse.setData(roles);
                this.theJsonResponse.setMessage("Los roles han sido encontrados.");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            } else {
                this.theJsonResponse.setMessage("No se encontraron roles.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        } catch (Exception e) {
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al buscar el rol.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {
        Role theRole = this.theRoleRepository
                .findById(id)
                .orElse(null);
        try {
            if (theRole != null) {
                this.theJsonResponse.setData(theRole);
                this.theJsonResponse.setMessage("El rol ha sido encontrado");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            } else {
                this.theJsonResponse.setMessage("No se encontró rol");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        } catch (Exception e) {
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al buscar rol.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Role theNewRole) {
        try {
            Role theRole = this.theRoleRepository.save(theNewRole);
            this.theJsonResponse.setData(theRole);
            this.theJsonResponse.setMessage("El rol ha sido creado correctamente");
            return ResponseEntity.status(HttpStatus.CREATED).body(this.theJsonResponse.getFinalJSON());
        } catch (Exception e) {
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al crear rol");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Role theNewRole) {
        Role theActualRole = this.theRoleRepository
                .findById(id)
                .orElse(null);
        try {
            if (theActualRole != null) {
                theActualRole.setDescription(theActualRole.getDescription());
                theActualRole.setName(theActualRole.getName());
                Role theRole = this.theRoleRepository.save(theActualRole);
                this.theJsonResponse.setData(theRole);
                this.theJsonResponse.setMessage("El rol ha sido actualizado");
                return ResponseEntity.status(HttpStatus.OK).body(theJsonResponse.getFinalJSON());
            } else {
                this.theJsonResponse.setMessage("No se ha encontrado rol para actualizar");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        } catch (Exception e) {
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al actualizar rol");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        Role theRole = this.theRoleRepository
                .findById(id)
                .orElse(null);
        try {
            if (theRole != null) {
                this.theRoleRepository.delete(theRole);
                this.theJsonResponse.setMessage("El rol se ha eliminado");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            } else {
                this.theJsonResponse.setMessage("No se encontró rol");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        } catch (Exception e) {
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al eliminar el rol");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }
}
