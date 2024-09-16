---
create_time: 1584149292
update_time: 1584149292
title: 【KaTeX 数学公式大全】
board: 1
tag:
- 2
---

## 前言

由于在洛谷，有很多人对于$\KaTeX$和$\LaTeX$之间的关系并不清楚，导致很多人去搜$\LaTeX$的资料，然后发现有许多指令无法在洛谷运行。

但是事实上，$\KaTeX$才是洛谷上的$\LaTeX$的渲染机制。因此只有$\KaTeX$支持的指令才能正常使用。在$\KaTeX$官网，其实有两张支持表，这里搬运过来以便于大家能够正确使用指令。

这张表应该涵盖了纯$\KaTeX$**所有**的功能。当然，$\LaTeX$公式大全亦可作为部分参考。下面是搬运部分。

$\color{red}\text{因为}\stackrel{\KaTeX \text{太旧啦}}{\text{历史遗留问题}}\text{洛谷部分不支持。下表不支持的部分统一写上}\colorbox{red}{\color{white}\text{暂不支持}}$

[$\huge\text{在剪切板观看以获得最佳体验}$](https://www.luogu.com.cn/paste/hs3jg81l)

在这里，你甚至可以看到洛谷博客、讨论区的$\KaTeX$是有多么落后orz

---

## 受支持的功能

这是一张由$\KaTeX$支持的$\TeX$公式清单。他按照逻辑顺序分类。

这有一个相似的按照字典序排列的[支持表](https://katex.org/docs/support_table.html)。那张表格同样写出了不受支持的公式。

## 声调记号
| 第一列 | 第二列 | 第三列 |
| :----------- | :----------- | :----------- |
| $a'$ `a'` | $\tilde{a}$ `\tilde{a}` | $\mathring{g}$ `\mathring{g}` |
| $a''$ `a'' ` | $\widetilde{ac}$ `\widetilde{ac}` | $\overgroup{AB}$`\overgroup{AB}` |
| $a^{\prime}$ `a^{\prime}` | $\utilde{AB}$ `\utilde{AB}` | $\undergroup{AB}$ `\undergroup{AB}`  |
| $\acute{a}$ `\acute{a}` | $\vec{F}$ `\vec{F}` | $\Overrightarrow{AB}$ `\Overrightarrow{AB}` |
| $\bar{y}$ `\bar{y}` | $\overleftarrow{AB}$ `\overleftarrow{AB}` | $\overrightarrow{AB}$ `\overrightarrow{AB}`  |
| $\breve{a}$ `\breve{a}` | $\underleftarrow{AB}$ `\underleftarrow{AB}` | $\underrightarrow{AB}$ `\underrightarrow{AB}` |
| $\check{a}$ `\check{a}` | $\overleftharpoon{ac}$ `\overleftharpoon{ac}` | $\overrightharpoon{ac}$ `\overrightharpoon{ac}` |
| $\dot{a}$ `\dot{a}` | $\overleftrightarrow{AB}$ `\overleftrightarrow{AB}` | $\overbrace{AB}$ `\overbrace{AB}` |
| $\ddot{a}$ `\ddot{a}` | $\underleftrightarrow{AB}$ `\underleftrightarrow{AB}` | $\underbrace{AB}$  `\underbrace{AB}` |
| $\grave{a}$ `\grave{a}` | $\overline{AB}$ `\overline{AB}` | $\overlinesegment{AB}$ `\overlinesegment{AB}` |
| $\hat{\theta}$ `\hat{\theta}` | $\underline{AB}$ `\underline{AB}` | $\underlinesegment{AB}$ `\underlinesegment{AB}` |
| $\widehat{ac}$ `\widehat{ac}` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\widecheck{ac}` |  |

另外，还有一些上下音标适合用在`\text{}`环境下。$^{[1]}$


| 第一列 | 第二列 | 第三列 | 第四列 |
| :----------- | :----------- | :-----------  | :----------- |
| $\text{\'{a}}$ `\'{a}` | $\text{\~{a}}$ `\~{a}` | $\text{\.{a}}$ `\.{a}` | $\text{\H{a}}$ `\H{a}` |
| $\text{\`{a}}$ $^{[2]}$| $\text{\={a}}$ `\={a}` | $\text{\"{a}}$ `\"{a}` | $\text{\v{a}} $ `\v{a} ` |
| $\text{\^{a}}$ `\^{a}` | $\text{\u{a}}$ `\u{a}` | $\text{\r{a}}$ `\r{a}` | |

$[1]:$ 这类特殊的音标需要用在文字环境下，即`\text{}`里面。比如`$\text{\'{a}}$`

$[2]:$ 由于会和$\rm Markdown$的代码块冲突，这里说明一下，这个音标的代码其实是`\+波浪线对应按键+{}`。

另请参阅 字母 章节。

## 定界符（括号之类）

| 第一列 | 第二列 | 第三列 | 第四列 | 第五列 |
| :----------- | :----------- | :----------- | :----------- | :----------- |
| $()$ `()` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\lparen\rparen` | $⌈ ⌉$ `⌈ ⌉` | $\lceil \rceil$ `\lceil rceil` | $\uparrow$ `\uparrow` |
| $[ ]$ `[ ]` | $\lbrack\rbrack$`\lbrack\rbrack` | $⌊ ⌋$ `⌊ ⌋` |   $\lfloor\rfloor$ `\lfloor\rfloor` | $\downarrow$ `\downarrow` |
| $\{ \}$ `\{ \}` | $\lbrace\rbrace$ `\lbrace\rbrace` | $⎰⎱$ `⎰⎱` | $\lmoustache\rmoustache$ `\lmoustache\rmoustache`  | $\updownarrow$ `\updownarrow` | 
| $⟨ ⟩$ `⟨ ⟩` | $\langle\rangle$`\langle\rangle` | $⟮ ⟯$ `⟮ ⟯` | $\lgroup\rgroup$ `\lgroup\rgroup` | $\Uparrow$ `\Uparrow` |
| $^{[3]}$ `|` | $\vert$ `\vert` | $┌ ┐$ `┌ ┐` | $\ulcorner\urcorner$ `\ulcorner\urcorner` | $\Downarrow$ `\Downarrow` |
| $\|$ `\|` | $\Vert$ `\Vert` | $└ ┘$ `└ ┘` | $\llcorner\lrcorner$ `\llcorner\lrcorner` | $\Updownarrow$ `\Updownarrow` |
| $\lvert\rvert$`\lvert\rvert` | $\lVert\rVert$ `\lVert\rVert` | `\left.`$^{[4]}$ | `\right.` | $\backslash$ `\backslash` |
| $\colorbox{red}{\color{white}\text{暂不支持}}$ `\lang\rang` | $\lt \gt$`\lt \gt` | $⟦ ⟧$`⟦ ⟧` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\llbracket\rrbracket` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\lBrace \rBrace` |

$[3]:$ 由于$\rm Markdown$的制表与`|`有冲突，因此无法在表格中显示 $|$。

$[4]:$ `\left`和`\right`后面直接加括号，能显示括号。（人类迷惑行为）

### 定界符大小$^{[5]}$

$\left(\LARGE{AB}\right)$ `\left(\LARGE{AB}\right)`

$( \big( \Big( \bigg( \Bigg($ `( \big( \Big( \bigg( \Bigg(`

$[5]:$ 这里定界符主要指括号。$\KaTeX$提供了一些指令来调整括号的大小。另外，这里`\left,\right`指令是自动调整括号大小。

| 第一列 | 第二列 | 第三列 | 第四列 | 第五列 |
| :----------- | :----------- | :----------- | :----------- | :----------- |
| `\left` | `\big` | `\bigl` | `\bigm` | `\bigr` |
| `\middle` | `\Big` | `\Bigl` | `\Bigm` | `\Bigr` |
| `\right` | `\bigg` | `\biggl` | `\biggm` | `\biggr` |
| | `\Bigg` | `\Biggl` | `\Biggm` | `\Biggr` |

## 环境$^{[6]}$

| 第一列 | 第二列 | 第三列 | 第四列 |
| :----------- | :----------- | :----------- | :----------- |
| $\begin{matrix}a & b \\c & d\end{matrix}$ | $\begin{aligned}&\tt \backslash begin\{matrix\} \\&\tt\quad  a \& b \backslash \backslash \\ &\tt\quad  c \& d \\&\tt \backslash end\{matrix\} \\\end{aligned}$ | $\begin{array}{cc}a & b \\c & d\end{array}$ | $\begin{aligned}&\tt \backslash begin\{array\}\{cc\}\\&\tt\quad a \& b \backslash \backslash\\&\tt\quad c \& d\\&\tt \backslash end\{array\}\\\end{aligned}$ |
| $\begin{pmatrix}a & b \\c & d\end{pmatrix}$ | $\begin{aligned}&\tt\backslash begin\{pmatrix\}\\&\tt\quad a \& b \backslash \backslash \\&\tt\quad c \& d\\&\tt\backslash end\{pmatrix\}\\\end{aligned}$ | $\begin{bmatrix}a & b \\c & d\end{bmatrix}$ | $\begin{aligned}&\tt\backslash begin\{bmatrix\} \\&\tt\quad a \& b \backslash \backslash  \\&\tt\quad c \& d \\&\tt\backslash end\{bmatrix\} \\\end{aligned}$ |
| $\begin{vmatrix}a & b \\c & d\end{vmatrix}$ | $\begin{aligned}&\tt\backslash begin\{vmatrix\}\\&\tt\quad a \& b \backslash \backslash \\&\tt\quad c \ d\\&\tt\backslash end\{vmatrix\}\\\end{aligned}$ | $\begin{Vmatrix}a & b \\c & d\end{Vmatrix}$ | $\begin{aligned}&\tt\backslash begin\{Vmatrix\}\\&\tt\quad a \& b \backslash \backslash \\&\tt\quad c \ d\\&\tt\backslash end\{Vmatrix\}\\\end{aligned}$ |
| $\begin{Bmatrix}a & b \\c & d\end{Bmatrix}$ | $\begin{aligned}&\tt\backslash begin\{Bmatrix\}\\&\tt\quad a \& b \backslash \backslash \\&\tt\quad c \ d\\&\tt\backslash end\{Bmatrix\}\\\end{aligned}$ | $\colorbox{red}{\color{white}\text{暂不支持}}$ | $\begin{aligned}&\tt\backslash def\backslash arraystretch\{1.5\}\\&\tt\quad \backslash begin\{array\}\{c:c:c\}\\&\tt\quad a \& b \& c \backslash\backslash \backslash hline\\&\tt\quad d \& e \& f \backslash \backslash\\&\tt\quad \backslash hdashline\\&\tt\quad g \& h \& i\\&\tt\backslash end\{array\}\end{aligned}$ |
| $\begin{aligned}a&=b+c \\d+e&=f\end{aligned}$ | $\begin{aligned}&\tt\backslash \{aligned\}\\&\tt\quad a\&=b+c \backslash \backslash \\&\tt\quad d+e\&=f\\&\tt\backslash end\{aligned\}\\\end{aligned}$ | $\begin{alignedat}{2}10&x+ &3&y = 2 \\3&x+&13&y = 4\end{alignedat}$ | $\begin{aligned}&\tt\backslash begin\{alignedat\}\{2\}\\&\tt\quad 10\&x+ \&3\&y = 2 \backslash \backslash \\&\tt\quad 3\&x+\&13\&y = 4\\&\tt\backslash end\{alignedat\}\\\end{aligned}$ |
| $\begin{gathered}a=b \\e=b+c\end{gathered}$ | $\begin{aligned}&\tt\backslash begin\{gathered\}\\&\tt\quad a=b \backslash\backslash\\&\tt\quad e=b+c\\&\tt\backslash end\{gathered\}\\\end{aligned}$ | $x = \begin{cases}a &\text{if } b \\c &\text{if } d\end{cases}$ | $\begin{aligned}&\tt x = \backslash begin\{cases\} \\&\tt\quad a \&\backslash text\{if \} b \backslash\backslash \\&\tt\quad c \&\backslash text\{if \} d\\&\tt\backslash end\{cases\}\\\end{aligned}$ |
| $\colorbox{red}{\color{white}\text{暂不支持}}$ | $\begin{aligned}&\tt\backslash begin\{smallmatrix\}\\&\tt\quad a \& b \backslash \backslash \\&\tt\quad c \ d\\&\tt\backslash end\{smallmatrix\}\\\end{aligned}$ |  |  |

$[6]:$ 因为相关原因，在表格里换行不是很方便，因此这里直接嵌入的是$\KaTeX$。

### $\text{Unicode}^{[7]}$数学字母、符号

| 字段 | 支持的字符 | 字段 | 支持的字符 |
| :----------- | :----------- | :----------- | :----------- |
| 粗体 | $\textbf{A-Z,a-z,0-9}$ | 双线体 | $\Bbb{A-Z,k}$ |
| 意大利斜体 | $\textit{A-Z,a-z}$ | 无衬线字体 | $\textsf{A-Z,a-z,0-9}$ |
| 粗意大利斜体 | $\textbf{\textit{A-Z,a-z}}$ | 粗体无衬线 | $\textsf{\textbf{A-Z,a-z,0-9}}$ |
| 手写体 | $\mathscr{A-Z}$ | 斜体无衬线 | $\textsf{\textit{A-Z,a-z }}$ |
| 花体 | $\frak{A-Z,a-z}$ | 打字机字体 | $\texttt{A-Z,a-z,0-9}$ |

$[7]:$ 这里$\rm Unicode$就是万国码。这里是指$\rm Unicode$里支持的字体样式。关于它们的指令，请参考下面的“字体”一段。


### $\rm Unicode$


上面列出的字母可以在任何$\KaTeX$模式下正确渲染。


此外，文本模式始终接受$\text{Brahmic}$，$\text{Georgian}$，中文，日文和韩文的字形。但是，这些字形将从系统字体（而不是$\KaTeX$提供的字体）中呈现，因此它们的版式可能会发生冲突。您可以为$\text{CSS}$类$^{[8]}$`.latin-fallback`，`.cyrillic-fallback`，`.brahmic-fallback`，`.georgian-fallback`，`.cjk-fallback`和`.hangul-fallback`中提供规则，以为这些语言提供后备字体。这些字形的使用可能会引起小的垂直对齐问题：$\KaTeX$列出了符号、大多数拉丁字母、希腊和西里尔字母的详细大小度量值，但其他接受的字形则被视为与当前$\KaTeX$字体中的字母$\text{M}$一样高。（因此很多时候$\KaTeX$用字母$M$作为参考大小——编者注）

如果$\KaTeX$呈现模式的设置中，$\text{strict}$设置为了$\text{false}$或$\text{warn}$（默认），则$\KaTeX$将在文本和数学模式下接受所有$\text{Unicode}$字母。所有无法识别的字符将被视为它们以文本模式显示。这样可能会遇到使用系统字体以及使用不正确的垂直对齐方式的问题。

对于波斯语中的复合字符，我们正在开发为用户提供的插件。（虽然你可能不会使用它——编者注）

$[8]:$ 因为没怎么写过$\rm CSS$，所以可能说明上有一些问题。 

## 布局

### 注解/标记

| 第一列 | 第二列 |
| :----------- | :----------- |
| $\cancel{5}$ `\cancel{5}` | $\overbrace{a+b+c}^{\text{note}}$ `\overbrace{a+b+c}^{\text{note}}` |
| $\bcancel{5}$ `\bcancel{5}` | $\underbrace{a+b+c}_{\text{note}}$ `\underbrace{a+b+c}_{\text{note}}` |
| $\xcancel{ABC}$ `\xcancel{ABC}` | $\not =$ `\not =` |
| $\sout{abc}$ `\sout{abc}` | $\boxed{\pi=\frac c d}$ `\boxed{\pi=\frac c d}` |

`\tag{hi} x+y^{2x}`

$$
\colorbox{red}{\color{white}\text{暂不支持}}
$$

`\tag*{hi} x+y^{2x}`

$$
\colorbox{red}{\color{white}\text{暂不支持}}
$$

### 换行指令

$\KaTeX$ $0.10.0$版本之后将在关系或二元运算符（例如“ $=$”或“ $+$”）之后的内联数学中自动插入换行符。你可以通过`\nobreak`或将公式放在一对大括号中来阻止自动换行，例如`{F = ma}`。`\allowbreak`将允许在关系或运算符以外的其他位置自动换行。

硬换行符是`\\`和`\newline`。$^{[9]}$

在数学模式中，$\KaTeX$不会自动插入换行符。但是当渲染选项$\text{strict}$设置为$\text{true}$时，它将忽略显示数学模式并且插入硬换行。

$[9]:$ 软换行换行不换段，硬换行换行也换段。简单来说，$\KaTeX$有时会自动换行，但换行之后仍在同一段，也就是软换行。而硬换行之后，两部分内容就分离了。 

### 垂直布局

| 第一列 | 第二列 | 第三列 |
| :----------- | :----------- | :----------- |
| $x_n$ `x_n` | $\stackrel{!}{=}$ `\stackrel{!}{=}` | $a \atop b$ `a \atop b` |
| $e^x$ `e^x` | $\overset{!}{=}$ `\overset{!}{=}` | $a\raisebox{0.25em}{b}c$ `a\raisebox{0.25em}{b}c` |
| $_u^o$ `_u^o` | $\underset{!}{=}$ `\underset{!}{=}` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\sum_{\substack{0<i<m\\0<j<n}}` |

如果`\raisebox`的第二个参数嵌套在`$...$`分隔符内，则可以包含数学运算符，当然前提是整个公式包括在`$$ $$`当中。例如`$$a\raisebox{0.25em}{$\frac a b$}c$$`的显示效
$$

$$
a\raisebox{0.25em}{$\frac a b$}c
$$

## 重叠和间距

| 第一列 | 第二列 |
| :----------- | :----------- |
| ${=}\mathllap{/\,}$ `{=}\mathllap{/\,}` | $\left(x^{\smash{2}}\right)$ `\left(x^{\smash{2}}\right)` |
| $\mathrlap{\,/}{=}$ `\mathrlap{\,/}{=}` | $\sqrt{\smash[b]{y}}$ `\sqrt{\smash[b]{y}}` |

$\sum\limits_{\mathclap{1\le i\le j\le n}} x_{ij}$ `\sum_{\mathclap{1\le i\le j\le n}} x_{ij}`

$\KaTeX$同样支持`\llap`$^{[10]}$，`\rlap`和`\clap`，但是它们仅能在文本模式中使用，而不是数学模式。

$[10]:$ 这里解释一下这个命令的用处：当我们使用巨运算符时，它的上标/下标可能过长，比如$\sum\limits_{1\le i\le j \le k \le n}i\times j \times k$，这样`i*j*k`离运算符较远。但是当我们用了这些指令，就可以自动缩小这个距离。

$$
\sum\limits_{\mathclap{1\le i\le j \le k \le n}}i\times j \times k
$$

### 间隔

| 指令 | 备注 | 指令 | 备注 |
| :----------- | :----------- | :----------- | :----------- |
| `\,` | $\frac{3}{18} \rm em ^{[11]}$ 的间距 | `\kern{distance}` | 宽度为`distance`的间距 |
| `\thinspace` | $\frac{3}{18} \rm em$  的间距 | `\mkern{distance}` |  宽度为`distance`的间距 |
| `\>` | $\frac{4}{18} \rm em$  的间距 | `\mskip{distance}` |  宽度为`distance`的间距 |
| `\:` | $\frac{4}{18} \rm em$  的间距 | `\hskip{distance}` |  宽度为`distance`的间距 |
| `\medspace` | $\frac{4}{18} \rm em$  的间距 | `\hspace{distance}` |  宽度为`distance`的间距 |
| `\;` | $\frac{5}{18} \rm em$  间距 | `\hspace*{distance}` |  宽度为`distance`的间距 |
| `\thickspace` | $\frac{5}{18} \rm em$  间距 | `\phantom{content}` |  长与高等于参数的间距 |
| `\enspace` | $\frac{1}{2} \rm em$  间距 | `\hphantom{content}` |  高度等于参数的间距 |
| `\quad` | $1 \rm em$  间距 | `\vphantom{content}` | 高度等于参数的间距 |
| `\qquad` | $2 \rm em$  间距 | `\!` | – $\frac{3}{18} \rm em$  间距 |
| `~` | 不换行间距 | `\negthinspace` | – $\frac{3}{18} \rm em$  间距 |
| `\<space>` |  间距 | `\negmedspace` | – $\frac{4}{18} \rm em$  间距 |
| `\nobreakspace` | 不换行间距 | `\negthickspace` | – $\frac{5}{18} \rm em$  间距 |
| `\space` | 普通的空格 |

$[11]:$ 有关单位，请参考下方的“单位”一段。

### 提示

`distance`参数可以接受任何$\KaTeX$的单位。

`\kern`，`\mkern`，`\mskip`和`\hspace`都可以直接加上距离参数，例如，`\kern1em`可以生成一个宽度为$\rm 1em$的空格。

`\mkern`和`\mskip`在文本模式下不起作用，并且两者都将为`mu`以外的任何单位显示警告。

## 逻辑与集合符号

| 第一列 | 第二列 | 第三列 | 第四列 |
| :----------- | :----------- | :----------- | :----------- |
$\forall$ `\forall` | $\complement$ `\complement` | $\therefore$ `\therefore` | $\emptyset$ `\emptyset` |
$\exists$ `\exists` | $\subset$ `\subset` | $\because$ `\because` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\empty` |
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\exist` | $\supset$ `\supset` | $\mapsto$ `\mapsto` | $\varnothing$ `\varnothing` |
$\nexists$ `\nexists` | $\mid$ `\mid` | $\to$ `\to` | $\implies$ `\implies` |
$\in$ `\in` | $\land$ `\land` | $\gets$ `\gets` | $\impliedby$ `\impliedby` |
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\isin` | $\lor$ `\lor` | $\leftrightarrow$ `\leftrightarrow` | $\iff$ `\iff` |
$\notin$ `\notin` | $\ni$ `\ni` | $\notni$ `\notni` | $\neg$ `\neg` 或者 `\lnot` |

你也可以直接输入这些：$∀∴∁∵∃∣∈∋⊂⊃∧∨↦→←↔¬ ℂ ℍ ℕ ℙ ℚ ℝ$

## 宏定义$\colorbox{red}{\color{white}\text{暂不支持}}$

| 显示效果 | 代码 |
| :----------- | :----------- |
| $x^2+y^2$  | `\def\foo{x^2} \foo + \foo` |
| $y^2+y^2$  | `\gdef\bar#1{#1^2} \bar{y} + \bar{y}` |
| | `\global\def\macroname#1#2…{definition}` |
| | `\newcommand\macroname[numargs]{definition}` |
| | `\renewcommand\macroname[numargs]{definition}` |
| | `\providecommand\macroname[numargs]{definition}` |

你同样可以在$\KaTeX$的渲染选项中定义宏。$^{[12]}$

宏最多接受九个参数：`#1`，`#2`等。

\ gdef和\ global \ def宏将在数学表达式之间保留。

这些都是合法的指令名称：

`\char` `\mathchoice` `\TextOrMath` `\@ifstar` `\@ifnextchar` `\@firstoftwo` `\@secondoftwo` `\relax`

@是命令的有效字符，就像你使用了`\makeatletter`指令。$^{[13]}$

$[12]:$ 宏定义类似于$\rm C++$中的`\define`，可以简化代码，也可以嵌套。

$[13]:$ 解释一下`\makeatletter`指令：因为部分原因，我们在$\TeX$中无法使用`@`作为指令名称，除非使用这个指令。而$\KaTeX$中的`@`则不需要，所以说“就像你使用了`\makeatletter`指令”。

## 运算符

### 巨型运算符$^{[14]}$

| 第一列 | 第二列 | 第三列 | 第四列 |
| :----------- | :----------- | :----------- | :----------- |
$\sum$ `\sum` | $\prod$ `\prod` | $\bigotimes$ `\bigotimes` | $\bigvee$ `\bigvee` |
$\int$ `\int` | $\coprod$ `\coprod` | $\bigoplus$ `\bigoplus` | $\bigwedge$ `\bigwedge` |
$\iint$ `\iint` | $\intop$ `\intop` | $\bigodot$ `\bigodot` | $\bigcap$ `\bigcap` |
$\iiint$ `\iiint` | $\smallint$ `\smallint` | $\biguplus$ `\biguplus` | $\bigcup$ `\bigcup` |
$\oint$ `\oint` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\oiint` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\oiiint` | $\bigsqcup$ `\bigsqcup` |

当然，你也可以直接输入这些： $∫∬∭∮∏∐∑⋀⋁⋂⋃⨀⨁⨂⨄⨆$

$[14]:$ 这里的巨型运算符在居中情况下自动变大，都支持上下标摆放在上下两侧。

### 二元运算符

| 第一列 | 第二列 | 第三列 | 第四列 |
| :----------- | :----------- | :----------- | :----------- |
$+$ `+` | $\cdot$ `\cdot` | $\gtrdot$ `\gtrdot` | $x \pmod a$ `x \pmod a` |
$-$ `-` | $\cdotp$ `\cdotp` | $\intercal$ `\intercal` | $x \pod a$ `x \pod a` |
$/$ `/` | $\centerdot$ `\centerdot` | $\land$ `\land` | $\rhd$ `\rhd` |
$*$ `*` | $\circ$ `\circ` | $\leftthreetimes$ `\leftthreetimes` | $\rightthreetimes$ `\rightthreetimes` |
$\amalg$ `\amalg` | $\circledast$ `\circledast` | $\ldotp$ `\ldotp` | $\rtimes$ `\rtimes` |
$\And$ `\And` | $\circledcirc$ `\circledcirc` | $\lor$ `\lor` | $\setminus$ `\setminus` |
$\ast$ `\ast` | $\circleddash$ `\circleddash` | $\lessdot$ `\lessdot` | $\smallsetminus$ `\smallsetminus` |
$\barwedge$ `\barwedge` | $\Cup$ `\Cup` | $\lhd$ `\lhd` | $\sqcap$ `\sqcap` |
$\bigcirc$ `\bigcirc` | $\cup$ `\cup` | $\ltimes$ `\ltimes` | $\sqcup$ `\sqcup` |
$\bmod$ `\bmod` | $\curlyvee$ `\curlyvee` | $x \mod a$ `x\mod a` | $\times$ `\times` |
$\boxdot$ `\boxdot` | $\curlywedge$ `\curlywedge` | $\mp$ `\mp` | $\unlhd$ `\unlhd` |
$\boxminus$ `\boxminus` | $\div$ `\div` | $\odot$ `\odot` | $\unrhd$ `\unrhd` |
$\boxplus$ `\boxplus` | $\divideontimes$ `\divideontimes` | $\ominus$ `\ominus` | $\uplus$ `\uplus` |
$\boxtimes$ `\boxtimes` | $\dotplus$ `\dotplus` | $\oplus$ `\oplus `| $\vee$ `\vee` |
$\bullet$ `\bullet` | $\doublebarwedge$ `\doublebarwedge` | $\otimes$ `\otimes` | $\veebar$ `\veebar` |
$\Cap$ `\Cap` | $\doublecap$ `\doublecap` | $\oslash$ `\oslash` | $\wedge$ `\wedge` |
$\cap$ `\cap` | $\doublecup$ `\doublecup` | $\pm$ `\pm` 或者`\plusmn` | $\wr$ `\wr` |

当然，你也可以直接输入这些：$+−/∗⋅±×÷∓∔∧∨∩∪≀⊎⊓⊔⊕⊖⊗⊘⊙⊚⊛⊝$

### 分数和二项式

| 第一列 | 第二列 | 第三列 |
| :----------- | :----------- | :----------- |
| $\frac{a}{b}$ `\frac{a}{b}` | $\tfrac{a}{b}$ `\tfrac{a}{b}`$^{[15]}$ | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\genfrac (]{2pt}{1}a{a+1}` |
| ${a \over b}$ `{a \over b}` | $\dfrac{a}{b}$ `\dfrac{a}{b}` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `{a \above{2pt} b+1}` |
| $\colorbox{red}{\color{white}\text{暂不支持}}$ `\cfrac{a}{1 +\cfrac{1}{b}}` | | |
| $\binom{n}{k}$ `\binom{n}{k}` | $\dbinom{n}{k}$ `\dbinom{n}{k}` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `{n\brace k}` |
| ${n \choose k}$ `{n \choose k}` | $\tbinom{n}{k}$ `\tbinom{n}{k}` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `{n\brack k}` |

$[15]:$ 在洛谷讨论区的$\KaTeX$版本中，有个$\rm Bug$：嵌套使用`\tfrac{}{}`会导致字体膨胀。

### 数学运算符

| 第一列 | 第二列 | 第三列 | 第四列 |
| :----------- | :----------- | :----------- | :----------- |
| $\arcsin$ `\arcsin` | $\cotg$ `\cotg` | $\ln$ `\ln` | $\det$ `\det`
| $\arccos$ `\arccos` | $\coth$ `\coth` | $\log$ `\log` | $\gcd$ `\gcd`
| $\arctan$ `\arctan` | $\csc$ `\csc` | $\sec$ `\sec` | $\inf$ `\inf`
| $\arctg$ `\arctg` | $\ctg$ `\ctg` | $\sin$ `\sin` | $\lim$ `\lim`
| $\arcctg$ `\arcctg` | $\cth$ `\cth` | $\sinh$ `\sinh` | $\liminf$ `\liminf`
| $\arg$ `\arg` | $\deg$ `\deg` | $\sh$ `\sh` | $\limsup$ `\limsup`
| $\ch$ `\ch` | $\dim$ `\dim` | $\tan$ `\tan` | $\max$ `\max`
| $\cos$ `\cos` | $\exp$ `\exp` | $\tanh$ `\tanh` | $\min$ `\min`
| $\cosec$ `\cosec` | $\hom$ `\hom` | $\tg$ `\tg` | $\Pr$ `\Pr`
| $\cosh$ `\cosh` | $\ker$ `\ker` | $\th$ `\th` | $\sup$ `\sup`
| $\cot$ `\cot` | $\lg$ `\lg` | $\argmax$ `\argmax` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\argmin`
| $\colorbox{red}{\color{white}\text{暂不支持}}$ `\plim` | $\operatorname{f}$ `\operatorname{f}` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\operatorname*{f}`

参数显示在右侧的公式，如$\sum_{i=1}^{n}$可以使用`\limits`强行显示在上下侧，$\sum\limits_{i=1}^{n}$，`\sum\limits_{i=1}^{n}`

### 开根

$\sqrt{x}$ `\sqrt{x}`

$\sqrt[3]{x}$ `\sqrt[3]{x}`

### 关系指令

$\stackrel{!}{=}$ `\stackrel{!}{=}`

| 第一列 | 第二列 | 第三列 | 第四列 |
| :----------- | :----------- | :----------- | :----------- |
$=$ `=` | $\eqcirc$ `\eqcirc` | $\lesseqgtr$ `\lesseqgtr` | $\sqsupset$ `\sqsupset`
$<$ `<` | $\eqcolon$ `\eqcolon` | $\lesseqqgtr$ `\lesseqqgtr` | $\sqsupseteq$ `\sqsupseteq`
$>$ `>` | $\Eqcolon$ `\Eqcolon` | $\lessgtr$ `\lessgtr` | $\Subset$ `\Subset`
$:$ `:` | $\eqqcolon$ `\eqqcolon` | $\lesssim$ `\lesssim` | $\subset$ `\subset` 或者 `\sub`
$\approx$ `\approx` | $\Eqqcolon$ `\Eqqcolon` | $\ll$ `\ll` | $\subseteq$ `\subseteq` 或者 `\sube`
$\approxeq$ `\approxeq` | $\eqsim$ `\eqsim` | $\lll$ `\lll` | $\subseteqq$ `\subseteqq`
$\asymp$ `\asymp` | $\eqslantgtr$ `\eqslantgtr` | $\llless$ `\llless` | $\succ$ `\succ`
$\backepsilon$ `\backepsilon` | $\eqslantless$ `\eqslantless` | $\lt$ `\lt` | $\succapprox$ `\succapprox`
$\backsim$ `\backsim` | $\equiv$ `\equiv` | $\mid$ `\mid` | $\succcurlyeq$ `\succcurlyeq`
$\backsimeq$ `\backsimeq` | $\fallingdotseq$ `\fallingdotseq` | $\models$ `\models` | $\succeq$ `\succeq`
$\between$ `\between` | $\frown$ `\frown` | $\multimap$ `\multimap` | $\succsim$ `\succsim`
$\bowtie$ `\bowtie` | $\ge$ `\ge` | $\owns$ `\owns` | $\Supset$ `\Supset`
$\bumpeq$ `\bumpeq` | $\geq$ `\geq` | $\parallel$ `\parallel` | $\supset$ `\supset`
$\Bumpeq$ `\Bumpeq` | $\geqq$ `\geqq` | $\perp$ `\perp` | $\supseteq$ `\supseteq` 或者 `\supe`
$\circeq$ `\circeq` | $\geqslant$ `\geqslant` | $\pitchfork⋔$ `\pitchfork` | $\supseteqq$ `\supseteqq`
$\colonapprox$ `\colonapprox` | $\gg$ `\gg` | $\prec$ `\prec` | $\thickapprox$ `\thickapprox`
$\Colonapprox$ `\Colonapprox` | $\ggg$ `\ggg` | $\precapprox$ `\precapprox` | $\thicksim$ `\thicksim`
$\coloneq$ `\coloneq` | $\gggtr$ `\gggtr` | $\preccurlyeq$ `\preccurlyeq` | $\trianglelefteq$ `\trianglelefteq`
$\Coloneq$ `\Coloneq` | $\gt$ `\gt` | $\preceq$ `\preceq` | $\triangleq$ `\triangleq`
$\coloneqq$ `\coloneqq` | $\gtrapprox$ `\gtrapprox` | $\precsim$ `\precsim` | $\trianglerighteq$ `\trianglerighteq`
$\Coloneqq$ `\Coloneqq` | $\gtreqless$ `\gtreqless` | $\propto$ `\propto` | $\varpropto$ `\varpropto`
$\colonsim$ `\colonsim` | $\gtreqqless$ `\gtreqqless` | $\risingdotseq$ `\risingdotseq` | $\vartriangle$ `\vartriangle`
$\Colonsim$ `\Colonsim` | $\gtrless$ `\gtrless` | $\shortmid$ `\shortmid` | $\vartriangleleft$ `\vartriangleleft`
$\cong$ `\cong` | $\gtrsim$ `\gtrsim` | $\shortparallel$ `\shortparallel` | $\vartriangleright$ `\vartriangleright`
$\curlyeqprec$ `\curlyeqprec` | $\in$ `\in` 或者 `\isin` | $\sim$ `\sim` | $\vcentcolon$ `\vcentcolon`
$\curlyeqsucc$ `\curlyeqsucc` | $\Join$ `\Join` | $\simeq$ `\simeq` | $\vdash$ `\vdash`
$\dashv$ `\dashv` | $\le$ `\le` | $\smallfrown$ `\smallfrown` | $\vDash$ `\vDash`
$\dblcolon$ `\dblcolon` | $\leq$ `\leq` | $\smallsmile$ `\smallsmile` | $\Vdash$ `\Vdash`
$\doteq$ `\doteq` | $\leqq$ `\leqq` | $\smile$ `\smile` | $\Vvdash$ `\Vvdash`
$\Doteq$ `\Doteq` | $\leqslant$ `\leqslant` | $\sqsubset$ `\sqsubset`
$\doteqdot$ `\doteqdot` | $\lessapprox$ `\lessapprox` | $\sqsubseteq$ `\sqsubseteq`

当然，你也可以直接输入这些：

$ ∉ ∌ ∤ ∦ ≁ ≆ ≠ ≨ ≩ ≮ ≯ ≰ ≱ ⊀ ⊁ ⊈ ⊉ ⊊ ⊋ ⊬ ⊭ ⊮ ⊯ ⋠ ⋡ ⋦ ⋧ ⋨ ⋩ ⋬ ⋭ ⪇ ⪈ ⪉ ⪊ ⪵ ⪶ ⪹ ⪺ ⫋ ⫌∈$

### 箭头

| 第一列 | 第二列 | 第三列 |
| :----------- | :----------- | :----------- |
$\circlearrowleft$ `\circlearrowleft` | $\leftharpoonup$ `\leftharpoonup` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\rArr`
$\circlearrowright$ `\circlearrowright` | $\leftleftarrows$ `\leftleftarrows` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\rarr`
$\curvearrowleft$ `\curvearrowleft` | $\leftrightarrow$ `\leftrightarrow` | $\restriction$ `\restriction`
$\curvearrowright$ `\curvearrowright` | $\Leftrightarrow$ `\Leftrightarrow` | $\rightarrow$ `\rightarrow`
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\Darr` | $\leftrightarrows$ `\leftrightarrows` | $\Rightarrow$ `\Rightarrow`
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\dArr` | $\leftrightharpoons$ `\leftrightharpoons` | $\rightarrowtail$ `\rightarrowtail`
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\darr` | $\leftrightsquigarrow$ `\leftrightsquigarrow` | $\rightharpoondown$ `\rightharpoondown`
$\dashleftarrow$ `\dashleftarrow` | $\Lleftarrow$ `\Lleftarrow` | $\rightharpoonup$ `\rightharpoonup`
$\dashrightarrow$ `\dashrightarrow` | $\longleftarrow$ `\longleftarrow` | $\rightleftarrows$ `\rightleftarrows`
$\downarrow$ `\downarrow` | $\Longleftarrow$ `\Longleftarrow` | $\rightleftharpoons$ `\rightleftharpoons`
$\Downarrow$ `\Downarrow` | $\longleftrightarrow$ `\longleftrightarrow` | $\rightrightarrows$ `\rightrightarrows`
$\downdownarrows$ `\downdownarrows` | $\Longleftrightarrow$ `\Longleftrightarrow` | $\rightsquigarrow$ `\rightsquigarrow`
$\downharpoonleft$ `\downharpoonleft` | $\longmapsto$ `\longmapsto` | $\Rrightarrow$ `\Rrightarrow`
$\downharpoonright$ `\downharpoonright` | $\longrightarrow$ `\longrightarrow` | $\Rsh$ `\Rsh`
$\gets$ `\gets` | $\Longrightarrow$ `\Longrightarrow` | $\searrow$ `\searrow`
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\Harr` | $\looparrowleft$ `\looparrowleft` | $\swarrow$ `\swarrow`
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\hArr` | $\looparrowright$ `\looparrowright` | $\to$ `\to`
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\harr` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\Lrarr` | $\twoheadleftarrow$ `\twoheadleftarrow`
$\hookleftarrow$ `\hookleftarrow` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\lrArr` | $\twoheadrightarrow$ `\twoheadrightarrow`
$\hookrightarrow$ `\hookrightarrow` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\lrarr` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\Uarr`
$\iff$ `\iff` | $\Lsh$ `\Lsh` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\uArr`
$\impliedby$ `\impliedby` | $\mapsto$ `\mapsto` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\uarr`
$\implies$ `\implies` | $\nearrow$ `\nearrow` | $\uparrow$ `\uparrow`
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\Larr` | $\nleftarrow$ `\nleftarrow` | $\Uparrow$ `\Uparrow`
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\lArr` | $\nLeftarrow$ `\nLeftarrow` | $\updownarrow$ `\updownarrow`
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\larr` | $\nleftrightarrow$ `\nleftrightarrow` | $\Updownarrow$ `\Updownarrow`
$\leadsto$ `\leadsto` | $\nLeftrightarrow$ `\nLeftrightarrow` | $\upharpoonleft$ `\upharpoonleft`
$\leftarrow$ `\leftarrow` | $\nrightarrow$ `\nrightarrow` | $\upharpoonright$ `\upharpoonright`
$\Leftarrow$ `\Leftarrow` | $\nRightarrow$ `\nRightarrow` | $\upuparrows$ `\upuparrows`
$\leftarrowtail$ `\leftarrowtail` | $\nwarrow$ `\nwarrow`
$\leftharpoondown$ `\leftharpoondown` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\Rarr` 

你也可以直接输入这些：$ ← ↑ → ↓ ↔ ↕ ↖ ↗ ↘ ↙ ↚ ↛ ↞ ↠ ↢ ↣ ↦ ↩ ↪ ↫ ↬ ↭ ↮ ↰ ↱↶ ↷ ↺ ↻ ↼ ↽ ↾ ↾ ↿ ⇀ ⇁ ⇂ ⇃ ⇄ ⇆ ⇇ ⇈ ⇉ ⇊ ⇋ ⇌⇍ ⇎ ⇏ ⇐ ⇑ ⇒ ⇓ ⇔ ⇕ ⇚ ⇛ ⇝ ⇠ ⇢ $

### 箭头扩展$^{[16]}$

| 第一列 | 第二列 |
| :----------- | :----------- |
$\xleftarrow{abc}$ `\xleftarrow{abc}` | $\xrightarrow[under]{over}$ `\xrightarrow[under]{over}`
$\xLeftarrow{abc}$ `\xLeftarrow{abc}` | $\xRightarrow{abc}$ `\xRightarrow{abc}`
$\xleftrightarrow{abc}$ `\xleftrightarrow{abc}` | $\xLeftrightarrow{abc}$ `\xLeftrightarrow{abc}`
$\xhookleftarrow{abc}$ `\xhookleftarrow{abc}` | $\xhookrightarrow{abc}$ `\xhookrightarrow{abc}`
$\xtwoheadleftarrow{abc}$ `\xtwoheadleftarrow{abc}` | $\xtwoheadrightarrow{abc}$ `\xtwoheadrightarrow{abc}`
$\xleftharpoonup{abc}$ `\xleftharpoonup{abc}` | $\xrightharpoonup{abc}$ `\xrightharpoonup{abc}`
$\xleftharpoondown{abc}$ `\xleftharpoondown{abc}` | $\xrightharpoondown{abc}$ `\xrightharpoondown{abc}`
$\xleftrightharpoons{abc}$ `\xleftrightharpoons{abc}` | $\xrightleftharpoons{abc}$ `\xrightleftharpoons{abc}`
$\xtofrom{abc}$ `\xtofrom{abc}` | $\xmapsto{abc}$ `\xmapsto{abc}`
$\xlongequal{abc}$ `\xlongequal{abc}`

可扩展的箭头都可以用相同的方式接受可选参数，比如说，`\xrightarrow[under]{over}`显示出来就是$\xrightarrow[under]{over}$。

$[16]:$ 这里扩展箭头指箭头上下方可以放置文字，且箭头长度随文字长度的增加而增加。

## 样式，颜色，大小和字体

### 类的分配$^{[17]}$

`\mathbin` `\mathclose` `\mathinner` `\mathop`

`\mathopen` `\mathord` `\mathpunct` `\mathrel`

### 颜色

$\color{blue} F=ma$ `\color{blue} F=ma`

请注意，$\KaTeX$ 中的`\color`的作用类似于开关，使用后一定范围内所有的字体都会改变颜色。这与$\LaTeX$一致，但是与$\rm MathJax$不同。而$\KaTeX$得其他颜色指令中，它的颜色和内容都是参数；

$\textcolor{blue}{F=ma}$`\textcolor{#228B22}{F=ma}`

$\colorbox{aqua}{A}$`\colorbox{aqua}{A}`$^{[18]}$

$\fcolorbox{red}{aqua}{A}$ `\fcolorbox{red}{aqua}{A}`

对于颜色的名称，$\KaTeX$颜色函数将接受标准的[$\rm HTML$预定义颜色名称](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Color_keywords)。他们还将接受$\rm CSS$十六进制样式的$\rm RGB$参数，比如`#ff0000`表示红色，而其中的`#`是可选的。（不过洛谷讨论区版本较旧，因此在那里必须加`#`）。

$[18]:$ `\colorbox`和`\fcolorbox` 里面不能嵌套环境，但是`\box`能。

### 字体

| 第一列 | 第二列 | 第三列 |
| :----------- | :----------- | :----------- |
$\mathrm{Ab0}$ `\mathrm{Ab0}` | $\mathbf{Ab0}$ `\mathbf{Ab0}` | $\mathit{Ab0}$ `\mathit{Ab0}`
$\colorbox{red}{\color{white}\text{暂不支持}}$ `\mathnormal{Ab0}` | $\textbf{Ab0}$ `\textbf{Ab0}` | $\textit{Ab0}$ `\textit{Ab0}`
$\textrm{Ab0}$ `\textrm{Ab0}` | $\bf{Ab0}$ `\bf{Ab0}` | $\it{Ab0}$ `\it Ab0`
$\rm{Ab0}$ `\rm{Ab0}` | $\bold{Ab0}$ `\bold{Ab0}` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\textup{Ab0}`
$\textnormal{Ab0}$ `\textnormal{Ab0}` | $\boldsymbol{Ab0}$ `\boldsymbol{Ab}` | $\Bbb{AB}$ `\Bbb{AB}`
$\text{Ab0}$ `\text{Ab0}` | $\bm{Ab0}$ `\bm{Ab0}` | $\mathbb{AB}$ `\mathbb{AB}`
$\mathsf{Ab0}$ `\mathsf{Ab0}` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\textmd{Ab0}` | $\frak{Ab0}$ `\frak{Ab0}`
$\textsf{Ab0}$ `\textsf{Ab0}` | $\mathtt{Ab0}$ `\mathtt{Ab0}` | $\mathfrak{Ab0}$ `\mathfrak{Ab0}`
$\sf{Ab0}$ `\sf Ab0` | $\texttt{Ab0}$ `\texttt{Ab0}` | $\mathcal{AB0}$ `\mathcal{AB0}`
$\tt{Ab0}$ `\tt Ab0` | $\mathscr{AB}$ `\mathscr{AB}`

通过使用`\textXX`类型的字体指令，可以堆叠字体样式、粗细和形状。 因此`\textsf{\textbf{H}}`将渲染出$\textsf{\textbf{H}}$。其他字体指令不会堆叠，例如`\mathsf{\mathbf{H}}`将渲染出$\mathsf{\mathbf {H}}$。

如果KaTeX字体没有粗体字形，你可以使用`\pmb`指令可以模拟一个。然而，$\colorbox{red}{\color{white}\text{暂不支持}}$

### 大小

| 第一列 | 第二列 |
| :----------- | :----------- |
|$\Huge AB$ `\Huge AB` | $\normalsize AB$ `\normalsize AB`|
|$\huge AB$ `\huge AB` | $\small AB$ `\small AB`|
|$\LARGE AB$ `\LARGE AB` | $\footnotesize AB$ `\footnotesize AB`|
|$\Large AB$ `\Large AB` | $\scriptsize AB$ `\scriptsize AB`|
|$\large AB$ `\large AB` | $\tiny AB$ `\tiny AB`|

### 样式

| 显示效果 | 代码 |
| :----------- | :----------- |
|$\displaystyle\sum_{i=1}^n$ | `\displaystyle\sum_{i=1}^n`|
|$\textstyle\sum_{i=1}^n$ | `\textstyle\sum_{i=1}^n`|
|$\scriptstyle x$ | `\scriptstyle x  (The size of a first sub/superscript)`|
|$\scriptscriptstyle x$ | `\scriptscriptstyle x (The size of subsequent sub/superscripts)`|
|$\lim\limits_x$ | `\lim\limits_x`|
|$\lim\nolimits_x$ | `\lim\nolimits_x`|
|$\verb!x^2!$ | `\verb!x^2!`$^{[19]}$|

在居中的环境下（即在`$$ $$`当中），在`\text{}`里面可以放置`$...$`用来显示数学模
$$

$[19]:$ `\verb`以两个感叹号作为括号，里面可以填充任意文字。使用等宽字体（打字机字体）。

## 符号和标点

| 第一列 | 第二列 | 第三列 |
| :----------- | :----------- | :----------- |
|$\colorbox{red}{\color{white}\text{暂不支持}}$ `% 注释` | $\dots$ `\dots` | $\KaTeX$ `\KaTeX` |
|$\%$ `\%` | $\cdots$ `\cdots` | $\LaTeX$ `\LaTeX` |
|$\#$ `\#` | $\ddots$ `\ddots` | $\TeX$ `\TeX` |
|$\&$ `\&` | $\ldots$ `\ldots` | $\nabla$ `\nabla` |
|$\__$ `\_` | $\vdots$ `\vdots` | $\infty$ `\infty` |
|$\text{\textunderscore}$ `\text{\textunderscore}` | $\dotsb$ `\dotsb` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\infin` |
|$\text{--}$ `\text{--}` | $\dotsc$ `\dotsc` | $\checkmark$ `\checkmark` |
|$\text{\textendash}$ `\text{\textendash}` | $\dotsi$ `\dotsi` | $\dag$ `\dag` |
|$\text{---}$ `\text{---}` | $\dotsm$ `\dotsm` | $\dagger$ `\dagger` |
|$\text{\textemdash}$ `\text{\textemdash}` | $\dotso$ `\dotso` | $\text{\textdagger}$ `\text{\textdagger}` |
|$\colorbox{red}{\color{white}\text{暂不支持}}$`\text{\textasciitilde}` | $\sdot⋅$ `\sdot` | $\ddag$ `\ddag` |
|$\colorbox{red}{\color{white}\text{暂不支持}}$ `\text{\textasciicircum}` | $\mathellipsis$ `\mathellipsis` | $\ddagger$ `\ddagger` |
| $^{[20]}$ | $\text{\textellipsis}$ `\text{\textellipsis}` | $\text{\textdaggerdbl}$ `\text{\textdaggerdbl}` |
|$\text{\textquoteleft}$  `text{\textquoteleft}` | $\Box$ `\Box` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\Dagger` |
|$\lq$ `\lq` | $\square$ `\square` | $\angle$ `\angle` |
|$\text{\textquoteright}$ `\text{\textquoteright}` | $\blacksquare$ `\blacksquare` | $\measuredangle$ `\measuredangle` |
|$\rq$ `\rq` | $\triangle$ `\triangle` | $\sphericalangle$ `\sphericalangle` |
|$\text{\textquotedblleft}$ `\text{\textquotedblleft}` | $\triangledown$ `\triangledown` | $\top$ `\top` |
|$"$ `"` | $\triangleleft$ `\triangleleft` | $\bot$ `\bot` |
|$\text{\textquotedblright}$ `\text{\textquotedblright}` | $\triangleright$ `\triangleright` |  |
|$\colon$ `\colon` | $\bigtriangledown$ `\bigtriangledown` | $\text{\textdollar}$ `\text{\textdollar}` |
|$\backprime$ `\backprime` | $\bigtriangleup$ `\bigtriangleup` | $\pounds$ `\pounds` |
|$\prime$ `\prime` | $\blacktriangle$ `\blacktriangle` | $\mathsterling$ `\mathsterling` |
|$\text{\textless}$ `\text{\textless}` | $\blacktriangledown$ `\blacktriangledown` | $\text{\textsterling}$ `\text{\textsterling}` |
|$\text{\textgreater}$ `\text{\textgreater}` | $\blacktriangleleft$ `\blacktriangleleft` | $\yen$ `\yen` |
|$\text{\textbar}$ `\text{\textbar}` | $\blacktriangleright$ `\blacktriangleright` | $\surd$ `\surd` |
|$\text{\textbardbl}$ `\text{\textbardbl}` | $\diamond$ `\diamond` | $\degree$ `\degree` |
|$\text{\textbraceleft}$ `\text{\textbraceleft}` | $\Diamond$ `\Diamond` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\text{\textdegree}` |
|$\text{\textbraceright}$ `\text{\textbraceright}` | $\lozenge$ `\lozenge` | $\mho$ `\mho` |
|$\colorbox{red}{\color{white}\text{暂不支持}}$ `\text{\textbackslash}` | $\blacklozenge$ `\blacklozenge` | $\diagdown$ `\diagdown` |
|$\text{\P}$ `\text{\P}` | $\star$ `\star` | $\diagup$ `\diagup` |
|$\text{\S}$ `\text{\S}` | $\bigstar$ `\bigstar` | $\flat$ `\flat` |
|$\colorbox{red}{\color{white}\text{暂不支持}}$ `\text{\sect}` | $\clubsuit$ `\clubsuit` | $\natural$ `\natural` |
|$\colorbox{red}{\color{white}\text{暂不支持}}$ `\copyright` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\clubs` | $\sharp$ `\sharp` |
|$\circledR$ `\circledR` | $\diamondsuit$ `\diamondsuit` | $\heartsuit$ `\heartsuit` |
|$\colorbox{red}{\color{white}\text{暂不支持}}$ `\text{\textregistered}` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\diamonds` | $\colorbox{red}{\color{white}\text{暂不支持}}$`\hearts` |
|$\circledS$ `\circledS` | $\spadesuit$ `\spadesuit` | $\colorbox{red}{\color{white}\text{暂不支持}}$ `\spades` |
|$\colorbox{red}{\color{white}\text{暂不支持}}$ `\text{\textcircled a}` | $\maltese$ `\maltese` |

你也可以直接输入这些：$£ ¥ ∇ ∞ · ∠ ∡ ∢ ♠ ♡ ♢ ♣ ♭ ♮ ♯ ✓ … ⋮ ⋯ ⋱ ! $

$[20]:$ 同样由于$\rm Markdown$制表问题，无法显示字符\`。这里的显示效果就是$\lq$,同`\lq`。

## 单位

在$\KaTeX$中，单位与在$\TeX$中一样按比例进行处理。

但是很多地方，$\KaTeX$单位不同于$\rm CSS$单位。

|$\text{\KaTeX 单位}$ | $\text{备注}$ | $\text{\KaTeX 单位}$ | $\text{备注}$|
| :----------- | :----------- | :----------- | :----------- |
|$\text{em}$ | $\text{CSS em}$ | $\text{bp}$ | $\rm 1/72 inch × F × G$|
|$\text{ex}$ | $\text{CSS ex}$ | $\text{pc}$ | $\text{12 \KaTeX pt}$|
|$\text{mu}$ | $\text{1/18 CSS em}$ | $\text{dd}$ | $\text{1238/1157 \KaTeX pt}$|
|$\text{pt}$ | $\rm {1/72.27 inch × F × G}$ | $\text{cc}$ | $\text{14856/1157 \KaTeX pt}$|
|$\text{mm}$ | $\rm {1 mm × F × G}$ | $\text{nd}$ | $\text{685/642 \KaTeX pt}$|
|$\text{cm}$ | $\rm {1 cm × F × G}$ | $\text{nc}$ | $\text{1370/107 \KaTeX pt}$|
|$\text{in}$ | $\rm {1 inch × F × G}$ | $\text{sp}$ | $\text{1/65536 \KaTeX pt}$|

其中，

- $F=$(围绕着$\rm HTML$文字的字体大小)/($\rm 10 pt$)

- $G$默认情况下为$1.21$，因为$\KaTeX$字体大小通常为$1.21\times$周围字体大小。$\rm HTML$网页的$\rm CSS$可以覆盖此值。

样式和大小的影响范围：

| 单位 | 文本模式 | $\rm script$大小$^{[21]}$ | $\rm huge$大小 |
| :----------- | :----------- | :----------- | :----------- |
|$\text{em 与 ex}$ | $\rule{1em}{1em}$ | $\scriptscriptstyle\rule{1em}{1em}$ | $\huge\rule{1em}{1em}$|
|$\text{mu}$ | $\rule{18mu}{18mu}$ | $\scriptscriptstyle\rule{18mu}{18mu}$ | $\huge\rule{18mu}{18mu}$|
|$\text{其他}$ | $\rule{10pt}{10pt}$ | $\scriptscriptstyle\rule{10pt}{10pt}$ | $\huge\rule{10pt}{10pt}$|

$[21]:$ 这里不确定如何翻译`scriptscript`和`huge`。

---

本文全部译自[$\KaTeX$官网](https://katex.org/docs/supported.html#math-operators)。

