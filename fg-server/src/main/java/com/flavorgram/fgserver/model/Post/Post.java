package com.flavorgram.fgserver.model.Post;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.flavorgram.fgserver.model.authentication.UserData;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Document(collection = "posts")
public class Post {

    @Id
    private String post_id;

    @DocumentReference
    private UserData user_id;
    private String postPath;
    private String caption;
    private Date timestamp;

}
