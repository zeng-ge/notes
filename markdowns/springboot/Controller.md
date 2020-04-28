# Controller初始化及处理请求

## 提供Controller及 方法的元数据

1. spring在初始化RequestMappingHandlerMapping时会处理controller
2. 遍历所有的bean,从中找出使用了@Controller(由于@RestController被@Controller修饰了，所以RestController也会被找到)与@RequestMapping的类
3. 取出controller类里面的所有方法，依次遍历方法获取RequestMapping(这里会迭归查找，如@GetMapping被@RequestMapping修饰了)注解相关的信息，并封装时一个RequestMappingInfo类（它里面包含path, params等等完整信息，如path为/verificationCode）
4. 取出controller类的RequestMapping注解的元数据，并存在一个新的RequestMappingInfo类（如path是/auth）
5. 合并两个RequestMapingInfo实例（如path就变成了/auth/verificationCode）
6. 以method为key, RequestMappingInfo为value存进methodMap
7. 遍历controller的方法，取出RequestMappingInfo里面的path，将path与mapping一起存进urlLookup的map
8. 将mapping与new MappingRegistration<>(mapping, handlerMethod, directUrls, name)存进registry，这样根据url就可以获取到controller及method的相关完整的信息

``` java
@RestController
@RequestMapping(value = "/auth")
@Api(tags = "Authentication")
@Slf4j
public class AuthController {
  @ApiOperation(value = "Request verification code.")
    @PostMapping("/verificationCode")
    @ResponseStatus(HttpStatus.OK)
    public ResponseData requestOTP(@Valid @RequestBody VCodeRequest request) {
    authService.sendOTP(request.getUserName());
    return ResponseData.success(null);
  }
}
```



## 响应请求

1. 请求从HttpServlet -> FrameServlet -> DispatchServlet.doService ->  DispatchServlet.doDispatch
2. 根据请求获取handler(就是对应的HandlerMethod的实例，里面有controller实例、方法等各种信息)

   1. 调用RequestMappingHandlerMapping.getHandler实际调用的是AbstractHandlerMapping.getHandler -> AbstractHandlerMethodMapping.getHandlerInternal
   2. 取出path
   3. 根据path从mappingRegistry.urlLookup中取出RequestMappingInfo
   4. 根据RequestMappingInfo取出registry里面的mappingRegistration（里面有method及 bean的名字）
   5. 根据bean的名字从容器中取出其实例（this.beanFactory.getBean(beanName)）
   6. 将bean、beanFactroy、方法等信息封装进HandlerMethod对象并返回
3. applyPreHandle，方法调用前遍历interceptor，今次调用其interceptor.preHandle方法
4. 根据MethodHandler从handlerMapping里面取出相应的RequestMappingHandlerAdapter
5. RequestMappingHandlerAdapter.handle -> AbstractMappingMethodAdapter.handle -> RequestMappingHandlerAdapter.handleInternal -> RequestMappingHandlerAdapter.invokeHandlerMethod
6. invocableMethod.invokeAndHandle(webRequest, mavContainer);处理参数并调用method
7. mappedHandler.applyPostHandle(processedRequest, response, mv);遍历interceptor调用postHandle





``` java
/**
* AbstractHandlerMethodMapping
* RequestMappingHandlerMapping 处理Controller注解的类
* 
*/

/**
* AbstractHandlerMethodMapping.initHandlerMethods
* 入口
*/
protected void initHandlerMethods() {
  for (String beanName : getCandidateBeanNames()) {//这里可以得到所有的相关的bean类
    if (!beanName.startsWith(SCOPED_TARGET_NAME_PREFIX)) {
      processCandidateBean(beanName);
    }
  }
  handlerMethodsInitialized(getHandlerMethods());
}

/**
* AbstractHandlerMethodMapping.processCandidateBean
*/
protected void processCandidateBean(String beanName) {
  Class<?> beanType = null;
  try {
    //拿到bean的class
    beanType = obtainApplicationContext().getType(beanName);
  }
  catch (Throwable ex) {
  }
  //如果类上面有Controller或RequestMapping就会被当成Controller处理
  if (beanType != null && isHandler(beanType)) {
    detectHandlerMethods(beanName);
  }
}
//RequestMappingHandlerMapping.isHandler 判断是否是controller
protected boolean isHandler(Class<?> beanType) {
  return (AnnotatedElementUtils.hasAnnotation(beanType, Controller.class) ||
          AnnotatedElementUtils.hasAnnotation(beanType, RequestMapping.class));
}

```

