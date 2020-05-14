package com.example;

import com.sun.scenario.effect.Offset;
import org.junit.Assert;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

public class DateTest {
    Logger logger = LoggerFactory.getLogger(DateTest.class);
    @Test
    public void testDate() {
        Date date = new Date();
        logger.info("年：" + (date.getYear() + 1900));//年要+1900，即从1900年
        logger.info("micro seconds from 1970.1.1: " + date.getTime()); // timestamp记录的是1970-01-01距今的毫秒数
        logger.info(date.toString());
    }

    @Test
    public void testCalendar(){
        // Calendar表示一个特定的时间点，默认代表当前时间
        Calendar calendar = Calendar.getInstance();
        logger.info("当前月:" + calendar.get(Calendar.MONTH));// 月份是从0开始的, 1表示的是2月

        calendar.clear();
        calendar.set(2019, 9, 1, 8, 8 , 8);
        logger.info("year:" + calendar.get(Calendar.YEAR)); //年
        logger.info("month:" + calendar.get(Calendar.MONTH)); //月
        logger.info("day:" + calendar.get(Calendar.DAY_OF_MONTH)); //月的天

        logger.info("hour 12:" + calendar.get(Calendar.HOUR)); //小时 12小时制
        logger.info("hour 24:" + calendar.get(Calendar.HOUR_OF_DAY)); //小时 24小时制
        logger.info("minute:" + calendar.get(Calendar.MINUTE)); //分
        logger.info("second:" + calendar.get(Calendar.SECOND)); //秒

        logger.info("Date:" + calendar.get(Calendar.DATE));

        logger.info("am:" + calendar.get(Calendar.AM));
        logger.info("pm:" + calendar.get(Calendar.PM));
        logger.info("am_pm:" + calendar.get(Calendar.AM_PM));

        calendar.add(Calendar.YEAR, 1);
        logger.info("year:" + calendar.get(Calendar.YEAR)); //年
        calendar.add(Calendar.MONTH, 1);
        logger.info("month:" + calendar.get(Calendar.MONTH)); //月
        calendar.add(Calendar.DATE, 1);
        logger.info("day:" + calendar.get(Calendar.DATE)); //月的天
    }

    @Test
    public void dateFormat() throws ParseException {
        Date date = new Date();
        DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.FULL, DateFormat.FULL);
        logger.info(dateFormat.format(date));

