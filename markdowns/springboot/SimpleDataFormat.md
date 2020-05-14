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
 https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
 		G	Era designator	Text	AD
    y	Year	Year	1996; 96
    Y	Week year	Year	2009; 09
    M	Month in year	Month	July; Jul; 07
    w	Week in year	Number	27
    W	Week in month	Number	2
    D	Day in year	Number	189
    d	Day in month	Number	10
    F	Day of week in month	Number	2
    E	Day name in week	Text	Tuesday; Tue
    u	Day number of week (1 = Monday, ..., 7 = Sunday)	Number	1
    a	Am/pm marker	Text	PM
    H	Hour in day (0-23)	Number	0
    k	Hour in day (1-24)	Number	24
    K	Hour in am/pm (0-11)	Number	0
    h	Hour in am/pm (1-12)	Number	12
    m	Minute in hour	Number	30
    s	Second in minute	Number	55
    S	Millisecond	Number	978
    z	Time zone	General time zone	Pacific Standard Time; PST; GMT-08:00  看来还是小z好一些
    Z	Time zone	RFC 822 time zone	-0800
    X	Time zone	ISO 8601 time zone	-08; -0800; -08:00
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