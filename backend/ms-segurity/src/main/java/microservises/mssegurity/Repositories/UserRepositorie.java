package microservises.mssegurity.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import microservises.mssegurity.Models.User;

public interface UserRepositorie extends MongoRepository<User, String>{
    
}
