package com.flavorgram.fgserver.controller.authentication;

import javax.swing.text.html.parser.Entity;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flavorgram.fgserver.dto.authentication.AuthenticationRequest;
import com.flavorgram.fgserver.dto.authentication.AuthenticationResponse;
import com.flavorgram.fgserver.dto.authentication.RegisterRequest;
import com.flavorgram.fgserver.exception.authentication.UserAlreadyExistsException;
import com.flavorgram.fgserver.service.authentication.AuthenticationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

  private final AuthenticationService authenticationService;

  @PostMapping("/register")
  @CrossOrigin
  public HttpEntity<AuthenticationResponse> register(
      @RequestBody RegisterRequest request) {

    try {
      AuthenticationResponse token = authenticationService.register(request);
      return new ResponseEntity<>(token, HttpStatus.CREATED);

    } catch (UserAlreadyExistsException e) {
      log.error(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }

  }

  @PostMapping("/authenticate")
  @CrossOrigin
  public ResponseEntity<AuthenticationResponse> register(
      @RequestBody AuthenticationRequest request) {

    try {
      AuthenticationResponse token = authenticationService.authenticate(request);
      return new ResponseEntity<>(token, HttpStatus.OK);
    } catch (UsernameNotFoundException e) {
      log.error(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    } catch (AuthenticationException ae) {
      log.error(ae.getMessage());
      return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }
  }
}
