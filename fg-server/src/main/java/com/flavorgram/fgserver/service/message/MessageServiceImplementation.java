package com.flavorgram.fgserver.service.message;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flavorgram.fgserver.controller.message.MessageController;
import com.flavorgram.fgserver.exception.ResourceNotFoundException;
import com.flavorgram.fgserver.model.message.Message;
import com.flavorgram.fgserver.repository.message.MessageRepository;

@Service
@Transactional
public class MessageServiceImplementation implements MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Override
    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public Message updateMessage(Message message) {
        Optional<Message> Flavorgram = this.messageRepository.findById(message.getMessage_id());

        if (Flavorgram.isPresent()) {
            Message messageUpdate = Flavorgram.get();
            messageUpdate.setMessage_id(message.getMessage_id());
            messageUpdate.setSender(message.getSender());
            // messageUpdate.setReceiver(message.getReceiver());
            messageUpdate.setMessage(message.getMessage());
            messageUpdate.setSentDate(message.getSentDate());
            // messageUpdate.setReceivedDate(message.getReceivedDate());
            messageRepository.save(messageUpdate);
            return messageUpdate;
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + message.getMessage_id());
        }
    }

    @Override
    public List<EntityModel<Message>> getAllMessage() {
        List<Message> messageLists = null;
        List<EntityModel<Message>> messageListsWithLinks = new ArrayList<>();

        try {
            messageLists = messageRepository.findAll();

            for (Message message : messageLists) {

                EntityModel<Message> messageWithLink = EntityModel.of(message);
                messageWithLink.add(WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(MessageController.class).getAllMessage())
                        .withSelfRel());
                        messageWithLink.add(WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(MessageController.class).getMessageById(message.getMessage_id()))
                        .withRel("messages"));
                        messageWithLink.add(Link.of("http://localhost:8081/messages").withRel("update"));
                messageWithLink.add(Link.of("http://localhost:8081/messages").withRel("delete"));
                // log.info(statusWithLink.toString());
                messageListsWithLinks.add(messageWithLink);

            }

        } catch (Exception e) {
        }
        return messageListsWithLinks;
    }

    @Override
    public Message getMessageById(String messageId) {

        Optional<Message> Flavorgram = this.messageRepository.findById(messageId);
   
        if (Flavorgram.isPresent()) {
            return Flavorgram.get();
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + messageId);
        }
    }

    @Override
    public void deleteMessage(String messageId) {
        Optional<Message> Flavorgram = this.messageRepository.findById(messageId);

        if (Flavorgram.isPresent()) {
            this.messageRepository.delete(Flavorgram.get());
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + messageId);
        }

    }
}
