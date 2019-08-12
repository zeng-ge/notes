# swarm
> 一组运行docker的主机, 加入到了一个cluster，这个cluster就是swarm.
> 主机可以是物理的，也可以是虚拟的，在swarm里面作为node. 
> 通过swarm manager来管理node, 只有swarm manager能够执行命令，并由它来授权其它机器加入集群。
```
docker swarm init开启swarm模式，并当前主机变成swarm manager。
在swarm manager执行命令，会作用于整个swarm集群，而不仅仅是当前主机。
```

## 注意(mac和windows里面Docker 主机不能能与swarm)
```
docker主机可能作为node加入集群，但是作为swarm manager的话，在node里面执行docker swarm join --token token ip:port时会timeout

https://docs.docker.com/engine/swarm/swarm-tutorial/#use-docker-for-mac-or-docker-for-windows

Currently, you cannot use Docker Desktop for Mac or Docker Desktop for Windows alone to test a multi-node swarm. However, you can use the included version of Docker Machine to create the swarm nodes (see Get started with Docker Machine and a local VM), then follow the tutorial for all multi-node features. For this scenario, you run commands from a Docker Desktop for Mac or Docker Desktop for Windows host, but that Docker host itself is not participating in the swarm. After you create the nodes, you can run all swarm commands as shown from the Mac terminal or Windows PowerShell with Docker Desktop for Mac or Docker Desktop for Windows running.
```

## 创建虚拟机
1. docker-machine create --driver virtualbox docker-virtual
```
 --driver virtualbox 使用virtualbox创建虚拟主机
 docker-virtual为虚拟主机的名字
```
2. docker-machine ls 查看虚拟主机列表
> 包含主机名、IP等信息
3. 系统镜像[boot2docker.iso](https://github.com/boot2docker/boot2docker/releases)
> virtualbox启动时一般需要指定一个系统ISO(如windows, linux之类的)，这里使用docker提供的一个精减版的linux系统boot2docker.iso,需要手动下载，并将其放进~/.docker/machine/cache。
4. 开启与关闭虚拟机
```
docker-machine stop docker-virtual
docker-machine start docker-virtual
```
5. 复制文件
```
复制内容到目标主机
docker-machine scp package.json docker-virtual:/home/docker

从目标主机复制内容出来
docker-machine scp docker-virtual:/home/docker/test.txt .

区别在于目标文件位于后面
```

## 连接到swarm manager
1. 在swarm manager生成token
```
docker swarm join-token manager 生成以manager角色加入swarm的命令（主要是token）
docker swarm join-token worker  生成以worker角色加入swarm的命令
```
2. 在docker虚拟机或主机上，执行join命令
```
docker swarm join --token SWMTKN-1-0fq02zqo51x2lj4zdo47m0dt04lydyplc12yd3g7pv2jbry4if-46r6ofxiib9e0klvy45kpjywb 192.168.65.3:2377

manager与worker生成的token不一样
```
3. 在swarm manager上查看节点
```
docker node ls
```

4. 连接到docker-machine创建的机器
```
docker-machine ssh machine-name
```

## 操作节点
1. docker node rm 

