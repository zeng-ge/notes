package org.gzeng.funs

fun myPrint(str: String): Unit{
    println(str)
}

private fun getCount(): Int = 1

internal fun getName(): String = "sky"


fun defaultParameters(name: String, age: Int = 20): Unit {
    println("name: $name, age: $age")
}

fun namedParameters(name: String, address: String = "xi'an", age: Int) {
    println("name: $name, address: $address, age: $age")
}

fun <T> variableParameters(name: String, vararg params: T) {
    println("name: $name, params size: ${params.size}")
}

val expressionFunction: () -> Int = {
    123
};

infix fun String.add(str: String): String {
    return this.plus(str)
}

val world: String = "world";
var a: String = "123"
fun outter(): Unit {
    val outer_str = "outter"
    fun innter() {
        println("inner, out: $outer_str $world")
        fun inner_inner() {
            a = "bbb"
            println("inner'inner, $world, a: $a")
        }
        inner_inner();
    }
    innter()
}