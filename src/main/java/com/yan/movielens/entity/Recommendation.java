package com.yan.movielens.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "recommendation")
public class Recommendation {

    @Id
    @Column(name = "userid")
    private Integer userId;

    @Column(name = "tmdbid", columnDefinition = "varchar(255) DEFAULT NULL")
    private String tmdbId;
}
