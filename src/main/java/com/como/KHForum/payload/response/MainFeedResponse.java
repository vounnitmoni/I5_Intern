package com.como.KHForum.payload.response;

import java.util.HashSet;
import java.util.Set;

import com.como.KHForum.entity.Answer;
import com.como.KHForum.entity.Comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MainFeedResponse {
    private Set<Answer> answers = new HashSet<>();
    private Set<Comment> comments = new HashSet<>();
}
