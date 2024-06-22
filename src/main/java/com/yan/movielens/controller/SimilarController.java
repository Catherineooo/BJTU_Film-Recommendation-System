package com.yan.movielens.controller;

import com.yan.movielens.entity.*;
import com.yan.movielens.service.*;
import com.yan.movielens.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.yan.movielens.service.RecommendService;
import com.yan.movielens.service.UserService;


@RestController
@RequestMapping(value = "/similar")
public class SimilarController {

    private SimilarService similarService;
    public SimilarController(SimilarService similarService){
        this.similarService = similarService;

    }

    @GetMapping("/getSimilar")
    public ResponseEntity<Map<String, Object>> getRating(@RequestParam String  tmdbId, @RequestParam Integer num) {
        Optional<Similar> similarOptional = similarService.getSimilar(tmdbId);
        if(!similarOptional.isPresent()){
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
        Similar similar = similarOptional.get();

        // 响应
        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("code", 200);
        Map<String, Object> successData = new HashMap<>();
        successData.put("state", 1);
        successData.put("message", "查询成功");
        String lists = similar.getTmdbIds();

        String trimmedLists = lists.substring(1, lists.length() - 1);
        // 解析并转换字符串为列表
        List<String> fullList = Arrays.asList(trimmedLists.split(", "));

        // 只选取前8条数据（如果列表元素少于8条，则选取全部）
        List<String> convertedList = fullList.size() > num ? fullList.subList(0, num) : fullList;


        successData.put("movies", convertedList);//推荐列表
        successResponse.put("data", successData);

        return ResponseEntity.ok(successResponse);
    }

}
