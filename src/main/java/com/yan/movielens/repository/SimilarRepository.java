package com.yan.movielens.repository;

import com.yan.movielens.entity.Recommendation;
import com.yan.movielens.entity.Similar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SimilarRepository extends JpaRepository<Similar, String> {

    /* 根据 tmdbId 找相似电影 */
    Optional<Similar> findByTmdbId(String tmdbId);


}
