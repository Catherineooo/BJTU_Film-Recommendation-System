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
    @Query(value = "SELECT movie_id,AVG(rating) FROM rating  GROUP BY movie_id",nativeQuery = true)
    List getAveScoreList();

    /**
     * 获取所有被评分过的电影的Id
     * @return 电影Id列表
     */
    // 这个留着
    @Query(value = "SELECT DISTINCT movie_id FROM rating",nativeQuery = true)
    List<Integer> getAllRatedMovies();

    /**
     * 根据用户Id获取这个用户所评价过的电影
     * @param userId 用户Id
     * @return 评价过的电影Id列表
     */
    @Query(value = "SELECT movie_id,timestamp FROM rating where user_id=?1",nativeQuery = true)
    List getAllMovieIdByUserId(Integer userId);

    /**
     * 获取评价或者部电影的用户Id列表
     * @param movieId 电影Id
     * @return 用户Id列表
     */
    @Query(value = "SELECT user_id FROM rating where movie_id=?1",nativeQuery = true)
    List<Integer> getAllUserIdByMovieId(Integer movieId);

    /**
     * 计算一部电影被用户评价过多少次，用于计算电影的热门程度
     * @param movieId 电影Id
     * @return 评价次数
     */
    @Query(value = "SELECT COUNT(*) FROM rating WHERE movie_id=?1",nativeQuery = true)
    Integer getMovieHitsById(Integer movieId);

    /**
     * 获取所有电影的评价次数
     * @return 返回一个包含电影Id和对应评价次数的列表
     */
    @Query(value = "SELECT movie_id,COUNT(*) FROM rating  GROUP BY movie_id ",nativeQuery = true)
    List getMovieHitsList();


    /**
     * 随机获取num个评价
     * @param num 随机个数
     * @return num个评价
     */
    @Query(value = "SELECT * FROM rating  ORDER BY  RAND() LIMIT ?1",nativeQuery = true)
    List<Rating> getRandomList(int num);
}
