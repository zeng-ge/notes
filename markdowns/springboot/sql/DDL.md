# sql

## DDL

1. 改列的类型：`alter table app_version MODIFY is_deleted BOOLEAN DEFAULT FALSE NOT NULL;`



### DDL

```mysql
insert into app_version(created_at, created_by, updated_at, updated_by, title, content, platform, version)
values (CURRENT_TIMESTAMP(), 'zg', CURRENT_TIMESTAMP(), 'zg', 'ios update', 'ios update content', 'IOS', '7.1.2');
```

### 查询

```mysql
/**
* 4表关联
* project							项目表 -->对应一个游戏
* game								游戏表 -->对应多个关卡
* game_level					关卡表 --> 对应一个进度
* game_level_progress 关卡进度
* 多表关联时，inner join的顺序是可以随意调整的，表名与后面指定的列可以确定是那两个表在关联
*/
select game_level.*, glp.progress, glp.suspend_data from game_level
     inner join game g on game_level.game_id = g.id
     inner join project p on g.project_id = p.id
     inner join game_level_progress glp on glp.level_id=game_level.id
where p.id = 14 and game_level.is_deleted=0;
```

### 增、删、改列

``` sql
# 添加列
alter table user add column added_field varchar(10);

#重命名列
alter table user rename column added_field to rename_field;

#修改列的类型
alter table user modify column rename_field varchar(8) default 'field';

#删除列
alter table user drop column rename_field;

desc user;

#添加外键
alter table user add column teacherId bigint;
alter table user add foreign key (teacherId) references teacher(id);
```

