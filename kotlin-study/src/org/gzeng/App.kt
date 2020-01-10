package org.gzeng

fun main(arguments: Array<String>) {
    val student = Student("sky", 20)
    println(student.name)

    var num: Int = 1

    class A {
        //成员变量可以设置get与set方法，用于取值与设值
        var count: Int
            get() = num
            set(value: Int) {
                num = value
            }
        fun isPassive(): Boolean?{
            return null
        }
    }
    println(A().count)


    var b: A? = A()
    /***
     *  ?.是安全调用操作符，当调用者为null时直接返回null, 如a.b.c.d中a、b、c、d有任何一个不存在都返回null
     *  ?:表示左则为null时执行
     */
    b?.isPassive()?.let {println("$it b ispassive")} ?: println("not passive")
    null ?: println("null")//左边为null就执行

    b?.let {println("b is null, let")} ?: println("b")

    null.let { println("null.let")} //任何数据都可以执行let方法


    val arr: Array<String>? = null
    println(arr?.size ?: "arr null")

    receiver<Receiver>(Receiver()) {
        println("receiver的参数initial函数会挂在闭包内的receiver实例上")
        say()
    }
    receiverOld {
        println("receiver old")
    }
}

class Receiver {
    fun say(): Unit{
        println("invoke say")
    }
}

/***
 * 带接收者的参数，即参数给定的函数在调用时this是确定的
 * initial会添加到Receiver对象上，这样调用initial时this就确定了
 */
fun <T> receiver(t: T, initial: T.() -> Unit) {
    t.initial()
    println("hello receiver")
}

class Receiver2 {
    /***
     * initial方法只在该函数内部能调，如果想在更深层次调用，就需要将对象及函数再传递一次，如果官网html例子中的initTag方法
     * 比如说我想在say里面调用initial，
     * 如果不加接收者函数，receiver编译报错，我估计运行没问题，因为initial己经是它上面的方法了
     */
    fun say(receiver: Receiver2, initial: Receiver2.() -> Unit): Unit{
        receiver.initial()
    }
}
/**
 * 上面的方法用泛型
 * 这里接收一个固定类型
 * 接收者闭包函数会符加到receiver上去
 */
fun receiverOld(initial: Receiver2.() -> Unit) {
    var receiver = Receiver2()
    receiver.say(receiver, initial)
    println("hello receiver")
}

/**
 * 作用域函数 let、run、with、apply、also
 * 在某个作用域下执行一个代码块
 * 它们的区别在于context的引用与返回值
 *
 * 上下文引用：
 * let、also使用it来引用作用域对象，如Student("sky", 20).let { lt } 这里的lt指向当前的Student对象
 * run、with、apply通过this引用context对象
 *
 * let, also的参数未带接收者，block: T > R
 * run, with, apply的函数定义都是带了接收者的block: T.()->R
 *
 *
 * 返回值：
 * apply、also返回context对象, 这两个直接返加this
 * run、with、let返回lambda结果, 返回执行结果
 *
 * 感觉用also最好啊，当然，这个作用哉函数本身是服务于匿名对象的，所以返回值什么的就无所谓了
 * */