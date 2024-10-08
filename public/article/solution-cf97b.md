---
create_time: 1681795332
update_time: 1681795332
title: 题解 CF97B 【Superset】
board: 1
tag:
- 1
extension:
  problem:
    id: CF97B
    type: CF
    title: Superset
    difficulty: 8
    submitted: true
    accepted: true
---

## 题解

平面上一堆点的点对题，首先想到平面分治（什）

我们将所有点按照 $x$ 作为第一关键字进行排序。假设现在需要构造一个方案使得 $[l,r]$ 内所有点加上新加的点构成了一个 Superset。

选取区间中点 $p=\left\lfloor\dfrac{l+r}{2}\right\rfloor$。那么这个区间 $[l,r]$ 就被剖成了两个区间 $[l,p]$ 和 $[p+1,r]$。现在假定对左边的点集构造了一个合法的超集 $P$，对右边的点击构造了一个合法的超集 $Q$。那么对于点对 $(\alpha,\beta)\in P$ 一定合法，对于点对 $(\alpha,\beta)\in Q$ 一定合法，不过还不确定 $\alpha\in P,\beta\in Q$ 是否合法。

一种构造方案是，考虑竖直线 $x=p_x$，我们将 $P$ 和 $Q$ 里面所有的点都向 $x=p_x$ 做垂线，垂足作为新添加的点。不妨将现在 $x=p_x$ 上的点放在集合 $K$ 里。

容易发现，对于任意 $\alpha\in P,\beta \in Q$，如果 $\alpha$ 和 $\beta$ 的 $y$ 值相同则一定合法；否则这个矩形一定跨过 $x=p_x$，由于我们的构造方案，矩形与 $x=p_x$ 的交点都在 $K$ 里面，所以是合法的。

对于 $\alpha\in P$ 和 $\beta\in K$，若水平则直接合法，否则一定有 $(\beta _x,\alpha_y)\in K$ 合法；  
对于 $\alpha\in Q$ 和 $\beta\in K$，若水平则直接合法，否则一定有 $(\beta _x,\alpha_y)\in K$ 合法。

然后对于均来自 $K$ 的点对，由于在同一条竖直线上，所以一定合法。

$P\cup Q\cup K$ 里面不同的 $y$ 坐标个数是和 $P\cup Q$ 相同的，由此可以推知，归并过程中新加入的点的个数不会超过原来的点集 $A$ 在 $[l, r]$ 区间上的点数。所以最终整个点集的大小为 $\mathcal O(n\log n)$，可以通过。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
const int MAXN = 1e4 + 3;
const int MAXM = 2e5 + 3;
using pii = pair<int, int>;
map<pii, bool> M;
int n, m; pii P[MAXN], Q[MAXM];
void solve(int l, int r){
    if(l > r) return;
    int t = P[l + r >> 1].first;
    int u = l + r >> 1; while(u > l && P[u - 1].first == t) -- u;
    int v = l + r >> 1; while(v < r && P[v + 1].first == t) ++ v;
    solve(l, u - 1), solve(v + 1, r);
    up(l, r, i) if(i < u || i > v){
        auto p = make_pair(t, P[i].second);
        if(!M.count(p))
            M[p] = true, Q[++ m] = p;
    }
}
int main(){
    n = qread();
    up(1, n, i)
        P[i].first  = qread(),
        P[i].second = qread();
    up(1, n, i) Q[++ m] = P[i], M[P[i]] = true;
    sort(P + 1, P + 1 + n), solve(1, n);
    printf("%d\n", m);
    up(1, m, i)
        printf("%d %d\n", Q[i].first, Q[i].second);
    return 0;
}
