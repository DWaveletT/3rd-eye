---
create_time: 1657292999
update_time: 1657292999
title: 题解 UVA10217 【A Dinner with Schwarzenegger!!!】
board: 1
tag:
- 1
extension:
  problem:
    id: UVA10217
    type: UVA
    title: A Dinner with Schwarzenegger!!!
    difficulty: 0
    submitted: true
    accepted: true
---

数学题。

## 题目大意

有一个长度**看作无限长**的队伍。从左往右开始，如果出现第一个人，它的生日与前面某个人相同，那么他将有机会与施瓦辛格共进晚餐（？）。**特别地，队伍的第一个人与售票者比较生日**。现在需要最大化这个概率，请你输出概率最大的位置（按照理论计算出来的，因此可能是个浮点数），以及它四舍五入后的结果。

认为每年有 $n$ 天。

## 题解

$m$ 人中，每个人的生日互不相同的概率是多少？考虑枚举每个人的生日情况，那么一共有 $n^m$ 种。这其中每个人生日不同的情况数显然是 $\dfrac{n!}{(n-m)!}$。于是这种情况出现的概率显然是 $\dfrac{1}{n^m}\cdot \dfrac{n!}{(n-m)!}$。

那么这个时候考虑第 $m+1$ 个人。它获得晚餐机会的概率就变成了：

$$
p_m=\dfrac{1}{n^m}\cdot \dfrac{n!}{(n-m)!}\cdot\frac{m}{n}
$$

为了求得使得 $p_m$ 最大的 $m$，考虑计算 $\dfrac{p_m}{p_{m+1}}$，它的值应当大于 $1$。

$$
\begin{aligned}
\dfrac{p_m}{p_{m+1}}&=\left(\dfrac{1}{n^m}\cdot \dfrac{n!}{(n-m)!}\cdot\frac{m}{n}\right)\times \left(n^{m+1}\cdot \dfrac{(n-m-1)!}{n!}\cdot\frac{n}{m+1}\right)\cr
&=\left(\dfrac{1}{n^m}\cdot n^{m+1}\right)\cdot \left(\dfrac{n!}{(n-m)!}\cdot \dfrac{(n-m-1)!}{n!}\right)\cdot\left(\frac{m}{n}\cdot\frac{n}{m+1}\right)\cr
&=n\cdot \frac{1}{n-m}\cdot\frac{m}{m+1}>1\cr
\end{aligned}
$$

于是，

$$
\begin{aligned}
n\cdot \frac{1}{n-m}\cdot\frac{m}{m+1}&>1\cr
nm&>nm+n-m^2-m \cr
m(m+1)&>n \cr
\end{aligned}
$$

但这题要一个浮点数的结果就很谔谔……毕竟是一个离散的题目，不知道从哪里来的浮点数。那也没办法，只能硬着头皮往下做。既然唯一可以产生浮点数的式子就是这个 $m(m+1)>n$，那么直接把大于号换成等于号，然后拉上求根公式：

$$
m=\frac{-1+\sqrt{1+4n}}{2}
$$

反正莫名其妙的你就要输出这个 $m$。当然对于上面的那个不等式，你只要输出 $\lfloor m+1\rfloor$ 即可。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l,END##i=r;i<=END##i;++i)
#define dn(r,l,i) for(int i=r,END##i=l;i>=END##i;--i)
using namespace std;
typedef long long i64;
const int INF =2147483647;
int main(){
    int n; while(~scanf("%d",&n)){
        double x=(-1.0+sqrt(4*n+1))/2.0;
        printf("%.2lf %d\n",x,(int)floor(x+1));
    }
    return 0;
}
