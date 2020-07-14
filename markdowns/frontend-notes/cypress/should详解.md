# should详解

> 下面是能用到的方法及属性的表，只要转成对应的should 的形式

|方法|expect|
|---|---|--|
| attr(*name*, *[value]*) | `expect($el).to.have.attr('foo', 'bar')`                     |
| prop(*name*, *[value]*) | `expect($el).to.have.prop('disabled', false)`                |
| css(*name*, *[value]*)  | `expect($el).to.have.css('background-color', 'rgb(0, 0, 0)')` |
| data(*name*, *[value]*) | `expect($el).to.have.data('foo', 'bar')`                     |
| class(*className*)      | `expect($el).to.have.class('foo')`                           |
| id(*id*)                | `expect($el).to.have.id('foo')`                              |
| html(*html*)            | `expect($el).to.have.html('I love testing')`                 |
| text(*text*)            | `expect($el).to.have.text('I love testing')`                 |
| value(*value*)          | `expect($el).to.have.value('test@dev.com')`                  |
| visible                 | `expect($el).to.be.visible`                                  |
| hidden                  | `expect($el).to.be.hidden`                                   |
| selected                | `expect($option).not.to.be.selected`                         |
| checked                 | `expect($input).not.to.be.checked`                           |
| focus[ed]               | `expect($input).not.to.be.focused` `expect($input).to.have.focus` |
| enabled                 | `expect($input).to.be.enabled`                               |
| disabled                | `expect($input).to.be.disabled`                              |
| empty                   | `expect($el).not.to.be.empty`                                |
| exist                   | `expect($nonexistent).not.to.exist`                          |
| match(*selector*)       | `expect($emptyEl).to.match(':empty')`                        |
| contain(*text*)         | `expect($el).to.contain('text')`                             |
| descendants(*selector*) | `expect($el).to.have.descendants('div')`                     |

#### BDD写法

``` javascript
// expect后面的写法以to开头，后面跟上have+方法或be+属性
cy.get('[data-testid=name]')
  .type('abc')
  .then(el => {
  expect(el).to.have.value('abc')
})
```

### should写法

> 上表左边的方法名或属性名组合成对应的should断言
>
> 如have.prop、have.attr、be.visible等，一般是方法前面加have，属性前面加be，当然be可以去掉

#### 比较相关

1. eq 和deep.eq
2. match.               正则匹配
3. contain               字符串包含

``` javascript
cy.get('[data-testid=name]')
  .parent().find('span:first-child')
  .then(el => {
  expect(el.text()).to.match(/^姓/)
})

/***
     * eq 浅比较，类型不同时为false, 1 !== "1"
     * deep.eq深比较
     */
cy.wrap(1).should('not.eq', "1").should('not.be.visible')
cy.wrap("sky").should('eq', "sky")
cy.wrap({ name: 'sky' }).should('deep.eq', { name: 'sky' })

//判断内容是否包含了指定的信息
cy.get('[data-testid=name]')
  .parent().find('span:first-child')
  .should('contain', '姓')
```

#### 方法相关

1. prop、attr、css、data、class、value、text、id、html

``` javascript
// prop、attr、css、data都是二个参数，只传一个的话会将subject变成false倒致接下来的操作全部失败
cy.get('[data-testid=name]')
      .should('have.attr', 'data-testid', 'name')
      .should('have.id', 'abc') //判断id
      .and('have.prop', 'readonly', false)
      .and('have.class', 'abc')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .type('aaaa')
      .should('have.value', 'aaaa')
      .parent()
      .should('have.html', '<span class="label abc">姓名</span><input type="text" data-testid="name" class="abc" style="color: red;">, but the HTML was <span class="label abc">姓名</span><input type="text" id="abc" data-testid="name" class="abc" style="color: red;">) // have.html直接取出元素的html信息
      .find('span:first-child')
      .should('have.text', '姓名')
```

#### 属性相关

1. form相关的有: checked、selected、disabled、enabled、focus
2. 显示相关的有：visible、hidden
3. 存在与否：exist //不存在就是not exist, wrap一个null也是不存在
4. 空： empty // 没有text，没有子元素才是empty, input有没有值都属于空

``` javascript
cy.get('[data-testid="tags.agent"]')
  .should('have.prop', 'disabled', false) 
  .should('not.be.have.prop', 'disabled', true) // disabled时能匹配上ture
  .should('be.enabled')
  .then(el => {
  el.prop('disabled', true)
})
  .should('have.prop', 'disabled', true)
  .should('be.disabled')
  .should('not.be.checked')

cy.get('[data-testid="tags.takeout"]')
  .check()
  .should('be.checked')
  .should('be.enabled')
  .focus()
  .should('be.focus')
  .should('empty')

cy.get('select option:first-child')
  .should('be.selected') //判断option是否选中了

cy.get('.search-form input[type=text]')
  .type('abc')
  .should('be.empty') // input有没有值都属于空

cy.get('.search-form .search-btn')
  .should('be.empty') // 没有text，没有子元素才是empty
```



``` javascript
/**
     * exist/be.exist      存在
     * not.exist/not.be.exist  不存在
     * 这个be可以放not前面
     */
    cy.get('.ddd').should('not.exist')
    cy.get('body').should('be.exist')
    cy.get(null).should('not.exist')

    /**
     * 没有宽高、left与top移动到不可见处，都属于不可见
     * visible/be.visible
     * not.visible/not.be.visible
     * should与and同样的意思，都可以出现多次
     */
    cy.get('.hidden')
      .should('not.visible')
      .and('not.be.visible')
      .then(a => {
        a.css('display', 'block')
        return a//这个return 可以不要,没return时原来的对象接着向下传
      })
      .should('visible')
      .should('be.visible')
    
    /***
     * have.value获取input的value
     * not.have.value与have.value相反，value不是某值
     * have.value是完全匹配，如值是abc用(have.value, 'a')是匹配不上的
     * 
     * have.attr获取属性, 1个参数就判断是否有该属性，2个参数就表明属性与值要匹配
     * not.have.attr与have.attr相反，不包含某attr
     * 
     * have.text 判断元素的内容,是完全匹配
     * .should('have.text', '姓名')如内容是姓名，用(have.text,姓)匹配会报错
     * 
     * have.class 判断是否有包含对应的class, 两个参数
     * not.have.class 判断不包含某class，不带参数时表示其不包含undefined
     * 
     * have.descendants是否有子元素, cy.get('.app').should('have.descendants', '.contact-list')
     * 空元素可以用not.have.descendants来判断
     */
    cy.get('[data-testid=name]')
      .type('abc')
      .should('have.value', 'abc')
      .and('not.have.value', 'ddd')
      .and('have.attr', 'type', 'text')
      .and('not.have.descendants')

    cy.get('[data-testid=name]')
      .parent()
      .find('span:first-child')
      .should('have.text', '姓名') // have.text获取元素的内容
      .and('have.class', 'abc')   //有class abc
      .and('not.have.class', 'label1') //没有label1
    
    cy.get('.app').should('have.descendants', '.contact-list')
```

