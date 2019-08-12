# docker file

## docker-compose
1. 查找目录下的docker-compose.yml
```
version: '2.1'

services: # 执行多次docker-compose up不会启动多个container，只会attach进己有的container
  docker-notes-service: # 服务名，在没有指定container_name时会以它作为container名的前缀，如docker-notest-server_1
    image: docker-notes # 镜像名，如果没有，就在build指定的目录查找Dockerfile执行build并将生成的镜象命名为这个值
    build: .            # 指定查找Dockerfile的目录
    container_name: docker-notes-server # 有值时容器名就是指定的名字
    environment:
      NODE_ENV: production
    ports:
      - 3000:3000
```
2. 在找得到image的情况下是不会重新build的，除非加上--build
```
docker-compose up --build
或者
docker-compose build
```