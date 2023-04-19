package com.como.KHForum.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "app_user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;
    private Integer gender;
    @JsonFormat(pattern = "yyyy-MM-dd") private LocalDate dob;
    private String country_code;
    private String area_number;

    // @ManyToMany
    // @JoinTable(name = "user_community",
    //     joinColumns = @JoinColumn(name = "user_id"),
    //     inverseJoinColumns = @JoinColumn(name = "community_id")
    // )
    // @JsonIgnore
    // private Set<Community> user_community = new HashSet<>();

    // @ManyToMany(fetch = FetchType.LAZY)
    // @JoinTable(name = "user_category",
    //     joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
    //     inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id")
    // )
    // @JsonIgnore
    // private Set<Category> user_category = new HashSet<>(); 

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private User accountId;
    @Column(name = "account_id") private Long account_id;

    @Override
    public String toString(){
        return country_code + " " + area_number;
    }

    public AppUser(String firstname, String lastname, Integer gender, LocalDate dob, String country_code,
            String area_number, Long account_id) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.dob = dob;
        this.country_code = country_code;
        this.area_number = area_number;
        this.account_id = account_id;
    }
}
