package microservises.mssegurity.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document

public class Profile {
    @Id
    private String _id;
    private String name;
    private String last_name;
    //private String profile_photo;
    private String birthday;
    //private String background_image;
    private String number_phone;
    @DBRef 
    @Indexed(unique = true)
    private User theUser;

    public Profile(String name, String last_name, String birthday, String number_phone){
        this.name = name;
        this.last_name = last_name;
        this.birthday = birthday;
        this.number_phone = number_phone;
    }

    public String get_id() {
        return _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    //public String getProfile_photo() {
    //    return profile_photo;
    //}

    //public void setProfile_photo(String profile_photo) {
    //    this.profile_photo = profile_photo;
    //}

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    //public String getBackground_image() {
    //    return background_image;
    //}

    //public void setBackground_image(String background_image) {
    //    this.background_image = background_image;
    //}

    public String getNumber_phone() {
        return number_phone;
    }

    public void setNumber_phone(String number_phone) {
        this.number_phone = number_phone;
    }

    public User getTheUser() {
        return theUser;
    }

    public void setTheUser(User theUser) {
        this.theUser = theUser;
    }

}
