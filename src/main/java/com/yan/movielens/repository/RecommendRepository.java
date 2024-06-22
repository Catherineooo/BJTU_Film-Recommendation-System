package com.yan.movielens.repository;

import com.yan.movielens.entity.Rating;
import com.yan.movielens.entity.Recommendation;
import com.yan.movielens.entity.key.UserAndMovieKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RecommendRepository extends JpaRepository<Recommendation, Integer> {

    /* 根据userId找推荐电影 */
    Optional<Recommendation> findByUserId(Integer userId);


}
