package microservises.mssegurity.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import microservises.mssegurity.Models.Fidelidad;

public interface FidelidadRepository extends MongoRepository<Fidelidad, String> {
    @Query("{'user.$id': ObjectId(?0)}")
    Fidelidad getFidelidadbyUserId(String userId);

    
}
