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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import microservises.mssegurity.Models.Permission;
import microservises.mssegurity.Models.Role;
import microservises.mssegurity.Models.RolePermission;
import microservises.mssegurity.Repositories.PermissionRepository;
import microservises.mssegurity.Repositories.RolePermissionRepository;
import microservises.mssegurity.Repositories.RoleRepository;
import microservises.mssegurity.Services.JSONResponsesService;

@CrossOrigin
@RestController
@RequestMapping("/api/role-permission")
public class RolePermissionController {
    @Autowired
    private RoleRepository theRoleRepository;
    @Autowired
    private PermissionRepository thePermissionRepository;
    @Autowired
    private RolePermissionRepository theRolePermissionRepository;
    @Autowired
    private JSONResponsesService theJsonResponse;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("role/{roleId}/permission/{permissionId}")
    public ResponseEntity<?> createe(@PathVariable String roleId, @PathVariable String permissionId) {
        RolePermission theRolePermission = this.theRolePermissionRepository.getRolePermission(roleId, permissionId);
        System.out.println(theRolePermission);
        Role theRole = this.theRoleRepository
                .findById(roleId)
                .orElse(null);
        Permission thePermission = this.thePermissionRepository
                .findById(permissionId)
                .orElse(null);
        try {
            if (theRolePermission != null) {
                this.theJsonResponse.setMessage("El permiso para este rol ya existe");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            }
            if (theRole != null && thePermission != null && theRolePermission == null) {
                RolePermission newRolePermission = new RolePermission();
                newRolePermission.setRole(theRole);
                newRolePermission.setPermission(thePermission);
                this.theRolePermissionRepository.save(newRolePermission);
                this.theJsonResponse.setData(newRolePermission);
                this.theJsonResponse.setMessage("Se ha creado el permiso para el rol");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            } else {
                this.theJsonResponse.setMessage("El rol o el permiso no existe");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        } catch (Exception e) {
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al crear el permiso para el rol");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @PutMapping("role/{roleId}/permission/{permissionId}")
    public ResponseEntity<?> update(@PathVariable String roleId, @PathVariable String permissionId) {
        Role theRole = this.theRoleRepository
                .findById(roleId)
                .orElse(null);
        Permission thePermission = this.thePermissionRepository
                .findById(permissionId)
                .orElse(null);
        RolePermission theRolePermission = this.theRolePermissionRepository.getRolePermission(roleId, permissionId);
        try {
            if (theRolePermission == null) {
                this.theJsonResponse.setMessage("El permiso para este rol no existe");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            }
            if (theRole != null && thePermission != null && theRolePermission != null) {
                RolePermission newRolePermission = new RolePermission();
                newRolePermission.setRole(theRole);
                newRolePermission.setPermission(thePermission);
                this.theRolePermissionRepository.save(newRolePermission);
                this.theJsonResponse.setData(newRolePermission);
                this.theJsonResponse.setMessage("Se ha actulizado el permiso del rol");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            } else {
                this.theJsonResponse.setMessage("El rol o el permiso no existe");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        } catch (Exception e) {
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al actualizar el permiso para el rol");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public ResponseEntity<?> deletee(@PathVariable String id) {
        RolePermission theRolePermission = this.theRolePermissionRepository
                .findById(id)
                .orElse(null);
        try {
            if (theRolePermission != null) {
                this.theRolePermissionRepository.delete(theRolePermission);
                this.theJsonResponse.setData(theRolePermission);
                this.theJsonResponse.setMessage("Se ha eliminado el permiso para el rol");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            } else {
                this.theJsonResponse.setMessage("No se encontró el permiso o el rol, para eliminar el permiso del rol");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        } catch (Exception e) {
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al buscar el permiso a eliminar del rol.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    // @GetMapping("role/{roleId}")
    // public List<RolePermission> findByRole(@PathVariable String roleId) {
    // return this.theRolePermissionRepository.getPermissionsByRole(roleId);
    // }

    @GetMapping("role/{roleId}")
    public ResponseEntity<?> findByRole(@PathVariable String roleId) {
        Role theRole = this.theRoleRepository
                .findById(roleId)
                .orElse(null);
        try {
            if (theRole != null) {
                List<RolePermission> permissions = theRolePermissionRepository.getPermissionsByRole(roleId);
                if (permissions.size() == 0) {
                    this.theJsonResponse.setMessage("Este rol no tiene permisos asignados");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
                } else {
                    this.theJsonResponse.setData(permissions);
                    this.theJsonResponse.setMessage("Los permisos de este rol han sido encontrados");
                    return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
                }
            } else {
                this.theJsonResponse.setMessage("No se encontró el rol");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        } catch (Exception e) {
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al buscar los permisos del rol.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }
}