package com.flavorgram.fgserver.controller.notification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flavorgram.fgserver.dto.notification.NotifcationRequest;
import com.flavorgram.fgserver.exception.notifications.NotificationsNotFoundException;
import com.flavorgram.fgserver.model.notification.Notification;
import com.flavorgram.fgserver.service.notification.NotificationService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/notification")
@Slf4j
public class NotificationController {

  @Autowired
  private NotificationService notificationService;

  @GetMapping
  public HttpEntity<List<EntityModel<Notification>>> getNotificationsByUser(@RequestParam(value = "id") String id) {
    try {

      var notifications = notificationService.getNotificationsForUser(id);
      log.info(notifications.toString());

      List<EntityModel<Notification>> notificationsWithLinks = new ArrayList<>();
      for (Notification notification : notifications) {
        EntityModel<Notification> notificationWithLink = EntityModel.of(notification);

        notificationWithLink.add(
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(this.getClass()).getNotificationsByUser(id))
                .withSelfRel());
        notificationWithLink.add(
            WebMvcLinkBuilder
                .linkTo(WebMvcLinkBuilder.methodOn(this.getClass()).deleteNotification(notification.getId()))
                .withRel("delete"));

        notificationWithLink.add(Link.of("http://localhost:8081/notification/all").withRel("delete-all"));
        notificationsWithLinks.add(notificationWithLink);
      }

      return new ResponseEntity<>(notificationsWithLinks, HttpStatus.OK);

    } catch (NotificationsNotFoundException e) {

      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping
  public HttpEntity<Notification> deleteNotification(@RequestParam(value = "id") String id) {

    try {
      var notification = notificationService.deleteNotification(id);
      return new ResponseEntity<>(notification, HttpStatus.OK);
    } catch (NotificationsNotFoundException e) {
      log.info(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/all")
  public HttpEntity<String> deleteAllNotifications(@RequestParam(value = "id") String id) {

    try {
      var count = notificationService.deleteAllNotification(id);
      return new ResponseEntity<>("Deleted " + count + " notifications", HttpStatus.OK);
    } catch (NotificationsNotFoundException e) {
      log.info(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping
  public HttpEntity<Notification> createNotification(@RequestBody NotifcationRequest notificationRequest) {
    var notification = notificationService.saveNotification(notificationRequest);
    return new ResponseEntity<>(notification, HttpStatus.OK);
  }

}
