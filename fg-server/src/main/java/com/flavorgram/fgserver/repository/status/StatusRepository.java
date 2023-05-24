package com.flavorgram.fgserver.repository.status;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.flavorgram.fgserver.model.status.Status;

@Repository
public interface StatusRepository extends MongoRepository<Status, String> {

}

