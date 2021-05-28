# webcomponent 基本概念

> 为了解决创建可重复使用的组件而生。由三种技术组合来实现Custom Element、Shadow DOM、HTML Template

1. Custome Element

   > 用于定义自定义组件及其行为

2. Shadow DOM

   > 通过API将一个shadow dom依符于一个元素，该shadow dom能够与document dom分开渲染，所以它内部的script与style是私有的，不用担心和document的其它部分冲突(shadow DOM允许将隐藏的DOM树附加到正常的DOM元素，主要用于隔离自定义元素与其它DOM元素，使外部影响不到组件内部，web component元素外部的样子不会影响到shadow dom的子元素)

3. HTML Template

   > 通过<template>与<slot>来声明模板（不会在页面中渲染），可以用它来定义webcomponent的结构。

### 定义webcomponent

1. 声明一个webcomponent的Class
2. 使用CustomElementRegistry.define方法定义html标签名并指定webcomponent Class(`Window.CustomElements是CustomElementRegistry对象的引用`)
3. 使用Element.attachShadow方法为组件符加一个shadow DOM，并为shadow DOM添加子元素及事件等（核心的组件逻辑就在它里面定义）
4. 使用<template> 与<slot>定义可重复使用的模板

### 伪类的使用

> .host、.host()、.host-context都是在webcomponent内部使用的

1. .host表示shadowHost即自定义组件元素本身
2. .host(.abc) 表示选中带有abc类的shadowHost   如<my-list class="abc">
3. .host-context(.abc) 表示选中shadowHost的子元素中带有.abc类的元素