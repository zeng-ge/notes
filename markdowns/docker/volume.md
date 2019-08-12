## volume
1. 挂载文件系统到docker

docker run -v sourceDirectory:targetDirectory

-v 系统目录:docker内目录

```
    docker run --rm --name node_container -i -t -v ~/study/docker-notes/packages/volume/data:/dockerData node:latest bash
    
    将用户目录下的/study/docker-notes/packages/volume/data持载到node_container下面
    
    在运行的bash下面ls /dockerData可以看到volume/data下的文件
    
    在源止录下添加文件，在/dockerData可以看到
    在/dockerData下添加文件volume/data下也可以看到
```

2. 将其它容器的volume挂载到目录容器
```
将node_container的volume挂载到node_container2
docker run -d --rm --name node_container2 -i -t --volumes-from node_container node:latest bash

可以在node_container2的根目录看到/dockerData目录及对应的文件
```

3. 当node_container2通过volume-from挂载了node_container的volume后，就算关掉node_container，volume都不会关闭
```
docker stop node_container
docker attach node_container2
ls /dockerData 能看到对应内容


通过docker inspect node_container2可以发现：
"VolumesFrom": [
    "node_container"
],
"Mounts": [
    {
        "Type": "bind",
        "Source": "/Users/gzeng/study/docker-notes/packages/volume/data",
        "Destination": "/dockerData",
    }
]

通过docker inspect node_container可以发现：
"Binds": [
    "/Users/gzeng/study/docker-notes/packages/volume/data:/dockerData"
]
区别是一个有Binds，一个有VolumesFrom，它们产生了相同的Mounts，看起来就好像node_container2直接将node_container对应的配置给复制过来了
```

4. 删除一个带volume的容器时可以用docker rm -v container_name