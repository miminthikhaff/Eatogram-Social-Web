package com.flavorgram.fgserver.exception.authentication;

public class UserAlreadyExistsException
    extends RuntimeException {

  private String msg;

  public UserAlreadyExistsException() {
  }

  public UserAlreadyExistsException(String message) {
    super(message);
    this.msg = message;
  }
}
