package com.flavorgram.fgserver.exception.comment;

public class CommentsNotFoundException
    extends RuntimeException {

  private String message;

  public CommentsNotFoundException() {
  }

  public CommentsNotFoundException(String message) {
    super(message);
    this.message = message;
  }
}
