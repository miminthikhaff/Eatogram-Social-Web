package com.flavorgram.fgserver.exception.notifications;

public class NotificationsNotFoundException extends RuntimeException {
  private String msg;

  public NotificationsNotFoundException() {

  }

  public NotificationsNotFoundException(String message) {
    super(message);
    this.msg = message;
  }
}
