package com.como.KHForum.payload.request.generalRequest;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChooseCategoryRequest {
    private Set<String> category_name;
}
