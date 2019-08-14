package org.gzeng.funs

fun lodash(str: String): () -> Int{
//    val length = {
//        str.length
//    }
    val length = fun(): Int{
        return str.length;
    }
    return length;
}

val lambdaFn: (str: String) -> Unit = {
    println("lambdaFn: $it")
}

val anonymousFn: (str: String) -> Unit = fun(str: String): Unit {
    println("anonymousFn $str")
}

typealias compareType = (first: Int, last: Int) -> Boolean

val receiverFn: String.(str: String) -> Unit = { str: String ->
    println(this.plus(str))
}

inline fun hello() {
    println("fn hello")
}

inline fun lambdaInline(noinline callback: () -> Unit): Unit {
    println("begin labmda inline")
    callback()
    println("end labmda inline")
}

fun <T, R> reduce(collection: Collection<T>, accumulator: R, reducer: (accumulator: R, item: T) -> R): R {
    var result: R = accumulator;
    for(collectionItem in collection) {
        result  = reducer(result, collectionItem)
    }
    return result;
}

val wholeLambdaExpression: (name: String, callback: (String) -> String) -> String = { name: String, callback: (String) -> String ->
    println("name: name")
    println(callback("hello lambda"))
    "whole lambda expression"
}