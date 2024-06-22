package com.yan.movielens.repository;

import com.yan.movielens.entity.Rating;
import com.yan.movielens.entity.key.UserAndMovieKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, UserAndMovieKey> {

    /*
    * 获取当前用户的所有评价
    * */
    // 根据用户ID查找所有评分记录
    List<Rating> findByKeyUserId(Integer userId);

    Optional<Rating> findByKeyUserIdAndKeyImdbId(Integer userId, String imdb_id);
//    Optional<Rating> findByKeyUserIdAndKeyImdb_id(Integer userId, String imdbId);


    /**
     * 获取所有电影的平均评分
     * @return 一个包含电影Id和对应平均评分的List
     */




    /**
     * 随机获取num个评价
     * @param num 随机个数
     * @return num个评价
     */
    @Query(value = "SELECT * FROM rating  ORDER BY  RAND() LIMIT ?1",nativeQuery = true)
    List<Rating> getRandomList(int num);
}
