---
create_time: 1690451877
update_time: 1690451877
title: 【笔记】插头 dp 学习笔记
board: 1
tag:
- 2
---

彩笔作者好久之前（不晚于 $19$ 年？）就听说过这种类型的 dp 了。但是因为太彩笔了，一直拖到现在才开始学。算是个初心者，所以下文内容有所纰漏还请多多包涵。

先放一张头图在这里：

![](https://cdn.luogu.com.cn/upload/image_hosting/gxi6mih5.png)

## 从此处开始

在学习插头 dp 之前，当然还是要了解这种东西有啥用处。正如 cdq 引入时所用论文的名称一样，《基于**连通性状态压缩**的动态规划问题》，插头 dp 是一种将连通性记录在状态里的状态压缩。如字面意思，这一类动态规划将会用来解决一些和连通性相关的问题。

比如，在 $n\times m$ 大小的棋盘中描述一条闭合回路。

比如，在 $n\times m$ 大小的棋盘中描述从某个起点 $S$ 出发，到达某个终点 $T$ 的不经过重复格子的路径。

例如下图，描述了三个在棋盘上的闭合回路。

![](https://cdn.luogu.com.cn/upload/image_hosting/69yvt8wo.png)

我们解决的问题通常和棋盘上的路径有关。那么我们需要安排好每个格子里的走线，也就是向每个格子里填充如下花色之一，使得它们满足条件。

![](https://cdn.luogu.com.cn/upload/image_hosting/keb5a1by.png)

容易想到的是，从上到下，从左往右地考察每一个格子，向其中选择合适的花色进行转移。转移的顺序如下图所示：

![](https://cdn.luogu.com.cn/upload/image_hosting/7kh2tkm7.png)

此时已经确定了状态的方格，与还没有确定的方格，中间会有**一条分界线**，即图中加粗的那条黑线。我们将这条黑线称作**轮廓线**。当轮廓线一直推至整个棋盘的下边界，也就完成了整个插头 dp 的过程。而我们正在讨论的那些回路，会和轮廓线**相交**。

如果一条路径与轮廓线相交，那么这条路线肯定还没有完成。轮廓线上面可能会粘着若干条路径。

![](https://cdn.luogu.com.cn/upload/image_hosting/bvn7ezgn.png)

如上图所示，粘在轮廓线上的路径一共有四条，这些路径与轮廓线的交点（图中，用打上斜线的图案），就被称为**插头**。插头之间可能会有连通关系。在该图中，标上同一种颜色的路径在同一个连通块内。

「插头」描述了两个格子之间连边的情况：

![](https://cdn.luogu.com.cn/upload/image_hosting/iazr3k2l.png)

如上图所示，考察路径是否经过中心方格与周围方格的交界处。通过描述这些位置作为状态，并且正确维护状态之间的转移，就可以描述棋盘上的路径（如图中标出来的绿色的链）。

从某个方格的中心出发，向上/下/左/右走直到触碰到另外一个方格，此处路径的情况就分别称作上/下/左/右插头。例如，上图里中心方格的上插头与左插头非空，而右插头与下插头则为空。

为了能够顺利的完成状态的转移，我们通常需要保存一连串的插头的情况作为状态。

![](https://cdn.luogu.com.cn/upload/image_hosting/sqxajp9h.png)

如图所示，所有用斜线标出来的东西就是当前状态里记录的插头。在这个例子里，我们保存了 $8+1=9$ 个插头的情况。一般地，对于 $n\times m\ (n\ge m)$ 大小的棋盘，我们记录 $m+1$ 个插头的情况，即 $m$ 个下插头与 $1$ 个右插头。

![](https://cdn.luogu.com.cn/upload/image_hosting/2e3q8eso.png)

如图所示，是处理第 $3$ 行时的情形。下图则展示了处理第 $3$ 行第 $3$ 列的格子时发生的状态转移。

![](https://cdn.luogu.com.cn/upload/image_hosting/gjrt675n.png)

暂时我们不去关心插头的分类（即，图中对插头所标注的颜色），以及状态转移的细节。只是留下一个印象，下文将会更进一步地分析这些状态的转移。

## 对连通性的描述

既然是**对连通性状态压缩**，我们就需要去考虑每个插头所处在的路径的连通情况。也就是说，我们关心**哪些插头在同一个连通块内**，而另一些不在。

### 最小表示法

最小表示法是一种较为显然并且具有一般性的连通性表示方法。假如有一系列插头 $\verb!ABCDEFG!$，现在知道 $\mathtt{A,C,F}$ 在同一个连通块内，$\mathtt{B,D}$ 在同一个连通块内，$\mathtt{E,G}$ 在同一个连通块内（暂且忽略在实际转移中是否存在这样的合法状态），我们从左往右看，将处在同一个连通块内的插头标识为相同的数字：

- 初始时，令计数器 $\mathit{cnt}\gets 0$。
- 第一个插头是 $\verb!A!$，还没有被标识，于是先令 $\mathit{cnt}$ 自增变为 $1$，将 $\verb!A!$ 以及其他和 $\verb!A!$ 在同一个连通块内的插头 $\mathtt{C,F}$ 一起标为 $1$。
- 第二个插头是 $\verb!B!$，还没有被标识，于是先令 $\mathit{cnt}$ 自增变为 $2$，将 $\verb!B!$ 以及其他和 $\verb!B!$ 在同一个连通块内的插头 $\mathtt{D}$ 一起标为 $2$。
- 第三个插头是 $\verb!C!$，已经标识为 $1$，跳过。
- 第四个插头是 $\verb!D!$，已经标识为 $2$，跳过。
- 第五个插头是 $\verb!E!$，还没有被标识，同样地，让 $\mathit{cnt}$ 自增，再让 $\mathtt{E,G}$ 一起标识为 $3$。
- 继续向下枚举，发现所有插头均已被标记，退出。

算法结束后，我们得到了 $\verb!ABCDEFG!$ 的连通性的最小表示 $[1,2,1,2,3,1,3]$。容易发现，对于每一种连通性，**有且仅有一种**最小表示。因此连通性与合法的最小表示之间是**具有对应关系**的。

下面是一个例子：

![](https://cdn.luogu.com.cn/upload/image_hosting/izfopj3t.png)

在上图中，插头的连通性分为三类，分别染色为了蓝色、红色与紫色。最小表示后的结果为 $[1,0,2,1,2,0,2,3,3]$。



### 括号表示法

假定我们现在需要描述的是**棋盘上若干个闭合回路**。因为棋盘可以看作一个平面图，而棋盘上的回路相当于若干个环，能够发现，当我们用一条轮廓线从左向右将其穿过时，交点个数应该**恰好是偶数**。也就是说，插头应该是成对存在的。

每个回路被轮廓线分割后会变成若干个连通块。每个连通块在轮廓线上都应该恰好有两个插头。我们从左往右先出现在轮廓线上的那个插头记作**左括号插头**，用 $\verb!(!$ 表示，后出现的那个记作**右括号插头**，用 $\verb!)!$ 表示。

此外，我们把空插头用井号 $\verb!#!$ 表示。

注意到这样的性质：

![](https://cdn.luogu.com.cn/upload/image_hosting/wm14pyvn.png)

考虑两对插头，如果它们出现了交叉的情况（即，形如 $\verb!([)]!$ 的匹配关系），那么这两条回路**必然会发生交叉**。因此，每两对插头所对应的括号对，是不可能发生交叉的情况的。这两对插头，要么形如包含关系（即 $\verb!([])!$ 的样子），要么形如并列关系（即 $\verb!()[]!$ 的样子）。

于是，通过一个合法的括号序列，我们总是可以还原出这些插头之间的连通块的关系。

### 两者的关系

因为上文描述的括号表示法基于处理闭合回路问题，因此下面的讨论也建立在闭合回路的讨论上。对于其他情况（比如允许一个连通块上只有一个或者有多个插头），暂不做讨论。

注意到，某一种连通性唯一对应一个最小表示，也唯一对应一个括号表示，因此，合法的括号表示与合法的最小表示（即在状态转移中实际会出现的合法状态）是一个映射关系。

然而，最小表示法的元素最大可能为 $\left\lfloor\dfrac{m}{2}\right\rfloor$，比如 $[1,2,3,4,4,3,2,1]$，不利于状态的存储（可能需要根据数据范围合理地修改状态压缩时所使用的进制数）；而括号表示法由于仅有三种插头 $\mathtt{\#,{\texttt (},{\texttt )}}$，因此可以压缩成一个三进制数。实践上，由于位运算的常数较小，因此通常使用**四进制数**来存储括号表示。

不过因为映射关系的存在，因此使用最小表示法还是括号表示法，实际上会产生的状态数是相同的。不同之处在于处理它们可能存在的常数差异。

下文的讨论，如不作特殊说明，均在维护**棋盘上若干个闭合回路**的前提下，同时使用**括号表示法**。

## 存储细节

![](https://cdn.luogu.com.cn/upload/image_hosting/9wo7cu4l.png)

我们直接按照从左往右的顺序，将轮廓线上的插头标号为 $[0,1,2,\cdots,m]$。

![](https://cdn.luogu.com.cn/upload/image_hosting/5px188jq.png)

接着将对应种类的左括号插头与右括号插头按照其类别写成 $2$ 位的 $2$ 进制 $01$ 串。将其按照从**低位到高位**的顺序压缩在状态表示 $s$ 里（因此，尽管从左往右阅读得到的数码是 $[01,01,10,00,\cdots]$，但是写在 $s$ 里，却是从右往左阅读读到的数码在前面）。

这样存储后，我们很容易使用位运算获取第 $i$ 个插头的类型 $(s\texttt{ rshift } 2i)\texttt{ bitand }11_{(2)}$。修改插头的类型也是方便的。

## 转移细节

我们先枚举行号 $i$，再枚举列号 $j$ 逐格处理。假设 $X$ 数组存储上一次已经处理好了的状态，我们枚举 $X$ 内的元素，根据 $(i, j)$ 格子的情况完成处理，将结果放在 $Y$ 数组内。当 $(i, j)$ 处理完毕后，将 $Y$ 里面的内容替换掉 $X$ 里面的内容，同时清空 $Y$ 数组，准备处理下一个格子。

![](https://cdn.luogu.com.cn/upload/image_hosting/2e3q8eso.png)

枚举完第 $i-1$ 行后，$X$ 数组里的插头位置应该都如「终止位置」所示。因此在枚举第 $i$ 行之前，我们需要整理 $X$ 内的元素变成「起始位置」所示情形。也就是筛选出 $X$ 内的合法方案，将它最右侧插头（通常是空插头）删除，同时在最左侧添加一个插头（通常也是空插头）。完成整理后再枚举 $j$ 进行转移。

此外，有些题目会要求图中**只有一条回路**。因此我们还需要再记一个 $0/1$ 状态 $f$ 用来表示当前是否形成了回路。

## 准备就绪

下面就让我们迎接狂风暴雨一般的转移吧！

我们当前处理的是第 $i$ 行第 $j$ 列的格子。与它相关的是轮廓线上的右插头以及在这之后的一个左插头，分别是轮廓线状态 $s$ 上面标号为 $j-1$ 的插头与标号为 $j$ 的插头。我们将这两个插头的状态分别记作 $x,y$。


### 情形 1：$x=\verb!#!,y=\verb!#!$

![](https://cdn.luogu.com.cn/upload/image_hosting/xdavot4v.png)

根据 $(i,j)$ 位置是否要有路径经过，有两种转移方式。

- 路径经过 $(i,j)$，那么这两个位置变为一个左插头和一个右插头；
- 路径不经 $(i,j)$，那么这两个位置仍然是空插头。

**注**：在模板题（P5056）里，根据 $S_{i,j}$ 是否是 $\verb!.!$，只能选择其一。

在下述情形里，$(i,j)$ 位置都**必须**会有路径经过。

### 情形 2：$x=\verb!(!,y=\verb!)!$

![](https://cdn.luogu.com.cn/upload/image_hosting/gt7oemb6.png)

因为 $x,y$ 的括号相互匹配，因此一旦在此处放置路径，就**一定会产生回路**。同时这两个位置的插头类型都变成了空插头。

- 如果 $f=\verb!false!$，那么在新的状态里，$f$ 变成了 $\verb!true!$；
- 否则，需要注意题干里是否要求有且仅有一条闭合回路。如果只能有一条回路，那么如果 $f=\verb!true!$，就不能再向下转移了。


### 情形 3：$x=\verb!)!,y=\verb!(!$

![](https://cdn.luogu.com.cn/upload/image_hosting/387a1s6k.png)

如图所示，有两个连通块在此处发生了合并变成了一个连通块。同时这两个位置的插头均变成了空插头。

### 情形 4：$x=\verb!(!,y=\verb!(!$

![](https://cdn.luogu.com.cn/upload/image_hosting/e804qsai.png)

同样是发生了连通块的合并，同时这两个位置的插头都变成了空插头。但是需要注意的是，原本 $y$ 所对应的右插头变成了 $x$ 所对应的右插头的左插头（有一点绕口）。因此需要找到 $y$ 原本的右插头在哪里，并修改成左插头。

怎么样找到与某个括号匹配的左/右插头？

考虑处理括号问题的常用做法，把左括号看作 $+1$，右括号看作 $-1$。找左括号 $p$ 所对应的右括号时，就从 $p$ 出发枚举到最后一个括号，同时记录当前这一段括号 $[p,i]$ 的权值之和。当 $i$ 枚举到某个位置 $q$，使得权值之和 $[p, q]$ 第一次变成 $0$ 的时候，$q$ 就是 $p$ 所对应的右括号。

从右括号找左括号同理。

### 情形 5：$x=\verb!)!,y=\verb!)!$

![](https://cdn.luogu.com.cn/upload/image_hosting/gysdj1sd.png)

依然是发生了连通块的合并。与情形 $4$ 不同的是，此时 $x$ 对应的左括号变成了 $y$ 对应的左括号的右括号。

因此，从 $x$ 出发找到对应的左括号，修改成右括号即可。

### 情形 6：$x, y$ 有且仅有一个是 $\verb!#!$

（偷懒把刚刚用过的图再拿出来）

![](https://cdn.luogu.com.cn/upload/image_hosting/gjrt675n.png)

以 $x=\verb!#!,y=\verb!)!$ 为例。剩下来的三个情况同理。

此时有两种转移，综合起来就是把 $j-1,j$ 两个位置其中一个插头变成空插头，另外一个位置变成 $y$ 所对应的插头的类型，也就是实现了**插头的沿伸**。

以上六种情形的讨论覆盖了所有 $3\times 3=9$ 种情况。

## 代码细节

下面的代码里，

- `int getp(int s, int p)` 用来返回轮廓线状态 $s$ 上第 $p$ 个插头（在这里，由于个人习惯，$p$ 是从 $1$ 开始标号的）；
- `int setw(int s, int p, int w)` 用来修改轮廓线状态 $s$ 上第 $p$ 个插头为 $w$；
- `int findr(int s, int p)` 用来查询左括号 $p$ 对应的右括号的下标：
- `int findl(int s, int p)` 用来查询右括号 $p$ 对应的左括号的下标。

此外，使用手写哈希表来将状态 $\lang s, f\rang$ 映射到这个状态的方案数。同时用了宏定义 `update(t, c)` 来简化把状态 $\lang t,f \rang$ 放到 $Y$ 里面的过程。我们先是在哈希表中将 $\lang t,f \rang$ 的方案数加上了 $c$，所用的 $T$ 数组用来将涉及到的状态全部提取出来。

在 $n\times m$ 个格子的转移结束后，每种状态的方案数都放在了 $X$ 里面。我们找到 $X$ 里面插头状态均为空（$s=\verb!00 00 ... 00!$），且已经产生闭合回路（$f=\verb!true!$）的那个，这个状态对应的状态数就是答案。

## 模板题参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 20 + 3;
const int MAXM= 67108864 + 3;
namespace HashT{
    const int SIZ = 19999997;
    int H[SIZ], V[SIZ], N[SIZ], t; bool F[SIZ]; i64 W[SIZ];
    void add(int u, int v, bool f, i64 w){
        V[++ t] = v, N[t] = H[u], F[t] = f, W[t] = w, H[u] = t;
    }
    i64& find(int u, bool f){
        for(int p = H[u % SIZ];p;p = N[p])
            if(V[p] == u && F[p] == f)
                return W[p];
        add(u % SIZ, u, f, 0);
        return W[t];
    }
}
char S[MAXN][MAXN];
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int n, m;
vector <pair<pair<int, bool>, i64> > M[2];
int getp(int s, int p){
    return (s >> (2 * p - 2)) & 3;
}
int setw(int s, int p, int w){
    return (s & ~(3 << (2 * p - 2))) | (w << (2 * p - 2));
}
int findr(int s, int p){
    int c = 0;
    for(int q = p;q <= m + 1;++ q){
        if(((s >> (2 * q - 2)) & 3) == 1) ++ c;
        if(((s >> (2 * q - 2)) & 3) == 2) -- c;
        if(c == 0)
            return q;
    }
    return -1;
}
int findl(int s, int p){
    int c = 0;
    for(int q = p;q >= 1;-- q){
        if(((s >> (2 * q - 2)) & 3) == 2) ++ c;
        if(((s >> (2 * q - 2)) & 3) == 1) -- c;
        if(c == 0)
            return q;
    }
    return -1;
}
void state(int s){
    return ;
    up(1, m + 1, i){
        switch(getp(s, i)){
            case 0 : putchar('#'); break;
            case 1 : putchar('('); break;
            case 2 : putchar(')'); break;
            case 3 : putchar('E');
        }
    }
    puts("");
}
int main(){
    n = qread(), m = qread();
    up(1, n, i)
        scanf("%s", S[i] + 1);
    int o = 0;
    #define X M[ o]
    #define Y M[!o]
    vector <pair<int, bool> > T;
    X.push_back({{0, 0}, 1});
    up(1, n, i){
        Y.clear();
        for(auto &u : X){
            auto [s0, c] = u;
            auto [s, f] = s0;
            if(getp(s, m + 1) == 0)
                Y.push_back({{s << 2, f}, c});
        }
        o ^= 1;
        up(1, m, j){
            int x = j, y = j + 1;
            for(auto &u : X){
                auto [s0, c] = u;
                auto [s, f] = s0;
                int a = getp(s, x);
                int b = getp(s, y);
                int t = setw(setw(s, x, 0), y, 0);
                #define update(t, c) HashT :: find(t, f) += c, T.push_back({t, f})
                if(S[i][j] == '.'){     // 经过该格
                    if(a == 1 && b == 1){
                        t = setw(t, findr(s, y), 1),
                        update(t, c);
                    } else
                    if(a == 2 && b == 2){
                        t = setw(t, findl(s, x), 2),
                        update(t, c);
                    } else 
                    if(a == 1 && b == 2){
                        if(f == false)  // 还没有闭合回路
                            f = true, update(t, c);
                    } else
                    if(a == 2 && b == 1){
                        update(t, c);
                    } else
                    if(a == 0 && b == 0){
                        t = setw(t, x, 1);
                        t = setw(t, y, 2);
                        update(t, c);
                    } else {    // a == 0 || b == 0
                        int t1 = setw(t, x, a | b);
                        int t2 = setw(t, y, a | b);
                        update(t1, c);
                        update(t2, c);
                    }
                }
                if(S[i][j] == '*'){ // 不经过该格
                    if(a == 0 && b == 0)
                        update(t, c);
                }
            }
            Y.clear();
            for(auto &u : T){
                auto [s, f] = u;
                if(HashT :: find(s, f) != 0){
                    Y.push_back({{s, f}, HashT :: find(s, f)});
                    HashT :: find(s, f) = 0;
                }
            }
            T.clear(), o ^= 1;
        }
    }
    i64 ans = 0;
    for(auto &u : X){
        auto [s0, c] = u;
        auto [s, f] = s0;
        bool g = true;
        up(1, m + 1, i)
            g &= getp(s, i) == 0;
        f &= g;
        if(f)
            ans = c;
    }
    printf("%lld\n", ans);
    return 0;
}
```

## 例题

### 例 1 [P3190 [HNOI2007] 神奇游乐园](https://www.luogu.com.cn/problem/P3190)

> 给定大小为 $n\times m\ (1\le n\le 100,\ 1\le m\le 6)$ 的棋盘，第 $i$ 行第 $j$ 列有权值 $w_{i, j}\ (-10^3\le w_{i,j}\le 10^3)$。试找到一条闭合回路（不能为空），使得回路内的权值之和最大。

一道模板题。记 $\mathit{dp}_{\lang s, f\rang}$ 表示当前状态能取到的最大的权值，直接转移就行。

与上一道题不同的是，每个格子可选可不选，两种情况分别处理。

### 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 6 + 3;
const int MAXM= 100 + 3;
namespace HashT{
    const int SIZ = 19999997;
    int H[SIZ], V[SIZ], N[SIZ], t; bool F[SIZ]; int W[SIZ];
    void add(int u, int v, bool f, i64 w){
        V[++ t] = v, N[t] = H[u], F[t] = f, W[t] = w, H[u] = t;
    }
    int& find(int u, bool f){
        for(int p = H[u % SIZ];p;p = N[p])
            if(V[p] == u && F[p] == f)
                return W[p];
        add(u % SIZ, u, f, -INF);
        return W[t];
    }
}
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int n, m;
int A[MAXM][MAXN];
vector <pair<pair<int, bool>, int> > M[2];
int getp(int s, int p){
    return (s >> (2 * p - 2)) & 3;
}
int setw(int s, int p, int w){
    return (s & ~(3 << (2 * p - 2))) | (w << (2 * p - 2));
}
int findr(int s, int p){
    int c = 0;
    for(int q = p;q <= m + 1;++ q){
        if(((s >> (2 * q - 2)) & 3) == 1) ++ c;
        if(((s >> (2 * q - 2)) & 3) == 2) -- c;
        if(c == 0)
            return q;
    }
    return -1;
}
int findl(int s, int p){
    int c = 0;
    for(int q = p;q >= 1;-- q){
        if(((s >> (2 * q - 2)) & 3) == 2) ++ c;
        if(((s >> (2 * q - 2)) & 3) == 1) -- c;
        if(c == 0)
            return q;
    }
    return -1;
}
void check_max(int &a, int b){
    a = max(a, b);
}
int main(){
    n = qread(), m = qread();
    up(1, n, i)
        up(1, m, j)
            A[i][j] = qread();
    int o = 0;
    #define X M[ o]
    #define Y M[!o]
    vector <pair<int, bool> > T;
    X.push_back({{0, 0}, 0});
    up(1, n, i){
        Y.clear();
        for(auto &u : X){
            auto [s0, c] = u;
            auto [s, f] = s0;
            if(getp(s, m + 1) == 0)
                Y.push_back({{s << 2, f}, c});
        }
        o ^= 1;
        up(1, m, j){
            int x = j, y = j + 1, w = A[i][j];
            for(auto &u : X){
                auto [s0, c] = u;
                auto [s, f] = s0;
                int a = getp(s, x);
                int b = getp(s, y);
                #define update(t, u) (check_max(HashT :: find(t, f), u), T.push_back({t, f}))
                {     // 经过该格
                    int t = setw(setw(s, x, 0), y, 0);
                    if(a == 1 && b == 1){
                        t = setw(t, findr(s, y), 1);
                        update(t, w + c);
                    } else
                    if(a == 2 && b == 2){
                        t = setw(t, findl(s, x), 2);
                        update(t, w + c);
                    } else 
                    if(a == 1 && b == 2){
                        if(f == false)  // 还没有闭合回路
                            f = true, update(t, w + c);
                    } else
                    if(a == 2 && b == 1){
                        update(t, w + c);
                    } else
                    if(a == 0 && b == 0){
                        t = setw(t, x, 1);
                        t = setw(t, y, 2);
                        update(t, w + c);
                    } else {    // a == 0 || b == 0
                        int t1 = setw(t, x, a | b);
                        int t2 = setw(t, y, a | b);
                        update(t1, w + c);
                        update(t2, w + c);
                    }
                }
                { // 不经过该格
                    int t = setw(setw(s, x, 0), y, 0);
                    if(a == 0 && b == 0)
                        update(t, c);
                }
                #undef update
            }
            Y.clear();
            for(auto &u : T){
                auto [s, f] = u;
                if(HashT :: find(s, f) != -INF){
                    Y.push_back({{s, f}, HashT :: find(s, f)});
                    HashT :: find(s, f) = -INF;
                }
            }
            T.clear(), o ^= 1;
        }
    }
    int ans = 0;
    for(auto &u : X){
        auto [s0, c] = u;
        auto [s, f] = s0;
        bool g = true;
        up(1, m + 1, i)
            g &= getp(s, i) == 0;
        f &= g;
        if(f)
            ans = c;
    }
    #undef X
    #undef Y
    printf("%d\n", ans);
    return 0;
}
```

### 例 2 [P5074 Eat the Trees](https://www.luogu.com.cn/problem/P5074)

> 给定一个大小为 $n\times m\ (1\le n,m\le 12)$ 的棋盘，给出每个格子能不能放置路径，放置若干个（可以为 $0$ 个）闭合回路使得回路经过所有必经的格子，问方案数。

同样是模板题。值得注意的是这条题目不要求回路有且仅有一个，因此 $f$ 状态没有必要，甚至插头的类别（左括号插头、右括号插头）也没有必要。这是因为，我们压根不关心合并插头时是不是将同一个连通块给闭合了，还是单纯地将两个连通块合并成了同一个连通块。

因此，插头的状态可以用二进制来存储。~~但因为我直接从上面的题目复制粘贴的代码，所以懒得把四进制改成二进制了~~。

### 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 20 + 3;
namespace HashT{
    const int SIZ = 19999997;
    int H[SIZ], V[SIZ], N[SIZ], t; bool F[SIZ]; i64 W[SIZ];
    int X[SIZ], n;
    void add(int u, int v, bool f, i64 w){
        V[++ t] = v, N[t] = H[u], F[t] = f, W[t] = w, H[u] = t;
    }
    i64& find(int u, bool f){
        for(int p = H[u % SIZ];p;p = N[p])
            if(V[p] == u && F[p] == f)
                return W[p];
        add(u % SIZ, u, f, 0), X[++ n] = u % SIZ;
        return W[t];
    }
    void init(){
        up(1, n, i)
            H[X[i]] = 0;
        n = t = 0;
    }
}
char S[MAXN][MAXN];
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int n, m;
vector <pair<pair<int, bool>, i64> > M[2];
int getp(int s, int p){
    return (s >> (2 * p - 2)) & 3;
}
int setw(int s, int p, int w){
    return (s & ~(3 << (2 * p - 2))) | (w << (2 * p - 2));
}
int main(){
    up(1, qread(), _){
        HashT :: init();
        n = qread(), m = qread(); bool f = true;
        up(1, n, i){
            up(1, m, j){
                int a = qread();
                if(a == 1)
                    S[i][j] = '.', f = false;
                else
                    S[i][j] = '*';
            }
        }
        if(f == true){
            puts("1");
            continue;
        }
        int o = 0;
        #define X M[ o]
        #define Y M[!o]
        X.clear();
        Y.clear();

        vector <pair<int, bool> > T;
        X.push_back(make_pair(make_pair(0, 0), 1));
        up(1, n, i){
            Y.clear();
            for(auto &u : X){
                auto [s0, c] = u;
                auto [s, f] = s0;
                if(getp(s, m + 1) == 0)
                    Y.push_back(make_pair(make_pair(s << 2, f), c));
            }
            o ^= 1;
            up(1, m, j){
                int x = j, y = j + 1;
                for(auto &u : X){
                    auto [s0, c] = u;
                    auto [s, f] = s0;
                    int a = getp(s, x);
                    int b = getp(s, y);
                    int t = setw(setw(s, x, 0), y, 0);
                    #define update(t, c) HashT :: find(t, f) += c, T.push_back(make_pair(t, f))
                    if(a == 1 && b == 1){
                        if(S[i][j] == '.')
                            update(t, c);
                    } else
                    if(a == 0 && b == 0){
                        if(S[i][j] == '.'){
                            t = setw(t, x, 1);
                            t = setw(t, y, 1);
                            update(t, c);
                        } else {
                            update(t, c);
                        }
                    } else {
                        int t1 = setw(t, x, a | b);
                        int t2 = setw(t, y, a | b);
                        if(S[i][j] == '.'){
                            update(t1, c);
                            update(t2, c);
                        }
                    }
                }
                Y.clear();
                for(auto &u : T){
                    auto [s, f] = u;
                    if(HashT :: find(s, f) != 0){
                        Y.push_back(make_pair(make_pair(s, f), HashT :: find(s, f)));
                        HashT :: find(s, f) = 0;
                    }
                }
                T.clear(), o ^= 1;
            }
        }
        i64 ans = 0;
        for(auto &u : X){
            auto [s0, c] = u;
            auto [s, f] = s0;
            bool g = true;
            up(1, m + 1, i)
                g &= getp(s, i) == 0;
            if(g)
                ans = c;
        }
        printf("%lld\n", ans);
    }
    
    return 0;
}
```


### 例 2 [P1713 麦当劳叔叔的难题](https://www.luogu.com.cn/problem/P1713)

> 给定大小为 $n\times n\ (1\le n\le 10)$ 的网格，有 $m\ (1\le m\le 100)$ 个位置不能走。问从左下角走到右上角，不经过重复的方格，所能走出来的最长路径的长度减去最短路径的长度。

最短路径的长度可以直接用 bfs 计算得出。关键是要计算出最长路径的长度。

在上文提到的例题均用来解决闭合回路的问题。现在我们希望将闭合回路的做法拓展到路径上来。注意到本题的特殊性质：起点和终点都在网格的角落。于是，考虑这样的情形：

![](https://cdn.luogu.com.cn/upload/image_hosting/24rulog5.png)

我们绕到棋盘外边来，另外加上一些路径，将其补全成为单条闭合回路。上图所示的橙色路径即是补全上去的路径。那么，在转移过程中，插头的类型就要重新设计。

- 例如，转移完第一行的情形后，我们只能提取标号为 $m$ 的插头是右插头的状态，修改后作为第二行的初始状态。此外还要注意的是，我们强行在墙上搞出来一个插头后，原本这个右括号插头对应的左括号插头，此时要变成右括号插头。
- 此外，当我们处理到最后一行时，标号为 $0$ 的插头不应该是空插头，而应该是左括号插头。
- 特判上述两种情况时，记得精细考虑 $n=2$ 时你的讨论是否正确。

如果你对上述语句存在困惑，下图展示了求解过程中出现的几个片段（图中标灰的那段轮廓线仅用来辅助理解，实际代码状态里没有存储这段灰色轮廓线上的插头），希望他们能对你有所帮助：

![](https://cdn.luogu.com.cn/upload/image_hosting/6yjqubpo.png)

- 左上：处理完第一行后，我们只提取下标为 $m$ 的插头为右括号插头的状态，修改后作为第二行的初始状态；
- 右上：因为我们强制在棋盘外面生成了一条路径，因此原本墙上右括号插头对应的左括号插头，此时要变成右括号插头，这样才能和棋盘外面的那个左括号插头完成匹配；
- 左下：开始处理第二行时应该有的起始状态；
- 右下：处理最后一行时，下标为 $0$ 的插头应该变成左括号插头而非空插头。

### 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 10 + 3;
const int MAXM= 100 + 3;
namespace HashT{
    const int SIZ = 19999997;
    int H[SIZ], V[SIZ], N[SIZ], t; bool F[SIZ]; int W[SIZ];
    void add(int u, int v, bool f, i64 w){
        V[++ t] = v, N[t] = H[u], F[t] = f, W[t] = w, H[u] = t;
    }
    int& find(int u, bool f){
        for(int p = H[u % SIZ];p;p = N[p])
            if(V[p] == u && F[p] == f)
                return W[p];
        add(u % SIZ, u, f, -INF);
        return W[t];
    }
}
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int n, m;
vector <pair<pair<int, bool>, int> > M[2];
int getp(int s, int p){
    return (s >> (2 * p - 2)) & 3;
}
int setw(int s, int p, int w){
    return (s & ~(3 << (2 * p - 2))) | (w << (2 * p - 2));
}
int findr(int s, int p){
    int c = 0;
    for(int q = p;q <= n + 1;++ q){
        if(((s >> (2 * q - 2)) & 3) == 1) ++ c;
        if(((s >> (2 * q - 2)) & 3) == 2) -- c;
        if(c == 0)
            return q;
    }
    return -1;
}
int findl(int s, int p){
    int c = 0;
    for(int q = p;q >= 1;-- q){
        if(((s >> (2 * q - 2)) & 3) == 2) ++ c;
        if(((s >> (2 * q - 2)) & 3) == 1) -- c;
        if(c == 0)
            return q;
    }
    return -1;
}
void check_max(int &a, int b){
    a = max(a, b);
}
char S[MAXN][MAXN];
const int D[4][2] = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
int H[MAXN][MAXN];
int main(){
    n = qread(), m = qread();
    up(1, m, i){
        int x = qread();
        int y = qread();
        S[x][y] = '#';
    }
    queue <pair<int, int> > Q;
    Q.push(make_pair(n, 1)), H[n][1] = 1;
    while(!Q.empty()){
        auto u = Q.front(); Q.pop();
        auto [x, y] = u;
        up(0, 3, d){
            int nx = x + D[d][0];
            int ny = y + D[d][1];
            if(1 <= nx && nx <= n && 1 <= ny && y <= n){
                if(H[nx][ny] == 0 && S[nx][ny] != '#'){
                    H[nx][ny] = H[x][y] + 1;
                    Q.push(make_pair(nx, ny));
                }
            }
        }
    }
    // printf("%d\n", H[1][n]);
    int o = 0;
    #define X M[ o]
    #define Y M[!o]
    vector <pair<int, bool> > T;
    X.push_back({{0, 0}, 0});
    up(1, n, i){
        Y.clear();
        for(auto &u : X){
            auto [s0, c] = u;
            auto [s, f] = s0;
            int p = (i == 2 ? 2 : 0);
            int q = (i == n ? 1 : 0);
            int t = s;
            if(i == 2){
                if(getp(t, n + 1) == 2){
                    t = setw(t, findl(t, n + 1), 2);
                    t = setw(t, n + 1, 0);
                    t = t << 2;
                } else continue;
            } else {
                if(getp(t, n + 1) == 0){
                    t = t << 2;
                } else continue;
            }
            if(i == n)
                Y.push_back({{t | 1, f}, c});
            else
                Y.push_back({{t, f}, c});
        }
        o ^= 1;
        up(1, n, j){
            // printf("=== %d, %d\n", i, j);
            int x = j, y = j + 1, w = 1;
            for(auto &u : X){
                auto [s0, c] = u;
                auto [s, f] = s0;
                // state(s);
                int a = getp(s, x);
                int b = getp(s, y);
                #define update(t, u) (check_max(HashT :: find(t, f), u), T.push_back({t, f}))
                if(S[i][j] != '#') {     // 经过该格
                    int t = setw(setw(s, x, 0), y, 0);
                    if(a == 1 && b == 1){
                        t = setw(t, findr(s, y), 1);
                        update(t, w + c);
                    } else
                    if(a == 2 && b == 2){
                        t = setw(t, findl(s, x), 2);
                        update(t, w + c);
                    } else 
                    if(a == 1 && b == 2){
                        if(f == false)  // 还没有闭合回路
                            f = true, update(t, w + c);
                    } else
                    if(a == 2 && b == 1){
                        update(t, w + c);
                    } else
                    if(a == 0 && b == 0){
                        t = setw(t, x, 1);
                        t = setw(t, y, 2);
                        update(t, w + c);
                    } else {    // a == 0 || b == 0
                        int t1 = setw(t, x, a | b);
                        int t2 = setw(t, y, a | b);
                        update(t1, w + c);
                        update(t2, w + c);
                    }
                }
                { // 不经过该格
                    int t = setw(setw(s, x, 0), y, 0);
                    if(a == 0 && b == 0)
                        update(t, c);
                }
                #undef update
            }
            Y.clear();
            for(auto &u : T){
                auto [s, f] = u;
                if(HashT :: find(s, f) != -INF){
                    Y.push_back({{s, f}, HashT :: find(s, f)});
                    HashT :: find(s, f) = -INF;
                }
            }
            T.clear(), o ^= 1;
        }
    }
    int ans = 0;
    for(auto &u : X){
        auto [s0, c] = u;
        auto [s, f] = s0;
        bool g = true;
        up(1, n + 1, i)
            g &= getp(s, i) == 0;
        f &= g;
        if(f)
            ans = c;
    }
    #undef X
    #undef Y
    printf("%d\n", ans - H[1][n]);
    return 0;
}
```

### 例 3 [ZOJ3213 Beautiful Meadow](https://vjudge.net/problem/ZOJ-3213)

> 给定大小为 $n\times m\ (1\le n\le 8,\ 1\le m\le 8)$ 的棋盘，第 $i$ 行第 $j$ 列有权值 $w_{i, j}\ (0\le w_{i,j}\le 10^3)$，$w_{i,j}=0$ 表示这个格子不能走。试找到**一条路径**，使得路径内的权值之和最大。

与例 2 不同，此时路径的起点与终点不再确定。我们观察一条路径被轮廓线切割后的结果：

![](https://cdn.luogu.com.cn/upload/image_hosting/z76y0yfa.png)

发现，切割之后产生的连通块，不仅有「和轮廓线有两个交点（插头数为 $2$）」的情形，还出现了「和轮廓线**只有一个交点**（插头数为 $1$）」的情形。刚刚的左括号插头与右括号插头仍然适用，但是为了处理轮廓线上只有一个插头的连通块，我们需要引入第三类插头：**独立插头**，使用星号 $\verb!*!$ 表示。

下图中，独立插头被染成了紫色。

![](https://cdn.luogu.com.cn/upload/image_hosting/6h22wlpg.png)

我们把单条路线的起点/终点统一称作起止点。可以发现，独立插头的产生与消失总是**伴随着起止点的形成**。因为最后整张图上应该恰好有两个起止点，因此我们修改 $f$ 的含义，修改为当前整张图上起止点的个数。$f$ 的范围应当在 $0\sim 2$。

因为插头种类增加了，因此讨论的数量也由 $3\times 3$ 变成了 $4\times 4$。原先适用于三种插头类型的讨论基本上仍然适用。下文按照**空插头的数量**对一些特殊情形进行分类：

#### 扩展情形 1 $[x=\verb!#!]+[y=\verb!#!]=2$

**除了**上文提及的转移到 $x\to\verb!(!,y\to\verb!)!$ 以外，**新增加**了下图当中两种生成独立插头（同时，起止点的数量也增加了 $1$）。

![](https://cdn.luogu.com.cn/upload/image_hosting/jzghmwmt.png)


#### 扩展情形 2 $[x=\verb!#!]+[y=\verb!#!]=1$

在这种情况下，**插头的转移**仍然是合法的，即非空的那个插头，可以被转移到下插头的位置，也可以被转移到右插头的位置。**除此之外**，还新增加了在当前位置添加起止点的情况：

![](https://cdn.luogu.com.cn/upload/image_hosting/xt1v22ak.png)

![](https://cdn.luogu.com.cn/upload/image_hosting/pir58c4q.png)

尤其注意，后者添加起止点时，与括号插头匹配的那个括号插头此时会变成独立插头。

#### 扩展情形 3 $[x=\verb!#!]+[y=\verb!#!]=0$

在这种情形下，还存在一些子情况。

当两个插头均为独立插头时，会形成这样的路径。此时由于路径上出现了两个起止点，因此形成了一条完整的单条路径。

![](https://cdn.luogu.com.cn/upload/image_hosting/bx3wj94r.png)

否则，如果其中有一个插头是独立插头，那么另一个插头（括号插头）所匹配的插头，此时会变成独立插头。如下图所示。

![](https://cdn.luogu.com.cn/upload/image_hosting/filxkidx.png)

否则，两个插头均不是独立插头，我们需要排除掉这样的情况：

![](https://cdn.luogu.com.cn/upload/image_hosting/xhh2lm05.png)

当 $x=\verb!(!$ 且 $y=\verb!)!$ 时，连接这两个插头会形成闭合回路，而这是不合法的。要注意特判掉这种情况。对于剩下来的 $x=\verb!)!$ 且 $y=\verb!(!$ 情形，由于只是连通块的合并而并非形成回路，因此是合法的。

在完成上述针对独立插头的描述后，我们终于完成了全部的讨论。

### 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 8 + 3;
const int MAXM= 8 + 3;
namespace HashT{
    const int SIZ = 19999997;
    int H[SIZ], V[SIZ], N[SIZ], t, F[SIZ]; int W[SIZ];
    void add(int u, int v, int f, i64 w){
        V[++ t] = v, N[t] = H[u], F[t] = f, W[t] = w, H[u] = t;
    }
    int& find(int u, int f){
        for(int p = H[u % SIZ];p;p = N[p])
            if(V[p] == u && F[p] == f)
                return W[p];
        add(u % SIZ, u, f, -INF);
        return W[t];
    }
}
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int n, m;
int A[MAXN][MAXM];
vector <pair<pair<int, int>, int> > M[2];
int getp(int s, int p){
    return (s >> (2 * p - 2)) & 3;
}
int setw(int s, int p, int w){
    return (s & ~(3 << (2 * p - 2))) | (w << (2 * p - 2));
}
int findo(int s, int p){
    int c = ((s >> (2 * p - 2)) & 3) == 1 ? 1 : -1;
    if(c == 1){ // findr
        for(int q = p + 1;q <= m + 1;++ q){
            if(((s >> (2 * q - 2)) & 3) == 1) ++ c;
            if(((s >> (2 * q - 2)) & 3) == 2) -- c;
            if(c == 0)
                return q;
        }
    } else {    // findl
        for(int q = p - 1;q >= 1;-- q){
            if(((s >> (2 * q - 2)) & 3) == 1) ++ c;
            if(((s >> (2 * q - 2)) & 3) == 2) -- c;
            if(c == 0)
                return q;
        }
    }
    return -1;
}
void state(int s){
    up(1, m + 1, i)
        switch(getp(s, i)){
            case 0 : putchar('#'); break;
            case 1 : putchar('('); break;
            case 2 : putchar(')'); break;
            case 3 : putchar('*'); break;
            default : putchar('E');
        }
}
void check_max(int &a, int b){
    a = max(a, b);
}
void solve(){
    int ans = 0;
    n = qread(), m = qread();
    up(1, n, i)
        up(1, m, j)
            A[i][j] = qread(),
            ans = max(ans, A[i][j]);
    int o = 0;
    #define X M[ o]
    #define Y M[!o]
    vector <pair<int, int> > T;
    X.clear();
    X.push_back({{0, 0}, 0});
    up(1, n, i){
        Y.clear();
        for(auto &u : X){
            auto [s0, c] = u;
            auto [s, f] = s0;
            if(getp(s, m + 1) == 0)
                Y.push_back({{s << 2, f}, c});
        }
        o ^= 1;
        up(1, m, j){
            // printf("processing %d, %d\n", i, j);
            int x = j, y = j + 1, w = A[i][j];
            for(auto &u : X){
                auto [s0, c] = u;
                auto [s, f] = s0;
                // state(s);
                // puts("");
                int a = getp(s, x);
                int b = getp(s, y);
                int t = setw(setw(s, x, 0), y, 0);
                #define update(f, t, u) (check_max(HashT :: find(t, f), u), T.push_back({t, f}))
                if(A[i][j] != 0) {      // 经过该格
                    int t = setw(setw(s, x, 0), y, 0);
                    int tot = (a == 0) + (b == 0);
                    if(tot == 2){
                        int t1 = t;
                        int t2 = t;
                        t = setw(t, x, 1);
                        t = setw(t, y, 2);
                        update(f, t, w + c);
                        if(f < 2){  // 生成独立插头（形成起止点）
                            t1 = setw(t1, x, 3);
                            t2 = setw(t2, y, 3);
                            update(f + 1, t1, w + c);
                            update(f + 1, t2, w + c);
                        }
                    } else
                    if(tot == 1){
                        int t1 = setw(t, x, a | b);
                        int t2 = setw(t, y, a | b);
                        update(f, t1, w + c);   // 插头向下转移
                        update(f, t2, w + c);   // 插头向右转移
                        if(f < 2){  // 形成起止点
                            if(a == 3 || b == 3){   // 非空插头为独立插头
                                update(f + 1, t, w + c);
                            } else {                // 非空插头为括号插头
                                if(a != 0) t = setw(t, findo(s, x), 3);
                                    else   t = setw(t, findo(s, y), 3);
                                update(f + 1, t, w + c);
                            }
                        }
                    } else {
                        if(a == 3 && b == 3){   // 形成单条路径
                            update(f, t, w + c);
                        } else
                        if(a == 1 && b == 1){
                            t = setw(t, findo(s, y), 1);
                            update(f, t, w + c);
                        } else 
                        if(a == 2 && b == 2){
                            t = setw(t, findo(s, x), 2);
                            update(f, t, w + c);
                        } else
                        if(a == 1 && b == 2){
                            // 这里不能形成回路
                            // 所以这里不能转移
                        } else
                        if(a == 2 && b == 1){
                            update(f, t, w + c);
                        } else {    // 恰有一个独立插头
                            if(a != 3) t = setw(t, findo(s, x), 3);
                                else   t = setw(t, findo(s, y), 3);
                            update(f, t, w + c);
                        }
                    }
                }
                { // 不经过该格
                    int t = setw(setw(s, x, 0), y, 0);
                    if(a == 0 && b == 0)
                        update(f, t, c);
                }
                #undef update
            }
            Y.clear();
            for(auto &u : T){
                auto [s, f] = u;
                if(HashT :: find(s, f) != -INF){
                    Y.push_back({{s, f}, HashT :: find(s, f)});
                    HashT :: find(s, f) = -INF;
                }
            }
            T.clear(), o ^= 1;
        }
    }
    for(auto &u : X){
        auto [s0, c] = u;
        auto [s, f] = s0;
        if(s == 0 && f == 2)
            ans = max(ans, c);
    }
    #undef X
    #undef Y
    printf("%d\n", ans);
}
int main(){
    up(1, qread(), _){
        solve();
    }
    return 0;
}
/*
1
5 5
1 1 1 1 1
0 0 0 0 1
0 4 1 1 1
0 0 1 0 1
0 5 0 1 1
*/
```

### 还有更多……

cdq 指出，对于更加一般的「连通块与轮廓线有 $3$ 个及以上插头」的情形，我们可以使用**广义括号序列**进行描述。例如，

![](https://cdn.luogu.com.cn/upload/image_hosting/e5pktipz.png)

我们引入第四类插头，中间插头（用 $\verb!|!$）表示。那么上述插头的连通情况可以被表示为 $\verb!(*##|(#))!$。

对于广义括号序列，我们做如下递归定义：

- $\verb!#!$ 和 $\verb!*!$ 和空序列 $\varnothing$ 都是合法的广义括号序列；
- 如果 $A,B$ 是合法的广义括号序列，那么 $A+B$ 也是合法的广义括号序列；
- 如果 $A$ 是合法的广义括号序列，那么 $\verb!(!A\verb!)!$ 也是广义的合法括号序列；
- 如果 $A_1,A_2,\cdots,A_n\ (n\ge 2)$ 是合法的广义括号序列，那么 $\verb!(!A_1\verb!|!A_2\verb!|!\cdots \verb!|!A_n\verb!)!$ 也是合法的广义括号序列。
- 所有的广义括号序列都可以由上述规则产生。

与普通的括号序列相同，图上的一个合法的连通关系唯一对应一个合法的广义括号序列。可以感性理解，证明留给读者。

广义括号序列，可以用来处理更加一般的连通关系；不过，随着插头种类的增加，用来存储它们所用的状态也变得更大（但是，其中不合法的状态数量占比也会增加），同时讨论量也显著增加，需要与最小表示法做适当取舍……

因为笔者能力所限，对于插头 dp 的探索暂且告一段落。仍有兴致的读者可以尝试阅读更进一步的材料。

## 参考文献

- [OI wiki - 插头 DP](https://oi-wiki.org/dp/plug/)；
- [陈丹琦《基于连通性状态压缩的动态规划问题》](https://github.com/AngelKitty/review_the_national_post-graduate_entrance_examination/tree/master/books_and_notes/professional_courses/data_structures_and_algorithms/sources/%E5%9B%BD%E5%AE%B6%E9%9B%86%E8%AE%AD%E9%98%9F%E8%AE%BA%E6%96%87/%E5%9B%BD%E5%AE%B6%E9%9B%86%E8%AE%AD%E9%98%9F2008%E8%AE%BA%E6%96%87%E9%9B%86/%E9%99%88%E4%B8%B9%E7%90%A6%E3%80%8A%E5%9F%BA%E4%BA%8E%E8%BF%9E%E9%80%9A%E6%80%A7%E7%8A%B6%E6%80%81%E5%8E%8B%E7%BC%A9%E7%9A%84%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E9%97%AE%E9%A2%98%E3%80%8B)；
- [notonlysuccess，【专辑】插头 DP](https://web.archive.org/web/20110815044829/http://www.notonlysuccess.com/?p=625)；
