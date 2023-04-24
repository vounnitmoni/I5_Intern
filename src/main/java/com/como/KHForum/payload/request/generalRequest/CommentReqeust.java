package com.como.KHForum.payload.request.generalRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentReqeust {
    private String comment;
    private Long parent_id;
}
