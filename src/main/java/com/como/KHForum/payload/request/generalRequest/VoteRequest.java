package com.como.KHForum.payload.request.generalRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteRequest {
    private Boolean voted;
    private Boolean reported;
}
