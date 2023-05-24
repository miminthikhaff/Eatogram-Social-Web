package com.flavorgram.fgserver.repository.authentication;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flavorgram.fgserver.model.authentication.User;

public interface UserRepository extends MongoRepository<User, String> {

  Optional<User> findByEmail(String email);

}
