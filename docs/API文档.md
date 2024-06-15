# 电影推荐 接口文档

## 用户相关

### 登录 [POST]

- url：/login

- data:

  - username: string

  - password: string (前端进行加密 数据库存储的也是加密后的)

- response：

  - 成功

    ```json
    {
        "code": 200,
        "data": {
            "state": 1,
            "message": "登录成功",
            "user": {
                "id": 1,
                "username": "admin",
                "token": "token"
            }
        }
    }
    ```

  - 失败

    ```json
    {
        "code": 401,
        "data": {
            "state": 0,
            "message": "用户名或密码错误"
        }
    }
    ```

### 注册 [POST]

- url:  /register

- data:

  - username: string

  - password: string (加密后的)

> id自动生成 默认+1

* response：

  * 成功

    ```json
    {
        "code": 200,
        "data": {
            "state": 1,
            "message": "注册成功"
        }
    }
    ```

  * 失败

    ```json
    {
        "code": 401,
        "data": {
            "state": 0,
            "message": "注册失败"
        }
    }
    ```

### 根据token返回用户 [POST]

* url：/login/success

* data：

  * token：string

* response：

  * 成功

    ```json
    {
        "code": 200,
        "data": {
            "state": 1,
            "message": "查询成功",
            "user": {
                "id": 1,
                "username": "admin"
            }
        }
    }
    ```

  * 失败

    ```json
    {
        "code": 401,
        "data": {
            "state": 0,
            "message": "token无效"
        }
    }
    ```

## 推荐相关

### 3. 根据id推荐电影 [GET]

调drj的接口

### 4. 冷启动[GET]

就是没有用户数据的时候，推荐一些比较热门的电影

调drj的接口

## 打分

### 5. 用户给电影打分[POST]





## 数据库设计

### 1. 用户表 users

| 属性名   | 类型   | 备注                                 |
| -------- | ------ | ------------------------------------ |
| id       | int    | 主键，默认自增1                      |
| username | string | 不能重复                             |
| password | string | **加密存储**，前端加密处理再发给后端 |

### 2. 电影表

| 属性名 | 类型         | 备注            |
| ------ | ------------ | --------------- |
| id     | int          | 主键，默认自增1 |
| title  | varchar(100) | 电影名          |
| genres | varchar(100) | 类型            |

还没写完 不想写了 先写个登陆注册吧。。。