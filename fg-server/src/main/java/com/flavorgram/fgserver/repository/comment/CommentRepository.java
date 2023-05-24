package com.flavorgram.fgserver.repository.comment;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flavorgram.fgserver.model.comment.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {

  List<Comment> findByPost(String postId);

  List<Comment> findByAuthor(String authorId);

}
