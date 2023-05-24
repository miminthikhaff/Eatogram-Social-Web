package com.flavorgram.fgserver.repository.authentication;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flavorgram.fgserver.model.authentication.UserData;

public interface UserDataRepository extends MongoRepository<UserData, String> {
  Optional<UserData> findByEmail(String email);
}
