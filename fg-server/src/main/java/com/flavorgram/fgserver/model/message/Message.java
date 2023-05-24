package com.flavorgram.fgserver.model.message;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.flavorgram.fgserver.model.authentication.UserData;

import java.util.Date;

// import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
// import org.springframework.data.annotation.LastModifiedDate;

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
@Document(collection = "messages")
public class Message {
    @Id
    private String message_id;

    // private String user_id;

    @DocumentReference
    private UserData sender;
    // private String receiver;
    private String message;
    // private DateTimeAtCreation receivedDate;
    private Date sentDate;
    // private String profileImage;

}
