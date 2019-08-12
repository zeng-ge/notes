# service & stack

## stack
> stack相当于应用，一个stack可以由多个服务组成，如前端、后台、APP等等，每个service又可以有多个task（task本质上是容器）

### 启动stack
1. docker swarm init
> swarm是docker的集群(应用运行在多主机、多容器)
> docker swarm init开启集群模式

2. docker stack deploy -c docker-compose.yml my-node-server
> my-node-server是stack的名字
> docker stack deploy可以开启或列新stack,
> 比如将replicas从2改成3，deploy后会新增一个task

### 查看stack相关信息
1. docker service ls `列出所有service列表`
2. docker service ps service-name `列出指定service下的task列表`
```
service的名字由stack名字+docker-compose里面服务名组成
如：
stack为my-node-server
service为docker-notes-service
最终的服务名为：my-node-server_docker-notes-service

如下面的docker-compose.yml里replicas:3，表示为服务启动三个task(容器，有负载均衡)
docker service ps my-node-server时能看到三个容器
```
3. docker stack services my-node-server `列出指定stack的service列表`
4. docker stack ps my-node-server  `列出指定stack下的task列表`

### 关闭stack和swarm
1. docker stack rm my-node-server `关闭stack，关闭其下的service`
2. docker swarm leave --force     `退出swarm`

```
version: '3'

services: # 执行多次docker-compose up不会启动多个container，只会attach进己有的container
  docker-notes-service: # 服务名，在没有指定container_name时会以它作为container名的前缀，如docker-notest-server_1
    image: docker-notes # 镜像名，如果没有，就在build指定的目录查找Dockerfile执行build并将生成的镜象命名为这个值
    build: .            # 指定查找Dockerfile的目录
    deploy:
      replicas: 3
    container_name: docker-notes-server # 有值时容器名就是指定的名字
    environment:
      NODE_ENV: production
    ports:
      - 3000:3000
```

##