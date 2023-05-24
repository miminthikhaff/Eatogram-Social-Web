package com.flavorgram.fgserver.service.message;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flavorgram.fgserver.exception.ResourceNotFoundException;
import com.flavorgram.fgserver.model.message.Conversation;
import com.flavorgram.fgserver.repository.message.ConversationRepository;

@Service
@Transactional
public class ConversationServiceImplementaion implements ConversationService {
    @Autowired
    private ConversationRepository conversationRepository;

    @Override
    public Conversation createConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    @Override
    public List<Conversation> getAllConversation(Iterable<String> id) {
        return this.conversationRepository.findAllById(id);
    }

    @Override
    public void deleteConversation(String conversationId) {
        Optional<Conversation> Flavorgram = this.conversationRepository.findById(conversationId);

        if (Flavorgram.isPresent()) {
            this.conversationRepository.delete(Flavorgram.get());
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + conversationId);
        }

    }
}
