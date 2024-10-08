---
create_time: 1681834811
update_time: 1681834811
title: 题解 CF958E2 【Guard Duty (medium)】
board: 1
tag:
- 1
extension:
  problem:
    id: CF958E2
    type: CF
    title: Guard Duty (medium)
    difficulty: 10
    submitted: true
    accepted: true
---

彩笔不会反悔贪心，彩笔也没细想斜率优化，彩笔只会面向数据范围做题。

## 题解

首先将 $t$ 排序去重。一个比较贪心的想法是选择 $t_i-t_{i-1}$ 最小的区间，但是这样可能会使得答案不合法。楼上有反悔贪心的做法来处理冲突，这里面向数据范围提供另外一个做法。

注意到虽然 $n$ 很大，但是 $k$ 相较而言要小得多。我们将 $[t_{i-1},t_i]$ 按照区间长度进行排序，大胆猜想，只有前 $3k$ 小的区间是真正重要的。证明：假设我们选择了一个排名在 $3k$ 开外的一个区间 $\alpha$，那么前 $3k$ 小的区间只选择了不超过 $k-1$ 个。而 $k-1$ 个区间最多只能使得另外 $2k-2$ 个区间不能被选，也就是说，这前 $3k$ 个区间里肯定至少有一个区间还是可以选择的。那么将 $\alpha$ 替换成该区间一定不劣。

那么我们只考虑这前 $3k$ 小的区间对应的端点。将这不超过 $6k$ 个端点去重排序，得到一组新的 $t'$，规模明显缩小。

记 $f_{i,j}$ 表示在前 $i$ 个点中，在选择了 $[t'_{i-1},t'_i]$ 这个区间的情况下，总共选了 $j$ 个区间，花费的最小代价。容易得到状态转移方程：

$$
f_{i,j}=\min_{k\le i-2}\{f_{k,j-1}+(t'_i-t'_{i-1})\}=\min_{k\le i-2}\{f_{k,j-1}\}+(t'_i-t'_{i-1})
$$

容易维护 $h_{i,j}=\min_{k\le i}\{f_{k,j}\}$。那么直接暴力转移复杂度为 $\mathcal O(k^2)$，可以通过。滚动数组一下可以将总空间复杂度降至 $\mathcal O(n+k)$。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 1e9;
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
const int MAXN = 5e5 + 3;
const int MAXT = 1e6 + 3;
const int MAXM = 5e3 + 3;
int n, m, k, T[MAXN], P[MAXN], F[3][MAXM], H[3][MAXM];
tuple <int, int, int> G[MAXN];
int main(){
    k = qread(), n = qread();
    up(1, n, i) T[i] = qread();
    sort(T + 1, T + 1 + n);
    n = unique(T + 1, T + 1 + n) - T - 1;
    up(1, n - 1, i){
        G[i] = {T[i + 1] - T[i], i, i + 1};
    }
    sort(G + 1, G + 1 + n - 1);
    up(1, min(n - 1, 3 * k), i){
        int a = get<1>(G[i]);
        int b = get<2>(G[i]);
        P[++ m] = T[a];
        P[++ m] = T[b];
    }
    sort(P + 1, P + 1 + m);
    m = unique(P + 1, P + 1 + m) - P - 1;
    up(1, k, i) F[0][i] = H[0][i] = INF;
    up(1, k, i) F[1][i] = H[1][i] = INF;
    up(1, k, i) F[2][i] = H[2][i] = INF;
    int ans = INF;
    up(2, m, i){
        int a = i % 3, b = (i + 2) % 3, c = (i + 1) % 3;
        up(1, k, j){
            F[a][j] = H[c][j - 1] + P[i] - P[i - 1];
        }
        up(1, k, j)
            H[a][j] = min(H[b][j], F[a][j]);
        ans = min(ans, F[a][k]);
    }
    printf("%d\n", ans);
    return 0;
}
