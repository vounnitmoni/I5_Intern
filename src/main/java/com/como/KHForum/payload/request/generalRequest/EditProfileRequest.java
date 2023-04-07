package com.como.KHForum.payload.request.generalRequest;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditProfileRequest {
    private String firstname;
    private String lastname; 
    @JsonFormat(pattern = "yyyy-MM-dd") private LocalDate dob;
    private String number;
}
