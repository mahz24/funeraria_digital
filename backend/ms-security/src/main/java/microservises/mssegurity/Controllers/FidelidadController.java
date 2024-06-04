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

import microservises.mssegurity.Repositories.FidelidadRepository;
import microservises.mssegurity.Repositories.UserRepository;
import microservises.mssegurity.Services.JSONResponsesService;
import microservises.mssegurity.Models.Fidelidad;
import microservises.mssegurity.Models.User;

@CrossOrigin
@RestController
@RequestMapping("/fidelidades")
public class FidelidadController {

    @Autowired
    private JSONResponsesService jsonResponsesService;
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private FidelidadRepository theFidelidadRepository;

    @SuppressWarnings("unused")
     @PostMapping("/user/{id}")
    public ResponseEntity<?> create(@PathVariable String id, @RequestBody Fidelidad theFidelidad){
        try{
            User theUser = theUserRepository.findById(id).orElse(null);
            if(theUser != null){
                theFidelidad.setUser(theUser);
                theFidelidad.setPuntos(20);
                Fidelidad actualFidelidad = this.theFidelidadRepository.save(theFidelidad);

                jsonResponsesService.setData(actualFidelidad);
                jsonResponsesService.setMessage("Se ha creado la fidelidad.");
                return ResponseEntity.status(HttpStatus.OK).body(jsonResponsesService.getFinalJSON());
            }else{
                this.jsonResponsesService.setMessage("No se encontró usuario.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.jsonResponsesService.getFinalJSON());
            }
        }catch (Exception e){
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setMessage("Error al buscar usuario.");
            this.jsonResponsesService.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.jsonResponsesService.getFinalJSON());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Fidelidad theNewFidelidad){
        Fidelidad theActualFidelidad = this.theFidelidadRepository.findById(id).orElse(null);
        try{
            if(theActualFidelidad != null){
                theActualFidelidad.setPuntos(theNewFidelidad.getPuntos());
                Fidelidad theFidelidad = this.theFidelidadRepository.save(theActualFidelidad);
                jsonResponsesService.setData(theFidelidad);
                jsonResponsesService.setMessage("Se ha actualizado la fidelidad");
                return ResponseEntity.status(HttpStatus.OK).body(jsonResponsesService.getFinalJSON());
            }else{
                this.jsonResponsesService.setMessage("No se encontró la fidelidad.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.jsonResponsesService.getFinalJSON());
            }
        }catch (Exception e){
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setMessage("Error al buscar perfil.");
            this.jsonResponsesService.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.jsonResponsesService.getFinalJSON());
        }
    }

    @GetMapping("{id}")
    public Fidelidad findByUser(@PathVariable String id){
        try{
            Fidelidad theFidelidad = this.theFidelidadRepository.getFidelidadbyUserId(id);
            System.out.println(theFidelidad);
            if(theFidelidad != null){
                jsonResponsesService.setData(theFidelidad);
                jsonResponsesService.setMessage("Se ha encontrado el perfil.");
                //return ResponseEntity.status(HttpStatus.OK).body(this.jsonResponsesService.getFinalJSON());
                return theFidelidad;
            }else{
                this.jsonResponsesService.setMessage("No se encontró perfil.");
                //return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.jsonResponsesService.getFinalJSON());
                return theFidelidad;
            }
        }catch (Exception e){
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setMessage("Error al buscar perfil.");
            this.jsonResponsesService.setError(e.toString());
            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.jsonResponsesService.getFinalJSON());
            return null;
        }
    }

     @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        try{
            Fidelidad theFidelidad = theFidelidadRepository.findById(id).orElse(null);
            if(theFidelidad != null){
                this.theFidelidadRepository.delete(theFidelidad);
                this.jsonResponsesService.setMessage("La fidelidad se ha eliminado.");
                return ResponseEntity.status(HttpStatus.OK).body(this.jsonResponsesService.getFinalJSON());
            }else{
                this.jsonResponsesService.setMessage("No se encontró fidelidad.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(this.jsonResponsesService.getFinalJSON());
            }
        }catch (Exception e){
            this.jsonResponsesService.setData(null);
            this.jsonResponsesService.setMessage("Error al buscar fidelidad.");
            this.jsonResponsesService.setError(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(this.jsonResponsesService.getFinalJSON());
        }
    }
}
