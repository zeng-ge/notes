package org.zeng.service

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ServiceUtils {
    val starbuckServiceRetrofit = Retrofit.Builder()
        .baseUrl("http://localhost:3000/api/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    val starbuckServiceImpl = starbuckServiceRetrofit.create(StarbuckService::class.java)
}