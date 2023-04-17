package com.como.KHForum.payload.request.generalRequest;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    private Long account_id;
    private String firstname;
    private String lastname;
    private Integer gender;
    private LocalDate dob;
    private String country_code;
    private String area_number;
}
