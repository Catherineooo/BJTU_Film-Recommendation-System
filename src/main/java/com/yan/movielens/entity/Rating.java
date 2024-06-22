package com.yan.movielens.entity;

import com.yan.movielens.entity.key.UserAndMovieKey;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.io.Serializable;

@Data
@Entity
public class Rating implements Serializable {

    @EmbeddedId
    private UserAndMovieKey key;

    @Column(name = "rating", columnDefinition = "double(16,2) not null")
    private Double rating;

    @Column(name = "timestamp", columnDefinition = "bigint")
    private long timeStamp;

    @Column(name = "movie", columnDefinition = "bigint")
    private String movie;

    public Rating() {}

    public Rating(Integer userId, String imdbId, Double rating, Long timeStamp, String movie) {
        this.key = new UserAndMovieKey();
        this.key.setUserId(userId);
        this.key.setImdbId(imdbId);
        this.rating = rating;
        this.timeStamp = timeStamp;
        this.movie = movie;
    }
}
