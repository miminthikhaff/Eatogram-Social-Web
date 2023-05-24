package com.flavorgram.fgserver.repository.notification;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flavorgram.fgserver.model.notification.Notification;

public interface NotificationRespository extends MongoRepository<Notification, String> {
  public List<Notification> findByUser(String user);
}
