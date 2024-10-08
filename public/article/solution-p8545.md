---
create_time: 1661821008
update_time: 1661821008
title: 题解 【WR2-1F】【「Wdoi-2」不败的无尽兵团】
board: 1
tag:
- 1
extension:
  problem:
    id: P8545
    type: P
    title: 「Wdoi-2」不败的无尽兵团
    difficulty: 2147483647
    submitted: true
    accepted: true
---
## 构造

### $\textbf{Task 1}$

首先考虑 $n=529$ 的测试点。让我们在模 $p$ 意义下考虑每个运算，其中 $p$ 是一个模 $4$ 余 $3$ 的质数，即 $p\equiv 3\pmod 4$。在这个意义下，所有可能的数组成了一个有限域 $\mathbb F_p=\{0,1,2,3,\cdots,p-1\}$，这里面所有数字的运算都是模 $p$ 的。

现在构造三维点集 $S=\{(x,y,z)\in \mathbb F_p^3: x+y^2+z^2= 0\}$，其中 $x,y,z$ 的运算都在 $\mathbb F_p$ 下。容易发现，确定了 $y$ 和 $z$，那么唯一确定一个 $x$。因此 $S$ 的大小恰好为 $p^2$。我们可以把 $1\sim n$ 映射到 $S$ 内的点。

$S$ 内的点放在了一个比较特殊的三维空间里。我们可以定义这个空间内的「直线」以及「面」。

现在证明，$S$ 内的点不存在三点共线。具体而言，设出某条直线的参数方程 $(x=a_1t+b_1,y=a_2t+b_2,z=a_3t+b_3)$（$a_1,a_2,a_3$ 不全为 $0$）。现在将它与 $S$ 联立：

$$
\begin{cases}
x=a_1t+b_1 & (1)\cr
y=a_2t+b_2 & (2) \cr
z=a_3t+b_3 & (3) \cr
x+y^2+z^2= 0 & (4)
\end{cases}
$$

将 $(1)(2)(3)$ 代入 $(4)$ 中，发现：

$$
(a_1t+b_1)+(a_2t+b_2)^2+(a_3t+b_3)^2=0
$$

整理一下系数：

$$
(a_2^2+a_3^2)t^2+(2a_2b_2+2a_3b_3+a_1)t+(b_1+b_2^2+b_3^2)=0
$$

注意到，如果 $a_2^2+a_3^2$ 在 $F_p$ 意义下非 $0$，这就是一个二次方程，它的根不可能超过 $2$ 个。如果想要有三点共线，那这个方程必须要是恒等的（也就是等号左侧所有数字均为 $0$，那就对任意 $t$ 都合法）。

接着注意到，如果 $a_2^2+a_3^2=0$，就等价于 $a_2^2=-a_3^2$。分两类讨论：

- $a_2=a_3=0$。此时由于  $2a_2b_2+2a_3b_3+a_1=0$，得到 $a_1=0$，与 $a_1,a_2,a_3$ 均为 $0$ 矛盾。
- $a_2\neq 0,a_3\neq 0$。那么等式两边同时变为 $\dfrac{p-1}{2}$ 次方（容易发现，由于 $p\equiv 3\pmod 4$，这一定是个奇数），由于费马小定理，得到 $1=-1$，推出矛盾。

$$
\quad\tag*{$\Box$}
$$

于是，从 $S$ 中选出三个点 $a,b,c$ 组成的三元组 $(a,b,c)$ 可以唯一确定这个空间内的一个平面。这个三元组映射回 $1\sim n$ 这个数集，就对应着原来每个三元组。

现在考虑，这个 $\mathbb  F_p^3$ 空间下到底有多少个平面。考虑设出一个平面的表达式 $ax+by+cz=d$。请注意，这里面的运算都是在 $\mathbb F_p$ 里的。当 $d\neq 0$ 时，我们可以将每个数除以 $d$，于是相当于 $ax+by+cz=1$，一共有 $p^3$ 个平面；当 $d=0$ 时，$ax+by+cz=0$，接着考虑 $c$ 是否为 $0$，以此类推，这个空间里一共最多只会有 $p^3+3p^2+3p=(1+p)^3-1$ 个平面。对于每个平面，将里面的点放到 $B_i$ 里，于是 $m\le (1+p)^3-1$。最终我们还要减掉点数不超过 $2$ 的那些集合，最终得到的 $m$ 的值不会超过 $(1+p)^3$。

