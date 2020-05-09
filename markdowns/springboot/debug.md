# debug

### 命令行

``` shell
./gradlew bootRun --debug-jvm

```

### intellij

添加一个remote debug配置,将IP与端口指定（端口在bootRun时会生成一个，一般是5005）

remote debug如果不开启的话，命令行会卡住