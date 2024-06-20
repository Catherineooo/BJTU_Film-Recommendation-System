package com.yan.movielens;

import com.yan.movielens.repository.RatingRepository;
import com.yan.movielens.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MovielensApplicationTests {

//    @Autowired
//    private CollectionRepository collectionRepository;

//    @Autowired
//    private CollectionService collectionService;
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
//        List<Integer> collectionList=collectionRepository.getCollectionListById(2);
//        for(Integer a:collectionList){
//            System.out.println(a);
//        }
    }
}
