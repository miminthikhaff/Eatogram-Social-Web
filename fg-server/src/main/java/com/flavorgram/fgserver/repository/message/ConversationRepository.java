package com.flavorgram.fgserver.repository.message;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.flavorgram.fgserver.model.message.Conversation;

@Repository
public interface ConversationRepository extends MongoRepository <Conversation , String> {
    
}
