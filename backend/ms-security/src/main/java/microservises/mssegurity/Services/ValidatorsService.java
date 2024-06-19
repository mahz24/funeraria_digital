package microservises.mssegurity.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import microservises.mssegurity.Models.Permission;
import microservises.mssegurity.Models.Role;
import microservises.mssegurity.Models.RolePermission;
import microservises.mssegurity.Models.User;
import microservises.mssegurity.Repositories.PermissionRepository;
import microservises.mssegurity.Repositories.RolePermissionRepository;
import microservises.mssegurity.Repositories.UserRepository;

@Service
public class ValidatorsService {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private PermissionRepository thePermissionRepository;
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private RolePermissionRepository theRolePermissionRepository;
    private static final String BEARER_PREFIX = "Bearer ";

    public boolean validationRolePermission(HttpServletRequest request, String url, String method) {
        boolean success = false;
        User theUser = this.getUser(request);
        if (theUser != null) {
            Role theRole = theUser.getRole();
            System.out.println("El rol "+theRole);
            System.out.println("Antes URL " + url + " metodo " + method);
            url = url.replaceAll("[0-9a-fA-F]{24}|\\d+", "?");
            System.out.println("URL " + url + " metodo " + method);
            Permission thePermission = this.thePermissionRepository.getPermission(url, method);
            System.out.println("El permiso "+thePermission);
            if (theRole != null && thePermission != null) {
                System.out.println("Rol " + theRole.getName() + " Permission " + thePermission.getUrl());
                RolePermission theRolePermission = this.theRolePermissionRepository.getRolePermission(theRole.get_id(),
                        thePermission.get_id());
                if (theRolePermission == null) { // cambiar == por !=
                    success = true;
                }
            } else {
                success = false;
            }
        }
        return success;
    }

    public User getUser(final HttpServletRequest request) {
        User theUser = null;
        String authorizationHeader = request.getHeader("Authorization");
        System.out.println("Header " + authorizationHeader);
        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER_PREFIX)) {
            String token = authorizationHeader.substring(BEARER_PREFIX.length());
            System.out.println("Bearer Token: " + token);
            User theUserFromToken = jwtService.getUserFromToken(token);
            System.out.println("User from token: " + theUserFromToken);
            if (theUserFromToken != null) {
                theUser = this.theUserRepository.findById(theUserFromToken.get_id())
                        .orElse(null);
                theUser.setPassword("");
            }
        }
        return theUser;
    }
}