package com.flavorgram.fgserver.dto.comment;

import com.flavorgram.fgserver.model.authentication.UserData;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
  private String description;
  private UserData author;
  private String post;
  private String label;
}