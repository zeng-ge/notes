package org.gzeng

data class DeStructurePeople(val name: String, val age: Int, val address: String);

class DeNormalPeople(val name: String, val age: Int) {
    operator fun component2(): String{
        return name
    }
    operator fun component1(): Int{
        return age;
    }
}

fun getE(): Int {
    return 4;
}

fun main() {
//    val people = DeStructurePeople("sky", 30, "xian")
//    var (name, age, address) = people
//    println("name: $name, age: $age, address: $address")

    val normalPeople = DeNormalPeople("sky", 30)
    var (_, name) = normalPeople
    println("name: $name")

    /***
     * 对于对象，== 会转成Intrinsics.areEqual
     * public static boolean areEqual(Object first, Object second) {
     *  return first == null ? second == null : first.equals(second);
     *  }
     */
    var a: String = "abc"
    var b: String = "def"
    println("equals: ${a == b}")

    /***
     * 普通类型 == 就是正常的==，如下面的编译结果就是d == e
     */
    var d: Int = 3;
    var e: Int = getE();
    println("equals: ${d == e}, d: $d, e: $e")


    /**8
     * === 编译结果就是==，对于对象而言是比引用，对于普通类型是比值
     */
    var h = "abc"
    var i = "abc"
    println("reference equals: ${h === i}")
}