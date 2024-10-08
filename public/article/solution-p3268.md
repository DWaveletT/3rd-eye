---
create_time: 1682860884
update_time: 1682860884
title: 题解 P3268 【[JLOI2016]圆的异或并】
board: 1
tag:
- 1
extension:
  problem:
    id: P3268
    type: P
    title: '[JLOI2016] 圆的异或并'
    difficulty: 9.8182
    submitted: true
    accepted: true
---

处理不相交圆的扫描线，老早就想学了。今天刚学懂过了板子题，写篇题解。

## 题解

![](https://cdn.luogu.com.cn/upload/image_hosting/noef3mle.png)

注意到这些圆之间不会有交点，那么对于任意两个圆 $A,B$，要么 $A\subseteq B$，要么 $B\subseteq A$，要么它俩没有包含关系。

包含关系是具有传递性的。即如果 $A\subseteq B$，$B\subseteq C$，就有 $A\subseteq C$。我们对于每个圆找到一个大小最小的包含了它的圆，看作「父亲」，那么这 $n$ 个圆就组成了一个森林。

记根节点的深度为 $1$，一个儿子节点的深度是它的父亲节点的深度 $+1$。那么容易发现，这个圆对答案的贡献应该为：

$$
r^2\times (-1)^{d_i+1}
$$

![](https://cdn.luogu.com.cn/upload/image_hosting/oqm7kx3y.png)

上述内容非常自然，理解起来应该没有太大困难。我们要研究的重点是，对于每个圆，怎么才能找到它的父亲。

---

有一个很巧妙的使用扫描线的方法。对于一个圆心为 $(x, y)$，半径为 $r$ 的圆，使用一条平行于 $x$ 轴且过圆心的直线将其分割成为上半圆弧和下半圆弧（原谅我不会给图片配色……）：

![](https://cdn.luogu.com.cn/upload/image_hosting/1cwfznmd.png)

如果我们做一条垂直于 $x$ 轴的垂线，穿过了若干个圆，如图所示：

![](https://cdn.luogu.com.cn/upload/image_hosting/o5g58k4d.png)

现在研究 $A,B,C$ 这三个圆。

- 这条竖直线穿过了 $B$ 的上半圆弧后，与 $A$ 的上半圆弧相交。这说明，$B$ 的父亲就是 $A$；
- 这条竖直线穿过了 $C$ 的上半圆弧后，与 $B$ 的下半圆弧相交。这说明，$B$ 和 $C$ 应该有相同的父亲。

这两条结论是可以推广到一般情形的。也就是说，做一条竖直线穿过圆 $i$ 的上半圆弧，与上面 $j$ 的圆弧相交后，如果是与 $j$ 的下半圆弧相交，就说明 $i,j$ 的父亲相同；如果是与 $j$ 的上半圆弧相交，就说明 $j$ 是 $i$ 的父亲。

这两条看上去就很正确的结论的正确性可以感性理解。

现在有了这样两条结论后，就可以应用扫描线辅助我们求出一个圆的父亲了。假设有一条 $x=x_0$ 的直线从左往右扫描，

- 当它刚触碰到圆 $i$（也就是触碰到了 $i$ 最左侧的位置），就去查询交点 $(x_i-r_i,y_i)$ 上方最近的一个交点所对应的圆弧，如此可知 $i$ 的父亲/一个兄弟 $j$，而 $j$ 的父亲是谁肯定是先于 $i$ 被处理好的，所以可以求出 $i$ 的父亲。接着我们就可以将 $i$ 的上下两个半圆弧加入某个数据结构来维护；
- 当它扫描完了圆 $i$（也就是触碰到了 $i$ 最右侧的位置），就应该将 $i$ 的上下两个半圆弧移出这个数据结构。

现在我们需要这样一个数据结构，可以维护 $x=x_0$ 与圆弧的交点，并支持查询前驱后继。发现可以使用 $\verb!set!$。在这里应用到了一个性质，对于两个半圆弧 $a,b$，分别与 $x=x_0$ 产生两个交点 $p,q$，$p$ 和 $q$ 在 $y$ 坐标上的大小关系是不会随着 $x_0$ 发生变化的。这是因为圆弧不交，如果大小关系发生变化就一定要出现交点，产生矛盾。

如此叙述仍然有些模糊。这里将结合一些具体代码。

首先定义一个结构体 $\text{Semi}$，用来存储两个圆弧的信息：

```cpp
struct Semi{
	int i, x, y, r; bool t;
};
```

其中，$i$ 表示这个圆弧属于的圆的编号；$x,y,r$ 是这个圆的信息；$t$ 用来存储该圆弧是上半圆弧还是下半圆弧，如果为真则是上半，否则为下半。

接着需要写一个比较函数，用来将圆弧按照交点的 $y$ 坐标排序：

```cpp
struct Cmp{
    bool operator ()(const Semi a, const Semi b) const {
        double u, v;
        if(abs(l - a.x) == a.r) u = a.y; else 
            u = a.y + (a.t ? 1 : -1) * sqrt(pow(a.r, 2) - pow(l - a.x, 2));
        if(abs(l - b.x) == b.r) v = b.y; else 
            v = b.y + (b.t ? 1 : -1) * sqrt(pow(b.r, 2) - pow(l - b.x, 2));
        if(a.t == true) u += 1e-9;
        if(b.t == true) v += 1e-9;
        return u < v;
    }
};
```

这里面 $l$ 是一个全局变量，用来描述扫描线 $x=l$。容易算出这两个圆弧与 $x=l$ 的交点：

$$
\begin{aligned}
h_{\text{上半}}&=y+\sqrt{r^2-(l-x)^2}\cr
h_{\text{下半}}&=y-\sqrt{r^2-(l-x)^2}\cr
\end{aligned}
$$

圆弧会在扫描线扫过一个圆的时候被移出 $\text{set}$，所以不用担心没有交点的情况。接着比较 $u,v$ 的相对大小，就能对两个圆弧定序。为什么非得要这个 $l$？事实上，圆弧的「高低」是与 $l$ 无关的确定关系，并不会因为乱动 $l$ 导致 $\text{set}$ 里面大小关系错乱产生未定义行为。但是如果不取出一个在定义域内合法的 $l$，就难以比较高低关系。

需要注意的是，$\verb!set!$ 里判定两个数据 $u, v$ 相同，是通过 $\verb!cmp(u, v) == false!$ 且 $\verb!cmp(v, u) == false!$ 来实现的。而由于上半圆弧和下半圆弧在 $l=x-r$ 和 $l=x+r$ 位置相同，所以会被 $\verb!set!$ 错误判断为同一元素而只保留其中一个，因此我们将结果加上一个偏移量 $\epsilon$ 来避免该问题。

另外，调用 $\text{pow}$ 和 $\text{sqrt}$ 函数是比较慢的，所以对于 $l=x-r$ 和 $l=x+r$ 情况特判可以显著减小常数。不过如果开 $\text{O2}$ 的话跑得飞快，完全用不着卡常。

剩下来的主程序部分就相对简单。将每个圆两侧的位置 $(x-r,y)$ 和 $(x+r,y)$ 按照 $x$ 坐标排序，按照前文所述处理办法即可。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
struct Semi{ int i, x, y, r; bool t; };
int l;
struct Cmp{
    bool operator ()(const Semi a, const Semi b) const {
        double u, v;
        if(abs(l - a.x) == a.r) u = a.y; else 
            u = a.y + (a.t ? 1 : -1) * sqrt(pow(a.r, 2) - pow(l - a.x, 2));
        if(abs(l - b.x) == b.r) v = b.y; else 
            v = b.y + (b.t ? 1 : -1) * sqrt(pow(b.r, 2) - pow(l - b.x, 2));
        if(a.t == true) u += 1e-9;
        if(b.t == true) v += 1e-9;
        return u < v;
    }
};
set <Semi, Cmp> S;
const int MAXN = 2e5 + 3;
const int MAXM = 4e5 + 3;
int F[MAXN], D[MAXN];
int X[MAXN], Y[MAXN], R[MAXN], I[MAXM], n, m;
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
bool cmp(int a, int b){
    int u = a > 0 ? X[a] - R[a] : X[-a] + R[-a];
    int v = b > 0 ? X[b] - R[b] : X[-b] + R[-b];
    return u < v;
}
int main(){
    n = qread();
    up(1, n, i){
        X[i] = qread(), Y[i] = qread(), R[i] = qread();
        I[++ m] =  i;
        I[++ m] = -i;
    }
    sort(I + 1, I + 1 + m, cmp);
    i64 ans = 0;
    up(1, m, i){
        int o = I[i];
        int p = abs(o), x = X[p], y = Y[p], r = R[p];
        l = o > 0 ? x - r : x + r;
        Semi a = {p, x, y, r, 1};
        Semi b = {p, x, y, r, 0};
        if(o > 0){
            auto q = S.lower_bound(a);
            if(q == S.end()) F[p] = 0; else
                F[p] = q -> t ? q -> i : F[q -> i];
            S.insert(a);
            S.insert(b);
            D[p] = D[F[p]] + 1;
            ans += 1ll * R[p] * R[p] * (D[p] % 2 == 1 ? 1 : -1);
        } else {
            S.erase(a), S.erase(b);
        }
    }
    printf("%lld\n", ans);
    return 0;
}
