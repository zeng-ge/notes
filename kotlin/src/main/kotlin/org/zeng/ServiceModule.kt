package org.zeng

import dagger.Module
import dagger.Provides
import org.zeng.service.StarbuckService
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Named

@Module
internal class ServiceModule {

    @Provides
    @Named("StarbuckServiceRetrofit")
    fun provideStarbuckRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl("http://localhost:3000/api/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Provides
    fun proviceStarbuckService(@Named("StarbuckServiceRetrofit") retrofit: Retrofit): StarbuckService = retrofit.create(StarbuckService::class.java)
}