package com.como.KHForum.repository;

import java.time.LocalDateTime;
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
    @Query(value = "select q.* from kh_forum.questionnaire as q left join kh_forum.seens on q.id = seens.questionnaire_id where q.community_id in (:id) and seens.questionnaire_id is null or seen = false order by create_stmp desc, vote desc, time desc limit 5", nativeQuery = true)
    Set<Questionnaire> randomQuestionnairesByCategories(@Param("id") Set<Long> id);
    @Query(value = "select q.* from kh_forum.questionnaire as q left join kh_forum.seens on q.id = seens.questionnaire_id where q.community_id in (:id) and seens.questionnaire_id is null or seen = false order by create_stmp desc, vote desc, time desc limit 5", nativeQuery = true)
    Set<Questionnaire> randomQuestionnairesByCategoriesWithNotIn(@Param("id") Set<Long> id);

    //random stufs from user followee
    @Query(value = "select q.* from kh_forum.questionnaire as q left join kh_forum.seens on q.id = seens.questionnaire_id where author_id in (:id) and seens.questionnaire_id is null or seen = false order by create_stmp desc, vote desc, time desc limit 7", nativeQuery = true)
    Set<Questionnaire> randQuestionnairesByFollowee(@Param("id") Set<Long> id);
    @Query(value = "select q.* from kh_forum.questionnaire as q left join kh_forum.seens on q.id = seens.questionnaire_id where author_id in (:id) and seens.questionnaire_id is null or seen = false order by create_stmp desc, vote desc, time desc limit 7", nativeQuery = true)
    Set<Questionnaire> randQuestionnairesByFolloweeWithNotIn(@Param("id") Set<Long> id);


    //random stufs from communities
    @Query(value = "select q.* from kh_forum.questionnaire as q left join kh_forum.seens on q.id = seens.questionnaire_id where community_id in (:id) and seens.questionnaire_id is null or seen = false order by create_stmp desc, vote desc, time desc limit 7", nativeQuery = true)
    Set<Questionnaire> randQuestionnairesByCommunity(@Param("id") Set<Long> id);
    @Query(value = "select q.* from kh_forum.questionnaire as q left join kh_forum.seens on q.id = seens.questionnaire_id where community_id in (:id) and seens.questionnaire_id is null or seen = false order by create_stmp desc, vote desc, time desc limit 7", nativeQuery = true)
    Set<Questionnaire> randQuestionnairesByCommunityWithNotIn(@Param("id") Set<Long> id);

    //limit traffic 
    @Query(value = "select * from kh_forum.questionnaire where community_id = :c_id and id >= :last_id order by id desc limit 20", nativeQuery = true)
    Set<Questionnaire> findQuestion_IdByC_id(@Param("c_id") Long q_id, @Param("last_id") Long last_id);
    @Query(value = "select max(a.id) from (select id from kh_forum.questionnaire where community_id = :id limit :quantity) as a", nativeQuery = true)
    Long findLastIdOfLastTwenty(@Param("id") Long id, @Param("quantity") Integer q);

    // //userQuestion
    // @Query(value = "select * from kh_forum.questionnaire where author_id = a_id and id>= :last_id order by create_stmp desc, time desc limit 20", nativeQuery = true)
    // Set<Questionnaire> find20QuestionsByUserId(@Param("a_id") Long a_id, @Param("last_id") Long last_id);
    // @Query(value = "select max(a.id) from (select id from kh_forum.questionnaire where author_id = :id limit :quantity) as a", nativeQuery = true)
    // Long findLastIdOfLastTwentyByUserId(@Param("id") Long id, @Param("quantity") Integer q);

    //-----------------------------------------------------------UserQuestion-------------------------------------------------------------------------------------------
        // @Query(value = "select * from kh_forum.questionnaire where author_id = :id ")
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //-----------cast date and time to datetime--------
    @Query(value = "select cast(concat(create_stmp, ' ', time) as datetime) as a from kh_forum.questionnaire where id = :id", nativeQuery = true)
    LocalDateTime castQStmpToDateTime(@Param("id") Long id);

    @Query(value = "select * from kh_forum.questionnaire where author_id = :id order by create_stmp desc, vote desc, time desc limit 15", nativeQuery = true)
    Set<Questionnaire> userQuestionSet(@Param("id") Long user_id);
    @Query(value = "select * from kh_forum.questionnaire where community_id = :id order by create_stmp desc, vote desc, time desc limit 15", nativeQuery = true)
    Set<Questionnaire> communityQuestionSet(@Param("id") Long community_id);

    @Query(value = "select * from kh_forum.questionnaire where author_id = :id and id not in (:prev_id) order by create_stmp desc, vote desc, time desc limit 15", nativeQuery = true)
    Set<Questionnaire> userQuestionSetNotInPrev(@Param("id") Long user_id, @Param("prev_id") Set<Long> prev_id);
    @Query(value = "select * from kh_forum.questionnaire where community_id = :id and id not in (:prev_id) order by create_stmp desc, vote desc, time desc limit 15", nativeQuery = true)
    Set<Questionnaire> communityQuestionSetNotInPrev(@Param("id") Long community_id, @Param("prev_id") Set<Long> prev_id);
//--------------------------------------------

    @Query(value = "select q.* from kh_forum.questionnaire as q "+
                   "left join kh_forum.question_collection_info as qci "+
                   "on q.id = qci.question_id where qci.question_id = :q_id", nativeQuery = true)
    Questionnaire findQuestionUserVote(@Param("q_id") Long q_id);

    @Query(value = ":queryParam", nativeQuery = true)
    Set<Questionnaire> searchQuestion(@Param("queryParam") String queryParam);
}
