package com.flavorgram.fgserver.model.comment;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.flavorgram.fgserver.model.authentication.UserData;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "comment")
public class Comment {

  @Id
  private String id;
  private String description;
  @DocumentReference
  private UserData author;
  private String post;
  private String likes;
  private String label;
  private List<String> userLikes;
  private Boolean edited;
  private Date createdDate;
  @LastModifiedDate
  private Date ModifiedDate;
  private List<CommentReply> replies;

}
