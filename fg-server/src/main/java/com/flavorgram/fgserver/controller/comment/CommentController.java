package com.flavorgram.fgserver.controller.comment;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flavorgram.fgserver.dto.comment.CommentLikesRequest;
import com.flavorgram.fgserver.dto.comment.CommentReplyRequest;
import com.flavorgram.fgserver.dto.comment.CommentRequest;
import com.flavorgram.fgserver.exception.comment.CommentsNotFoundException;
import com.flavorgram.fgserver.model.comment.Comment;
import com.flavorgram.fgserver.model.comment.CommentReply;
import com.flavorgram.fgserver.service.comment.CommentService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/comment")
public class CommentController {

  @Autowired
  CommentService commentService;

  @GetMapping
  public HttpEntity<List<EntityModel<Comment>>> getPostComments(@RequestParam(value = "post") String post) {
    List<Comment> commentsList = null;

    try {

      commentsList = commentService.getCommentsByPost(post);
      List<EntityModel<Comment>> commentsListWithLinks = new ArrayList<>();

      for (Comment comment : commentsList) {

        EntityModel<Comment> commentWithLink = EntityModel.of(comment);
        commentWithLink.add(
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(this.getClass()).getPostComments(post)).withSelfRel());
        commentWithLink.add(WebMvcLinkBuilder
            .linkTo(WebMvcLinkBuilder.methodOn(this.getClass()).deleteComment(comment.getId())).withRel("delete"));
        commentWithLink.add(Link.of("http://localhost:8081/comment/reply").withRel("reply"));
        commentWithLink.add(Link.of("http://localhost:8081/comment/like").withRel("like"));
        commentWithLink.add(Link.of("http://localhost:8081/comment/unlike").withRel("unlike"));
        commentsListWithLinks.add(commentWithLink);
      }
      return new ResponseEntity<>(commentsListWithLinks, HttpStatus.OK);

    } catch (CommentsNotFoundException e) {

      log.error(e.getMessage());
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

  }

  @PostMapping
  public HttpEntity<Comment> createComment(@RequestBody CommentRequest commentRequest) {

    Comment comment = commentService.createComment(commentRequest);
    return new ResponseEntity<>(comment, HttpStatus.OK);

  }

  @PutMapping
  @CrossOrigin
  public HttpEntity<Comment> updateComment(@RequestBody Comment comment) {

    try {

      var commentResponse = commentService.updateComment(comment);
      return new ResponseEntity<>(commentResponse, HttpStatus.OK);

    } catch (CommentsNotFoundException e) {

      log.error(e.getMessage());
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
  }

  @DeleteMapping
  public HttpEntity<String> deleteComment(@RequestParam(value = "commentId") String commentId) {

    try {
      log.info(commentId);
      String comment = commentService.deleteComment(commentId);
      return new ResponseEntity<>(comment, HttpStatus.OK);

    } catch (CommentsNotFoundException e) {

      log.error(e.getMessage());
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
  }

  @GetMapping("/author")
  public HttpEntity<List<Comment>> getCommentsByAuthor(@RequestParam(value = "authorId") String authorId) {
    List<Comment> commentsList = null;

    try {

      commentsList = commentService.getCommentsByAuthor(authorId);
      return new ResponseEntity<>(commentsList, HttpStatus.OK);

    } catch (CommentsNotFoundException e) {

      log.error(e.getMessage());
      return new ResponseEntity<>(commentsList, HttpStatus.NOT_FOUND);

    }
  }

  @PostMapping("/like")
  public HttpEntity<String> addLikeToComment(@RequestBody CommentLikesRequest request) {

    try {

      var likesResponse = commentService.updateCommentLikes(request.getId(), request.getUser());
      return new ResponseEntity<>(likesResponse, HttpStatus.OK);

    } catch (CommentsNotFoundException e) {

      log.error(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }
  }

  @PostMapping("/unlike")
  public HttpEntity<String> removeLikeFromComment(@RequestBody CommentLikesRequest request) {

    try {

      var likesResponse = commentService.deleteCommentLikes(request.getId(), request.getUser());
      return new ResponseEntity<>(likesResponse, HttpStatus.OK);

    } catch (CommentsNotFoundException e) {

      log.error(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }
  }

  @PostMapping("/reply")
  public HttpEntity<String> replyToComment(@RequestBody CommentReplyRequest reply) {

    try {

      var replyResponse = commentService.addReplyToComment(reply);
      return new ResponseEntity<>(replyResponse, HttpStatus.OK);

    } catch (CommentsNotFoundException e) {

      log.error(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }
  }

  @GetMapping("/reply")
  public HttpEntity<List<CommentReply>> getRepliesForComment(@RequestParam(value = "commentId") String commentId) {

    try {

      var replies = commentService.getRepliesForComment(commentId);
      return new ResponseEntity<>(replies, HttpStatus.OK);

    } catch (CommentsNotFoundException e) {

      log.error(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }
  }

}
