---
create_time: 1682000403
update_time: 1682000403
title: 题解 P4934 【礼物】
board: 1
tag:
- 1
extension:
  problem:
    id: P4934
    type: P
    title: 礼物
    difficulty: 9.1236
    submitted: true
    accepted: true
---

## 题解

注意到 $a\operatorname{bitand} b\le a$ 且 $a\operatorname{bitand} b\le b$。如果我们把 $a,b$ 视作对应二进制里面 $1$ 所在的下标的集合（比如 $13=1101_{(2)}$ 可看作集合 $\{0,2,3\}$），那么题设条件等价于 $a \subseteq b$ 或者 $b\subseteq a$。容易发现当且仅当 $a=b$ 时同时满足 $a\subseteq b$ 与 $b\subseteq a$，那么先把相同值的元素合并在一起。那么不能放在一起的 $a,b$ 之间的关系只能是 $a\subsetneq b$ 或者 $b\subsetneq a$。

- 这样的关系具有传递性：$a\subsetneq b,b\subsetneq c$，则 $a \subsetneq c$；
- 这样的关系不会形成环，这是因为若 $a \subsetneq b$ 则有 $|a|<|b|$，如果成环就会出现 $|a|<|a|$ 的矛盾。

如果我们把这种关系建成图（从 $a$ 向 $b$ 连边），那么这必定是一个有向无环图。考察一条从 $a$ 到 $b$ 的路径，那么这条路径上任何两个元素都不能放在同一个盒子里，故答案不会小于最长路的长度。最后给出的构造方法证明了最少盒子数量就是最长路的长度。有向无环图的最长路容易使用 dp 计算得出。但是注意到我们已经将相同的元素缩成了一个点，所以最长路的定义应该为**这条路径上的点权之和**。下面考虑怎么建立这个有向无环图。

我们发现如果暴力地枚举 $a,b$ 连边，不光枚举点对的时间复杂度会超时，最后建出来的图的规模也有可能是 $\mathcal O(n^2)$ 级别（考察一些形如 $01111,10111,11011,11101,11110$ 的元素作为 $b$，那么对于像 $10000,01000,00100,00010,00001$ 的 $a$，它会和一堆 $b$ 连边，图的规模就能达到 $\mathcal O(n^2)$）。

然而因为我们只需要计算图的最长边，考察一些传统的技巧（比如可以类比线段树优化建图，用数量较少的点来将一堆边简化），容易想到（可能也没那么容易），我们将 $a$ 连向一些虚拟点，同时将这些虚拟点再往别的点去连，总归要满足 $a$ 通过虚拟点+实际存在的点能够到达的点肯定都是 $a$ 的超集。

解决方案到这里应该已经呼之欲出了。若 $a\neq a\operatorname{bitor} 2^i$，就将 $a$ 与 $a\operatorname{bitor} 2^i$ 连边。这里的 $a$ 既可以是个实际存在的点，也可以是个虚拟点。这样连边之后每个点能够到达的位置仍然是它的超集。对于虚拟点，将它的点权赋值为 $0$ 就好了。

下面是构造的事情。假设点 $a$（点权记为 $w$）连向的所有节点中，这些节点放进的编号最大的箱子的编号是 $x$，那么就往 $x+1,x+2,x+3,\cdots,x+w$ 号箱子里放元素 $a$ 即可。可以发现这个 $x$ 的值总是与计算最长路用的那个 dp 数组的值相同，所以可以保证不会用多余的箱子。

总时间复杂度为 $\mathcal O(k2^k+n)$。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= (1 << 20) + 3;
const int MAXM=  20 + 3;
vector <int> V[MAXN];
int H[MAXN], A[MAXN], I[MAXN];
int n, k, ans;
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    n = qread(), k = qread();
    up(1, n, i){
        int a = qread(); ++ H[a];
    }
    dn((1 << k) - 1, 0, i){
        up(0, k - 1, j) if((i & 1 << j) == 0){
            A[i] = max(A[i], A[i | 1 << j]);
            I[i] = max(I[i], I[i | 1 << j]);
        }
        up(1, H[i], j){
            V[I[i] + j].push_back(i);
        }
        I[i] += H[i];
        A[i] += H[i];
        ans = max(ans, A[i]);
    }
    puts("1");
    printf("%d\n", ans);
    up(1, ans, i){
        printf("%d ", V[i].size());
        for(auto &x : V[i])
            printf("%d ", x);
        puts("");
    }
    return 0;
}
