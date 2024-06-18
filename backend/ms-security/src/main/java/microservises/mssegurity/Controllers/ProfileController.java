package microservises.mssegurity.Controllers;

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
import org.springframework.web.bind.annotation.RestController;

import microservises.mssegurity.Models.Profile;
import microservises.mssegurity.Models.User;
import microservises.mssegurity.Repositories.ProfileRepository;
import microservises.mssegurity.Repositories.UserRepository;
import microservises.mssegurity.Services.JSONResponsesService;

@CrossOrigin
@RestController
@RequestMapping("/profiles") // con s al final
public class ProfileController {
    @Autowired
    private ProfileRepository theProfileRepository;
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private JSONResponsesService theJsonResponse;

    @PostMapping("user/{id}")
    public ResponseEntity<?> create(@PathVariable String id, @RequestBody Profile theProfile){
        try{
            User theUser = theUserRepository.findById(id).orElse(null);
            if(theUser != null){
                theProfile.setTheUser(theUser);
                Profile actualProfile = this.theProfileRepository.save(theProfile);

                theJsonResponse.setData(actualProfile);
                theJsonResponse.setMessage("Se ha creado el perfil.");
                return ResponseEntity.status(HttpStatus.OK).body(theJsonResponse.getFinalJSON());
            }else{
                this.theJsonResponse.setMessage("No se encontró usuario.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        }catch (Exception e){
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al buscar usuario.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        try{
            Profile theProfile = theProfileRepository.getProfilebyUserId(id);
            if(theProfile != null){
                this.theProfileRepository.delete(theProfile);
                this.theJsonResponse.setMessage("El perfil se ha eliminado.");
                return ResponseEntity.status(HttpStatus.OK).body(this.theJsonResponse.getFinalJSON());
            }else{
                this.theJsonResponse.setMessage("No se encontró perfil.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        }catch (Exception e){
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al buscar perfil.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Profile theNewProfile){
        Profile theActualProfile = this.theProfileRepository.getProfilebyUserId(id);
        try{
            if(theActualProfile != null){
                theActualProfile.setName(theNewProfile.getName());
                theActualProfile.setLast_name(theNewProfile.getLast_name());
                theActualProfile.setBirthday(theNewProfile.getBirthday());
                theActualProfile.setNumber_phone(theNewProfile.getNumber_phone());
                Profile theProfile = this.theProfileRepository.save(theActualProfile);
                theJsonResponse.setData(theProfile);
                theJsonResponse.setMessage("Se ha actualizado el perfil.");
                return ResponseEntity.status(HttpStatus.OK).body(theJsonResponse.getFinalJSON());
            }else{
                this.theJsonResponse.setMessage("No se encontró perfil.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.theJsonResponse.getFinalJSON());
            }
        }catch (Exception e){
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al buscar perfil.");
            this.theJsonResponse.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
        }
    }

    @GetMapping("{id}")
    public Profile findByUser(@PathVariable String id){
        try{
            Profile theProfile = this.theProfileRepository.getProfilebyUserId(id);
            if(theProfile != null){
                return theProfile;
            }else{
                return theProfile;
            }
        }catch (Exception e){
            this.theJsonResponse.setData(null);
            this.theJsonResponse.setMessage("Error al buscar perfil.");
            this.theJsonResponse.setError(e.toString());
            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.theJsonResponse.getFinalJSON());
            return null;
        }
    }
}
