package org.zeng.service

import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.GET

interface StarbuckService {
    /**
     * 不用Gson转的话这里不能用Response<Object>
     */
    @GET("feed")
    fun getFeeds(): Call<Object>;
}