总结：$1\sim n$ 内的每个三元组 $(a,b,c)$，均映射到 $\mathbb F_p^3$ 下的点三元组 $(\alpha,\beta,\gamma)$。这 $(\alpha,\beta,\gamma)$ 唯一确定了一个平面，这个平面就是某个 $B_i$。这个构造方案下，$m=(p+1)^3-1$。对于 $n=529=23^2$，即可构造出结果。

### $\textbf{Task 2}$

下面考虑 $n=625$ 的另一个测试点。此时我们不太能用 $\mathbb F_p$ 了，而是需要改用 $\mathbb F_{p^2}$，其中 $p\equiv 1\pmod 4$。具体而言，这里面每个数字都表示为 $u+v\sqrt w$ 的形式，其中 $a,b\in[0,p)$，并且 $w$ 在模 $p$ 意义下不存在二次剩余。它们的运算同样是封闭的，且对 $p$ 取模。

修改三维点集 $S=\{(x,y,z)\in\mathbb F_{p^2}^3: x=y^2+z^2\sqrt w\}$。重新证明一下这个三维点集里的点不存在三点共线。

某条直线的参数方程 $(x=a_1t+b_1,y=a_2t+b_2,z=a_3t+b_3)$（$a_1,a_2,a_3$ 不全为 $0$）。现在将它与 $S$ 联立：

$$
\begin{cases}
x=a_1t+b_1 & (1)\cr
y=a_2t+b_2 & (2) \cr
z=a_3t+b_3 & (3) \cr
x=y^2+z^2\sqrt w & (4)
\end{cases}
$$

将 $(1)(2)(3)$ 代入 $(4)$ 中，发现：

$$
a_1t+b_1=(a_2t+b_2)^2+(a_3t+b_3)^2\sqrt w
$$

同样是以 $t$ 为主元，整理系数：

$$
(a_2^2+a_3^2\sqrt w)t^2+(2a_2b_2+2a_3b_3\sqrt w-a_1)t+(b_2^2+b_3^2\sqrt w-b_1)=0
$$

当 $a_2^2+a_3^2\sqrt w\neq 0$ 时，最多只有两个解；当出现三个解时，等号左侧恒等，$a_2^2+a_3^2\sqrt w= 0$。

于是，

$$
\begin{aligned}
a^2_2&=-a_3^2 \sqrt w \cr
\end{aligned}
$$

当 $a_3^2=0$ 时，发现 $a_1=a_2=a_3=0$，不符合 $a_1,a_2,a_3$ 不均为 $0$ 的前提，舍去。否则，我们能找到 $a_3^2$ 的一个乘法逆元，得到 $a_2^2/a_3^2=-\sqrt w$。

那么我们设 $a_2/a_3=u+v\sqrt w$。

$$
u^2+v^2w+2uv\sqrt w=-\sqrt w
$$

整理系数，得到：

$$
\begin{cases}
u^2+v^2w=0 \cr
2uv=-1
\end{cases}
$$

对于第一个式子，得到 $u^2=-wv^2$，两边同时取 $\dfrac{p-1}{2}$（因为 $p\equiv 1\pmod 4$，于是这一定是个偶数），得到 $u^{p-1}=v^{p-1}w^{(p-1)/2}$。根据费马小定理，得到 $1=w^{(p-1)/2}$。再由于 $w$ 不存在二次剩余，根据欧拉准则，得到 $1=-1$，矛盾。

$$
\quad\tag*{$\Box$}
$$

于是同样地，$S$ 内的点不共线。

## 证明

注意到对于上述这两种情况，我们已经构造出了一个 $m\sim n^{1.5}$ 的解，也就是 $m=(1+o(1))n^{1.5}$。下面证明，最优解不会小于 $(1-o(1))n^{1.5}$。

