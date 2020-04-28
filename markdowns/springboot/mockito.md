# Mockito

> mock与spy的区别在于mock的参数是类（如mock(List.class), spy的参数是实例（如spy(new ArrayList())，其它操作基本一个样

### mock service

``` java
/**
* @Mock 用于Mock一个完整的实例
* @InjectMocks 将@Mock mock出来的实例注入到@InjectMocks mock的实例
* when配合thenReturn用于mock方法调用（参数也要匹配）及其返回值
* verify用于检查方法的调用，方法名与参数要匹配
* ArgumentCaptor配合verify用来检查方法调用的参数
*/
public class AppVersionServiceTest extends UnitTest{

    @InjectMocks //它依赖repository，需要将reposotiry的实例注入
    private AppVersionService appVersionService;

    @Mock //mock repository
    private AppVersionRepository appVersionRepository;

    @Test
    public void should_return_first_ios_app_version() {
        AppVersion appVersion = AppVersion.builder().version("7.1.2").id(123l).content("ios update desc").title("ios update").build();
  when(appVersionRepository.findFirstByPlatformTypeOrderByCreatedAtDesc(PlatformType.IOS)).thenReturn(appVersion);
        AppVersion getedAppVersion = appVersionService.getLatestAppVersionByPlatform(PlatformType.IOS);
        Assert.assertEquals(getedAppVersion.getVersion(), appVersion.getVersion());
        Assert.assertEquals(getedAppVersion.getId(), appVersion.getId());

      //直接用verify检测调用次数
        verify(appVersionRepository, times(1)).findFirstByPlatformTypeOrderByCreatedAtDesc(PlatformType.IOS);

      //用verify检测参数
        ArgumentCaptor<PlatformType> a = ArgumentCaptor.forClass(PlatformType.class);
       verify(appVersionRepository).findFirstByPlatformTypeOrderByCreatedAtDesc(a.capture());
        Assert.assertEquals(a.getValue(), PlatformType.IOS);
    }
}

@RunWith(MockitoJUnitRunner.class)
public abstract class UnitTest {
}
```

### mock controller

> 指定runner : @RunWith(SpringRunner.class)
>
> @WebMvcTest(AppVersionController.class)加载对应controller及环境
>
> get用于构建一个get请求的url、请求头、响应类型等，需要和controller方法中的@GetMapping匹配，不然就找不到对应方法
>
> mockMvc.perform执行对应请求
>
> @MockBean用于mock对应的service，仅测试controller相关逻辑

```java
package com.mckinsey.business.school.controller;

import com.mckinsey.business.school.domain.AppVersion;
import com.mckinsey.business.school.domain.PlatformType;
import com.mckinsey.business.school.security.WithMockAcademyUser;
import com.mckinsey.business.school.service.AppVersionService;
import org.junit.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import static com.mckinsey.business.school.controller.response.ResponseData.SUCCESS_CODE;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//指定
@WebMvcTest(AppVersionController.class)
public class AppVersionControllerTest extends AbstractControllerUnitTest{

    @MockBean
    private AppVersionService appVersionService;

    @Test
    @WithMockAcademyUser
    public void should_return_ios_app_version_successfully() throws Exception {
        AppVersion appVersion = AppVersion.builder().title("ios update").content("update desc").platformType(PlatformType.IOS).version("7.1.2").build();
        when(appVersionService.getLatestAppVersionByPlatform(PlatformType.IOS)).thenReturn(appVersion);
        mockMvc.perform(get("/versions/latest")
                .header("App-Platform", PlatformType.IOS.name())
                .header("App-Version", "7.1.1")
                .contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.statusCode").value(SUCCESS_CODE))
                .andExpect(jsonPath("$.data.version").value("7.1.2"))
                .andExpect(jsonPath("$.data.title").value("ios update"))
                .andExpect(jsonPath("$.data.content").value("update desc"));
    }

    @Test
    @WithMockAcademyUser
    public void should_return_ok_without_data() throws Exception{
        AppVersion appVersion = AppVersion.builder().title("ios update").content("update desc").platformType(PlatformType.IOS).version("7.1.2").build();
        when(appVersionService.getLatestAppVersionByPlatform(PlatformType.IOS)).thenReturn(appVersion);
        mockMvc.perform(get("/versions/latest")
                .header("App-Platform", PlatformType.IOS.name())
                .header("App-Version", "7.1.3")
                .contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.statusCode").value(SUCCESS_CODE))
                .andExpect(jsonPath("$.data.version").doesNotHaveJsonPath());
    }

}

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@Import({MultiHttpSecurityConfig.class, UserAuthenticationProvider.class,
        LoginUserCache.class, RedisConfig.class, TestConfiguration.class})
public abstract class AbstractControllerUnitTest {
    @Autowired
    protected MockMvc mockMvc;
}

class TestConfiguration {
    @Bean
    public SecurityHelper securityHelper() {
        return new SecurityHelper();
    }

    @Bean
    public RedisConnectionFactory redisConnectionFactory(){
        return new LettuceConnectionFactory();
    }
}
```