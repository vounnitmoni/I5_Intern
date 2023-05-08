package com.como.KHForum.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.como.KHForum.entity.Questionnaire;

@Repository
public interface QuestionnaireRepo extends JpaRepository<Questionnaire, Long> {
    @Query(value = "SELECT * FROM kh_forum.questionnaire where id = :id", nativeQuery = true)
    Questionnaire findAllById(@Param("id") Long id);
    
    //random stufs from categories
    @Query(value = "select q.* from kh_forum.questionnaire as q left join kh_forum.seens on q.id = seens.questionnaire_id where q.community_id in (:id) and seens.questionnaire_id is null or seen = false order by create_stmp desc, time desc limit 5", nativeQuery = true)
    Set<Questionnaire> randomQuestionnairesByCategories(@Param("id") Set<Long> id);

    //random stufs from user followee
    @Query(value = "select q.* from kh_forum.questionnaire as q left join kh_forum.seens on q.id = seens.questionnaire_id where author_id in (:id) and seens.questionnaire_id is null or seen = false order by create_stmp desc, time desc limit 7", nativeQuery = true)
    Set<Questionnaire> randQuestionnairesByFollowee(@Param("id") Set<Long> id);

    //random stufs from communities
    @Query(value = "select q.* from kh_forum.questionnaire as q left join kh_forum.seens on q.id = seens.questionnaire_id where community_id in :id and seens.questionnaire_id is null or seen = false order by create_stmp desc, time desc limit 7", nativeQuery = true)
    Set<Questionnaire> randQuestionnairesByCommunity(@Param("id") Set<Long> id);


}
