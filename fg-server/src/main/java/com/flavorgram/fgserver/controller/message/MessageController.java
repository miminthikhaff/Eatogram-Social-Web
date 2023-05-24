package com.flavorgram.fgserver.controller.message;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.flavorgram.fgserver.model.message.Message;
import com.flavorgram.fgserver.service.message.MessageService;

@RestController
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping("/messages")
    public ResponseEntity<List<EntityModel<Message>>> getAllMessage() {
        return ResponseEntity.ok().body(messageService.getAllMessage());
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable String id) {
        return ResponseEntity.ok().body(messageService.getMessageById(id));
    }

    @PostMapping("/messages")
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        return ResponseEntity.ok().body(this.messageService.createMessage(message));
    }

    @PutMapping("/messages/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable String id, @RequestBody Message message) {
        message.setMessage_id(id);
        return ResponseEntity.ok().body(this.messageService.updateMessage(message));
    }

    @DeleteMapping("/messages/{id}")
    public HttpStatus deleteMessage(@PathVariable String id) {
        this.messageService.deleteMessage(id);
        return HttpStatus.OK;
    }
}
