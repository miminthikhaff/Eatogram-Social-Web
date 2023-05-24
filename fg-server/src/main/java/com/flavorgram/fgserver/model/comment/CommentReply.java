package com.flavorgram.fgserver.model.comment;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.flavorgram.fgserver.model.authentication.UserData;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentReply {

  @Id
  private String id;
  private String description;
  private String likes;
  private List<String> userLikes;

  @DocumentReference
  private UserData author;

}
