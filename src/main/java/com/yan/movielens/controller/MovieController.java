package com.yan.movielens.controller;

import com.yan.movielens.entity.Movie;
import com.yan.movielens.entity.model.MovieDetails;
import com.yan.movielens.entity.model.PageEntity;
import com.yan.movielens.service.MovieService;
import com.yan.movielens.service.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/movie")
public class MovieController {

    private MovieService movieService;
    private RatingService ratingService;

    private String tmdbApiKey = "f127c92dca4a5dfc6893417180e4e92b";
    private final String TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

    public MovieController(MovieService movieService,RatingService ratingService){
        this.movieService=movieService;
        this.ratingService=ratingService;
    }
   /* @GetMapping("/search")
    public ResponseEntity<String> searchMovies(@RequestParam("query") String query) {
        // 构建TMDB API的请求URL
        String apiUrl = UriComponentsBuilder.fromHttpUrl(TMDB_SEARCH_URL)
                .queryParam("query", query)
                .queryParam("api_key", tmdbApiKey)
                .toUriString();

        // 使用RestTemplate发送GET请求并获取响应
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);

        // 直接将TMDB的响应返回给前端
        return response;
    }*/
   @GetMapping("/recommend")
   public ResponseEntity<Map<String, Object>> searchMovies(@RequestParam("userId") Integer userId, @RequestParam("token") String token)  {
       // 构建返回数据
       Map<String, Object> response = new HashMap<>();
       response.put("code", 200);

       Map<String, Object> data = new HashMap<>();
       data.put("state", 1);
       data.put("message", "查询成功");
       data.put("movies", new String[]{"tt0114885", "tt0114886", "tt0114888"});

       response.put("data", data);
       return ResponseEntity.ok(response);
   }
    @GetMapping(value = "/hotmovie")
    public List<MovieDetails> getHotMovie(){
        return movieService.getHotMovieDetailsList(5);
    }

    @PostMapping(value = "/movieid")
    public Movie getMovieByID(@RequestParam(value = "movieId") Integer id){
        Optional<Movie> movie=movieService.getById(id);
        if(movie.isPresent()){
            return movie.get();
        }
        return null;
    }

    @PostMapping(value = "/moviedetails")
    public MovieDetails getMovieDetailsById(@RequestParam(value = "movieId")Integer id){
        MovieDetails movieDetails=null;
        Optional<Movie> movie=movieService.getById(id);
        if(movie.isPresent()){
            movieDetails=new MovieDetails(movie.get());

            Integer movieId=movie.get().getId();
            Double movieRating=ratingService.getAveRatingById(movieId);
            movieDetails.setRating(movieRating);
        }
        return movieDetails;
    }

    @GetMapping(value = "/list")
    public PageEntity getMovieList(@RequestParam(value = "pageIndex") Integer pageIndex,
                                   @RequestParam(value = "pageSize") Integer pageSize){
        return movieService.getAllMovieList(pageIndex,pageSize);
    }

    @PostMapping(value = "/save")
    public Movie saveMovie(@RequestParam(value = "title") String title,
                           @RequestParam(value = "genres") String genres){
        Movie movie=new Movie();
        movie.setTitle(title);
        movie.setGenres(genres);
        return movieService.saveMovie(movie);
    }

    @PostMapping(value = "/delete")
    public void deleteMovie(@RequestParam(value = "movieId") Integer movieId){
        Movie movie=new Movie();
        movie.setId(movieId);
        movieService.deleteMovie(movie);
    }
}