package com.como.KHForum.payload.response;

import com.como.KHForum.entity.enums.EIsa;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommunityResponse {
    private Long id;
    private String name;
    private byte[] image;
    private EIsa isa;
}
