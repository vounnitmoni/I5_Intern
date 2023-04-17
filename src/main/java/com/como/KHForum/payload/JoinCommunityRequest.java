package com.como.KHForum.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinCommunityRequest {
    private Long user_id;
    private Long community_id;
}
