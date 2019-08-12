# options

## docker
1. docker run   启动容器并运行一个命令，如果还没有镜象会先下载
```
在没有容器的情况下，目前只发现run可以启动一个容器, start要先有才能启动
docker run --rm -i -t --name container-name image:tag bash
--rm    stop时删除容器
--name 容器名字
-i     保持stdin开启
-t     分配一个tty（terminal)
-p 3000:3000    商品映射    主机端口：docker端口
-d     attach后台运行
```
2. docker exec container-name cmd-name  在容器里面执行命令
```
docker exec -i -t docker-notes-server bash
```
3. docker attach container-name         将stin、stout、sterror attach到容器
4. docker start container-name          启动容器
4. docker stop  container-name          停止容器
5. docker rm container-name             删除容器
6. docker build                         根据Dockerfile build镜象
```
docker build -t mynode:abc .
-t  镜象名：标签名
.   在当前目录下查找DockerFile
```
7. docker tag
```
docker tag metpahor/couchbase-server-nosetup:community-4.5.1-1 abc:def
metpahor/couchbase-server-nosetup:community-4.5.1-1 用户/镜象名:标签名
abc:def                                             镜象名：标签名

docker tag node abc相当于docker tag node:latest abc:latest默认添加latest标签
```
8. docker commit
9. docker rmi imagename:tagname
```
docker rmi node === docker rmi node:latest
```
10. docker insepct container-name        查看容器详情

### docker image
1. docker images === docker image ls    显示所有image
2. docker image rm image-name           删除指定image
3. docker image prune                   删除所有未使用的image
4. docker inspect image-name            显示image的详细信息

### exec        在容器中执行一个命令
```
打开容器的bash
docker exec -i -t docker-container-name bash
```

### attach    连接到容器，关闭窗口时容器会被关掉
```
docker attach docker-container-name
```

## docker-compose 管理多个容器
1. up/down  启动或关闭并删除docker-compose对应的容器
2. ps       查看该docker-compose.yml运行的容器
3. start/stop   启动或关闭服务
```
docker-compose up
docker-compose stop         关闭所有容器
docker-compose stop docker-notes-server     关闭指定服务（可以是service名与容器 名）
docker-compose start        启动所有容器
docker-compose start docker-notes-service    启动指定服务（只能是服务名，如果删掉了则无法启动）
```
4. run service-name 类似于docker的exec，只能跟服务名，容器名不行
```
docker-compose run docker-notes-service bash    
```
5. --build  重新用Dockerfile编译image
6. -d       detached后台运行 
7. --volumes down时连volume也删掉
8. -f       指定docker-compose.yml文件
```
-f 要位于 up之前
docker-compose -f docker-compose.development.yml up --build -d
```

```
build              Build or rebuild services
bundle             Generate a Docker bundle from the Compose file
config             Validate and view the Compose file
create             Create services
down               Stop and remove containers, networks, images, and volumes
events             Receive real time events from containers
exec               Execute a command in a running container
help               Get help on a command
images             List images
kill               Kill containers
logs               View output from containers
pause              Pause services
port               Print the public port for a port binding
ps                 List containers
pull               Pull service images
push               Push service images
restart            Restart services
rm                 Remove stopped containers
run                Run a one-off command
scale              Set number of containers for a service
start              Start services
stop               Stop services
top                Display the running processes
unpause            Unpause services
up                 Create and start containers
version            Show the Docker-Compose version information
```