package microservises.mssegurity.Controllers;

import microservises.mssegurity.Models.Fidelidad;
import microservises.mssegurity.Models.User;
import microservises.mssegurity.Repositories.FidelidadRepository;
import microservises.mssegurity.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin
@RestController
@RequestMapping("/fidelidad")
public class FidelidadController {
    @Autowired
    private FidelidadRepository fidelidadRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("user/{id}")
    public Fidelidad create (@PathVariable String id){
        try {
            User theUser = userRepository.findById(id).orElse(null);
            if(theUser != null){
                Fidelidad theFidelidad = new Fidelidad();
                theFidelidad.setTheUser(theUser);
                return this.fidelidadRepository.save(theFidelidad);
            }else{
                System.out.println(theUser);
                return null;
            }
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("{id}")
    public Fidelidad findByUser(@PathVariable String id){
        try {
            Fidelidad theFidelidad = this.fidelidadRepository.getPuntosByUserId(id);
            System.out.println(theFidelidad);
            if(theFidelidad != null){
                return theFidelidad;
            }else{
                return theFidelidad;
            }
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @PutMapping("{id}")
    public Fidelidad update(@PathVariable String id, @RequestBody Fidelidad theFidelidad){
        Fidelidad actualFidelidad = this.fidelidadRepository.getPuntosByUserId(id);
        try {
            if(actualFidelidad != null){
                actualFidelidad.setPuntos(theFidelidad.getPuntos());
                return fidelidadRepository.save(actualFidelidad);
            }else{
                System.out.println(actualFidelidad);
                return null;
            }
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}

