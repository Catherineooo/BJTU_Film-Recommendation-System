package com.yan.movielens.service;

import com.yan.movielens.entity.Recommendation;

import java.util.Optional;

public interface RecommendService {
    Optional<Recommendation> getRecommend(Integer userId);
}
