package com.yan.movielens.service.impl;

import com.yan.movielens.entity.Movie;
import com.yan.movielens.entity.User;
import com.yan.movielens.entity.model.PageEntity;
import com.yan.movielens.repository.MovieRepository;
import com.yan.movielens.repository.UserRepository;
import com.yan.movielens.service.UserService;
import com.yan.movielens.util.PageHelper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository=userRepository;
    }
    //登录
    @Override
    public boolean passwordMatch(String username, String password){
        Optional<User> userOptional = getByUsername(username);
        if (userOptional.isPresent()) {
            String truePassword = userOptional.get().getPassword();
            // 在实际应用中，密码通常需要进行加密存储，这里假设密码已经在前端加密了
            // 这里简单比较密码，实际应用中可能需要使用更安全的加密方法
            return truePassword.equals(password);
        }
        return false;
        /*Optional<User> userOptional = getById(id);
        if(userOptional.isPresent()){
            String truePassword=userOptional.get().getPassword();
            return truePassword.equals(password);
        }
        return false;*/
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public Optional<User> getById(Integer id) {
        return userRepository.findById(id);
    }
    @Override
    public boolean usernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
    @Override
    public Optional<User> getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
