package com.yan.movielens.service;

import com.yan.movielens.entity.Movie;
import com.yan.movielens.entity.Rating;
import com.yan.movielens.entity.User;
import com.yan.movielens.entity.model.HistoryEntity;
import com.yan.movielens.entity.model.MovieDetails;

import java.util.List;
import java.util.Optional;

public interface RatingService {


    void deleteRating(Rating rating);
    /**
     * 根据用户Id和电影Id查找评价
     * @param userId 用户Id
     * @param imdb_id 电影Id imdb_id
     * @return
     */
    Optional<Rating> getRating(Integer userId, String imdb_id);//Integer movieId
    public Optional<Rating> findByUserIdAndImdbId(Integer userId, String imdbId);


    /**
     * 保存评分
     * @param rating
     * @return
     */
    Rating setRating(Rating rating);

    List<Rating> findAllRatingsByUserId(Integer userId);




}
