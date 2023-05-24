package com.flavorgram.fgserver.repository.message;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.flavorgram.fgserver.model.message.Message;

@Repository
public interface MessageRepository extends MongoRepository <Message , String> {
    
}
