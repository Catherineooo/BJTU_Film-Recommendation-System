package com.yan.movielens.entity;

import com.yan.movielens.entity.key.UserAndMovieKey;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@Entity
public class Similar implements Serializable {
    @Id
    @Column(name = "tmdbid")
    private String tmdbId;

    @Column(name = "tmdbids")
    private String tmdbIds;

    public Similar() {}

    public Similar( String tmdbId, String tmdbIds) {
        this.tmdbId = tmdbId;
        this.tmdbIds = tmdbIds;
    }
}
