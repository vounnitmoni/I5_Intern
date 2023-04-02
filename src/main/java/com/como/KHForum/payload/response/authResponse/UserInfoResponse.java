package com.como.KHForum.payload.response.authResponse;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserInfoResponse {
    private Long id;
    private String username;
    private String email;
    private String accessToken;
    private List<String> roles;
    
}
