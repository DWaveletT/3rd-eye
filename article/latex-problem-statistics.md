---
create_time: 1585037015
update_time: 1585037015
title: 美化题目统计
board: 1
tag:
- 2
---

## 前言

> upd 2020.3.25 彻底修复$\rm QQ$浏览器相关问题，并更新食用方法。

~~他从废稿里被捞出来了~~

其实在[【美化估值显示】](https://www.luogu.com.cn/blog/McHf/gu-gu-LaTeX)这篇里，已经提出可以用相同的系统画出题目的显示。然而这种系统的问题就是很有可能进度条跑出界面之外。因此，这里重构了一个竖着的。

![迷惑.JPG](https://i.loli.net/2020/03/24/hmCFnMyxc1tZYo6.jpg)

[剪切板地址](https://www.luogu.com.cn/paste/4iyqsbf7)

## 食用方法

非常简单，只需要将源代码贴到主页就行了。

```LaTeX
$$
\def{\cR}{FE4C61} \def{\cO}{F39C11} \def{\cY}{FFC116} \def{\cG}{52C41A} \def{\cB}{3498DB} \def{\cP}{9D3DCF} \def{\cD}{0E1D69} \def{\cE}{BFBFBF} \def{\s}{35pt} \def{\w}{\kern{5pt}}
\newcommand{\a}[1]{&\textcolor{A9A9A9}{\kern{-5pt}\underline{#1\kern{242pt}}\kern{8pt}}\\[\s]}
\newcommand{\b}[2]{\fcolorbox{black}{#2}{\raisebox{#1pt}{\kern{10pt}}}\raisebox{#1pt}{\scriptsize\kern{-17pt}\raisebox{4.5pt}{#1题}}}
\newcommand{\c}[0]{\kern{-10pt}\large\textbf{练习情况统计表}}
\newcommand{\t}[2]{\fcolorbox{black}{#2}{\color{white}\textbf{#1}}}
\newcommand{\main}[9]{
\boxed{\kern{8pt}\begin{gathered}\\[-6pt]\c\\[10pt]
\begin{aligned}\a{100}\a{\w50}\a{\w\w 0}\end{aligned} \\[-64pt] \\[-#1pt]
\begin{matrix}
 & \b{#2}{\cE}& \b{#3}{\cR} & \b{#4}{\cO} & \b{#5}{\cY} & \b{#6}{\cG} & \b{#7}{\cB} & \b{#8}{\cP} & \b{#9}{\cD} & \\[5pt]
\kern{-6pt}\text{项目} & \t{灰}{\cE} & \t{红}{\cR} & \t{橙}{\cO} & \t{黄}{\cY}&\t{绿}{\cG}&\t{蓝}{\cB}&\t{紫}{\cP} & \t{黑}{\cD} & \kern{8pt} \\
\end{matrix}
\end{gathered}}}
\main{79}{8}{79}{71}{28}{14}{4}{0}{0}
$$
```

不过这里自然是要讲这个东西的优点的www

### 一、食用简单

在这句话**后面八个个槽**分别填入各题的数量统计，即可生成。

如：`\main{250}{4}{139}{154}{142}{109}{154}{69}{5}`

### 二、便于伸长

可能有人问了，第一个槽是用来做什么的呢(~~棒读~~

可能有一些**神仙**做的题特别多，又或许有人刚入门，那么长的条并没有什么作用。所以这份重构的代码特别推出了这个功能。

![ee.JPG](https://i.loli.net/2020/03/24/eth3WDpYlFu7ANP.jpg)

食用方法：

- $1.$将`main`的**第一个格子**中的数值改为**所有数据的最大值**。

比如说，你八种题目的通过数为$12,22,43,64,68,34,4,1$，那么第一个格子就应该填$68$。

- $2.$在`\begin{aligned}\a{250}\a{200}\a{150}\a{100}\a{50}\a{0}\end{aligned}`这一段中，增加横线的数值。

~~图文无关，等哪天有空了再更新。~~

```LaTeX
$$
\def{\cR}{FE4C61} \def{\cO}{F39C11} \def{\cY}{FFC116} \def{\cG}{52C41A} \def{\cB}{3498DB} \def{\cP}{9D3DCF} \def{\cD}{0E1D69} \def{\cE}{BFBFBF} \def{\s}{35pt} \def{\w}{\kern{5pt}}
\newcommand{\a}[1]{&\textcolor{A9A9A9}{\kern{-5pt}\underline{#1\kern{242pt}}\kern{8pt}}\\[\s]}
\newcommand{\b}[2]{\fcolorbox{black}{#2}{\raisebox{#1pt}{\kern{10pt}}}\raisebox{#1pt}{\scriptsize\kern{-17pt}\raisebox{4.5pt}{#1题}}}
\newcommand{\c}[0]{\kern{-10pt}\large\textbf{练习情况统计表}}
\newcommand{\t}[2]{\fcolorbox{black}{#2}{\color{white}\textbf{#1}}}
\newcommand{\main}[9]{
\boxed{\kern{8pt}\begin{gathered}\\[-6pt]\c\\[10pt]
\begin{aligned}\a{400}\a{350}\a{300}\a{250}\a{200}\a{150}\a{100}\a{\w50}\a{\w\w 0}\end{aligned} \\[-64pt] \\[-#1pt]
\begin{matrix}
 & \b{#2}{\cE}& \b{#3}{\cR} & \b{#4}{\cO} & \b{#5}{\cY} & \b{#6}{\cG} & \b{#7}{\cB} & \b{#8}{\cP} & \b{#9}{\cD} & \\[5pt]
\kern{-6pt}\text{项目} & \t{灰}{\cE} & \t{红}{\cR} & \t{橙}{\cO} & \t{黄}{\cY}&\t{绿}{\cG}&\t{蓝}{\cB}&\t{紫}{\cP} & \t{黑}{\cD} & \kern{8pt} \\
\end{matrix}
\end{gathered}}}
\main{325}{0}{139}{154}{172}{256}{325}{280}{265}
$$
```

※注：由于博客$\KaTeX$版本较低，所以这里用的图片。上述代码生成的其实是矢量图，因而更清楚。

是不是非常简单呢？

自己动手做一个吧！

---

