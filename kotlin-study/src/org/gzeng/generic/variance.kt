package org.gzeng.generic

/**
 * out相当于：
 * List<? super String> = new ArrayList<String>()
 */
val objs: List<out String> = ArrayList<String>()

interface Comparable<in T> {
    operator fun compareTo(other: T): Int
}

fun demo(x: Comparable<Number>) {
    x.compareTo(1.0)
    val y: Comparable<Double> = x // OK！
}

open class Shape{}
class Rectangle : Shape(){}

fun main() {
    val vaarray: Array<Int> = arrayOf(1,2,3)

    // 只读集合是型变的, listOf内部返回值List<E>对应的接口是List<out T>
    val shapes: List<Shape> = listOf<Rectangle>(Rectangle(), Rectangle())

    // mutable集合是非型变的，编译报错
//     var shapes1: MutableList<Shape> = mutableListOf<Rectangle>()
    println("null: ${null.toString()}")
}
