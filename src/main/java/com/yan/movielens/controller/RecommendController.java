package com.yan.movielens.controller;


import com.yan.movielens.entity.Rating;
import com.yan.movielens.entity.Recommendation;
import com.yan.movielens.entity.User;
import com.yan.movielens.service.RatingService;
import com.yan.movielens.service.RecommendService;
import com.yan.movielens.service.UserService;
import com.yan.movielens.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/recommend")
public class RecommendController {

    private static final Logger logger = LoggerFactory.getLogger(RecommendController.class);

    private JwtUtil jwtUtil = new JwtUtil(); // 创建JWT工具实例
    private UserService userService;
    private RecommendService recommendService;
    public RecommendController(UserService userService, RecommendService recommendService){
        this.userService = userService;
        this.recommendService = recommendService;
    }

    @GetMapping("/getRecommend")
    public ResponseEntity<Map<String, Object>> getRating(@RequestParam Integer userId, @RequestParam String token) {
        //先校验token？？
//        System.out.println("userid="+userId+" token="+token);
            Map<String, Object> errorresponse = new HashMap<>();
            // Invalid token
            errorresponse.put("code", 401);
            Map<String, Object> data = new HashMap<>();
            data.put("state", 0);
            data.put("message", "token无效");
            errorresponse.put("data", data);

        if(jwtUtil.validateToken(token) ){
            Integer token_id = jwtUtil.getUserIdFromToken(token);
//            System.out.println("【token_id】"+token_id);
//            System.out.println("【userId】"+userId);//&&  == userId
//            System.out.println("【是否身份不对】"+(!userId.equals(token_id)));
            if(!userId.equals(token_id))
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorresponse);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorresponse);
        }

        Optional<User> userOptional = userService.getById(userId);
        if (!userOptional.isPresent()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("code", 401);
            Map<String, Object> errorData = new HashMap<>();
            errorData.put("state", 0);
            errorData.put("message", "用户不存在");
            errorResponse.put("data", errorData);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
//        User user = userOptional.get();// 获得用户


        Optional<Recommendation> recommendationOptional = recommendService.getRecommend(userId);
        if(!recommendationOptional.isPresent()){
            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("code", 200);
            Map<String, Object> successData = new HashMap<>();
            successData.put("state", 1);
            successData.put("message", "查询成功");

            List<String> list = new ArrayList<>();

            successData.put("movies", list);//推荐列表
            successResponse.put("data", successData);
            return ResponseEntity.ok(successResponse);
        }
        Recommendation recommendation = recommendationOptional.get();
        // 响应
        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("code", 200);
        Map<String, Object> successData = new HashMap<>();
        successData.put("state", 1);
        successData.put("message", "查询成功");
        String lists = recommendation.getTmdbId();
        logger.info("Original lists: {}", lists);

        String trimmedLists = lists.substring(1, lists.length() - 1);

        // 步骤2: 分割字符串为数组，转换为列表
        List<String> convertedList = Arrays.asList(trimmedLists.split(", "));

//        List<String> convertedList = convertList(lists);
        logger.info("Converted lists: {}", convertedList);
        successData.put("movies", convertedList);//推荐列表
        successResponse.put("data", successData);

        return ResponseEntity.ok(successResponse);
    }

}
