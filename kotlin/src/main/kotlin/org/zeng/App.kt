package org.zeng

import com.google.gson.internal.LinkedTreeMap
import io.reactivex.Flowable
import io.reactivex.Scheduler
import io.reactivex.schedulers.Schedulers
import kotlinx.coroutines.*
import org.zeng.http.Feed
import org.zeng.http.FeedResponse
import org.zeng.http.HttpService
import org.zeng.service.ServiceUtils
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.concurrent.Executors

fun processFeedResponse(response: Response<Object>): Unit {
    (response.body() as ArrayList<LinkedTreeMap<String, Object>>).let{
        val map = it.get(0)
        (map.get("feeds") as ArrayList<LinkedTreeMap<String, Object>>).let{
            it.forEach {
                val name = it.get("name") as String
                val active = it.get("active") as Boolean
                println("name: ${name}, active: ${active.toString()}")
            }
        }
    }
}

/***
 * suspend 挂起函数只能在协程里面使用
 * async { processFeeds() }返回一个Deffered
 *
 * Deffered本身也是个Job
 *
 * deffered.await()可以获取返回值
 *
 * 像及了js里面的async await
 */
suspend fun processFeeds(): Int {
    val feedResponse: FeedResponse? = HttpService.getFeed();
    feedResponse?.feeds?.also { feeds: List<Feed> ->
        feeds.forEachIndexed { index: Int, feed: Feed ->
            println("feed $index: name: ${feed.name} active: ${feed.active}");
        }
    }
    return 123
}

fun handleFeed() = runBlocking {
    // work Thread
    val feedJob = async(Dispatchers.IO) {
        println("feedJob: ${Thread.currentThread()}")
        processFeeds()
    }
    println(feedJob.await()) // main Thread
    println("${Thread.currentThread()}")
}

fun rx(): Unit{
    Flowable
        .just("hello world")
        .subscribeOn(Schedulers.newThread())
        .observeOn(Schedulers.from(Executors.newSingleThreadExecutor()))
        .subscribe {
            println(it)
        }
}

fun main() = runBlocking{
    val dagger: AppModule = DaggerAppModule.builder().serviceModule(ServiceModule()).build();
    val page: StarbuckPage = dagger.starbuckPage();
//    val job = launch {
//        val response: Response<Object> = page.starbuckService.getFeeds().execute()
//        processFeedResponse(response);
//    }
//    job.join()

//    handleFeed()
    rx()
}

fun getFeedSync(): Unit{
    runBlocking {
        val job = launch {
            val response: Response<Object> = ServiceUtils.starbuckServiceImpl.getFeeds().execute()
            processFeedResponse(response)
        }
        job.join()
    }
}

fun getFeedAsync(): Unit{
    ServiceUtils.starbuckServiceImpl.getFeeds().enqueue(object: Callback<Object> {
        override fun onFailure(call: Call<Object>, t: Throwable) {
            println(t)
        }

        /***
         * Gson将结果转成了ArrayList里面套LinkedTreeMap
         *
         * 如果想获取原始string，可以Response<ResponseBody>然后response.body()
         */
        /***
         * Gson将结果转成了ArrayList里面套LinkedTreeMap
         *
         * 如果想获取原始string，可以Response<ResponseBody>然后response.body()
         */
        override fun onResponse(call: Call<Object>, response: Response<Object>) {
            processFeedResponse(response)
        }
    })
}