package com.flavorgram.fgserver.service.comment;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flavorgram.fgserver.model.comment.CommentReply;
import com.flavorgram.fgserver.dto.comment.CommentReplyRequest;
import com.flavorgram.fgserver.dto.comment.CommentRequest;
import com.flavorgram.fgserver.dto.notification.NotifcationRequest;
import com.flavorgram.fgserver.exception.comment.CommentsNotFoundException;
import com.flavorgram.fgserver.model.Post.Post;
import com.flavorgram.fgserver.model.authentication.UserData;
import com.flavorgram.fgserver.model.comment.Comment;
import com.flavorgram.fgserver.repository.comment.CommentRepository;
import com.flavorgram.fgserver.service.Post.PostService;
import com.flavorgram.fgserver.service.authentication.AuthenticationService;
import com.flavorgram.fgserver.service.notification.NotificationService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CommentService {

  @Autowired
  CommentRepository commentRepository;

  @Autowired
  NotificationService notificationService;

  @Autowired
  AuthenticationService authenticationService;

  @Autowired
  PostService postService;

  public Comment createComment(CommentRequest commentRequest) {
    List<String> emptyList = new ArrayList<String>();
    List<CommentReply> emptyReplyList = new ArrayList<CommentReply>();
    Date createdDate = new Date();

    Comment comment = Comment.builder()
        .id(UUID.randomUUID().toString())
        .description(commentRequest.getDescription())
        .post(commentRequest.getPost())
        .label(commentRequest.getLabel())
        .author(commentRequest.getAuthor())
        .likes("0").userLikes(emptyList)
        .createdDate(createdDate)
        .edited(false)
        .replies(emptyReplyList)
        .build();

    commentRepository.save(comment);

    var post_id = comment.getPost();
    var user_email = comment.getAuthor().getEmail();

    UserData user = authenticationService.getSocialUser(user_email);
    Post post = postService.getPostById(post_id);

    NotifcationRequest nr = NotifcationRequest.builder()
        .description(comment.getDescription())
        .user(post.getUser_id().getId())
        .post(post)
        .label(comment.getLabel())
        .commenter_username(user.getUsername())
        .build();

    notificationService.saveNotification(nr);
    log.info(String.format("Comment %s saved", comment.getId()));
    return comment;

  }

  public List<Comment> getCommentsByPost(String postId) {
    List<Comment> commentsList = commentRepository.findByPost(postId);

    if (commentsList.isEmpty()) {
      throw new CommentsNotFoundException("No comments found for post " + postId);
    }

    log.info(String.format(String.format("Returned %d comments for post %s", commentsList.size(), postId)));

    return commentsList;
  }

  public Comment updateComment(Comment comment) {
    var oldComment = commentRepository.findById(comment.getId()).orElse(null);

    if (oldComment == null) {
      throw new CommentsNotFoundException("No comment found with comment id " + comment.getId());
    }

    oldComment.setDescription(comment.getDescription());
    oldComment.setLabel(comment.getLabel());
    oldComment.setEdited(true);

    commentRepository.save(oldComment);

    log.info(String.format("Comment %s updated", comment.getId()));
    return oldComment;
  }

  public String deleteComment(String commentId) {

    var comment = commentRepository.findById(commentId).orElse(null);

    if (comment == null) {
      throw new CommentsNotFoundException("No comment found with comment id " + commentId);
    }

    commentRepository.deleteById(commentId);

    log.info(String.format("Comment %s deleted", commentId));
    return commentId;
  }

  public List<Comment> getCommentsByAuthor(String authorId) {

    List<Comment> commentsList = commentRepository.findByAuthor(authorId);

    if (commentsList.isEmpty()) {
      throw new CommentsNotFoundException("No comments found for author " + authorId);
    }

    return commentsList;
  }

  public String updateCommentLikes(String commentId, String userId) {

    var comment = commentRepository.findById(commentId).orElse(null);

    if (comment == null) {
      throw new CommentsNotFoundException("No comment found with id " + commentId);
    }

    var oldLikes = Integer.parseInt(comment.getLikes());
    var newLikes = oldLikes + 1;
    List<String> userLikesList = (comment.getUserLikes());

    userLikesList.add(userId);
    comment.setLikes(String.valueOf(newLikes));
    comment.setUserLikes(userLikesList);
    commentRepository.save(comment);

    log.info("Comment " + comment.getId() + " now has " + comment.getLikes() + " likes!");
    return comment.getLikes();
  }

  public String deleteCommentLikes(String commentId, String userId) {

    var comment = commentRepository.findById(commentId).orElse(null);

    if (comment == null) {
      throw new CommentsNotFoundException("No comment found with id " + commentId);
    }

    var oldLikes = Integer.parseInt(comment.getLikes());
    var newLikes = oldLikes - 1;
    List<String> userLikesList = (comment.getUserLikes());

    if (userLikesList != null) {

      userLikesList.remove(userId);
    }
    comment.setLikes(String.valueOf(newLikes));
    comment.setUserLikes(userLikesList);
    commentRepository.save(comment);

    log.info("Comment " + comment.getId() + " now has " + comment.getLikes() + " likes!");
    return comment.getLikes();
  }

  public String addReplyToComment(CommentReplyRequest reply) {
    var comment = commentRepository.findById(reply.getCommentId()).orElse(null);

    if (comment == null) {
      throw new CommentsNotFoundException("No comment found with id " + reply.getCommentId());
    }

    var newReply = CommentReply.builder()
        .id(UUID.randomUUID().toString())
        .author(reply.getAuthor())
        .description(reply.getDescription())
        .build();

    List<CommentReply> replies = comment.getReplies();
    replies.add(newReply);

    comment.setReplies(replies);
    commentRepository.save(comment);

    return newReply.getId();

  }

  public List<CommentReply> getRepliesForComment(String id) {
    var comment = commentRepository.findById(id).orElse(null);

    if (comment == null) {
      throw new CommentsNotFoundException("No comment found with id " + id);
    }

    List<CommentReply> replies = comment.getReplies();

    return replies;

  }

}
