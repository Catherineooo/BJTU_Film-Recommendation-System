package com.yan.movielens.controller;

import com.yan.movielens.entity.Movie;
import com.yan.movielens.entity.Rating;
import com.yan.movielens.entity.User;
import com.yan.movielens.entity.key.UserAndMovieKey;
import com.yan.movielens.entity.model.HistoryEntity;
import com.yan.movielens.entity.model.MovieDetails;
import com.yan.movielens.service.RatingService;
import com.yan.movielens.service.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/rate")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    private UserService userService;

    public RatingController(UserService userService, RatingService ratingService){
        this.userService = userService;
        this.ratingService = ratingService;
    }

    @PostMapping(value = "/addRating")
    public ResponseEntity<Map<String, Object>> addRating(@RequestBody @NotNull Map<String, String> updateData){
        String username = updateData.get("username");
        String imdbId = updateData.get("imdb_id");
        String movie = updateData.get("movie_info");

        Double rating = Double.valueOf(updateData.get("rating"));
        System.out.println(" imdbId="+imdbId+" rating"+rating);

        Optional<User> userOptional = userService.getByUsername(username);
        System.out.println("userOptional="+userOptional);
        User user = userOptional.get();
        System.out.println("User="+user);
        Integer userId = user.getId();// 1.userId 2.imdbId 3.rating 4.timeStamp
        System.out.println("userId="+userId);//1
        long timeStamp = System.currentTimeMillis();
        // 检查记录是否存在
        Optional<Rating> existingRating = ratingService.findByUserIdAndImdbId(userId, imdbId);
        if (existingRating.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("code", 401);
            Map<String, Object> data = new HashMap<>();
            data.put("state", 0);
            data.put("message", "评分记录已存在");
            response.put("data", data);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        // 插入新数据
        Rating rating_record = new Rating();
        UserAndMovieKey key = new UserAndMovieKey();
        key.setUserId(userId);
        key.setImdbId(imdbId);
        rating_record.setKey(key);
        rating_record.setMovie(movie);
        rating_record.setRating(rating);
        rating_record.setTimeStamp(timeStamp);

        ratingService.setRating(rating_record);

        // 构建成功响应
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        Map<String, Object> data = new HashMap<>();
        data.put("state", 1);
        data.put("message", "评分成功");
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("username", user.getUsername());

        data.put("user", userData);
        response.put("data", data);
        return ResponseEntity.ok(response);

    }

    @PostMapping(value = "/updateRating")
    public ResponseEntity<Map<String, Object>> updateRating(@RequestBody @NotNull Map<String, String> updateData){
        String username = updateData.get("username");
        String imdbId = updateData.get("imdb_id");
        Double rating = Double.valueOf(updateData.get("rating"));

        // 检查用户是否存在
        Optional<User> userOptional = userService.getByUsername(username);
        if (!userOptional.isPresent()) {
            return buildErrorResponse(401, "用户不存在");
        }

        User user = userOptional.get();
        Integer userId = user.getId();
        long timeStamp = System.currentTimeMillis();

        // 检查评分记录是否存在
        Optional<Rating> existingRatingOpt = ratingService.findByUserIdAndImdbId(userId, imdbId);
        if (!existingRatingOpt.isPresent()) {
            return buildErrorResponse(404, "评分记录不存在");
        }

        // 更新数据
        Rating existingRating = existingRatingOpt.get();
        existingRating.setRating(rating);
        existingRating.setTimeStamp(timeStamp);

        ratingService.setRating(existingRating);  // 假设setRating方法同样用于更新数据

        // 构建成功响应
        return buildSuccessResponse(user, "评分更新成功");
    }
    // 删除评分的DELETE方法
    @DeleteMapping(value = "/deleteRating")
    public ResponseEntity<Map<String, Object>> deleteRating(@RequestBody @NotNull Map<String, String> deleteData){
        String username = deleteData.get("username");
        String imdbId = deleteData.get("imdb_id");

        Optional<User> userOptional = userService.getByUsername(username);
        if (!userOptional.isPresent()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("code", 401);
            Map<String, Object> errorData = new HashMap<>();
            errorData.put("state", 0);
            errorData.put("message", "用户不存在");
            errorResponse.put("data", errorData);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        User user = userOptional.get();
        Integer userId = user.getId();

        Optional<Rating> ratingOptional = ratingService.findByUserIdAndImdbId(userId, imdbId);
        if (!ratingOptional.isPresent()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("code", 401);
            Map<String, Object> errorData = new HashMap<>();
            errorData.put("state", 0);
            errorData.put("message", "评分记录不存在");
            errorResponse.put("data", errorData);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        ratingService.deleteRating(ratingOptional.get());

        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("code", 200);
        Map<String, Object> successData = new HashMap<>();
        successData.put("state", 1);
        successData.put("message", "删除评分成功");
        successResponse.put("data", successData);
        return ResponseEntity.ok(successResponse);
    }

    /*
    * 查询当前用户所有评价过的
    * */
    @GetMapping("/getRating")
    public ResponseEntity<Map<String, Object>> getRating(@RequestParam String username) {
        Optional<User> userOptional = userService.getByUsername(username);
        if (!userOptional.isPresent()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("code", 404);
            Map<String, Object> errorData = new HashMap<>();
            errorData.put("state", 0);
            errorData.put("message", "用户不存在");
            errorResponse.put("data", errorData);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        User user = userOptional.get();
        List<Rating> ratings = ratingService.findAllRatingsByUserId(user.getId());

        List<Map<String, Object>> ratingList = ratings.stream().map(rating -> {
            Map<String, Object> ratingMap = new HashMap<>();
            ratingMap.put("imdb_id", rating.getKey().getImdbId());
            ratingMap.put("movie", rating.getMovie());
            ratingMap.put("rating", rating.getRating());
            return ratingMap;
        }).collect(Collectors.toList());

        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("code", 200);
        Map<String, Object> successData = new HashMap<>();
        successData.put("state", 1);
        successData.put("message", "查询成功");
        successData.put("ratingList", ratingList);
        successResponse.put("data", successData);

        return ResponseEntity.ok(successResponse);
    }
    private ResponseEntity<Map<String, Object>> buildErrorResponse(int statusCode, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("code", statusCode);
        Map<String, Object> data = new HashMap<>();
        data.put("state", 0);
        data.put("message", message);
        response.put("data", data);
        return ResponseEntity.status(HttpStatus.valueOf(statusCode)).body(response);
    }

    private ResponseEntity<Map<String, Object>> buildSuccessResponse(User user, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        Map<String, Object> data = new HashMap<>();
        data.put("state", 1);
        data.put("message", message);
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("username", user.getUsername());
        data.put("user", userData);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