        dateFormat = DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.MEDIUM);
        logger.info(dateFormat.format(date));

        /***
         * 年：       y
         * 月：       M       MM 01       MMM 一月
         * 日：       d
         * 时：       H/h     H 24小时      h 12小时制
         * 分：       m
         * 秒：       s
         * 毫秒：      S
         * 星期：      E
         * 年中的天： D
         * 时区：      Z
         *
         */
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z");
        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z");
        sdf2.setTimeZone(TimeZone.getTimeZone("America/New_York"));

        logger.info("simple date format: " + sdf1.format(date));
        logger.info("simple date format with timezone new york: " + sdf2.format(date));

        //同一个日期，SimpleDateFormat配不同的时区，parse出来的日期是一样的，可见时区只在format时起了作用
        logger.info("simpate date parse:" + sdf1.parse("2020-05-08 15:20:20 +0800"));
        logger.info("simpate date parse with timezone new york:" + sdf2.parse("2020-05-08 15:20:20 +0800"));
    }

    @Test
    public void timezone(){
        TimeZone timeZone = TimeZone.getDefault();
        //getRawOffset获取 时间差毫秒数，如+8：00对应28800000
        logger.info("timezone, id: {}, offset: {}", timeZone.getID(), timeZone.getRawOffset());

        //获取所有的zone id
//        ZoneId.getAvailableZoneIds().stream().forEach(item -> logger.info(item));

        TimeZone gmtTimeZone = TimeZone.getTimeZone("Etc/GMT+9");
        TimeZone isoTimeZone = TimeZone.getTimeZone("GMT+00:00");
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.setTimeZone(gmtTimeZone);
        calendar.set(2020, 5, 8 , 10, 10, 10);

        Calendar calendar2 = Calendar.getInstance();
        calendar2.clear();
        calendar2.setTimeZone(isoTimeZone);
        calendar2.set(2020, 5, 8 , 10, 10, 10);

        Date date = calendar.getTime();
        Date isoDate = calendar2.getTime();

        // Date本身不带时区，date.getTimezoneOffset()直接用TimeZone.getDefaultRef()获取默认时区
        logger.info("iso timezone: {}, gmt timezone: {}", isoTimeZone.getID(), gmtTimeZone.getID());
        logger.info("iso date timezone: {}, gmt date timezone: {}", isoDate.getTimezoneOffset(), date.getTimezoneOffset());
        logger.info("gmt date: {}", date);
        logger.info("iso date: {}", isoDate);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z");
        logger.info("sdf without timezone: {}", sdf.format(date));
        sdf.setTimeZone(gmtTimeZone);
        logger.info("sdf with timezone: {}", sdf.format(date));

        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss Z");
        logger.info("sdf2 without timezone: {}", sdf2.format(isoDate));
        sdf2.setTimeZone(isoTimeZone);
        logger.info("sdf2 with timezone: {}", sdf2.format(isoDate));
    }

    @Test
    public void testOffsetDateTime() {
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.setTimeZone(TimeZone.getTimeZone(ZoneId.of("America/New_York")));

        logger.info("actual first week day {}", calendar.getActualMinimum(Calendar.DAY_OF_WEEK));
        logger.info("new york's first day of {}", calendar.getFirstDayOfWeek());

        OffsetDateTime offsetDateTime = OffsetDateTime.now(ZoneId.of("America/New_York"));

        logger.info(offsetDateTime.getDayOfWeek().toString()); //获取星期几
        logger.info(offsetDateTime.toString());
        logger.info(offsetDateTime.with(TemporalAdjusters.previous(DayOfWeek.MONDAY)).toString());
    }

    @Test
    public void testDateParse() throws ParseException {
        Date now = new Date();
        logger.info("toString: {}, toGMTString: {}",now.toString(), now.toGMTString());
        logger.info(new Date(120, 10, 5, 1,1).toString());
        SimpleDateFormat sdf = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss 'GMT'Z");
        logger.info("format date show timezone: {}", sdf.format(now));

        /***
         * Date内部：
         *      cdate, 默认是Gregorian.Date实例，所以Date表现的像个标准时区时间就是因为它
         *      fastTime 表示相对于标准时区1970-01-01 00:00:00的毫秒数
         *
         * Mon May 11 2020 09:27:12 GMT+0600转成date的过程：
         * SimpleDateFormat.parse将字符串中的各种数据存进CalendarBuilder.field数组内部
         *
         * parsedDate = calb.establish(calendar).getTime();
         * CalendarBuilder.estimate，将field相关数据存进一个GregorianCalendar实例的fields数组
         * calendar.getTime() =>  getTimeInMillis() => updateTime() => GregorianCalendar.computeTime()
         *
         * computeTime()内部会利用年月日时分秒微秒时区来计算timestamp
         *      把年月日十分秒加起来转成秒, * 1000转成微秒，+ 微秒
         *      long fixedDate = timeOfDay / ONE_DAY; ONE_DAY=24*60*60*1000= 86400000,算出相对于1980年偏移的天
         *      timeOfDay %= ONE_DAY; //余下的毫秒用来计算时间即时、分秒、毫秒
         *
         *      long millis = (fixedDate - EPOCH_OFFSET) * ONE_DAY + timeOfDay;//减去1970年对应的天数*天对应的微秒并加上时分秒对应的微秒
         *      millis -= zoneOffsets[0] + zoneOffsets[1]; //减去时区对应的微秒数就得到的UTC时区对应的微秒数
         *      // Set this calendar's time in milliseconds
         *      time = millis;
         *      计算的结果就是timestamp表示的是UTC时间
         *
         *      GregorianCalendar.computeFields()
         *          将timestamp取出 + calendar中存放的timezone对应的微秒数
         *          根据timestamp计算出天fixedDate和timeOfDay
         *          Gregorian.getCalendarDateFromFixedDate(gdate, fixedDate)根据天计算出年、月、日、星期
         *          根据timeOfDay算出时分秒
         *          这样calendar里面对应的fields就是字符串中日期(2020-05-11 09:27:12，这个日期是加上了时区偏移的)
         *
         * getTime利用calendar.times创建一个Date实例，它内部的cdate中的年月日时分秒是加上了默认时区偏移计算出来的（对应的时间就成了11:27:12）
         * 这个计算过程不知道怎么完成了，new Date(timestamp)之后cdate中的数据就出现了，中间没有触发任何其它调用数据就自动出现了
         *
         * Date.toGMTString实现原理：取出timestamp，重新计算年月日时分秒并将数据存进一个CalendarDate对象（无视时区）
         * Date.toString 直接取出cdate里面的年月日时分秒进行拼接
         *
         * 算出相对于1970年的微秒数：
         * （2020年对应的天数）737556 - 719163（1970对应的天数）
         * long millis = (fixedDate - EPOCH_OFFSET) * ONE_DAY + timeOfDay;
         *
         * 减去时区偏移对应的毫秒数，得到相对标准时区1970-01-01 00:00:00的毫秒数：
         * millis - 6*60*60 * 1000（21600000）
         *
         */
        String dateStr = "Mon May 11 2020 09:27:12 GMT+0600";//加6时区相当于加8时区的11:27:12
        Date date = sdf.parse(dateStr);
        logger.info("parse date string with GMT timezone: {}, toString: {}", date.toGMTString(), date.toString());

        //同一个时间字符串，时区不一样，用SimpleDateFormat.parse出来的date.getTime不一样
        String dateStr2 = "Mon May 11 2020 09:27:12 GMT+0000";
        SimpleDateFormat sdf2 = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss 'GMT'Z");
        Date date2 = sdf2.parse(dateStr2);
        //
        logger.info("times {}, timezone: {}, date: {}", date.getTime(), date.getTimezoneOffset(), date.toString());
        logger.info("times {}, timezone: {}, date: {}", date2.getTime(), date2.getTimezoneOffset(), date2.toString());
    }

    @Test
    public void localdateTime() {
        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("America/New_York"));
        logger.info("localdatetime: {}", localDateTime.toString());
        logger.info("getMonth: {}, getMonthValue: {}", localDateTime.getMonth(), localDateTime.getMonthValue());
        logger.info(localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SSSS")));

        ZonedDateTime zonedDateTime = ZonedDateTime.now();
        logger.info(zonedDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SSSS zZ X")));

        OffsetDateTime offsetDateTime = OffsetDateTime.now();
        logger.info(offsetDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SSSS Z X")));

        /***
         * Parse的过程也是先解析出各个值，然后算出微秒数再减少时区对应的微秒数，得到UTC微秒数
         * 有时区时会依赖ZonedDateTime解析时区相关信息
         *
         * ChronoZonedDateTime.toEpochSecond时会减去时区对应的秒, 时而得到UTC时间对应的秒
         *      long epochDay = toLocalDate().toEpochDay();
         *      long secs = epochDay * 86400 + toLocalTime().toSecondOfDay();
         *      secs -= getOffset().getTotalSeconds();
         * parse后的数据由OffsetDateTime.from转化成对应的OffsetDateTime
         *
         * OffsetDateTime在获取秒数时利用
         * public long toEpochSecond() {
         *    //调用LocalDateTime父类ChronoZonedDateTime.toEpochSecond得到减去时区后的UTC秒数
         *    return dateTime.toEpochSecond(offset);
         * }
         *
         * OffsetDateTime、ZonedDateTime都重写了toEpochSecond方法，在计算秒时来减去时区偏移
         * LocalDateTime由于没有时区相关的信息，在调用toEpochSecond时需要人工传入一个时区
         */
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss Z");
        OffsetDateTime offsetDateTime2 = OffsetDateTime.parse("2020-05-14 14:51:20 +0600", dateTimeFormatter);
        logger.info(offsetDateTime2.toString());

    }

    @Test
    public void optional() {
        String[] arrs = {"hello", "world"};
        Arrays.stream(arrs).map(item -> item + " map").forEach(logger::info);

        String[][] mulArr = { {"a", "b"}, { "c", "d"} };
        Arrays.stream(mulArr).flatMap(item -> {
            return Arrays.stream(item);
        }).forEach(item-> {
            logger.info(item);
        });

        logger.info(Optional.of("abc").map(item -> "===>" + item).orElse(null));
        logger.info(Optional.of(arrs).flatMap(a -> Optional.of("====>" + a[0])).orElse(null));

        Arrays.stream(Optional.ofNullable(arrs).map(item -> {
            return item;
        }).get()).forEach(logger::info);

//        Optional.ofNullable(mulArr).flatMap(items -> Arrays.stream(items))
    }
}
