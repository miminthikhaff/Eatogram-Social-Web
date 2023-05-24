package com.flavorgram.fgserver.service.Profile;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;

import com.flavorgram.fgserver.controller.Profile.UserController;
import com.flavorgram.fgserver.exception.ResourceNotFoundException;
import com.flavorgram.fgserver.model.authentication.User;
import com.flavorgram.fgserver.repository.authentication.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
public class UserServiceImplementation implements UserService{
    
    @Autowired
    private  UserRepository userRepository;

    @Override
    public User createUser(User user){
        return userRepository.save(user);
    }
    
    @Override
    public List<EntityModel<User>> getUsers(){
        List<User> userLists = null;
        List<EntityModel<User>> userListWithLinks = new ArrayList<>();

        try{
            userLists = userRepository.findAll();

            for(User user : userLists){
                EntityModel<User> userWithLink = EntityModel.of(user);
                userWithLink.add(WebMvcLinkBuilder
                    .linkTo(WebMvcLinkBuilder.methodOn(UserController.class).getUsers())
                    .withSelfRel());
                userWithLink.add(WebMvcLinkBuilder
                    .linkTo(WebMvcLinkBuilder.methodOn(UserController.class).getUserById(user.getId()))
                    .withRel("user"));   
                userWithLink.add(Link.of("http://localhost:8081/profile").withRel("update"));
                userWithLink.add(Link.of("http://localhost:8081/profile").withRel("delete"));
                log.info(userWithLink.toString());
                userListWithLinks.add(userWithLink);
            }
        } catch(Exception e){

        }

        return userListWithLinks;
    }

    @Override
    public User getUserById(String id){
        return userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Record not found with " + id));
    }

    @Override
    public void deleteUser(String id) {
        User existingUser = this.userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException( "Record not found with " + id));
        userRepository.delete(existingUser);
    }

    @Override
    public User updateUser(String id, User user){
        User existingUser = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Record not found with id " + id));
        
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setProfilePicture(user.getProfilePicture());
        existingUser.setBio(user.getBio());

        return userRepository.save(existingUser);
    }
    
    @Override
    public void followedUser(String userId, String followedUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        User followedUser = userRepository.findById(followedUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", followedUserId));
        user.getFollowing().add(followedUser.getId());
        followedUser.getFollows().add(user.getId());
        userRepository.save(user);
        userRepository.save(followedUser);
    }
    
    @Override
    public void unfollowUser(String userId, String unfollowedUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        User unfollowedUser = userRepository.findById(unfollowedUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", unfollowedUserId));
        user.getFollowing().remove(unfollowedUser.getId());
        unfollowedUser.getFollows().remove(user.getId());
        userRepository.save(user);
        userRepository.save(unfollowedUser);
    }

}
