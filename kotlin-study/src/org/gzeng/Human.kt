package org.gzeng

/**
 * 类由类名、类构造器、类体组件
 * 主构造器前面如果没有修饰符、注解，可以省略constructor
 *
 * 主构造器的参数前面加val或var相当于定义成员变量，如果没有刚相当于传参
 * */
open class People(var name: String) {
    init{
        //三引号可以换行
        println("""
            entry people class body $name
            new line
        """.trimIndent())
    }
}

class Student(name:String, var age: Int): People(name) {
    //在方法本内定义的变量是成员变量
    var _age = age;
    /***
     * init代码块会作为主构造器的一部分来执行
     */
    init{
        println("entry people age body $age")
    }

    /**
     * 次要构造器的参数不能加val与var, 且必须先托管给主构造器
     *
     * 如果没有定义主构造器，会生成一个默认的无参主构造器
     * */
    constructor(name: String, age: Int, sex: String): this(name, age){
        var _age = age;
        println("sex $sex");
    }
}