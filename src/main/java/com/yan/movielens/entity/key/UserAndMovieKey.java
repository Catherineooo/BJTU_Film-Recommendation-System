package com.yan.movielens.entity.key;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class UserAndMovieKey implements Serializable {

    @Column(name = "userid")
    private Integer userId;

    @Column(name = "imdbid")
    private String imdbId;

    @Override
    public String toString() {
        return "UserAndMovieKey [userId=" + userId + ", imdbId=" + imdbId + "]";
    }
}
