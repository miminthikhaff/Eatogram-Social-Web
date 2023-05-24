package com.flavorgram.fgserver.dto.notification;

import com.flavorgram.fgserver.model.Post.Post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotifcationRequest {
  private String description;
  private String user;
  private Post post;
  private String commenter_username;
  private String label;
}
