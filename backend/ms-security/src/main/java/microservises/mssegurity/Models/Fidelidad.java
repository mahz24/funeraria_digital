package microservises.mssegurity.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Fidelidad {
    @Id
    private String _id;
    private int puntos;
    @DBRef
    @Indexed(unique = true)
    private User theUser;

    public Fidelidad(){
        this.puntos = 20;
    }

    public String get_id() {
        return _id;
    }

    public int getPuntos(){
        return puntos;
    }

    public void setPuntos(int puntos){
        this.puntos = puntos;
    }

    public User getTheUser() {
        return theUser;
    }

    public void setTheUser(User theUser) {
        this.theUser = theUser;
    }
}
