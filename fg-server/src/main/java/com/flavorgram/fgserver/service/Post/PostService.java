package com.flavorgram.fgserver.service.Post;

import java.util.List;

import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Service;

import com.flavorgram.fgserver.model.Post.Post;

@Service
public interface PostService {

    Post createPost(Post post);

    Post updatePost(Post status);

    List<EntityModel<Post>> getAllPosts();

    Post getPostById(String id);

    void deletePost(String Id);

}
