---
create_time: 1660027583
update_time: 1660027583
title: 洛谷 LaTeX 格式手册
board: 1
tag:
- 2
---

␣

$\kern{.8pt}\clubsuit\kern{.8pt}$



## 阅读指南

本文章写给使用洛谷进行公式渲染的用户。

- 对于刚开始学习在网页上使用 $\LaTeX$，并且希望快速入门的用户，建议阅读**快速入门**章节。其中跳过了大段的理论叙述，着手于使用大量实例解决公式编写遇到的常见问题。
- 对于已经有了一定基础的用户，可以阅读其他章节。但是为了防止文章极其冗长，本文对原 $\KaTeX$ 用户手册进行了摘录，加上作者本人的理解，以及一些注释。想要更全面的知晓 $\KaTeX$ 所支持的 $\LaTeX$ 公式，请阅读[官方文档（全英文）](https://katex.org/docs/supported.html)。

约定：

- 加上 $\kern{.8pt}\clubsuit\kern{.8pt}$ 的章节建议读者阅读过一遍全文，通晓基本语法后再读。
- 加上 $\bigstar$ 的章节读者可能不太用得到，可以选择性跳过。

力求简短。

## 目录

请善用搜索功能，查找你所需要的内容。

[这里要插入目录]

## 理论基础

这部分内容主要介绍了 $\LaTeX$ 的基本结构，以及部分原理。

### 历史 $\small\textbf{history}$

[这里要插一张图]

概念辨析：

- $\TeX$ 是由著名的计算机科学家 Donald E. Knuth（唐纳德 · 高德纳）发明的排版系统，可以在本地运行相应的软件生成排版好了的文章。
- $\LaTeX$ 是由美国计算机学家 Leslie Lamport（莱斯利 · 兰伯特）发明的基于 $\TeX$ 的排版系统。部分语法承接了 $\TeX$，同时开创了新的语法，加入的宏包系统可以大大简化排版的难度。但是语法上并不和 $\TeX$ 互相兼容。可以在本地运行相应的软件生成排版好了的文章。
- $\KaTeX$ 是基于 $\LaTeX$ 语法，进行一系列取舍后，实现的可以在**网络上**显示数学公式的 $\text{javascript}$ 库。但是语法上并不和 $\LaTeX$ 完全兼容。

注意点：

- $\KaTeX$ 使用的语法承接了 $\LaTeX$ 的语法，但是**不完全相同**，因此在网络上搜寻的关于 $\LaTeX$ 的语法不一定可以被 $\KaTeX$ 所编译。
- $\KaTeX$ 支持的语法可以简单认为是 $\LaTeX$ 的子集。从语言特性而言，它更偏向于 $\LaTeX$ 的语法，而非 $\TeX$ 的语法。

### 控制序列 $\small\textbf{control sequence}$

**控制序列**是 $\LaTeX$ 的一类特殊的语法，相当于「指令」，也就是经常看到的反斜杠（$\text{backslash}$）后面跟着一串字符。

通常来说，控制序列可以分为以下两种：

- $\verb!\[letter][[letter]...]!$。也就是一个反斜杠，后面接着至少一个**英文字母**。值得注意的是，它会一直读取反斜杠后面的英文字母，直到下一个字符不是英文字母。
- $\verb!\[symbol]!$。也就是一个反斜杠，后面接着恰好一个不是英文字母的符号（特别地，空格也算）。

不同的控制序列有不一样的功能。例如，$\verb!\alpha!$ 会渲染希腊字母 $\alpha$，$\verb!\sqrt[3]{x}!$ 会渲染一个带三次方根的 $x$：$\sqrt[3]{x}$。

有些控制序列后面可接参数，例如上述的 $\verb!\sqrt!$。使用花括号的参数是必须的，而使用方括号的参数则是可选的。特别地，花括号可以被省略，此时对应的参数就是恰好一个字符。例如 $\verb!\sqrt[3]{x}!$ 可以被简写为 $\verb!\sqrt[3]x!$。

### 模式 $\small\textbf{mode}$

模式可以简要分为三种：

- **行内数学模式**。行内数学模式用来渲染行内公式。直接使用一对美元符号（$\texttt{\textdollar...\textdollar}$），里面写上内容（不能为空），即可进入行内数学模式。例如 $\texttt{\textdollar 1+2=3\textdollar}$ 会渲染出 $1+2=3$。
- **行间数学模式**。行间数学模式用来渲染行间公式。使用两对美元符号（$\texttt{\textdollar\textdollar...\textdollar\textdollar}$），里面写上内容（不能为空），即可进入行间数学模式。行间数学模式部分渲染结果和行内数学模式有区别。此外，由于洛谷的特性，行间数学模式应当另起一段，防止渲染爆炸。
- **文本模式**。在数学模式下，使用 $\verb!\textXX{}!$（$\verb!XX!$ 是两个英文字母，例如 $\verb!bb!,\verb!it!$）一类的控制序列，即可进入到文本模式。但虽然你可以通过 $\verb!\textXX{}!$ 进入文本模式，却无法使用 $\verb!\mathXX{}!$ 回到数学模式。

通常情况下，我们只会使用到行内数学模式和行间数学模式。但由于一些公式里存在文字说明，在这种情况下需要转换成文本模式进行书写。

$\bigstar$ 在行间公式里的 $\verb!\text{}!$ 控制序列里，使用一对美元符号，可以重新进入到行内数学模式。例如 $\texttt{\textdollar\textdollar...\verb!\text{!\textdollar ...\textdollar\verb!}!...\textdollar\textdollar}$。

$\bigstar$ 通常而言，对于 $\LaTeX$，你在 $\verb!document!$ 环境下直接书写即为进入了文本模式。但是由于 $\KaTeX$ 需要在网页上渲染，而全文都由 $\KaTeX$ 渲染则会带来极大的负担，且不能得到什么特别的好处，因此默认使用一对美元符号就直接进入数学模式了。

$\bigstar$ 其实 $\LaTeX$ 同样支持 $\verb!\(something\)!$ 的语法进入数学模式。但是由于某些原因，洛谷砍掉了这个功能。

### 可用字符 $\small\textbf{valid letters}$

- 数学模式中的可用字符包括 $\text{ACSII}$ 字符当中的可视字符，再加上空格字符、制表符、换行符。他们组成了通常意义下 $\LaTeX$ 文件里应该出现在数学模式里的字符。
- 文本模式的范围则要宽松得多。对于很多不属于 $\text{ACSII}$ 编码的 $\text{Unicode}$ 编码的字符（例如汉字），都是可以的。

$\LaTeX$ 通过使用控制序列来在数学模式下生成各种各样的不属于 $\text{ACSII}$ 编码范围内的字符。例如 $\verb!\geq!$ 渲染出 $\geq$，而非直接写 ≥。

$\bigstar$ 其实较新版本的 $\KaTeX$ 也是支持你直接在数学模式下用这些 
$\text{Unicode}$ 字符的（在没有开启 $\verb!strict!$ 的情况下），并且可以正确工作。但是考虑到对旧版本的兼容性，在洛谷里我们不允许这样的写法。

有些字符被 $\LaTeX$ 用来做特殊用途。如果你希望单纯地显示它，而非使用它的特殊用途，则需要使用对应的控制序列。而这些控制序列通常是这类字符前面加上反斜杠。例如 $\verb!\#!$ 渲染为 $\#$，$\verb!\!\text{\textdollar}$ 渲染为 $\$
$$

还有部分字符可以仅用英文字母进行显示，它可以用来解决部分冲突问题（例如 $\text{Markdown}$ 中的表格需要用竖线（$|$），如果你想在表格内的数学公式中使用竖线，则要转义）。以下是几个例子：

- $\verb!\vert!$ 用来替代 $|$。
- $\verb!\text{\textdollar}!$ 用来替代 $\text{\textdollar}$。$\verb!textdollar!$ 控制序列必须要在文本模式下才能使用。

如果你是博客编写者，并且公式里会出现美元符号，则要额外注意美元符号必须得转义成 $\verb!\text{\textdollar}!$，不然会炸。

$\bigstar$ 此外，$\KaTeX$ 允许你直接使用 $\text{Unicode}$ 编码来显示一个字符。对于十进制的 $\text{Unicode}$ 编码，语法是 $\verb!\charID!$，例如 $\verb!\char38!$ 显示为 $\char38$；对于十六进制的 $\text{Unicode}$ 编码，语法是 $\verb!\char"ID!$，例如 $\verb!\char"7C89\char"5154!$ 显示为 $\char"7C89\char"5154$。

### 样式 $\small\textbf{styles}$

[这里要插入一张图]

行内数学公式有它对应的样式，行间数学公式也有对应的样式。哪怕是上标、下标，也是有样式的。大致可以分为这样五种：

- 行间公式



### 单位制 $\small\textbf{units}$

### $\bigstar$ 注释 $\small\textbf{comment}$

在公式后面加上百分号即可做到注释的效果（相当于 $\text{C++}$ 中的 $\verb!//!$ 注释）

```latex
1 + 2 + \cdots + n = \frac{n(n+1)}{2} % Guess found this formula
```

渲染结果中不会出现注释的内容：

$$
1 + 2 + \cdots + n = \frac{n(n+1)}{2} % Guess found this formula
$$

## 快速入门 $\scriptsize\textbf{quick start}$

## 符号 $\scriptsize\textbf{letters}$

### 括号 $\small\textbf{delimiters}$

### 希腊字母 $\small\textbf{greek letters}$

### 其他字符 $\small\textbf{other letters}$

## 运算符 $\scriptsize\textbf{operators}$

### 数学函数 $\small\textbf{functions}$

### 巨运算符 $\small\textbf{big operators}$

### 二元运算符 $\small\textbf{binary operators}$

### 分数线 $\small\textbf{fractions}$

分数线的语法为 $\verb!\frac{#1}{#2}!$，其中 $\#1$ 是分子，$\#2$ 是分母。例如，$\verb!\frac{1}{2}!$ 会渲染出 $\frac{1}{2}$。

在行内数学模式/角标模式下大小较小，行间数学模式下大小较大。

此外，它还有三种变体：$\verb!\tfrac{#1}{#2}!,\verb!\dfrac{#1}{#2}!,\verb!\cfrac{#1}{#2}!$。前缀 $\verb!t!$ 是 $\text{text}$ 的缩写，表示强制使用行间数学模式的样式渲染；前缀 $\verb!d!$ 是 $\text{display}$ 的缩写，表示强制使用行内数学模式的样式渲染。但是 $\verb!\cfrac{#1}{#2}!$ 会特殊一些，它生成的样式与 $\verb!\dfrac{#1}{#2}!$ 类似，但不相同。

可以比较下两者的差别：

$$
\begin{gathered}
\dfrac{1}{1+\dfrac{1}{2+\dfrac{1}{3+\dfrac{1}{4+\dfrac{1}{5+\cdots}}}}} & \qquad & \cfrac{1}{1+\cfrac{1}{2+\cfrac{1}{3+\cfrac{1}{4+\cfrac{1}{5+\cdots}}}}}
\end{gathered}
$$

```latex
\dfrac{1}{1+\dfrac{1}{2+\dfrac{1}{3+\dfrac{1}{4+\dfrac{1}{5+\cdots}}}}}
\cfrac{1}{1+\cfrac{1}{2+\cfrac{1}{3+\cfrac{1}{4+\cfrac{1}{5+\cdots}}}}}
```

### 二项式 $\small\textbf{binomials}$

目前为止，$\KaTeX$ 支持三种二项式，他们通常分别表示组合数、第一类斯特林数、第二类斯特林数。语法分别为：

```latex
{n \choose k}   {n\brack k}   {n\brace k}
```

$$
\begin{gathered}
{n \choose k} &\qquad& {n\brack k} &\qquad& {n\brace k}
\end{gathered}
$$

在行内数学模式/角标模式下大小较小，行间数学模式下大小较大。

特别地，对于组合数，还支持这样三种控制序列：

- $\verb!\binom{n}{k}!$，类似于 $\verb!{n \choose k}!$。
- $\verb!\dbinom{n}{k}!$，强制使用了行间数学公式样式的组合数。
- $\verb!\tbinom{n}{k}!$，强制使用了行内数学公式样式的组合数。

但是一些特殊的二项式会有不同的括号（比如欧拉数的括号是尖角）。因此这里给出手工模拟这种括号的方式：

```latex
\left<\begin{matrix}n \\ m\end{matrix}\right>
```

$\kern{.8pt}\clubsuit\kern{.8pt}$ 对于长的推导过程，建议使用宏定义进行封装：

```latex
\def\lang#1#2{\left<\begin{matrix}#1 \\ #2\end{matrix}\right>}

\lang{n}{m} % 用法
```

渲染结果：

$$
\left<\begin{matrix}n \\ m\end{matrix}\right>
$$

### 根号 $\small\textbf{sqrt}$

根号的语法是 $\verb!sqrt[#2]{#1}!$，其中 $\#1$ 是你要加上根号的东西，$\#2$ 是根号的次数（可选）。例如 $\verb!\sqrt[3]{5}!$ 渲染为 $\sqrt[3]{5}$。

## 关系符 $\scriptsize\textbf{relationship}$

### 箭头 $\small\textbf{arrows}$

## 布局 $\scriptsize\textbf{layout}$

### 注解 $\small\textbf{annotation}$

### 换行 $\small\textbf{line-break}$

### 空格 $\small\textbf{space}$

### 上下标 $\small\textbf{script}$

## 环境 $\scriptsize\textbf{environment}$

## 杂项 $\scriptsize\textbf{others}$

### 字体 $\small\textbf{fonts}$

### 颜色 $\small\textbf{colors}$

