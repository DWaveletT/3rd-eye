---
create_time: 1694229526
update_time: 1694229526
title: 【笔记】群论 学习笔记
board: 1
tag:
- 2
---

## 基本定义

我们使用一个**非空**集合 $S$ 和一个**定义在 $S$ 上**二元运算 $\circ$ 描述一个只有一种运算规则的二元代数系统，记作 $(S,\circ)$。这个代数系统里，参与运算的元素都是 $S$ 的元素，且运算后的结果也都在 $S$ 里（**封闭性**）。形式化地，$\forall a\in S,b\in S$ 满足 $a\circ b\in S$。

比如，

- 全体整数集合 $\Bbb Z$ 和定义在整数上的加法运算 $+$ 构成了代数系统 $({\Bbb Z},+)$；
- 全体实数集合 $\Bbb R$ 和定义在实数上的乘法运算 $\times$ 构成了代数系统 $({\Bbb R},\times)$；
- 所有「元素是实数的集合」的集合 $\Bbb S_{\Bbb R}$ 和定义在集合上的交运算 $\cap$ 构成了代数系统 $(\Bbb S_{\Bbb R},\cap)$。

这两个例子里，$\Bbb Z$ 和 $\Bbb R$ 和 $\Bbb S_{\Bbb R}$ 都是无限集合。通常在 OI 里，我们研究的问题都在一个模质数的剩余系 $\Bbb F_p$ 上（比如，通常的答案对 $10^9+7$ 取模，就是在 $\Bbb F_{1000000007}$ 上进行运算）。$\Bbb F_p$ 上定义的模意义加法、模意义乘法，都分别可以和 $\Bbb F_p$ 构成二元代数系统。

---

更近一步地，**元素**和**运算**的概念可以脱离数值。比如，我们这样定义一系列函数（映射）：

- $\verb!add1!(x)=x+1$，也就是将 $x$ 映射到 $x+1$；
- $\verb!add2!(x)=x+2$，也就是将 $x$ 映射到 $x+2$；
- $\cdots$
- $\verb!addX!(x)=x+\mathtt X$，将 $x$ 映射到 $x+\mathtt X$ 上。

这些函数 $\{\mathtt{add1},\mathtt{add2},\cdots,\mathtt{addn},\cdots\}$ 就组成了一个函数集 $F$。

我们可以定义函数的合成运算 $\circ$ 如下：

- $(\mathtt{add}a\circ \mathtt{add}b)=\mathtt{add}(a+b)$。

那么 $(F,\circ)$ 就是一个代数系统。

---

在这个基础上，我们再来一个示例，

定义一系列作用于二阶方阵 $\begin{bmatrix}a & b\\ c & d\end{bmatrix}$ 上的旋转函数，

- $\mathtt{rotate0}$：啥也不干；
- $\mathtt{rotate1}$：将方阵旋转 $90\degree$；
- $\mathtt{rotate2}$：将方阵旋转 $180\degree$；
- $\mathtt{rotate3}$：将方阵旋转 $270\degree$；

同样地可以定义出这些函数的合成。不再展开。

---

需要注意的是，我们仅仅是给出了一个集合 $S$ 和一个定义在 $S$ 上的运算规则 $\circ$（本质是一个 $S\times S\to S$ 的映射），就构成了代数系统 $(S,\circ)$，所以这个代数系统并不一定满足一些常见的代数性质。比如，**结合律**、**交换律**、**幺元**、**逆元**等。

在代数系统的的基础上，我们加强限制条件，可以得到更多值得研究的系统。因为这篇文章主要是讲群论的，所以就介绍一些群的定义。

### 半群

考虑一个代数系统 $(G,\circ)$，如果它满足**结合律**，则称其为半群。即：

- 对于任意的 $a\in S,b\in S,c\in S$，满足 $(a\circ b)\circ c=a\circ (b\circ c)$。

很多运算规则都是满足结合律的，比如说，通常意义下的加法和乘法。另外一些运算规则，例如减法和除法，不满足结合律。所以 $({\Bbb Z},\times)$ 是一个半群，而 $({\Bbb R},-)$ 则不能被称为一个半群。

给出代数系统 $(S,\circ)$ 上的幺元的概念：

- **左幺元**：如果存在 $\varepsilon_{1}\in S$，使得任意 $a\in S$ 都有 $\varepsilon_{1}\circ a=a$，则称 $\varepsilon_{1}$ 为**左幺元**；
- **右幺元**：如果存在 $\varepsilon_{2}\in S$，使得任意 $a\in S$ 都有 $a\circ \varepsilon_{2}=a$，则称 $\varepsilon_{2}$ 为**右幺元**；
- **幺元**：如果存在 $\varepsilon\in S$，使得任意 $a\in S$ 都有 $a\circ \varepsilon=\varepsilon \circ a=a$，则称 $\varepsilon$ 为**幺元**。

如果代数系统 $(S,\circ)$ 上既存在左幺元 $\varepsilon_1$，又存在右幺元 $\varepsilon_2$，则可以证明，$\varepsilon_1=\varepsilon_2$。这是因为，

