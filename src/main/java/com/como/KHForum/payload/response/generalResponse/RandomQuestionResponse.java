package com.como.KHForum.payload.response.generalResponse;

import java.time.LocalDateTime;
import java.util.List;

import com.como.KHForum.service.ServiceUtils.Utility.DateTimeObject;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RandomQuestionResponse {
        private Long user_id;
        private Long question_id;
        private Long community_id;
        private String username;
        private String question;
        private String description;
        private String community_name;
        private Integer vote;
        private Integer comment;
        private LocalDateTime postStmp;
        private DateTimeObject ago;
        private List<byte[]> image;
        @Nullable
        private byte[] profile;
}
