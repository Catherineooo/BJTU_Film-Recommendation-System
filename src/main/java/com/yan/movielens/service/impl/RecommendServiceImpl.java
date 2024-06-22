package com.yan.movielens.service.impl;

import com.yan.movielens.entity.Recommendation;
import com.yan.movielens.repository.MovieRepository;
import com.yan.movielens.repository.RatingRepository;
import com.yan.movielens.repository.RecommendRepository;
import com.yan.movielens.repository.UserRepository;
import com.yan.movielens.service.RecommendService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecommendServiceImpl implements RecommendService {
    private RecommendRepository recommendRepository;

    public RecommendServiceImpl(RecommendRepository recommendRepository){
        this.recommendRepository = recommendRepository;
    }
    @Override
    public Optional<Recommendation> getRecommend(Integer userId) {

        return recommendRepository.findByUserId(userId);
    }
}
