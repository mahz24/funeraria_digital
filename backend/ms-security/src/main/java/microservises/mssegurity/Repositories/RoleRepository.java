package microservises.mssegurity.Repositories;


import org.springframework.data.mongodb.repository.MongoRepository;

import microservises.mssegurity.Models.Role;


public interface RoleRepository extends MongoRepository<Role,String>{
   
}


