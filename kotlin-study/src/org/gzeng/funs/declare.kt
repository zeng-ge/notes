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