# Http相关注解

1. @Controller

2. @RestController        `被@Controller修饰了` 

3. @RequestMapping    `可作用于类与方法`

4. @RequestParam        `可以获取get请求时url里面的参数，也可以获取post请求body里面的参数`

   ``` java
   // 映射search参数
   /api?name=tod
   helloParam(@RequestParam String name) //name会自动注入值tod
   helloParam(@RequestParam("name") String name)//也可以指定取那个参数
     
   // param可以配成可选的
   helloParam(@RequestParam(required = false) String name)//没有name不会报错
   helloParam(@RequestParam(defaultValue="abc") String name)//给默认值为abc
   helloParam(@RequestParam Optional<String> name)  
   // 将所有的param放入map
   helloParam(@RequestParam Map<String,String> allParams)
   //将一个值存入list
   helloParam(@RequestParam List<String> ids)  
   ```

5. @PathVariable

   ``` java
   // 映射path上的参数
   @GetMapping("/api/users/{id}")       //访问/api/users/123
   helloParam(@PathVariable Integer id) //name会自动注入值123
   //同@RequestParam一样，也可以配成可选的（参考上面）
   ```

6. @RequestBody `将请求体中的数据反序列化成相应对象`

   ``` java
   @PostMapping("/request")
   public ResponseEntity postController(
     @RequestBody LoginForm loginForm) {
       
   }
   ```

   

7. @ResponseBody `告诉controller将返回结果序列化成json并响应`

   ``` java
   // 一般和@Controller配合使用， @RestController里面的方法默认就会被序列化成json并返回
   ```

   

8. @GetMapping、@PostMapping、@PutMapping、@DeleteMapping、 PatchMapping   只能修饰方法

   ``` java
   /**
   * 参考：
   * https://www.baeldung.com/tag/spring-mvc-basics/
   * https://www.baeldung.com/spring-mvc-annotations
   * https://www.baeldung.com/spring-request-response-body
   *
   * 这几个注解的定义同RequestMapping基本一样，除了少了一个method
   * 区别在于它们都被@ReuqestMapping修饰了
   * @RequestMapping(method=GET/POST/PUT/DELETE)只有method不一样
   *
   * 除了name其它的值都是数组，可以定义多个，用{}包裹
   * name
   * value     指定path, @GetMapping("/api") 相当于@GetMapping(value="/api")
   * path      同value
   * params    必须包含指定的参数才处理
   * headers   有指定的header才处理
   * produces  指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回；
   * consumes  指定处理请求的提交内容类型（Content-Type），例如application/json, text/html；
   *
   * RequestMapping里面的method是指定http的方法, 如@RequestMapping(value="/api", method=RequestMethod.GET)
   * 上面4个都可以用@RequestMapping来定义
   *
   *示例：
   * @RequestMapping(
   *		value="/api",
   *		method={RequestMethod.GET, RequestMethod.POST}
   *		params={"id"}, 																		 // 参数里面要有
   *		headers={"Accept-Language=US"},         					 //请求头里面要有
   *		produces={MediaType.APPLICATION_JSON_UTF8}, //application/json;charset=UTF-8
   *		//定义该方法能够生产的media type，即设置response的content-type，当请求的Accept能匹配时才会进入对应方法（Accept: application/json）
   *
   *		consumes={"application/javascript; charset=utf-8"} 
   *   //定义该方法能够消费的media type,只有request的content-type能够匹配才会处理
   * )
   */
   ```

9. @ExceptionHandler `自定义异常处理方法，要配合@ControllerAdvice用`

   ``` java
   //拦截指定异常并处理，如果配成Exception.class就能拦截所有异常
   @ExceptionHandler(IllegalArgumentException.class)
   void onIllegalArgumentException(IllegalArgumentException exception) {
       
   }
   ```

   

10. @ResponseStatus `指定方法的响应code，一般和@ExceptionHandler配合用`

    ``` java
    //controller里面的方法一般不会配它，而是在响应数据里面加code
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    void onIllegalArgumentException(IllegalArgumentException exception) {
        
    }
    
    ```

11. @RequestHeader `取出header`

    ``` java
    @ResponseStatus(value = HttpStatus.OK)
    public void all(@RequestHeader Map<String, String> headers) {//取出所有
      logger.info("All headers: {}", headers);
    }
    
    //取出单个
    @RequestHeader("access_token")
    ```

    

12. 好多注解

``` java
/** springframework.web.bind.annotation下的所有注解
ControllerAdvice
CookieValue
CrossOrigin
DeleteMapping
ExceptionHandler
GetMapping
InitBinder
Mapping
MatrixVariable
ModelAttribute
PatchMapping
PathVariable
PostMapping
PutMapping
RequestAttribute
RequestBody
RequestHeader
RequestMapping
RequestMethod
RequestParam
RequestPart
ResponseBody
ResponseStatus
RestController
RestControllerAdvice
SessionAttribute
SessionAttributes
ValueConstants
package-info.java
*/
```

