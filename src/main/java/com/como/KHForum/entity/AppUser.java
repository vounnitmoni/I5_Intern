package com.como.KHForum.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "app_users")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;
    private String gender;
    @JsonFormat(pattern = "yyyy-MM-dd") private LocalDate dob; 
    private String number;

    @OneToMany(mappedBy = "author_id")
    @JsonManagedReference
    private Set<Answer> author_answers = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_commnunity",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "community_id")
    )
    private Set<Community> user_communities = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_category",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> user_Categories = new HashSet<>();

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id", referencedColumnName = "id", insertable = false, updatable =  false)
    private User accountId;
    @Column(name = "account_id")
    private Long account_id;
    public AppUser(Long id, String firstname, String lastname, String gender, LocalDate dob, String number,
            Long account_id) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.dob = dob;
        this.number = number;
        this.account_id = account_id;
    }
    
    
}
