package com.flavorgram.fgserver.service.status;

import java.io.Console;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flavorgram.fgserver.controller.status.StatusController;
import com.flavorgram.fgserver.exception.ResourceNotFoundException;
import com.flavorgram.fgserver.model.status.Status;
import com.flavorgram.fgserver.repository.status.StatusRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
public class StatusServiceImplementation implements StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public Status createStatus(Status status) {
        return statusRepository.save(status);
    }

    @Override
    public Status updateStatus(Status status) {
        Optional<Status> Flavorgram = this.statusRepository.findById(status.getStatus_id());

        if (Flavorgram.isPresent()) {
            Status statusUpdate = Flavorgram.get();
            statusUpdate.setStatus_id(status.getStatus_id());
            statusUpdate.setUser_id(status.getUser_id());
            statusUpdate.setStatusPath(status.getStatusPath());
            statusUpdate.setCaption(status.getCaption());
            statusUpdate.setTimestamp(new Date());
            statusRepository.save(statusUpdate);
            return statusUpdate;
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + status.getStatus_id());
        }
    }

    @Override
    public List<EntityModel<Status>> getAllStatus() {
        List<Status> statusLists = null;
        List<EntityModel<Status>> statusListsWithLinks = new ArrayList<>();

        try {
            statusLists = statusRepository.findAll();

            for (Status status : statusLists) {

                EntityModel<Status> statusWithLink = EntityModel.of(status);
                statusWithLink.add(WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(StatusController.class).getAllStatus())
                        .withSelfRel());
                statusWithLink.add(WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(StatusController.class).getStatusById(status.getStatus_id()))
                        .withRel("status"));
                statusWithLink.add(Link.of("http://localhost:8081/status").withRel("update"));
                statusWithLink.add(Link.of("http://localhost:8081/status").withRel("delete"));

                statusListsWithLinks.add(statusWithLink);

            }

        } catch (Exception e) {
        }
        return statusListsWithLinks;
    }

    @Override
    public Status getStatusById(String statusId) {

        Optional<Status> Flavorgram = this.statusRepository.findById(statusId);

        if (Flavorgram.isPresent()) {
            return Flavorgram.get();
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + statusId);
        }
    }

    @Override
    public void deleteStatus(String statusId) {
        Optional<Status> Flavorgram = this.statusRepository.findById(statusId);

        if (Flavorgram.isPresent()) {
            this.statusRepository.delete(Flavorgram.get());
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + statusId);
        }

    }
}
