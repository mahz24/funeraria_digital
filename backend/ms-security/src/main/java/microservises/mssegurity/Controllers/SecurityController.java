package microservises.mssegurity.Controllers;

import jakarta.servlet.http.HttpServletResponse;
import microservises.mssegurity.Models.User;
import microservises.mssegurity.Repositories.UserRepository;
import microservises.mssegurity.Services.EncryptionService;
import microservises.mssegurity.Services.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("login")
    public String login(@RequestBody User theUser, final HttpServletResponse response) throws IOException {
        String token = "";
        User actualUser = this.theUserRepository.getUserByEmail(theUser.getEmail());
        if (actualUser != null &&
                actualUser.getPassword().equals(this.theEncryptionService.convertSHA256(theUser.getPassword()))) {
            token = this.theJwtService.generateToken(actualUser);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
        return token;
    }
}
