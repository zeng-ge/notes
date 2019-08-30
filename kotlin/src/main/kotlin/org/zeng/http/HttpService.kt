package org.zeng.http

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.lang.reflect.Type

class Feed(val name: String, val active: Boolean, val amount: Int?);

class FeedResponse(val id: String, val createdAt: String, val updatedAt: String, val feeds: List<Feed>);

object HttpService {
    val httpClient: OkHttpClient = OkHttpClient()

    fun getFeed(): FeedResponse? {
        val request: Request = Request.Builder()
            .url("http://127.0.0.1:3000/api/feed")
            .build()
        val response: Response = httpClient.newCall(request).execute();
        return response.body?.string()?.let {
            val type: Type = object: TypeToken<List<FeedResponse>>(){}.type;
            val result: List<FeedResponse> = Gson().fromJson<List<FeedResponse>>(it, type);
            result.get(0)
        } ?: null
    }
}