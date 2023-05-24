package com.flavorgram.fgserver.service.Profile;

import java.util.List;

import javax.swing.text.html.parser.Entity;

import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Service;

import com.flavorgram.fgserver.model.authentication.User;

@Service
public interface UserService {
    
    User createUser(User user);

    List<EntityModel<User>> getUsers();

    User getUserById(String id);
    
    User updateUser(String id, User user);
    
    void deleteUser(String id);

    void followedUser(String userId, String followedUserId);
    
    void unfollowUser(String userId, String unfollowedUserId);
  

}
