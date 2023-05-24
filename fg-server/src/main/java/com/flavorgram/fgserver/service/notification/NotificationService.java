package com.flavorgram.fgserver.service.notification;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flavorgram.fgserver.dto.notification.NotifcationRequest;
import com.flavorgram.fgserver.exception.notifications.NotificationsNotFoundException;
import com.flavorgram.fgserver.model.notification.Notification;
import com.flavorgram.fgserver.repository.notification.NotificationRespository;

@Service
public class NotificationService {
  @Autowired
  private NotificationRespository notificationRespository;

  public List<Notification> getNotificationsForUser(String user_id) {
    var notifications = notificationRespository.findByUser(user_id);

    if (notifications.isEmpty()) {
      throw new NotificationsNotFoundException("No notifications for user " + user_id);
    }

    return notifications;
  }

  public Notification deleteNotification(String id) {
    Notification notification = notificationRespository.findById(id).orElse(null);

    if (notification == null) {
      throw new NotificationsNotFoundException("Cannot find notification with id " + id);
    }

    notificationRespository.delete(notification);
    return notification;
  }

  public Notification saveNotification(NotifcationRequest notificationRequest) {

    Notification notification = Notification
        .builder()
        .description(notificationRequest.getDescription())
        .user(notificationRequest.getUser())
        .notification_sender(notificationRequest.getCommenter_username())
        .label(notificationRequest.getLabel())
        .build();
    return notificationRespository.save(notification);

  }

  public Integer deleteAllNotification(String id) {
    List<Notification> notifications = notificationRespository.findByUser(id);

    if (notifications.isEmpty()) {
      throw new NotificationsNotFoundException("No notifications for user " + id);
    }

    notificationRespository.deleteAll(notifications);
    return notifications.size();
  }
}
