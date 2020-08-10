```java
//如果为null的话就不序列化
@JsonInclude(JsonInclude.Include.NON_NULL)
private Long id;

@JsonInclude(JsonInclude.Include.NON_DEFAULT)//非默认值才序列化，处理boolean很方便
```

