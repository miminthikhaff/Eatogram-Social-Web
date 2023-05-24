package com.flavorgram.fgserver.model.message;
// import java.util.Date;

import java.sql.Array;
// import java.sql.Timestamp;
import java.util.Date;


// import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

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

@Document(collection = "conversations")
public class Conversation {
    
    private Array members;
    private Date dateTimeAtCreation;
}
