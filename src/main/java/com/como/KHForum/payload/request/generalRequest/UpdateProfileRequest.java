package com.como.KHForum.payload.request.generalRequest;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    private String firstname;
    private String lastname;
    private String bio;
    private Integer gender;
    private LocalDate dob;
    private String country_code;
    private String area_number;
    private byte[] profile;
    private byte[] cover;
}
