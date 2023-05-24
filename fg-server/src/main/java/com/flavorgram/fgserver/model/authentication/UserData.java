package com.flavorgram.fgserver.model.authentication;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserData {

  @Id
  private String id;
  private String username;
  private String firstname;
  private String lastname;
  private String email;
  private List<String> interestedCatgories;
  private String user_id;

}
