package com.yan.movielens.service;


import com.yan.movielens.entity.Movie;
import com.yan.movielens.entity.User;
import com.yan.movielens.entity.model.PageEntity;

import java.util.List;
import java.util.Optional;


public interface UserService{
    boolean passwordMatch(String username,String password);

    User saveUser(User user);
    Optional<User> getByUsername(String username);
    void deleteUser(User user);

    Optional<User> getById(Integer id);


    public boolean usernameExists(String username);
}
