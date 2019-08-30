package org.gzeng

inline class Hours(val number: Int){
    val length: Int
        get() = number
    fun toMinutes() = number * 60
}

fun main() {
    Hours(5).toMinutes()
    println(Hours(6).length)
    CompanionObject.ddd()
    println(CompanionObject.e)
    ObjectClass.prin()
}

object ObjectClass{
    val field1: String = "abc"
    fun prin(){

    }
}

class CompanionObject{
    companion object{
        val e: String = "ddd"
        fun ddd() = 123
    }
}