$$
\varepsilon_2\xlongequal{\text{左幺元性质}}\varepsilon_1\circ \varepsilon_2\xlongequal{\text{右幺元性质}}\varepsilon_1
$$

称 $\varepsilon =\varepsilon_1=\varepsilon_2$ 为 $S$ 上的幺元。它既满足左幺元的性质，又满足右幺元的性质。用相同的过程，可以证明如果幺元存在则**幺元唯一**。不再展开。

我们称，有幺元的半群 $(G,\circ,\varepsilon)$ 为**幺半群**。

### 群

给出存在单位元的代数系统 $(S,\circ,\varepsilon)$ 上的逆元的概念。

对于一个 $S$ 内的元素 $a$，作出如下定义：

- **左逆元**：如果存在 $b_{1}\in S$，使得 $b_{1} \circ a=\varepsilon$，则称 $b_{1}$ 为**左逆元**；
- **右逆元**：如果存在 $b_{2}\in S$，使得 $a \circ b_{2}=\varepsilon$，则称 $b_{2}$ 为**右逆元**；
- **逆元**：如果存在 $b\in S$，使得 $a\circ b=b \circ a=\varepsilon$，则称 $b$ 为**逆元**。

在**幺半群** $(G,\circ,\varepsilon)$ 的基础上，如果 $a$ 既有左逆元 $b_1$，又存在右逆元 $b_2$，则可以证明，$b_1=b_2$。这是因为，

$$
b_2\xlongequal{\text{幺元性质}}\varepsilon \circ b_2\xlongequal{\text{左逆元性质}}b_1\circ  a \circ b_2\xlongequal{\text{右逆元性质}}b_1\circ \varepsilon\xlongequal{\text{幺元性质}} b_1
$$

需要注意的是，这里面在向右推导时使用了结合律。这是半群所具有的性质，更一般的代数系统不一定满足结合律。

用类似办法可以证明在幺半群里，如果 $a$ 的逆元存在，则逆元唯一。可把这个唯一的逆元记作 $a^{-1}$。

如果一个幺半群，满足**所有元素都存在逆元**，则称该幺半群为群。

（到这里终于引出了群的概念了，近世代数真麻烦啊……）

小结一下群具有的性质：

- $S$ 非空；
- **封闭性**：$\forall a,b\in S,a\circ b\in S$；
- **结合律**：$\forall a,b,c\in S,(a\circ b)\circ c=a\circ (b\circ c)$；
- **幺元**：$\exists \varepsilon \in G,\forall a\in G,a\circ \varepsilon =\varepsilon \circ a=a$，且幺元唯一；
- **逆元**：$\forall a\in G,\exists b \in G,a\circ b =b \circ a=\varepsilon$，且逆元唯一。

下面要开始逐步给出证明 Burnside 引理及 Pólya 定理所需要的定义（又是定义……）

## 更多定义

下文描述的东西，都是建立在群 $(G,\circ,\varepsilon)$ 的基础上。尽管 $G$ 只是一个描述这个代数系统参与运算的元素的集合，但为了便于叙述，下文说**群** $G$ 的时候在不引起歧义的情况下就是指 $(G,\circ,\varepsilon)$。

### 子群

定义群 $(H,\circ,\varepsilon)$ 是 $(G,\circ,\varepsilon)$ 的一个子群，当且仅当 $(G,\circ,\varepsilon)$ 满足群的性质，且 $H\subseteq G$。

如果群 $(H,\circ,\varepsilon)$ 是 $(G,\circ,\varepsilon)$ 的一个子群，就记作 $H\le G$。

### 陪集

陪集不是群，而是一个集合。并且陪集的概念要搭配子群食用。若有 $H\le G$，我们选取 $G$ 当中的一个元素 $g\in G$，对陪集做如下定义：

- 称 $gH=\{x\mid x=g\circ h,h\in H\}$ 为 $H$ 的**一个**左陪集；
- 称 $Hg=\{x\mid x=h\circ g,h\in H\}$ 为 $H$ 的**一个**右陪集。

在陪集基础上，给出如下定理：

**定理** $1$：$|gH|=|H|$。  
**证明** $1$：假定存在 $g\circ h_1=g\circ h_2$，由于 $g$ 的逆元 $g^{-1}$ 存在，所以就有 $h_1=h_2$，所以对于任意 $h\in H$，$g\circ h$ 的值互不相同。于是 $|gH|=|H|$。
$$
\tag*{$\square$}
$$

**定理** $2$：$g\in gH$。  
**证明** $2$：由于 $\varepsilon \in H$，于是总有 $g=g\circ \varepsilon\in gH$。
$$
\tag*{$\square$}
$$

**定理** $3$：$gH=H\iff g\in H$，$Hg=H\iff g\in H$。  
**证明** $3$：  
- $\Leftarrow$：根据 $H$ 的封闭性，显然；
- $\Rightarrow$：根据定理 $2$ 立即得到。
$$
\tag*{$\square$}
$$

**定理** $4$：$aH=bH\iff a\circ b^{-1}\in H$；

