package org.gzeng

inline class Hours(val number: Int){
    val length: Int
        get() = number
    fun toMinutes() = number * 60
}

fun main() {
    Hours(5).toMinutes()
    println(Hours(6).length)
}