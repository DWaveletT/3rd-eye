---
create_time: 1582504829
update_time: 1582504829
title: 美化估值显示——LaTeX艺术画
board: 1
tag:
- 2
---

众所周知，在个人主页显示的洛谷咕值只有单一的数字，并不是很直观。然后就画了一个柱状统计图。

## 一、简单版
[![条形图.JPG](https://i.loli.net/2020/02/24/13PK7hH4CAnpFzi.jpg)](https://www.luogu.com.cn/paste/vw66ox5x)

其中的数字都是可以自定义的。可以点击图片进入剪切板地址。

**食用方法**：
在下面的源代码中，

```
$$
\def{\colorOfLine}{#000000}
\def{\colorOfDivide}{#000000}
\def{\colorOfName}{#000000}
\def{\colorOfBox}{#000000}
\def{\colorOfContent}{#ffffff}
\newcommand{\item}[2]{\color{\colorOfName}\textbf{#1:}\text{#2} & }
\newcommand{\add}[1]{
    \fcolorbox{\colorOfBox}{\colorOfContent}{\normalsize\vphantom{+}\kern{#1 mm}}
}
\newcommand{\main}[6]{
    \boxed{
        \color{white}\begin{cases}
        &\color{\colorOfLine}\kern{4pt}\begin{vmatrix}\raisebox{90pt}{}\kern{48.56mm}\end{vmatrix}\kern{-5.5pt}\begin{vmatrix}\raisebox{90pt}{}\kern{48.56mm}\end{vmatrix}  \\[-108pt]
        &\color{\colorOfDivide}\scriptsize\kern{4 pt}\text{0}\kern{48.2 mm}\text{50}\kern{47 mm}\text{100} \\[3pt]
        \item{基础信用}{#1} \add{#1} \\[3pt]
        \item{练习情况}{#2} \add{#2} \\[3pt]
        \item{社区贡献}{#3} \add{#3} \\[3pt]
        \item{比赛情况}{#4} \add{#4} \\[3pt]
        \item{获得成就}{#5} \add{#5} \\[3pt]
       \color{\colorOfName}\textbf{总估值:\kern{10pt}#6}
        \end{cases}
    }
}
\main{100}{75}{50}{25}{0}{250}
$$
```
找到最后的`\main{}{}{}{}{}{}`，把你的咕值的每一项以及咕值总和填进去就可以在**个人主页**生成一张咕值的条形统计图。

由于迷之原因，讨论区用不了`$\def$`和`$\newcommand$`，我谔谔。如果你想在讨论区使用，代码会变得巨长，我就不放了

在代码的前几行有这样几个颜色的设置：

- `\def{\colorOfLine}{#000000}`:分割线（即0、50和100的线）的颜色。
- `\def{\colorOfDivide}{#000000}`:0、50、100这三个数字的颜色
- `\def{\colorOfName}{#000000}`:咕值项目的颜色
- `\def{\colorOfBox}{#000000}`:条状图边框的颜色
- `\def{\colorOfContent}{#ffffff}`:条状图内部的颜色
其中都是16进制下的颜色。当然可以用$\LaTeX$已经预设好的`red`,`blue`之类。使用$\LaTeX$预设不需要`#`。

## 二、带颜色的条状图

这里举神犇$\color{red}\text{CYJian}$的咕值举个例子：

![%%%.JPG](https://i.loli.net/2020/02/24/6NeZ1YnoIhMRHz8.jpg)

这里使用了代码二，即条形图加上颜色

```
$$
\def{\cGreen}{#52C41A}  \def{\cOrange}{#F39C11}
\def{\cYellow}{#FADB14} \def{\cRed}{#E74C3C} 
\def{\colorOfLine}{#A9A9A9} \def{\colorOfDivide}{#000000}
\def{\colorOfName}{#000000} \def{\colorOfBox}{#000000}
\def{\colorOfContent}{#000000}
\newcommand{\item}[2]{\color{\colorOfName}\textbf{#1:}\text{#2} & }
\newcommand{\add}[2]{
    \fcolorbox{\colorOfBox}{#2}{\normalsize\vphantom{+}\kern{#1 mm}}
}
\newcommand{\main}[6]{
    \boxed{
        \color{white}\begin{cases}
    &\color{\colorOfLine}\kern{4pt}\begin{vmatrix}\raisebox{90pt}{}\kern{48.56mm}\end{vmatrix}\kern{-5.5pt}\begin{vmatrix}\raisebox{90pt}{}\kern{48.56mm}\end{vmatrix}  \\[-108pt]
        &\color{\colorOfDivide}\scriptsize\kern{4 pt}\text{0}\kern{48.2 mm}\text{50}\kern{47 mm}\text{100} \\[3pt]
        \item{基础信用}{#1} \add{#1}{\cGreen} \\[3pt]
        \item{练习情况}{#2} \add{#2}{\cYellow} \\[3pt]
        \item{社区贡献}{#3} \add{#3}{\cGreen} \\[3pt]
        \item{比赛情况}{#4} \add{#4}{\cGreen} \\[3pt]
        \item{获得成就}{#5} \add{#5}{\cYellow} \\[3pt]
       \color{\colorOfName}\textbf{总咕值:\kern{10pt}#6}
        \end{cases}
    } \\
}
\main{100}{73}{97}{100}{60}{429}
$$
```

在每一项`\add{#X}`后的格子里填入颜色，就可以让对应的条显示颜色。

代码里面预设了4种颜色，即洛谷咕值排行榜上的4种颜色。分别为`cGreen`,`cOrange`,`cYellow`,`cRed`。

`\main`的食用方法同一。

一张$\color{red}\text{YCE3216037}$的咕值图：

![捕获B.JPG](https://i.loli.net/2020/02/24/jENDF6gythlqISu.jpg)

还在等什么？快在个人主页放上咕值条形统计图吧（

## 三、关于图片的扩展

感谢 @YCE3216037 修改的代码

根据上面的代码，很容易发现这个$\LaTeX$是**可扩展**的。

也就是说，可以仿照`\item{基础信用}{#1} \add{#1}{\cGreen} \\[3pt]`的格式，继续添加项目。因此该统计表可以扩展至其他数据的条形统计。

[YCE3216037 的剪切板地址](https://www.luogu.com.cn/paste/d7dbyack)

若某一个类型的题目超过100时，可以同除以一个常数，使每个数在100以内，如下表。 ----YCE3216037

比如说，这张YCE3216037的练习情况统计表

![tmp1.JPG](https://i.loli.net/2020/02/28/5Jk7XUjPfEYThwL.jpg)

```
$$
 \def{\cGrey}{#C3C3C3} \def{\cRed}{#E74C3C}
\def{\cOrange}{#F39C11} \def{\cYellow}{#FADB14}
\def{\cGreen}{#52C41A} \def{\cBlue}{#2137F5}
\def{\cPurple}{#C325DE} \def{\cBlack}{#3112A5} 
\def{\colorOfLine}{#A9A9A9} \def{\colorOfDivide}{#000000} 
\def{\colorOfName}{#000000} \def{\colorOfBox}{#000000} 
\def{\colorOfContent}{#000000} 
\newcommand{\item}[2]{\color{\colorOfName}\textbf{#1:}\text{#2}\times2.5 & } 
\newcommand{\add}[2]{ \fcolorbox{\colorOfBox}{#2}{\normalsize\vphantom{+}\kern{#1 mm}} } 
\newcommand{\main}[9]{ 
    \boxed{
        \color{white}\begin{cases}
    &\color{\colorOfLine}\kern{4pt}\begin{vmatrix}\raisebox{137pt}{}
\kern{48.56mm}\end{vmatrix}\kern{-5.5pt}\begin{vmatrix}\raisebox{137pt}{}\kern{48.56mm}\end{vmatrix} \\[-158pt] 
&\color{\colorOfDivide}\scriptsize\kern{4 pt}\text{0}\kern{47mm}\text{125}\kern{47mm}\text{250} \\[3pt] 
        \item{灰}{#1} \add{#1}{\cGrey} \\[3pt] 
        \item{红}{#2} \add{#2}{\cRed} \\[3pt] 
        \item{橙}{#3} \add{#3}{\cOrange} \\[3pt] 
        \item{黄}{#4} \add{#4}{\cYellow} \\[3pt] 
        \item{绿}{#5} \add{#5}{\cGreen} \\[3pt] 
        \item{蓝}{#6}\add{#6}{\cBlue} \\[3pt] 
        \item{紫}{#7} \add{#7}{\cPurple} \\[3pt] 
        \item{黑}{#8} \add{#8}{\cBlack} \\[3pt]     
        \color{\colorOfName}\textbf{总题量:\kern{10pt}#9} 
        \end{cases} 
    } \\ 
} 
\main{0.8}{39.6}{62}{81.6}{28}{42.4}{8}{1.6}{660} 
$$

```



