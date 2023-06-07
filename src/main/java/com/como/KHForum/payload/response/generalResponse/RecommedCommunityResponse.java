package com.como.KHForum.payload.response.generalResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RecommedCommunityResponse {
    private Long id;
    private String name;
    private byte[] profile_pic;
    private Integer members;    
}
