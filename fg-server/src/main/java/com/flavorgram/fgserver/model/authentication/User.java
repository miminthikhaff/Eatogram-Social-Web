package com.flavorgram.fgserver.model.authentication;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
public class User implements UserDetails {

  @Id
  private String id;
  private String firstName;
  private String lastName;
  private String email;
  private String password;
  private Role role;
  private List<String> follows;
  private List<String> following;
  private List<User> UserFollows;// new
  private List<User> Userfollowings;// new
  // private MultipartFile profilePic;
  private byte[] profilePic;
  private String bio;
  // private List<SuggestedUser> suggestedUsers;

  public User(String firstname, String lastname, String email, String password) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
    this.password = password;
    this.Userfollowings = new ArrayList<>();
    this.UserFollows = new ArrayList<>();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getUsername() {
    return email;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getEmail() {
    return email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Override
  public String getPassword() {
    return password;
  }

  // public void setProfilePicture(MultipartFile profilePicture) {
  // this.profilePic = profilePicture;
  // }

  // public MultipartFile getProfilePicture() {
  // return profilePic;
  // }

  public void setProfilePicture(byte[] profilePicture) {
    this.profilePic = profilePicture;
  }

  public byte[] getProfilePicture() {
    return profilePic;
  }

  public void setFollows(List<String> follows) {
    this.follows = follows;
  }

  public List<String> getFollows() {
    return follows;
  }

  public void setFollowing(List<String> following) {
    this.following = following;
  }

  public List<String> getFollowing() {
    return following;
  }

  public List<User> getFollowings() {
    return Userfollowings;
  }

  public void setFollowings(List<User> Userfollowings) {
    this.Userfollowings = Userfollowings;
  }

  public List<User> getUserFollows() {
    return UserFollows;
  }

  public void setUserFollows(List<User> Userfollows) {
    this.UserFollows = Userfollows;
  }

  public String getBio() {
    return bio;
  }

  public void setBio(String bio) {
    this.bio = bio;
  }

  // public List<SuggestedUser> getSuggestedUsers() {
  // return suggestedUsers;
  // }

  // public void setSuggestedUsers(List<SuggestedUser> suggestedUsers) {
  // this.suggestedUsers = suggestedUsers;
  // }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}