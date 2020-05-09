# Convert

HttpMessageConverterExtractor.extractData会对数据进行转化，里面注册了好多的Converter(实现了接口HttpMessageConverter)， 对于Feign用的是MappingJackson2HttpMessageConverter将http请示的结果进行转化



### enum的转化

对于enum， json里面的值可以是字符串（大小写要匹配），也可以是enum的index

``` java
@Getter
public enum EvaluationQuestionType {
    SINGLE_CHOICE(1), MULTIPLE_CHOICE(3), QUESTION_ANSWERS(4);

    private int value;

    private EvaluationQuestionType(int value) {
        this.value = value;
    }
}

对应JSON：
"evaluationQuestionType": "SINGLE_CHOICE" //成功转化SINGLE_CHOICE
"evaluationQuestionType": 0 //成功转化为SINGLE_CHOICE
"evaluationQuestionType": 1 //成功转化为MULTIPLE_CHOICE
  
"evaluationQuestionType": "sINGLE_cHOICE" //大小写不统一，转化失败
"evaluationQuestionType": 3 //超过了index，转化失败
```

