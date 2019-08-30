package org.zeng

import org.zeng.service.StarbuckService
import javax.inject.Inject

/***
 * dagger在实例化StarbuckPage时有两种方式：
 * 1）构造器 该构造器必须是可@Inject的
 * 2) module里面的@Provides标记的方法
 */
class StarbuckPage @Inject constructor(){
    @Inject lateinit var starbuckService: StarbuckService;
}