设 $B_i$ 的大小为 $x_i$，第 $i$ 个数存在于 $y_i$ 个划分出的集合中。显然有 $\sum x_i=\sum y_i$。接着考虑，含有 $i$ 的**所有**子集组成的集合 $\mathcal A$。将 $\mathcal A$ 里所有的 $i$ 均删除，此时剩下来的 $n-1$ 个数，他们组成的二元组出现且仅出现在 $\mathcal A$ 内的某个集合里。根据下述引理 $1$，$y_i=|\mathcal A|\ge n-1$。

于是，$\sum x_i=\sum y_i\ge n(n-1)$。

**引理** $\bm 1$：如果 $t\ge 2$ 个集合 $B_1,B_2,\cdots,B_t$，满足 $\{1,2,\cdots,u\}$ 内每个二元组在且仅在一个 $B_i$ 内，那么就有 $t\ge u$。

**证明**：

考虑一个有 $n$ 个顶点的完全图 $K_n$。这个问题等价于，我们要把 $K_n$ 划分为 $m$ 个更小的完全图 $F_i$，使得每条边都出现且仅出现在一个完全图里。

容易构造出一个 $m=n$ 的方案：取 $F_{1}$ 为顶点是 $1,2,3,\cdots,n-1$ 以及它们之间的连边组成的完全图，对于剩下来的 $n-1$ 条边，取 $F_i$ 为，由点集 $\{i+1,n\}$ 以及它们之间的连边组成的大小为 $2$ 的完全图。下面证明，不存在 $m<n$ 的方案。

我们给这个完全图 $K_n$ 的每个顶点赋值上一个实数 $r_i$。对于每个划分出来的完全图，定义它的权值：

$$
S_i=\sum_{v\in F_i} r_v
$$

接着我们定义一组划分方案的权值：

$$
S=\sum_{i=1}^m S_i^2
$$

由于每条边 $(u,v)$ 出现且仅出现在了一个 $F_i$ 当中，那么在 $S$ 里，$r_ur_v$ 前面的系数必定是 $2$（考虑将 $S_i^2$ 展开即可发现）。同时，每个点至少出现在了两个 $F_i$ 之中，因为它发出来的边连向的点不可能均在一个 $F_i$ 里，那样这个 $F_i$ 大小就是 $n$，此时 $m=1$ 不符合题设。于是每个 $r_i$ 对 $S$ 的贡献至少为 $2r_i^2$。那么：

$$
S=\left(\sum_{i=1}^n r_i\right)^2+\sum_{i=1}^n d_ir_i,\quad d_i>0
$$

也就是说，我们对 $S$ 的表达式进行了重新整理。

现在假设存在 $m<n$。我们可以强行令 $S_i$ 均为 $0$，此时是对 $x_1,x_2,\cdots,x_n$ 列出来的 $m$ 个方程组成的线性方程组，可以找到一组解使得存在 $x_i$ 不为 $0$。但是此时 $S=\sum S_i=0$，这与上式不符。

因此 $m\ge n$。

$$
\quad\tag*{$\Box$}
$$

现在我们需要应用引理 $2.3$。引理 $2.3$ 叙述如下：

$$
m^2\sum_{i=1}^m x_i^3\ge \left(\sum_{i=1}^m x_i\right)^3
$$

注意到 $\sum x_i\ge n(n-1)$，于是 $m^2\sum_{i=1}^m x_i^3\ge n^3(n-1)^3$。下述是引理 $2.1,2.2,2.3$ 的证明。

**引理** $\bm {2.1}$（$\text{Young}$ 不等式）：

若 $a,b>0$，$p,q>0$，并且 $\dfrac{1}{p}+\dfrac{1}{q}=1$，那么 $ab\le \dfrac{1}{p}a^p+\dfrac{1}{q}b^q$。

**证明**：

设 $f(x)=\ln x$，容易发现 $f''(x)=-\dfrac{1}{x^2}<0$，于是 $f(x)$ 是一个上凸函数。根据上凸函数的定义，发现：

