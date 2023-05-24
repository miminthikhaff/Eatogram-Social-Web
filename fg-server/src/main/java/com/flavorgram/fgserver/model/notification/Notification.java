package com.flavorgram.fgserver.model.notification;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.flavorgram.fgserver.model.Post.Post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
  @Id
  private String id;
  private String description;
  private String user;

  @DocumentReference
  private Post post;
  private String notification_sender;
  private String label;
}
