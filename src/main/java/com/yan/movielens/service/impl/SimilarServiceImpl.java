package com.yan.movielens.service.impl;

import com.yan.movielens.entity.Similar;

import com.yan.movielens.repository.SimilarRepository;
import com.yan.movielens.service.SimilarService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SimilarServiceImpl implements SimilarService {
    private SimilarRepository similarRepository;

    public SimilarServiceImpl(SimilarRepository similarRepository){
        this.similarRepository = similarRepository;
    }

    @Override
    public Optional<Similar> getSimilar(String tmdbId) {
        return similarRepository.findByTmdbId(tmdbId);
    }
}
