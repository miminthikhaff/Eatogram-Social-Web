package com.flavorgram.fgserver.service.Post;

import java.io.Console;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flavorgram.fgserver.controller.Post.PostController;
import com.flavorgram.fgserver.exception.ResourceNotFoundException;
import com.flavorgram.fgserver.model.Post.Post;
import com.flavorgram.fgserver.repository.Post.PostRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
public class PostServiceImplementation implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        Optional<Post> Flavorgram = this.postRepository.findById(post.getPost_id());

        if (Flavorgram.isPresent()) {
            Post postUpdate = Flavorgram.get();
            postUpdate.setPost_id(post.getPost_id());
            postUpdate.setUser_id(post.getUser_id());
            postUpdate.setPostPath(post.getPostPath());
            postUpdate.setCaption(post.getCaption());
            postUpdate.setTimestamp(new Date());
            postRepository.save(postUpdate);
            return postUpdate;
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + post.getPost_id());
        }
    }

    @Override
    public List<EntityModel<Post>> getAllPosts() {
        List<Post> postLists = null;
        List<EntityModel<Post>> postListsWithLinks = new ArrayList<>();

        try {
            postLists = postRepository.findAll();

            for (Post post : postLists) {

                EntityModel<Post> postWithLink = EntityModel.of(post);
                postWithLink.add(WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getAllPosts())
                        .withSelfRel());
                postWithLink.add(WebMvcLinkBuilder
                        .linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getPostById(post.getPost_id()))
                        .withRel("post"));
                postWithLink.add(Link.of("http://localhost:8081/post").withRel("update"));
                postWithLink.add(Link.of("http://localhost:8081/post").withRel("delete"));
                postListsWithLinks.add(postWithLink);

            }

        } catch (Exception e) {
        }
        return postListsWithLinks;
    }

    @Override
    public Post getPostById(String postId) {

        Optional<Post> Flavorgram = this.postRepository.findById(postId);

        if (Flavorgram.isPresent()) {
            return Flavorgram.get();
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + postId);
        }
    }

    @Override
    public void deletePost(String postId) {
        Optional<Post> Flavorgram = this.postRepository.findById(postId);

        if (Flavorgram.isPresent()) {
            this.postRepository.delete(Flavorgram.get());
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + postId);
        }

    }
}