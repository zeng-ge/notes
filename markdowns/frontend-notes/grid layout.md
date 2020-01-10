## Grid Layout

### 容器

#### display: grid 或inline-grid

#### grid-template-columns

> 定义列，定义列的宽度

```css
.container{
	display: grid;
	// 定义3列，第一列宽度为50px，第二列宽度为20%, 第三列占据余下的空间
	// auto相当于flex: 1
	grid-template-columns: 50px 20% auto;// auto占据余下空间的前提是justify-content: stretch;默认占余下空间
}
```

#### grid-template-rows

> 定义行，与grid-template-columns作用一个样，用来定义行的高度

#### grid-template-areas

> 定义grid的整体布局

```css
.page{
  display: grid;
  grid-template-columns: 100px auto auto auto; //定义4列
  grid-template-rows: 100px 200px 50px;//定义3行
  grid-template-areas: 
     'menu header header header'//第一行menu占一列，header占三列
     'menu main main main'			//第二行menu占一列，main占三列
     'footer footer footer footer'; //第三行由footer占4列
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: 10px;
  background-color: lightgreen;
}

.header{
  grid-area: header; //指定header网格, 与grid-template-rows里面指定的名字一致
  //这里相当于	grid-area: 1 / 2 / 2 / 5;从第一行line，第二列line到第二行line，第5列line
  //相当于：grid-row-start: 1; grid-row-end: 2; grid-column-start: 2; grid-column-end: 5;
  //相当于: grid-row: 1 / 2; grid-column: 2 / 5;
  //相当于：grid-row: 1 / 2; grid-column: 2 / span 3; // span表示跨表格
}

.menu{
  grid-area: menu;	//指定menu网络
}

.main{
  grid-area: main;	//指定menu网络
}

.footer{
  grid-area: footer;	//指定menu网络
}
```



#### grid-gap

> 指定行间隔与列间隔
>
> 相当于grid-row-gap + grid-column-gap;

```css
grid-gap: 20px 30px;行间隔为20，列间隔为30
等效于：
grid-row-gap: 20px;
grid-column-grap: 30px;

grid-row-gap是行与行之间的gap
grid-column-gap是列与列之前的gap
```

#### justify-content

> 水平对齐方式

```css
//常用值：
space-between	左右没间隔，列之间间隔一样
space-around	左右间隔较小，列之间间隔一样
space-evenly	左右与列之间间隔均匀
start
end
left
right
```



#### align-content

> 垂直对齐方式，常用值与justify-content一个样

### 网格元素

#### 网格线 grid-line

grid布局就是靠column-line与row-line来为网格指定所占区域的

line在column与row两旁，如果有3列就在4个column line

```css
//从line 1开始到line 3相当于占据了第1列和第二列
.item {
  grid-column-start: 1;
  grid-column-end: 3;
}
等效于：
.item {
  grid-column: 1 / 3;//从column line 1到column line 3;占据1, 2两列
}
等效于：
.item {
  .grid-column: 1 / span 2;// 从column line 1开始，占据两列
}
```



列|行
---|---
![img](https://www.w3schools.com/css/grid_lines.png)|
![img](https://www.w3schools.com/css/grid_columns.png)| ![img](https://www.w3schools.com/css/grid_rows.png) 



#### 控制网格大小