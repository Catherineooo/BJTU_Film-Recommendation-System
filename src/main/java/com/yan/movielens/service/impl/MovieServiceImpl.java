package com.yan.movielens.service.impl;


import com.yan.movielens.entity.Movie;
import com.yan.movielens.entity.Rating;
import com.yan.movielens.entity.model.MovieDetails;
import com.yan.movielens.entity.model.PageEntity;
import com.yan.movielens.repository.MovieRepository;
import com.yan.movielens.repository.RatingRepository;
import com.yan.movielens.service.MovieService;
import com.yan.movielens.service.RatingService;
import com.yan.movielens.util.MapUtils;
import com.yan.movielens.util.PageHelper;
import org.springframework.stereotype.Service;


import java.math.BigInteger;
import java.util.*;

@Service
public class MovieServiceImpl implements MovieService {

    private MovieRepository movieRepository;
    private RatingRepository ratingRepository;
    private RatingService ratingService;

    public MovieServiceImpl(MovieRepository movieRepository,
                            RatingRepository ratingRepository,
                            RatingService ratingService){
        this.movieRepository = movieRepository;
        this.ratingRepository = ratingRepository;
        this.ratingService=ratingService;
    }


    @Override
    public Movie saveMovie(Movie movie) {
        return  movieRepository.save(movie);
    }

    @Override
    public void deleteMovie(Movie movie) {
        movieRepository.delete(movie);
    }


    @Override
    public PageEntity getAllMovieList(Integer pageIndex,Integer pageSize) {
        PageHelper pageHelper=new PageHelper(movieRepository.findAll(),pageSize);
        PageEntity pageEntity=new PageEntity();
        pageEntity.setList(pageHelper.getPage(pageIndex));
        pageEntity.setPageNum(pageHelper.getPageNum());
        pageEntity.setTotal(pageHelper.getDataSize());
        return pageEntity;
    }


    @Override
    public Optional<Movie> getById(Integer id) {
        return movieRepository.findById(id);
    }




    @Override
    public Optional<MovieDetails> getDetailsById(Integer id) {
        Optional<Movie> movie= getById(id);

        MovieDetails movieDetails=null;

        if(movie.isPresent()){
            movieDetails=new MovieDetails(movie.get());
            return Optional.of(movieDetails);
        }

        return Optional.ofNullable(movieDetails);
    }

}
