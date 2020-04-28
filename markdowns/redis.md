# redis

> redis(Remote Dictionary Server)是一个缓存服务器，所有的操作都在内存中完成。它支持以下几种数据类型：string、list、map、set、 sortedset

### 常用命令

1. set key value //在redis里面增一个键值对，键是key，值是value
2. del key //删除key对应的键值对

``` shell
set name sky	//添加一个{name:sky}的键值对
get name 			//获取name对应的值
del name sky  //删除key对应的键值对
exists name	  //判断是否存在对应的key

//操作HashMap
hset userMap name yumiko age 30  //添加一个键名为userMap的hashMap { name: yumiko, age: 30}
hget userMap name								 //取出userMap里面的name
hexists userMap name						 //判断是userMap里面是否存在name
hgetAll userMap                  //获取userMap里面所有的key与value
hkeys userMap                    //获取userMap的所有key
hlen userMap										 //获取userMap中key的数量
hvals userMap										 //获取userMap中所有的值

//操作list
lpush userList sky moon yumiko   //创建userList列表，lpush将值从头插入，[yumiko, moon, sky]
llen userList										 //查看列表长度
lindex userList 1								 //取出index为1的值moon
lpop userList                    //弹出表头的值yumiko
lset userList 0 tod123           //lset修改值，将索引为0的值修改成tod123
lrange userList 0 2              // 获取指定区域的值如这里是index 0到2
rpush userList 1 2 3             // 从list尾部push入值
rpop userList										 // 弹出表尾的值

//操作Set
sadd userSet a b c 							 //向userSet中加入a,b,c，同一个key只能存在一个
scard userSet                    //统计长度，这里是3
srem userSet a									 //删除set中的指定元素

//操作SortedSet
zadd sortedSet 3 c 4 d					 //向sortedset中加入两个值，由于要排序需加指定排序的数字
zcard sortedSet                  //长度
```

