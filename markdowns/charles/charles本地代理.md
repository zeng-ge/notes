# charles本地代理

> charles默认抓不到localhost的包。
>
> 只能抓到localhost.charlesproxy.com的包。

### 本地抓包配置

#### hosts

``` shell
sudo vim /etc/hosts
添加
127.0.0.1				localhost.charlesproxy.com
```

#### remote或local映射

1. Charles -> tools -> Map Remote

2. Map From

> 源请求对应的host、port、path、query

``` kotlin
Host: localhost.charlesproxy.com //这里在请求localhost.charlesproxy.com时会转发
Path: /api/MiniPromotions*  //所有以/api/MiniPromotions开头的请求都会转发
```

3. Map To

> 目标请求url

``` kotlin
// 基本配置同from一致
// path很重要，如这里/api/会转发到/api/MiniPromotions，如果配置/api/MiniPromotions/会有问题
// 感觉要想匹配范围广，这个目标path就要更短
```







