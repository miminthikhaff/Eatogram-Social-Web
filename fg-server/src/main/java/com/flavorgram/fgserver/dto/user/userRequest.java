package com.flavorgram.fgserver.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class userRequest {
  private String firstName;
  private String lastName;
  private String username;
  private String profilePic;
  private String bio;

}