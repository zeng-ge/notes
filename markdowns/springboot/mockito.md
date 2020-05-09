# Mockito

> mock与spy的区别在于mock的参数是类（如mock(List.class), spy的参数是实例（如spy(new ArrayList())，其它操作基本一个样

### 参数匹配

> mock与verify都要匹配参数才能找到对应的调用。
>
> https://javadoc.io/static/org.mockito/mockito-core/3.3.3/org/mockito/ArgumentMatchers.html
>
>  when(a.test(1)).thenReturn()这种写法不够灵活，要触发调用只能用a.test(1)。
>
> when(a.test(any(int) )).thenReturn()就可以随意调用a.test(4)，只要参数是int就行
>
> 对于对象而言，指定实例会很麻烦，如果AppVersionRequest A序列化成了json然后在controller被反序列化成了别一个AppVersionRequest B，when(appService.save(A)).thenReturn()永远也不会触发，因为appService.save的参数是B，A和B并不相同，这个时候只能用when(appService.save(any(AppVersionRequest.class))).thenReturn()这样只要传的是对应类型就能匹配上
>
> 主要的匹配函数有any(变种太多了anyInt, anyLong, anyList....), eq(变种一样的多eq(int), eq(Long)....), isNull, notNull, isA内部用instanceof比较
>
> 对于verify来说，也最好用相应的匹配方法，因为普通的值还能判等，对于实例来说可能被转换过了引用不一样（如下面的例子，appService.updateAppVersion拿到的AppVersionRequest是返序列化得来的，根本拿不到用实例来匹配永远也匹配不上）

```java
AppVersionRequest appVersionRequest = AppVersionRequest.builder().title("version request").version("7.1.2").content("content").platform(PlatformType.IOS).build();
        AppVersion appVersion = appVersionRequest.toAppVersion();
        appVersion.setId(1l);
        String updateAppVersionJSON = new ObjectMapper().writeValueAsString(appVersionRequest);
        when(appVersionService.updateAppVersion(eq(1l), any(AppVersionRequest.class))).thenReturn(appVersionRequest.mergeToUpdateEntity(appVersion));
        mockMvc.perform(post("/versions/1")
                .contentType(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .content(updateAppVersionJSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.statusCode").value(SUCCESS_CODE))
                .andExpect(jsonPath("$.data.version").value(appVersionRequest.getVersion()));

ArgumentCaptor<AppVersionRequest> appVersionRequestArgment = ArgumentCaptor.forClass(AppVersionRequest.class);
// 这里指定了参数的匹配规则，第一个参数等于1，第二个参数是AppVersionRequest类型
verify(appVersionService, times(1)).updateAppVersion(eq(1l), appVersionRequestArgment.capture());
// argumentCaptor.getValue()获取调用方法时的参数
Assert.assertEquals(appVersionRequestArgment.getValue().getTitle(), appVersionRequest.getTitle());
```

### Mock返回void

``` java
// when(projectEvaluationService.recordProjectEvaluation())会报错，因为这个when方法要求方法有返回值
//用下面的doNothing代替
doNothing().when(projectEvaluationService).recordProjectEvaluation(isA(ProjectEvaluationRequest.class));
```



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