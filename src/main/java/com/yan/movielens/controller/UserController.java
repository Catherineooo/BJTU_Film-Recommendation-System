package com.yan.movielens.controller;

import com.yan.movielens.entity.User;
import com.yan.movielens.entity.model.PageEntity;
import com.yan.movielens.service.UserService;
import com.yan.movielens.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
//@RequestMapping(value = "/user")
//@Controller
public class UserController {

//    @Autowired
    private UserService userService;


    private JwtUtil jwtUtil = new JwtUtil(); // 创建JWT工具实例

    //    依赖注入
    public UserController(UserService userService){
        this.userService = userService;
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, Object> loginData) {
        String username = (String) loginData.get("username");
        String password = (String) loginData.get("password");
        Map<String, Object> response = new HashMap<>();
        System.out.println("receive login:username="+username + "password="+ password);
        if (userService.passwordMatch(username, password)) {
            Optional<User> userOptional = userService.getByUsername(username);
            //token
            User user = userOptional.get();
            String token = jwtUtil.generateToken(user);
            //response
            response.put("code", 200);
            Map<String, Object> data = new HashMap<>();
            data.put("message", "登录成功");
            data.put("state", 1);
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.getId());
            userData.put("username", user.getUsername());
            userData.put("token", token);
            data.put("user", userData);
            response.put("data", data);
            return ResponseEntity.ok(response);
        } else {
            response.put("code", 401);
            Map<String, Object> data = new HashMap<>();
            data.put("message", "用户名或密码错误");
            data.put("state", 0);
            response.put("data", data);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    @PostMapping("/login/success")
    public ResponseEntity<Map<String, Object>> loginSuccess(@RequestBody Map<String, String> tokenData) {
        String token = tokenData.get("token");

        Map<String, Object> response = new HashMap<>();

        // Validate token
        if (token != null && jwtUtil.validateToken(token)) {
            // Extract user information from token
            Integer userId = jwtUtil.getUserIdFromToken(token);
            String username = jwtUtil.getUsernameFromToken(token);

            // Prepare response
            response.put("code", 200);
            Map<String, Object> data = new HashMap<>();
            data.put("state", 1);
            data.put("message", "查询成功");
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", userId);
            userData.put("username", username);
            data.put("user", userData);
            response.put("data", data);

            return ResponseEntity.ok(response);
        } else {
            // Invalid token
            response.put("code", 401);
            Map<String, Object> data = new HashMap<>();
            data.put("state", 0);
            data.put("message", "token无效");
            response.put("data", data);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, Object> registerData) {
        String username = (String) registerData.get("username");
        String password = (String) registerData.get("password");
        Map<String, Object> response = new HashMap<>();

        if (userService.usernameExists(username)) {
            response.put("code", 401);
            Map<String, Object> data = new HashMap<>();
            data.put("message", "注册失败!用户名已存在");
            data.put("state", 0);
            response.put("data", data);
            return ResponseEntity.ok(response);
        } else {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(password); // 假设密码已经在前端加密
            userService.saveUser(newUser);
            response.put("code", 200);
            Map<String, Object> data = new HashMap<>();
            data.put("message", "注册成功");
            data.put("state", 1);
            response.put("data", data);
            return ResponseEntity.ok(response);
        }
    }

    /*@GetMapping(value = "/userlist")
    public PageEntity getAllUserList(@RequestParam(value = "pageIndex") Integer pageIndex,
                                     @RequestParam(value = "pageSize") Integer pageSize){
        return userService.getAllUserList(pageIndex,pageSize);
    }

    @PostMapping(value = "/userinfo")
    public User getUserById(@RequestParam(value = "userId") Integer userId){
        Optional<User> user=userService.getById(userId);
        if(user.isPresent())
            return user.get();
        return null;
    }

    @PostMapping(value = "/logout")
    public void deleteUser(@RequestParam(value = "userId") Integer userId){
        User user=new User();
        user.setId(userId);
        userService.deleteUser(user);
    }*/
}