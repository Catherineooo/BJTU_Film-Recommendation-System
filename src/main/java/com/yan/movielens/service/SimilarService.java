package com.yan.movielens.service;
import java.util.Optional;

import com.yan.movielens.entity.Similar;


public interface SimilarService {
    Optional<Similar> getSimilar(String tmdbId);
}
