---
create_time: 1588775817
update_time: 1588775817
title: 题解 CF483B 【Friends and Presents】
board: 1
tag:
- 1
extension:
  problem:
    id: CF483B
    type: CF
    title: Friends and Presents
    difficulty: 5.3333
    submitted: false
    accepted: false
---

## 题目大意

求最小的 $V$，使得存在全集为$\{1,2,3,\cdots V\}$的集合$A,B$，使得 $|A|=cnt_1,|B|=cnt_2,kx\notin A,ky\notin B,A\cap B=\varnothing$。

## 题解

楼上给出了一个二分的方法，并且可以通过本题。但为了挑战自我，我们尝试用公式直接推导。

- 首先有个简单的结论：$\mathbf{\{1,2,\cdots,n\}}$**中**，$\mathbf x$** 的倍数有 **$\mathbf{\lfloor\frac{n}{x}\rfloor}$**个**。

具体证明很简单。显然，$1,2,\cdots n$ 中 $x$ 的倍数为 $x,2\times x,3\times x ,\cdots,\lfloor\frac{n}{x}\rfloor \times x$，共 $\lfloor\frac{n}{x}\rfloor$ 个。

然后基于这个结论，使用容斥原理进行推导。

我们不妨设所有不含因子 $x$ 的集合为 $X$，不含因子 $y$ 的集合为 $Y$。那么 $|X|=V-\lfloor\frac{V}{x}\rfloor,|Y|=V-\lfloor\frac{V}{y}\rfloor,|X\cup Y|=V-\lfloor\frac{V}{x}\rfloor-\lfloor\frac{V}{x}\rfloor+\lfloor\frac{V}{xy}\rfloor$。（最后一个式子可以这样理解：从 $V$ 个数中，剔除掉 $x$ 的倍数和 $y$ 的倍数，此时多剔除了一次 $xy$ 的倍数）。为了满足题目要求，我们需要满足三个条件：

$$
|X|\ge cnt_1,|Y|\ge cnt_2,|Y|-[cnt_1-(|X|-|X\cap Y|)]\ge cnt_2
$$

第三个条件是，贪心地将是 $y$ 的倍数的数尽量塞到 $X$ 里面，直到塞不下再使用 $(X\cap Y)$ 这些数字。这样子就能使得塞入 $Y$ 的数字尽可能地多。

- 一个关于下取整的结论：$x \ge\lfloor x\rfloor>x-1$。

将数据带入条件一，可以得到：

$$
\begin{aligned}V-\left\lfloor\frac{V}{x}\right\rfloor & \ge cnt_1\cr  V-cnt_1 & \ge \left\lfloor\frac{V}{x}\right\rfloor> \frac{V}{x}-1 \cr Vx-x\times cnt_1 & > V-x\cr V &> \frac{(cnt_1-1)\times x}{x-1}\end{aligned}
$$

同理，我们可以得到 $V > \frac{(cnt_2-1)\times y}{y-1}$。

主要是条件三比较繁琐：

$$
\begin{aligned}|Y|-|X|-|X\cap Y| & \ge cnt_1+cnt_2\cr 2\times \left\lfloor\frac{V}{x}\right\rfloor-V-\left\lfloor\frac{V}{xy}\right\rfloor & \ge cnt_1+cnt_2 \cr 2\times \left\lfloor\frac{V}{x}\right\rfloor-V-cnt_1-cnt_2 & \ge \left\lfloor\frac{V}{xy}\right\rfloor> \frac{V}{xy}-1 \cr 2xy\times \left\lfloor\frac{V}{x}\right\rfloor-Vxy-xy(cnt_1+cnt_2) & > V-xy \cr \dfrac{V}{x} \ge  \left\lfloor\frac{V}{x}\right\rfloor & > \dfrac{V-xy+Vxy+xy(cnt_1+cnt_2)}{2xy} \cr 2Vy & >V-xy+Vxy+xy(cnt_1+cnt_2) \cr (2y-1-xy)V & > xy(cnt_1+cnt_2-1) \cr V & > \dfrac{xy(cnt_1+cnt_2-1)}{2y-1-xy}\end{aligned}
$$

至此，三个式子都被我们化简掉了。只需要取三者的最大值的上取整即可。

