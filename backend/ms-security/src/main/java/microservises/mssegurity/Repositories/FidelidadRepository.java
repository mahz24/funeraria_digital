package microservises.mssegurity.Repositories;

import microservises.mssegurity.Models.Fidelidad;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableMongoRepositories
public interface FidelidadRepository extends MongoRepository<Fidelidad, String> {
    @Query("{'theUser.$id': ObjectId(?0)}")
    Fidelidad getPuntosByUserId(String theUserId);
}
