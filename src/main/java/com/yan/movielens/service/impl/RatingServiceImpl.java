package com.yan.movielens.service.impl;

import com.yan.movielens.entity.Movie;
import com.yan.movielens.entity.Rating;
import com.yan.movielens.entity.User;
import com.yan.movielens.entity.key.UserAndMovieKey;
import com.yan.movielens.entity.model.HistoryEntity;
import com.yan.movielens.entity.model.MovieDetails;
import com.yan.movielens.repository.MovieRepository;
import com.yan.movielens.repository.RatingRepository;
import com.yan.movielens.repository.UserRepository;
import com.yan.movielens.service.RatingService;
import com.yan.movielens.util.CommonUtils;
import com.yan.movielens.util.MapUtils;
import com.yan.movielens.util.PageHelper;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class RatingServiceImpl implements RatingService {

    private RatingRepository ratingRepository;
    private MovieRepository movieRepository;
    private UserRepository userRepository;


    public RatingServiceImpl(MovieRepository movieRepository,
                             RatingRepository ratingRepository,
                             UserRepository userRepository){
        this.movieRepository = movieRepository;
        this.ratingRepository = ratingRepository;
        this.userRepository=userRepository;
    }

    //查找我的所有评价
    @Override
    public List<Rating> findAllRatingsByUserId(Integer userId) {
        return ratingRepository.findByKeyUserId(userId);
    }
    //删除记录
    @Override
    public void deleteRating(Rating rating) {
        ratingRepository.delete(rating);
    }
    //查找是否有这个记录
    public Optional<Rating> findByUserIdAndImdbId(Integer userId, String imdbId) {
        return ratingRepository.findByKeyUserIdAndKeyImdbId(userId, imdbId);
    }
    // 查找记录

    @Override
    public List<Integer> getAllRatedMovies() {
        return ratingRepository.getAllRatedMovies();
    }

    @Override
    public Optional<Rating> getRating(Integer userId, String imdbId ) {//Integer movieId
        UserAndMovieKey ratingKey=new UserAndMovieKey();
        ratingKey.setImdbId(imdbId);
        ratingKey.setUserId(userId);

        return ratingRepository.findById(ratingKey);
    }



    @Override
    public Rating setRating(Rating rating) {
        return ratingRepository.save(rating);
    }




}