$$
\begin{aligned}
\ln\left(\dfrac{1}{p}a^p+\dfrac{1}{q}b^q\right)&\ge \frac{1}{p}\ln a^p+\frac{1}{q}b^q \cr
&=\ln ab \cr
 \dfrac{1}{p}a^p+\dfrac{1}{q}b^q&\ge ab\cr
\end{aligned} 
$$

$$
\quad\tag*{$\Box$}
$$

---

**引理** $\bm {2.2}$（$\text{Holder}$ 不等式）：

$$
\sum_{i=1}^n |a_ib_i|\le \left(\sum_{i=1}^n|a_i|^p\right)^{\frac{1}{p}}\left(\sum_{i=1}^n|b_i|^q\right)^{\frac{1}{q}}
$$

其中，$p>1,q>1$ 且 $\dfrac{1}{p}+\dfrac{1}{q}=1$。

**证明**：

根据引理 $2.1$，$uv\le \dfrac{1}{p}u^p+\dfrac{1}{q}v^q$，我们取：

$$
\begin{aligned}
u_j=\frac{|a_j|}{\displaystyle (\sum_{i=1}^n |a_i|^p)^{\frac{1}{p}}},v_j=\frac{|b_j|}{\displaystyle (\sum_{i=1}^n |b_i|^q)^{\frac{1}{q}}}
\end{aligned}
$$

得到：

$$
\begin{aligned}
\frac{|a_j\cdot b_j|}{\displaystyle (\sum_{i=1}^n |a_i|^p)^{\frac{1}{p}}(\sum_{i=1}^n |b_i|^q)^{\frac{1}{q}}}&\le \frac{1}{p}\cdot\frac{|a_j|^p}{\displaystyle \sum_{i=1}^n |a_i|^p}+\frac{1}{q}\cdot\frac{|b_j|^p}{\displaystyle \sum_{i=1}^n |b_i|^q} \cr
\frac{\displaystyle \sum_{j=1}^n|a_j\cdot b_j|}{\displaystyle (\sum_{i=1}^n |a_i|^p)^{\frac{1}{p}}(\sum_{i=1}^n |b_i|^q)^{\frac{1}{q}}}&\le \frac{1}{p}\cdot\frac{\displaystyle \sum_{j=1}^n|a_j|^p}{\displaystyle \sum_{i=1}^n |a_i|^p}+\frac{1}{q}\cdot\frac{\displaystyle \sum_{j=1}^n|b_j|^p}{\displaystyle \sum_{i=1}^n |b_i|^q}=1 \cr
\sum_{j=1}^n|a_j\cdot b_j|&\le (\sum_{i=1}^n |a_i|^p)^{\frac{1}{p}}(\sum_{i=1}^n |b_i|^q)^{\frac{1}{q}}
\end{aligned}
$$

$$
\quad\tag*{$\Box$}
$$

---

**引理** $\bm {2.3}$：

$$
m^2\sum_{i=1}^m x_i^3\ge \left(\sum_{i=1}^m x_i\right)^3
$$

**证明**：

取 $p=3/2,q=3,n=a_i=m,b_i=x_i$，发现：

$$
m\sum x_i\le m^{5/3}\cdot \left(\sum x_i^3\right)^{1/3}
$$

简单变形，发现：

$$
m^2\sum_{i=1}^m x_i^3\ge \left(\sum_{i=1}^m x_i\right)^3
$$

$$
\quad\tag*{$\Box$}
$$

---

目前我们的进度：

$$
m^2\sum_{i=1}^m x_i^3\ge n^3(n-1)^3
$$

要想说明最优的 $m$ 不会小于 $(1-o(1))n^{1.5}$，只需要证明 $\sum x_i^3\le n^3$。注意到，为了让每一个三元组出现且仅出现在一个 $B_i$ 里，于是每个 $B_i$ 内的三元组的个数之和，就等于总的三元组元素之和。即：

$$
\sum_{i=1}^m\binom{x_i}{3}=\binom{n}{3},\quad x_i,n\ge 3
$$

注意到，当 $x\ge 3$ 时，$\dbinom{x}{3}$ 是一个上凸函数。因此发现，$\sum x_i^3\sim n^3$。

