package microservises.mssegurity.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
//import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import microservises.mssegurity.Models.Permission;
import microservises.mssegurity.Repositories.PermissionRepository;
import microservises.mssegurity.Services.JSONResponsesService;

@CrossOrigin
@RestController
@RequestMapping("/permissions") // es con s, no confundir
public class PermissionController {
    @Autowired
    private PermissionRepository thePermissionRepository;
    @Autowired
    private JSONResponsesService theJsonResponse;

    @SuppressWarnings("unused")
    @GetMapping("")
    public ResponseEntity<?> findAll() {
        try{
            if(this.thePermissionRepository.findAll() != null){
                List<Permission> permissions = thePermissionRepository.findAll();
                this.theJsonResponse.setData(permissions);
                this.theJsonResponse.setMessage("Los permisos han sido encontrados.");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            }else{
                this.theJsonResponse.setMessage("No se encontraron permisos.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        }catch (Exception e){
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al buscar permiso.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findById(@PathVariable String id){
        Permission thePermission = this.thePermissionRepository
                                .findById(id)
                                .orElse(null);
        try{
            if(thePermission != null){
                this.theJsonResponse.setData(thePermission);
                this.theJsonResponse.setMessage("El permiso ha sido encontrados.");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            }else{
                this.theJsonResponse.setMessage("No se encontró permiso.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        }catch (Exception e){
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al buscar permiso.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Permission theNewPermission){
        try{
            Permission thePermission = this.thePermissionRepository.save(theNewPermission);
            this.theJsonResponse.setData(thePermission);
            this.theJsonResponse.setMessage("El permiso ha sido creado correctamente.");
            return ResponseEntity.status(HttpStatus.CREATED).body(this.theJsonResponse.getFinalJSON());
        }catch(Exception e){
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al crear permiso.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Permission theNewPermission){
        Permission theActualPermission = this.thePermissionRepository
                                        .findById(id)
                                        .orElse(null);
        try{
            if(theActualPermission != null){
                theActualPermission.setDescription(theNewPermission.getDescription());
                theActualPermission.setUrl(theNewPermission.getUrl());
                theActualPermission.setMethod(theNewPermission.getMethod());
                Permission thePermission = this.thePermissionRepository.save(theActualPermission);
                this.theJsonResponse.setData(thePermission);
                this.theJsonResponse.setMessage("El permiso ha sido actualizado.");
                return ResponseEntity.status(HttpStatus.OK).body(theJsonResponse.getFinalJSON());
            }else{
                this.theJsonResponse.setMessage("No se ha encontrado permiso para actualizar.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        }catch(Exception e){
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al actualizar permiso.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        Permission thePermission = this.thePermissionRepository
                                    .findById(id)
                                    .orElse(null);
        try{
            if(thePermission != null){
                this.thePermissionRepository.delete(thePermission);
                this.theJsonResponse.setMessage("El permiso se ha eliminado.");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            }else{
                this.theJsonResponse.setMessage("No se encontró permiso.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        }catch(Exception e){
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al crear permiso.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }
}
