package com.flavorgram.fgserver.controller.Profile;

import java.util.List;

import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.server.ResponseStatusException;

import com.flavorgram.fgserver.dto.user.userRequest;
import com.flavorgram.fgserver.exception.ResourceNotFoundException;
import com.flavorgram.fgserver.model.authentication.User;
import com.flavorgram.fgserver.repository.authentication.UserRepository;
import com.flavorgram.fgserver.service.Profile.UserService;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    final private UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<EntityModel<User>>> getUsers() {
        // List<User> users = userService.getUsers();
        // return new ResponseEntity<>(users, HttpStatus.OK);
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody userRequest ur)
            throws IOException {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        // existingUser.setEmail(ur.getEmail());
        existingUser.setFirstName(ur.getFirstName());
        existingUser.setLastName(ur.getLastName());
        existingUser.setBio(ur.getBio());
        log.info(ur.getBio());

        User updatedUser = userRepository.save(existingUser);
        return ResponseEntity.ok().body(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/users/{userId}/follow/{followedUserId}")
    public ResponseEntity<Void> followUser(@PathVariable("userId") String userId,
            @PathVariable("followedUserId") String followedUserId) {
        userService.followedUser(userId, followedUserId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/users/{userId}/unfollow/{unfollowedUserId}")
    public ResponseEntity<Void> unfollowUser(@PathVariable("userId") String userId,
            @PathVariable("unfollowedUserId") String unfollowedUserId) {
        userService.unfollowUser(userId, unfollowedUserId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}