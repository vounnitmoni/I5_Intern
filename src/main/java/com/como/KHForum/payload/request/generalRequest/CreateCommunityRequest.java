package com.como.KHForum.payload.request.generalRequest;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommunityRequest {
    private String name;
    @NotBlank
    private Set<String> category;
    private Set<String> sub_category;
}
