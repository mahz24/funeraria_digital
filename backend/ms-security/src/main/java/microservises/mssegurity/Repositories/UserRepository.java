package microservises.mssegurity.Repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import microservises.mssegurity.Models.User;

public interface UserRepository extends MongoRepository<User, String>{
     @Query("{'email': ?0}")
    public User getUserByEmail(String email);
}
