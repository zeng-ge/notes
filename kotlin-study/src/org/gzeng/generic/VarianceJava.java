package org.gzeng.generic;

import java.util.ArrayList;
import java.util.List;

public class VarianceJava {
    /***
     * List<String>不是List<Object>的子类，不能直接赋值
     * List<? super String>是List<String>的超类
     */
//    List<Object> objects = new ArrayList<String>();

    List<? super String> list = new ArrayList<String>();


    /***
     *
     * List<? extends T>是List<T>的子类
     */
    public static <T> List<T> copy(List<T> target, ArrayList<? extends T> source) {
        target.addAll(target);
        return target;
    }

//    public static <T, E extends T> List<T> copy(List<T> target, ArrayList<E> source) {
//        return null;
//    }

    public static void array() {
        /***
         * 数组初始化的几种形式：
         * 1) new String[]{"abc", "def"}
         * 2) {"abc", "def"}
         * 3) new String[2]
         */
        Object[] list = new String[]{ "abc", "def" };
        String str = (String)list[0];

        List<? super English> humans = new ArrayList<Human>();
        humans.add(new English());
    }
}

class Human{}
class Chinese extends Human{}
class English extends Human{}
