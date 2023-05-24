package com.flavorgram.fgserver.service.message;
import java.util.List;

import org.springframework.stereotype.Service;

import com.flavorgram.fgserver.model.message.Conversation;

@Service
public interface ConversationService {
    Conversation createConversation(Conversation message);

    List<Conversation> getAllConversation(Iterable<String> id);

    void deleteConversation(String conversationId);
}
