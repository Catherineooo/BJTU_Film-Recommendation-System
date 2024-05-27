# BJTU_Film-Recommendation-System
BJTU 2024 实训课设-电影推荐系统
# 电影推荐系统



## 需求

- 输入电影名称，给出类目，给出预算范围，评分范围等，给出meta data…

- **根据关键词搜索电影**
- 可以新增电影，类目，用户，**电影评分**等
- 基于评分做**推荐**

### 用户功能

- 登录 注册
- 电影搜索（有推荐算法）
- 推荐可能感兴趣的电影（类似主页推荐吧）
- 给电影评分

PS：

* 不登录也能推荐

- 新用户？新电影。怎么办



## 数据集介绍

> 数据集：https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset

**movies_metadata.csv:** The main Movies Metadata file. Contains information on 45,000 movies featured in the Full MovieLens dataset. Features include posters, backdrops, budget, revenue, release dates, languages, production countries and companies.

**keywords.csv:** Contains the movie plot keywords for our MovieLens movies. Available in the form of a stringified JSON Object.

**credits.csv:** Consists of Cast and Crew Information for all our movies. Available in the form of a stringified JSON Object.

**links.csv:** The file that contains the TMDB and IMDB IDs of all the movies featured in the Full MovieLens dataset.

**links_small.csv:** Contains the TMDB and IMDB IDs of a small subset of 9,000 movies of the Full Dataset.

**ratings_small.csv:** The subset of 100,000 ratings from 700 users on 9,000 movies.

> 翻译版：
>
> **movies_metadata.csv：**主影片元数据文件。包含有关 Full MovieLens 数据集中 45,000 部电影的信息。功能包括海报、背景、预算、收入、发布日期、语言、制作国家和公司。
>
> **keywords.csv：**包含我们的 MovieLens 电影的电影情节关键字。以字符串化 JSON 对象的形式提供。
>
> **credits.csv：**包含我们所有电影的演员和工作人员信息。以字符串化 JSON 对象的形式提供。
>
> **links.csv：**包含Full MovieLens数据集中所有电影的TMDB和IMDB ID的文件。
>
> **links_small.csv：**包含完整数据集中 9,000 部电影的一小部分的 TMDB 和 IMDB ID。
>
> **ratings_small.csv：**来自 700 个用户对 9,000 部电影的 100,000 个评分的子集。



其实真正需要的是 只有用户表、电影表和评分表 ratings_small.csv





## 推荐算法

**推荐算法**可以用基于用户推荐/基于商品推荐/其他 不限制

但是要根据用户的反馈更新，一种策略是：

每次有用户新的评分之后就存起来，存到一个batch_size然后进行训练更新

