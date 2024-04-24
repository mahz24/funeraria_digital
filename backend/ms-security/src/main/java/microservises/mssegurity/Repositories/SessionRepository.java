package microservises.mssegurity.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import microservises.mssegurity.Models.Session;

public interface SessionRepository  extends MongoRepository<Session, String>{
    @Query("{'theUser.$id': ObjectId(?0),'token2FA': ?1}")
    Session getSessionbyUserId(String userId, int token2FA);
}
