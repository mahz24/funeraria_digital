package microservises.mssegurity.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import microservises.mssegurity.Models.Profile;

public interface ProfileRepository extends MongoRepository<Profile, String>{
    @Query("{'theUser.$id': ObjectId(?0)}")
    Profile getProfilebyUserId(String userId);
}
