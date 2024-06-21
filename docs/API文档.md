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
                "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlkIjoxLCJleHAiOjE3MTg1NDM1ODUsImlhdCI6MTcxODUwNzU4NSwidXNlcm5hbWUiOiJhZG1pbiJ9.6NYCUsycAUchWsikTEXUljwGttHBEd_oOkuNhpWc_SE"
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

## 搜索相关

直接调别人的api谢谢



## 推荐相关

### 4. 根据id推荐电影 [GET]

调drj的接口

* url：**/recommend/getRecommend**

* data：

  * **userId：int**
  * token: string (校验 必须对应userId)

* response：

  * 成功

    ```json
    {
        "code": 200,
        "data": {
            "movies": [
                "9354",
                "1779",
                "10849",
                "11010",
                "9442",
                "23954",
                "12626",
                "2028",
                "881",
                "10403",
                "3121",
                "18183",
                "637",
                "3033",
                "4518",
                "12560",
                "9798",
                "9487",
                "244",
                "910"
            ],
            "state": 1,
            "message": "查询成功"
        }
    }
    ```
  
  * 失败
  
    ```json
    {
        "code": 401,
        "data": {
            "state": 0,
            "message": "用户不存在"
        }
    }
    //token 一定要是和本人对应的token！！！！
    {
        "code": 401,
        "data": {
            "state": 0,
            "message": "token无效"
        }
    }
    // 或者 因为drrj 只给了 1-600左右的用户推荐
    {
        "code": 401,
        "data": {
            "state": 0,
            "message": "找不到推荐信息哦"
        }
    }
    ```
    
    

### 5. 冷启动[GET]

就是没有用户数据的时候，推荐一些比较热门的电影

调tmdb的接口

## 电影评分

### 用户给电影评分[POST]

* url:  /rate/addRating

* data:

  - imdb_id: string

  - movie_info: string

  - username: string

  - rating: float

    ```json
    {
        "username": "1",
        "imdb_id": "tt0477342",
        "movie_info" : "111",
        "rating": 4.5
    }
    ```

    

* response：

  * 成功

    ```json
    {
        "code": 200,
        "data": {
            "state": 1,
            "message": "评分成功",
            "user": {
                "id": 1,
                "username": "1"
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
            "message": "评分记录已存在"
        }
    }
    ```
    
  

### 用户更新电影评分[POST]

- url:  /rate/updateRating

- data:

  - username: string

  - imdb_id: string

  - rating: float

    ```json'
    {
        "username": "1",
        "imdb_id": "tt0477342",
        "rating": 0.1
    }
    ```

    

- response：

  * 成功

    ```json
    {
        "code": 200,
        "data": {
            "state": 1,
            "message": "评分更新成功"
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
            "message": "xxx"
            }
        }
    }
    
    
    ```
    
    

### 用户删除电影评分 [DELETE]

- url:  /rate/deleteRating

- data:

  - username: string

  - imdb_id: string

    ```json
    {
        "username": "1",
        "imdb_id": "tt0477333"
    }
    ```

    

- response：

  * 成功

    ```json
    {
        "code": 200,
        "data": {
            "state": 1,
            "message": "删除评分成功"
        }
    }
    ```
    
  * 失败
  
    ```json
    {
        "code": 401,
        "data": {
            "state": 0,
            "message": "评分记录不存在"
        }
    }
    ```
    
  

### 获取用户所有电影评分[GET]

- url:  /rate/getRating

- data:

  - username: string

- response：

  - 成功(给不了)

    ```json
    {
        "code": 200,
        "data": {
            "state": 1,
            "message": "查询成功",
            "ratingList": {
                {"imdb_id": string,
                "movie": string,
                "rating": float}
            	}
            }
        }
    }
    ```

  - **我给你这样的**(important!!!!!!!!!) ratingList是一个列表

    ```json
    {
        "code": 200,
        "data": {
            "ratingList": [
                {
                    "movie": "111",
                    "imdb_id": "tt0477333",
                    "rating": 4.5
                },
                {
                    "movie": "222",
                    "imdb_id": "tt0477334",
                    "rating": 4.5
                },
                {
                    "movie": "333",
                    "imdb_id": "tt0477338",
                    "rating": 4.5
                },
            ],
            "state": 1,
            "message": "查询成功"
        }
    }
    ```
    
    
    
  - 失败
  
    ```json
    {
        "code": 401,
        "data": {
            "state": 0,
            "message": "xxx"
            }
        }
    }
    ```
  
    
