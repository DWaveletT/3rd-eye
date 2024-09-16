---
create_time: 1657861727
update_time: 1657861727
title: 2022 年 7 月鲜花 1
board: 1
tag:
- 2
---

鲜花好啊。

---

最近审核题解，遇到了一个十分头大的问题：**为什么大家都是灵魂画师？**

……

不可否认的一点是，适当的图片解释有利于理解题目/做法，无论是理性上还是感性上。好的图片可以弥补语言描述上的缺陷，我是赞成题解中使用适量的图片辅助解释。

于是就有这样的图：

![](https://cdn.luogu.com.cn/upload/image_hosting/xovqpqtx.png)

(不是挂人，不是挂人，这图我仿照原版自己手画的)

毋庸置疑，这种程度的图确实没有缺乏任何信息，并且确实阐述了作者希望表达的内容。但同样不可否认的，这种 Windows 画图话说来的图，充斥着某种「劣质感」。

比如，我们稍微用 $\text{Ti\textit kZ}$ 画一个：

![](https://cdn.luogu.com.cn/upload/image_hosting/o1qgcrxu.png)

源代码：

```latex
\documentclass[border=10pt,tikz]{standalone}
\usepackage{tikz}
\usetikzlibrary{graphs,graphdrawing}
\usegdlibrary{trees}
\begin{document}
    \begin{tikzpicture}
        \graph[
            tree layout,
            sibling distance = 20mm,
            level distance = 15mm,
            nodes = {as = , draw, minimum size = .8cm, circle},
            red/.style = {fill = red}
        ]{
            1 -- {
                2[red] -- {3 -- 4[red]}, 
                5 -- {6},
                7 -- {8[red], 9};
            }
        };
        \draw[thick,color=blue] (8) -- (7) -- (1) -- (2) -- (3) -- (4);
    \end{tikzpicture}
\end{document}
```

当然，你也可以标数字、加粗什么的，也可以把红色换成别的颜色（或者打上阴影），来提高观感。不过我只是粗略地模仿，因此没有在这方面做过多的修饰。

这真的很难吗？不见得；但是我真的很少看到「不是用 Windows 画图作画」出来的作品。

---

接着再谈一谈，关于居中的事情。

众所周知，因为某些缘故，$\KaTeX$ 支持的指令 $\verb!\includegraphics!$ 并不能再你谷使用。这间接导致了你没有任何办法让图片达到真正的「居中」。如果你注意上面的图片，你会明显发现，它是**向左倾斜**的。在我看来，这是**不够美观的**。

当然，存在可以参考的解决办法。例如，你给图片左右加上一堆空白，让它达到「居中」的效果。比如仍然是上面那张图：

![](https://cdn.luogu.com.cn/upload/image_hosting/d5f8w4b9.png)

其实我就加了一句话：

```latex
\documentclass[border=10pt,tikz]{standalone}
\usepackage{tikz}
\usetikzlibrary{graphs,graphdrawing}
\usegdlibrary{trees}
\begin{document}
    \begin{tikzpicture}
        \clip (-7,-6) rectangle (7,1);
        \graph[
            tree layout,
            sibling distance = 20mm,
            level distance = 15mm,
            nodes = {as = , draw, minimum size = .8cm, circle},
            red/.style = {fill = red}
        ]{
            1 -- {
                2[red] -- {3 -- 4[red]}, 
                5 -- {6},
                7 -- {8[red], 9};
            }
        };
        \draw[thick,color=blue] (8) -- (7) -- (1) -- (2) -- (3) -- (4);
    \end{tikzpicture}
\end{document}
```

---

那么再谈谈今天鲜花的最后一个话题：

- 重量级选手 $\text{Ti\textit kZ}$ 以外的替代软件。

根据我目前已知的情报，我可以想出这样几种解决方案：

- 图形计算器 $\text{geogebra}$（当然你用 $\text{desmos}$ 也差不多）。它够精确，但是我认为自定义程度还不够高，写公式的能力也不及 $\LaTeX$。此外，你要导出图片也是困难的。
- $\text{csacademy}$ 的 $\text{graph editor}$。它确实是一个很方便的在线绘制图和树的工具。但是同样地，它不是很方便进行标号一类的工作；导出图片也不方便。
- $\text{OI painter}$。之前用过一段时间，感觉可能我的审美和编写者略有区别。它的自定义程度同样不够高，且不能进行矢量的精确的绘图，另外那个数组功能我不好说。
- 顺带一提，我之前用过 $\text{graphviz}$，感觉也一般般，不太好用。

至于更加专业的 $\text{CAD}$ 一类的软件，我不会用，这里按下不表。

总结：$\text{OIer}$ 画出较高高质量的图片是困难的。

---

$\text{upd}$：

根据 $\text{cz}$ 的意见，使用 $\text{PPT}$ 画图也是一个不错的选择（据小道消息称，深基的图就是用 $\text{PPT}$ 画出来的）。

