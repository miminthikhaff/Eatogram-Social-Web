package com.flavorgram.fgserver.controller.status;

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

import com.flavorgram.fgserver.model.status.Status;
import com.flavorgram.fgserver.service.status.StatusService;

@RestController
public class StatusController {

    @Autowired
    private StatusService statusService;

    @GetMapping("/status")
    public ResponseEntity<List<EntityModel<Status>>> getAllStatus() {
        return ResponseEntity.ok().body(statusService.getAllStatus());
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<Status> getStatusById(@PathVariable String id) {
        return ResponseEntity.ok().body(statusService.getStatusById(id));
    }

    @PostMapping("/status")
    public ResponseEntity<Status> createStatus(@RequestBody Status status) {
        return ResponseEntity.ok().body(this.statusService.createStatus(status));
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Status> updateStatus(@PathVariable String id, @RequestBody Status status) {
        status.setStatus_id(id);
        return ResponseEntity.ok().body(this.statusService.updateStatus(status));
    }

    @DeleteMapping("/status/{id}")
    public HttpStatus deleteStatus(@PathVariable String id) {
        this.statusService.deleteStatus(id);
        return HttpStatus.OK;
    }
}
