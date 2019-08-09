package org.gzeng.funs

fun main() {
    myPrint("hello function")
    defaultParameters("sky")
    namedParameters("sky", age = 20);
    namedParameters(age = 20, name = "sky");

    variableParameters("sky", "xi'an", "huanpu", 123)
}