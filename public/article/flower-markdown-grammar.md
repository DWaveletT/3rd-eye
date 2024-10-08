---
create_time: 1706431535
update_time: 1706431535
title: 【鲜花】Markdown 一些容易被忽视的语法
board: 1
tag:
- 2
---

最近读了 GFM，发现有好多神秘语法我都不知道，鉴定为用洛谷用的……

## 列表

### 紧列表，松列表

可能大家注意过这样一个现象，在列表项之间增加额外的空行会直接增加整个列表的行距。例如：

```markdown
- a
- b
- c
```

和 

```markdown
- a

- b
- c
```

其实这个是紧列表（tight list）和松列表（loose list）的区别。前者是紧的，后者是松的。只要列表项之间存在空行，就会被视作松列表；否则，若一个空行都没有，就会被视作紧列表。

有人把松列表视作“你语法写错了，被 Markdown 识别成多个不同列表了”。其实不是这样，从规范来说确实定义了这两种不同行距的列表，并且观察生成的 HTML 源码也可发现只是列表项不同而已。

### 更多的符号

在 Markdown\*palletes 里，提供的无序列表语法是 `-`，有序列表形如 `1.`、`2.`。事实上，无序列表还支持 `*` 和 `+`，有序列表支持 `1)`、`2)`。

虽然看上去多支持一个符号卵用没有，渲染出来效果是一样的。但是不同的符号可以很好地解决“我想要放两个挨在一起的列表，但是它们不要合并”。例如：

```markdown
- aaaaa
- bbbbb
- ccccc

+ asdasd
+ sdasda
+ dasdas
```

如果只有一种符号，那么就会拼接在一起，并被视作松列表。

## 链接

### 引用链接

这个功能没有出现在 Markdown*palletes 的工具栏上，可能很多人不知道。这个功能大约多用于百科页面这种外链比较多的情形。句法很简单，看下面这个例子：

```markdown
- 你说得对，但是 [genshin] 是一款……
- 鉴定为玩 [genshin] 玩的。
- [原神，启动！][genshin]

[genshin]: https://ys.mihoyo.com/ "genshin impact"
```

应该是用在一个页面需要反复链接同一个网站上的情形。其实在洛谷这种网站用处不大，但也算是 Markdown 的一个语法。

### 标签

这个功能也不在 Markdown*palletes 的工具栏上。

尝试把鼠标指针放到这个链接上：[洛谷](https://www.luogu.com.cn "在洛谷，享受 Coding 的快乐")。可以发现鼠标指针旁边会出现一个提示条。这个就是在网页链接/图片链接语法上额外支持的标签功能。

```markdown
[洛谷](https://www.luogu.com.cn "在洛谷，享受 Coding 的快乐")
![洛谷](https://fecdn.luogu.com.cn/luogu/logo.png "在洛谷，享受 Coding 的快乐")
```

上面的引用链接其实也用了这个功能。

## 代码块

### 额外的符号

除了使用三个反引号来表示一段代码块，使用波浪线也是可以的。

~~~markdown
```cpp
\\ Something...
```
~~~

```markdown
~~~pascal
\\ Something...
~~~
```

嗯，没用的知识又增加了。

### 直到结尾

如果用反引号或者波浪线打开代码块，没有结束标记的话会一直延伸到当前所在块的末尾。这个在标准里是有意为之的，大概是防止编译器爆炸。

> ```cpp
> asd
> asd
> asd

~~~
> ```cpp
> asd
> asd
> asd
~~~

### 另一种代码块

与显式地使用反引号或者波浪线将代码包裹起来不同，一段代码前面只要加上四个空格也能自动变成代码块。不过指定不了渲染所用的语言，非常不牛。

```
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
```

    int a, b;
    cin >> a >> b;
    cout << a + b << endl;

也许随便捣鼓捣鼓 Markdown 就能发现这个。

## 另一种一级/二级标题

在一个文段下面画上一条由等于号/短斜线组成的线，可以让该文段变成一级标题/二级标题。

```markdown
headline 1
=

headline 2
-

```

这个其实是 Setext 风格的标题语法。只支持一级和二级标题。嗯，又是一个没啥用的语法。

## HTML 转义符

HTML 所支持的转义符号在 Markdown 下都是支持的。例如：

```markdown
&le; &copy; &emsp; &#1234;
```

顺带一提，一些不太正常的符号会被自动替换为 � 字符。

## 自由的语言

代码块并不一定非得是恰好三个反引号/波浪线，多一点也没关系；水平线不一定非得恰好三个连在一起的短横线，多一点或者符号不连续也没关系；上面所说的 Setext 语法也可以多加一些短横线/等于号（但是中间不能断开，真是奇怪的语法）。

换言之，下面的写法都是可以正确渲染的：

```
~~~~~~~~~~~~~~~~~~~~cpp
// Something...
~~~~~~~~~~~~~~~~~~~~

- - - - - - - - -

*       *                      *


headline 1
=======

headline 2
   ---


# headline 1 #

## headline 2 ######################
```

## 溢出

标准里规定了有序列表的数字长度不超过九位，理由是太长的序号在大多数浏览器下都会显示溢出。也就是说，列表的第一项最大是 $999999999$。

999999999. 其实已经溢出了。

然而这并不代表不能存在列表序号超过九位的项。因为 Markdown 默认每一个列表项的序号都是它上一项加一，除了第一项。

999999999. 我有九位。
1. 我有十位。
1. 我也有十位。

```markdown
999999999. 我有九位。
1. 我有十位。
1. 我也有十位。
```

稍微再提一嘴，用于渲染 Markdown 的渲染器 Markdown-it 默认给列表&引用块的最大嵌套深度是 $100$ 层，用来防止浏览器爆炸。虽然标准里没写这部分内容。不过通常不需要这么多层，渲染出的奇异搞笑页面就已经不太能看了……

---

