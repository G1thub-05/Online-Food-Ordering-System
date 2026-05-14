package com.digeshwar.foodiesapi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
@Builder
public class UserEntity {

    @Id
    private String id;
    @Indexed(unique = true) // ✅ enforce unique email
    private String name;
    private String email;
    private String password;
    private String otp;
    private LocalDateTime otpGeneratedAt;
//    private boolean isVerified;

}
