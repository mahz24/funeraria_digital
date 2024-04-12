package microservises.mssegurity.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public class Statistic {
    @Id
    private String _id;
    private int numberErrorValidation;
    private int numberErrorAuthorization;
    @DBRef User theUser;

    public Statistic(){}

    public int getnNumberErrorValidation(){
        return numberErrorValidation;
    }

    public void setNumberErrorValidation(int numberErrorValidation){
        this.numberErrorValidation = numberErrorValidation;
    }

    public int getnNumberErrorAuthorization(){
        return numberErrorAuthorization;
    }

    public void setNumberErrorAuthorization(int numberErrorAuthorization){
        this.numberErrorAuthorization = numberErrorAuthorization;
    }

    public User getTheUser(){
        return theUser;
    }

    public void setTheUser(User theUser){
        this.theUser = theUser;
    }
}