于是得到：$m\ge (1-o(1))n^{1.5}$。又因为我们已经构造出了一组 $m\le (1+o(1))n^{1.5}$ 的解，于是我们可以证明 $m\sim n^{1.5}$，并且构造出来的方案在渐进意义下取得了最优解。

## 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long i64;
namespace Task1{

const int MAXN=23+3;
const int MAXM=13824+3;
int n=529,p=23,u=0,v=0,w=0;
int M[MAXN][MAXN][MAXN];
int N[MAXN][MAXN][MAXN][MAXN];
vector<int> B[MAXM];

int mian(){
    up(0,p-1,y) up(0,p-1,z){
        int x=((-y*y-z*z)%p+p)%p;
        M[x][y][z]=++u;
    }
    up(0,p-1,a) up(0,p-1,b) up(0,p-1,c) up(0,p-1,d){
        if(a==0&&b==0&&c==0&&d==0) continue;
        if(N[a][b][c][d]) continue; N[a][b][c][d]=++v;
        up(0,p-1,t){
            N[a*t%p][b*t%p][c*t%p][d*t%p]=v;
        }
        up(0,p-1,y) up(0,p-1,z){
            int x=((-y*y-z*z)%p+p)%p;
            if((a*x+b*y+c*z)%p==d)
                B[v].push_back(M[x][y][z]);
        }
    }
    up(1,v,i) if(B[i].size()>=3) ++w;
    printf("%d\n",w);
    up(1,v,i) if(B[i].size()>=3){
        printf("%d",B[i].size());
        for(auto &t:B[i])
            printf(" %d",t); puts("");
    }
    return 0;
}

}

namespace Task2{
    
const int MAXN=25+3;
const int MAXM=17576+3;
int n=625,p=25,u=0,v=0,w=0;
int M[MAXN][MAXN][MAXN];
int N[MAXN][MAXN][MAXN][MAXN];
vector<int> B[MAXM];
struct Node{
    int real,imag;
    Node(int _real,int _imag):real(_real),imag(_imag){}
    Node(int _value):real(_value/5),imag(_value%5){}
    Node operator +(const Node t) const {
        return Node((real+t.real  )%5,(imag+t.imag  )%5);
    }
    Node operator -(const Node t) const {
        return Node((real-t.real+5)%5,(imag-t.imag+5)%5);
    }
    Node operator *(const Node t) const {
        return Node(((real*t.real+2*imag*t.imag)%5+5)%5,((real*t.imag+t.real*imag)%5+5)%5);
    }
    bool operator ==(const Node t) const {
        return real==t.real&&imag==t.imag;
    }
    Node operator -() const {
        return Node((5-real)%5,(5-imag)%5);
    }
    int value(){return real*5+imag;}
};
int mian(){
    up(0,p-1,yy) up(0,p-1,zz){
        Node y(yy),z(zz),x=y*y+z*z*Node(0,1); int xx=x.value();
        M[xx][yy][zz]=++u;
    }
    up(0,p-1,aa) up(0,p-1,bb) up(0,p-1,cc) up(0,p-1,dd){
        if(aa==0&&bb==0&&cc==0&&dd==0) continue;
        Node a(aa),b(bb),c(cc),d(dd);
        if(N[aa][bb][cc][dd]) continue; N[aa][bb][cc][dd]=++v;
        up(0,p-1,t){
            N[(a*Node(t)).value()][(b*Node(t)).value()]
             [(c*Node(t)).value()][(d*Node(t)).value()]=v;
        }
        up(0,p-1,yy) up(0,p-1,zz){
            Node y(yy),z(zz),x=y*y+z*z*Node(0,1); int xx=x.value();
            if((a*x+b*y+c*z)==d)
                B[v].push_back(M[xx][yy][zz]);
        }
    }
    up(1,v,i) if(B[i].size()>=3) ++w;
    printf("%d\n",w);
    up(1,v,i) if(B[i].size()>=3){
        printf("%d",B[i].size());
        for(auto &t:B[i])
            printf(" %d",t); puts("");
    }
    return 0;
}

}

int main(){
    int n; scanf("%d",&n);
    if(n==529) Task1::mian();
    if(n==625) Task2::mian();
    return 0;
}
