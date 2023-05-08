package com.como.KHForum.payload.request.generalRequest;

import java.util.HashSet;
import java.util.Set;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionnaireIdRequest {
    private Set<Long> questionnaire_id = new HashSet<>(20);
}
