package com.como.KHForum.service.SearchService;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.como.KHForum.entity.Questionnaire;
import com.como.KHForum.repository.AppUserRepo;
import com.como.KHForum.repository.CommentRepo;
import com.como.KHForum.repository.QuestionnaireRepo;

@Service
public class SearchService {
    @Autowired QuestionnaireRepo questionnaireRepo;
    @Autowired CommentRepo CommunityRepo;
    @Autowired AppUserRepo appUserRepo;

    public ResponseEntity<?> searchQuestionService(String searchParam){
        // SELECT * FROM kh_forum.questionnaire where if(question like '%xu%', 1,0) + if(question like '%uu%', 1,0) + if(question like '%fu%', 1,0) + if(question like '%ue%', 1,0)
        // ORDER BY (if(question like '%xu%', 1,0) + if(question like '%uu%', 1,0) + if(question like '%fu%', 1,0) + if(question like '%ue%', 1,0)) desc
        final String baseQ = "Select * from kh_forum.questionnaire where ";
        final String questionLike = "question like ";
        final String or = "or ";

        String searchParamNoQuestionMark = searchParam.replaceAll("\\?.*", "");
        String[] searchParamSeparation = searchParam.split("[\\p{Punct}\\s]+");

        Set<String> finalQueries = new LinkedHashSet<>();
        Set<Questionnaire> finalResult = new LinkedHashSet<>();

        finalQueries.add(baseQ + questionLike + "'" + searchParamNoQuestionMark + "'" + or + questionLike + "'%" + searchParamNoQuestionMark + "%'");
        
        String ifQStatment = "";
        int j = searchParamSeparation.length - 1;
        for(String i : searchParamSeparation) {
            if(j-- == 0) {
                ifQStatment = ifQStatment + "if(question like '%" + i + "%'" + ", 1,0) "; 
            } 
            ifQStatment = ifQStatment + "if(question like '%" + i + "%'" + ", 1,0) + "; 
        }
        finalQueries.add(baseQ + ifQStatment + "order by " + ifQStatment + "desc ");

        finalQueries.forEach(e -> {
            Set<Questionnaire> result = questionnaireRepo.searchQuestion(e);
            result.forEach(r -> {
                finalResult.add(r);
            });  
        });
        return ResponseEntity.ok(finalResult);
    }

    public ResponseEntity<?> searchCommunity(String searchParam) {
        return null;
    }
    public ResponseEntity<?> searchUser(String searchParam) {
        return null;
    }
}
