package com.como.KHForum.payload.request.generalRequest;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommunityRequest {
    private String name;
    @Size(max = 200)
    private String bio;
    @NotBlank
    private Set<String> category;
    private Set<String> sub_category;
    private byte[] profile;
    private byte[] cover;
}
