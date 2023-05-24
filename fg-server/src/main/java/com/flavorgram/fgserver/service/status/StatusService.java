package com.flavorgram.fgserver.service.status;

import java.util.List;

import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Service;

import com.flavorgram.fgserver.model.status.Status;

@Service
public interface StatusService {

    Status createStatus(Status status);

    Status updateStatus(Status status);

    List<EntityModel<Status>> getAllStatus();

    Status getStatusById(String id);

    void deleteStatus(String Id);

}
