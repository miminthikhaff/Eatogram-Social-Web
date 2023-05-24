package com.flavorgram.fgserver.controller.Post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.flavorgram.fgserver.model.Post.Post;
import com.flavorgram.fgserver.service.Post.PostService;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/post")
    public ResponseEntity<List<EntityModel<Post>>> getAllPosts() {
        return ResponseEntity.ok().body(postService.getAllPosts());
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        return ResponseEntity.ok().body(postService.getPostById(id));
    }

    @PostMapping("/post")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return ResponseEntity.ok().body(this.postService.createPost(post));
    }

    @PutMapping("/post/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody Post post) {
        post.setPost_id(id);
        return ResponseEntity.ok().body(this.postService.updatePost(post));
    }

    @DeleteMapping("/post/{id}")
    public HttpStatus deletePost(@PathVariable String id) {
        this.postService.deletePost(id);
        return HttpStatus.OK;
    }
}
