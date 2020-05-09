### 格式化与解析

> SimpleDateFormat 可以自定义格式

``` java
/***
 * 年：       y
 * 月：       M       MM 01       MMM 一月
 * 日：       d
 * 时：       H/h     H 24小时      h 12小时制
 * 分：       m
 * 秒：       s
 * 毫秒：     S
 * 星期：     E
 * 年中的天：  D
 * 时区：      Z
 */
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z");
logger.info("simple date format: " + sdf.format(date));
//simple date format: 2020-05-08 16:33:13 +0800

Date sdate = sdf.parse("2020-05-08 15:20:20 +0800");
logger.info("simpate date parse:" + sdate.toString());
// simpate date parse:Fri May 08 15:20:20 CST 2020
```

> DateFormat 自带格式化风格, 不能自定义格式

```java
Date date = new Date();
DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.FULL, DateFormat.FULL);
logger.info(dateFormat.format(date));

dateFormat = DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.MEDIUM);
logger.info(dateFormat.format(date));
```