package org.zeng

import dagger.Component
import javax.inject.Singleton

@Singleton
@Component(modules = [
    ServiceModule::class
])
interface AppModule {
    fun starbuckPage(): StarbuckPage;
}