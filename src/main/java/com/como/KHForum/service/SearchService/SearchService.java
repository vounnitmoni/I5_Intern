package com.como.KHForum.service.SearchService;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.como.KHForum.entity.AppUser;
import com.como.KHForum.entity.Community;
import com.como.KHForum.entity.Questionnaire;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.FileRepo;
import com.como.KHForum.repository.QuestionnaireRepo;
import com.como.KHForum.repository.UserCommunityRepo;
import com.como.KHForum.repository.UserRepo;
import com.como.KHForum.service.FollowService.FollowService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Service
public class SearchService {
    @Autowired QuestionnaireRepo questionnaireRepo;
    @Autowired CommentRepo communityRepo;
    @Autowired AppUserRepo appUserRepo;
    @Autowired FileRepo fileRepo;
    @Autowired UserRepo userRepo;
    @Autowired FollowService followService;
    @Autowired UserCommunityRepo userCommunityRepo;
    @PersistenceContext EntityManager entityManager;

    public Set<Questionnaire> searchQuestionService(String searchParam){
        // SELECT * FROM kh_forum.questionnaire where if(question like '%xu%', 1,0) + if(question like '%uu%', 1,0) + if(question like '%fu%', 1,0) + if(question like '%ue%', 1,0)
        // ORDER BY (if(question like '%xu%', 1,0) + if(question like '%uu%', 1,0) + if(question like '%fu%', 1,0) + if(question like '%ue%', 1,0)) desc
        final String baseQ = "Select * from kh_forum.questionnaire where ";
        final String questionLike = "question like ";
        final String bodyLike = "body like ";
        final String or = "or ";

        String searchParamNoQuestionMark = searchParam.replaceAll("\\?.*", "");
        String[] searchParamSeparation = searchParam.split("[\\p{Punct}\\s]+");

        Set<String> finalQueries = new LinkedHashSet<>();
        Set<Questionnaire> finalResult = new LinkedHashSet<>();

        finalQueries.add(baseQ + questionLike + "'" + searchParamNoQuestionMark + "'" + or + questionLike + "'%" + searchParamNoQuestionMark + "%'" + or + 
                         bodyLike + "'" + searchParamNoQuestionMark + "'" + or + bodyLike + "'%" + searchParamNoQuestionMark + "%' " + 
                         "order by " + "question like '%" + searchParamNoQuestionMark + "%' " + "desc, " + "question like '" + searchParamNoQuestionMark + "%' " + "desc ");
        
        String ifQStatment = "";
        String orderByStatement = "order by ";
        int j = searchParamSeparation.length - 1;
        for(String i : searchParamSeparation) {
            if(j-- == 0) {
                if(searchParamSeparation.length == 1){
                    orderByStatement = orderByStatement + "question like '" + i + "%' desc, " + "question like '%" + i + "%' desc ";
                } else{
                    orderByStatement = orderByStatement + "question like '%" + i + "%' desc ";
                }
                ifQStatment = ifQStatment + "if(question like '%" + i + "%'" + ", 1,0) + " + "if(body like '%" + i + "%'" + ", 1,0) ";
            } else {
                orderByStatement = orderByStatement + "question like '" + i + "%' desc, " + "question like '%" + i + "%' desc, ";
                ifQStatment = ifQStatment + "if(question like '%" + i + "%'" + ", 1,0) + " + "if(body like '%" + i + "%'" + ", 1,0) + ";   
            } 
        }
        finalQueries.add(baseQ + ifQStatment + orderByStatement);

        finalQueries.forEach(e ->{;
        @SuppressWarnings("unchecked") List<Questionnaire> result = entityManager.createNativeQuery(e, Questionnaire.class).getResultList();
            result.forEach(r -> {
                finalResult.add(r);
            });  
        });
        return finalResult;
    }

