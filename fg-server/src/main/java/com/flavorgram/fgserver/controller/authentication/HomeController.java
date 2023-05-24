package com.flavorgram.fgserver.controller.authentication;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.flavorgram.fgserver.controller.Post.PostController;
import com.flavorgram.fgserver.dto.authentication.AuthenticationResponse;
import com.flavorgram.fgserver.dto.authentication.RegisterRequest;
import com.flavorgram.fgserver.model.authentication.UserData;
import com.flavorgram.fgserver.service.authentication.AuthenticationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class HomeController {

  private final AuthenticationService authenticationService;

  /**
   * Get user details
   * 
   * @param principal
   * @return user details as principal
   */
  @CrossOrigin
  @GetMapping("/social")
  @ResponseStatus(HttpStatus.OK)
  public UserData socialUser(
      OAuth2AuthenticationToken oAuth2AuthenticationToken) {
    try {

      var user = authenticationService.getSocialUser(oAuth2AuthenticationToken.getPrincipal().getAttribute("email"));
      // EntityModel<UserData> userDataWithLinks = EntityModel.of(user);
      // userDataWithLinks.add(
      // WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getAllPosts()).withRel("post"));
      return user;
    } catch (UsernameNotFoundException e) {

      // EntityModel<UserData> userDataWithLinks = EntityModel.of(user);
      // userDataWithLinks.add(
      // WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getAllPosts()).withRel("post"));
      var user = authenticationService.getSocialUser(oAuth2AuthenticationToken.getPrincipal().getAttribute("email"));
      log.info(user.toString());
      return user;

    }
  }

  @CrossOrigin
  @GetMapping("/user")
  @ResponseStatus(HttpStatus.OK)
  public UserData user(
      UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) {
    var user = authenticationService.getSocialUser(usernamePasswordAuthenticationToken.getName());

    // EntityModel<UserData> userDataWithLinks = EntityModel.of(user);
    // userDataWithLinks
    // .add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getAllPosts()).withRel("post"));
    return user;
  }

}