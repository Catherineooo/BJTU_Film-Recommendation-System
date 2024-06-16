package com.yan.movielens;

import com.yan.movielens.entity.Movie;
import com.yan.movielens.entity.Rating;

import com.yan.movielens.repository.CollectionRepository;
import com.yan.movielens.repository.RatingRepository;
import com.yan.movielens.service.*;
import com.yan.movielens.util.CommonUtils;
import com.yan.movielens.util.MapUtils;
import org.hibernate.sql.OracleJoinFragment;
import org.hibernate.validator.constraints.EAN;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.relational.core.sql.In;

import java.util.*;

@SpringBootTest
class MovielensApplicationTests {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private CollectionService collectionService;
    @Autowired
    private MovieService movieService;
    @Autowired
    private RatingService ratingService;
    @Autowired
    private UserService userService;

    @Autowired
    private RatingRepository ratingRepository;

    @Test
    void contextLoads() {
        List<Integer> collectionList=collectionRepository.getCollectionListById(2);
        for(Integer a:collectionList){
            System.out.println(a);
        }
    }
}
