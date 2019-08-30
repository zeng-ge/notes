package org.gzeng

import kotlinx.coroutines.*

fun main() {
    println("coroutine begin, thead: ${Thread.currentThread().id}")

    GlobalScope.launch(Dispatchers.Unconfined) {
        println("coroutine launch start, thead: ${Thread.currentThread().id}")
//        delay(100)
//        println("coroutine launch end")
        delay(1000)
        println("coroutine, thead status: ${Thread.currentThread().isAlive}")
        var name: String = async { getName() }.await()
        var age: Int = async { getAge() }.await()
        println("name: ${name} age: age")
    }
    println("coroutine end, thread: ${Thread.currentThread().id}")
    Thread.sleep(500)
    println("Thread sleep")
}

suspend fun getName(): String {
    delay(100)
    return "sky"
}

suspend fun getAge(): Int{
    delay(50)
    return 20
}