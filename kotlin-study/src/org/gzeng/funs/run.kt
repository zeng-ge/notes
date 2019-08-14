package org.gzeng.funs

fun main() {
    myPrint("hello function")
    defaultParameters("sky")
    namedParameters("sky", age = 20);
    namedParameters(age = 20, name = "sky");

    variableParameters("sky", "xi'an", "huanpu", 123)
    println(expressionFunction())
    println("hello".add(" world"))
    println("hello" add " world")

    outter()


    val length: () -> Int = lodash("hello world")
    println(length())


    lambdaFn("hello")
    anonymousFn("world")

    receiverFn("receiverFn hello", " world")
    receiverFn.invoke("receiverFn hello", " world")

    hello()

    lambdaInline {
        println("lambda invoke")
    }

    val result: Int = reduce(listOf<Int>(1, 2, 3), 0) { accumulator: Int, item: Int ->
        /***
         * lambda直接return的话会跳出外层的函数
         * lambda会跟据返回类型将最后的表达示作为返回值
         */
        accumulator + item
    }
    println("reduce result: $result")

    val lambdaReturn: String = wholeLambdaExpression("sky") { str: String ->
        println("lambda callback, it: $str")
        return@wholeLambdaExpression "ddd"
    }
    println(lambdaReturn)

    wholeLambdaExpression("sky", fun (str: String): String {
        println("anonymous callback, it: $str")
        return "hello world"
    })
}