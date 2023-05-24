package com.flavorgram.fgserver.model.status;

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

@Document(collection = "status")
public class Status {

    @Id
    private String status_id;

    @DocumentReference
    private UserData user_id;
    private String statusPath;
    private String caption;
    private Date timestamp;

}