    public Set<UserSearchResponse> searchUserService(String searchParam) {
        final String baseQ = "SELECT * FROM kh_forum.app_user where ";

        String[] searchParamSeparation = searchParam.split("[\\p{Punct}\\s]+");
        Set<UserSearchResponse> finalResult = new LinkedHashSet<>();

        String ifQstatment = "";
        String orderByStatement = "order by ";
        int j = searchParamSeparation.length - 1;
        for(String i : searchParamSeparation) {
            if(j-- == 0) {
                if(searchParamSeparation.length == 1){
                    orderByStatement = orderByStatement + "firstname like '" + i + "%' desc, " + "firstname like '%" + i + "%' desc, " + "lastname like '" + i + "%' desc, " + "lastname like '%" + i + "%' desc, " + "username like '" + i + "%' desc, " + "username like '%" + i + "%' desc ";
                } else{
                    orderByStatement = orderByStatement + "firstname like '%" + i + "%' desc, " + "lastname like '%" + i + "%' desc, " + "username like '%" + i + "%' desc ";
                }
                ifQstatment = ifQstatment + "if(firstname like '%" + i + "%'" + ", 1,0) + " + "if(lastname like '%" + i + "%'" + ", 1,0) + " + "if(username like '%" + i + "%'" + ", 1,0) ";
            } else {
                ifQstatment = ifQstatment + "if(firstname like '%" + i + "%'" + ", 1,0) + " + "if(lastname like '%" + i + "%'" + ", 1,0) + " + "if(username like '%" + i + "%'" + ", 1,0) + ";
                orderByStatement = orderByStatement + "firstname like '" + i + "%' desc, " + "firstname like '%" + i + "%' desc, " + "lastname like '" + i + "%' desc, " + "lastname like '%" + i + "%' desc, " + "username like '" + i + "%' desc, " + "username like '%" + i + "%' desc, ";
            }
        }

        @SuppressWarnings("unchecked") List<AppUser> result = entityManager.createNativeQuery(baseQ + ifQstatment + orderByStatement , AppUser.class).getResultList();
        result.forEach(e -> {
            Integer followerAmount = followService.FollowerAmount(e.getAccount_id());
            UserSearchResponse response = new UserSearchResponse(e.getAccount_id(), e.getFirstname(), e.getLastname(), userRepo.userInfoById(e.getAccount_id()).getUsername(), followerAmount, fileRepo.userProfilePic(e.getAccount_id()).getPhoto());
            finalResult.add(response);
        });

        return finalResult;
    }

    public Set<CommunitySearchResponse> searchCommunityService(String searchParam) {
        // SELECT * FROM kh_forum.communities 
        // where (if(name like '%Math%', 1,0) + if(name like '%12%', 1,0)) 
        // order by if(name like '%Math%', 1,0) + if(name like '%12%', 1,0) desc;
        final String baseQ = "Select * from kh_forum.communities where ";

        String[] searchParamSeparation = searchParam.split("[\\p{Punct}\\s]+");
        Set<CommunitySearchResponse> finalResult = new LinkedHashSet<>();

        String ifQstatment = "";
        String orderByStatement = "order by ";
        int j = searchParamSeparation.length - 1;
        for(String i : searchParamSeparation) {
            if(j-- == 0) {
                if(searchParamSeparation.length == 1){
                    orderByStatement = orderByStatement + "name like '" + i + "%' desc, " + "name like '%" + i + "%' desc ";
                } else{
                    orderByStatement = orderByStatement + "name like '%" + i + "%' desc ";
                }
                ifQstatment = ifQstatment + "if(name like '%" + i + "%'" + ", 1,0) ";
            } else {
                ifQstatment = ifQstatment + "if(name like '%" + i + "%'" + ", 1,0) + ";
                orderByStatement = orderByStatement + "name like '" + i + "%' desc, " + "name like '%" + i + "%' desc, ";
            }
        }
        
        @SuppressWarnings("unchecked") List<Community> result = entityManager.createNativeQuery(baseQ + ifQstatment + orderByStatement, Community.class).getResultList();
        result.forEach(e -> {
            CommunitySearchResponse response = new CommunitySearchResponse(e.getId(), e.getName(), userCommunityRepo.communityMembers(e.getId()), fileRepo.communityProfilePic(e.getId()).getPhoto());
            finalResult.add(response);
        });

        return finalResult;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public class UserSearchResponse {
        private Long id;
        private String firstname;
        private String lastname;
        private String username;
        private Integer follower;
        private byte[] profile_pic;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public class CommunitySearchResponse {
        private Long id; 
        private String name;
        private Integer member;
        private byte[] profile_pic;
    }
}
