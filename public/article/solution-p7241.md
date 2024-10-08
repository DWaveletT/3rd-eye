---
create_time: 1682753786
update_time: 1682753786
title: 题解 P7241 【[COCI2019-2020#4] Holding】
board: 1
tag:
- 1
extension:
  problem:
    id: P7241
    type: P
    title: '[COCI2019-2020#4] Holding'
    difficulty: 8
    submitted: true
    accepted: true
---

## 题解

容易发现交换 $i,j$ 两个元素并花费 $|i-j|$ 元，相当于进行了 $|i-j|$ 次邻项交换。因此原命题等价于进行不超过 $k$ 次邻项交换使得 $[l, r]$ 区间内的元素之和最小。

我们考虑在最终序列里，有哪些元素被选择进 $[l, r]$。将这些元素在原数列中的下标按照从小到大排列记为 $p_1,p_2,\cdots,p_m$，那么在最优决策下，$p_1$ 移动到了 $l$，$p_2$ 移动到了 $l+1$，……，$p_i$ 移动到了 $l+i-1$。为什么？假定移动两个元素 $i,j$ 时，路径发生了交叉，那么必然发生了交换 $i,j$ 两个元素的情形，这一定会更劣。

那么 $\mathrm{dp}$ 设计就非常简单。设前 $i$ 个数，选择了 $j$ 个，花费了恰好 $t$ 元的情况下，选出的元素的最小值为 $f_{i,j,t}$，容易得到状态转移方程：

$$
f_{i,j,t}=\min\{f_{i-1,j,t},f_{i-1,j-1,t-|l+j-i-1|}+a_i\}
$$

直接暴力转移，时间复杂度为 $\mathcal O(n^2k)$。使用滚动数组优化空间，空间复杂度为 $\mathcal O(nk)$。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 1e9 + 1;
const int MAXN= 100 + 3;
const int MAXM= 1e4 + 3;
int F[2][MAXN][MAXM], o, n, m, l, r, t, A[MAXN];
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    n = qread(), l = qread(), r = qread(), m = qread();
    t = r - l + 1;
    up(1, n, i) A[i] = qread();
    up(0, t, i) up(0, m, j)
        F[0][i][j] = F[1][i][j] = INF;
    F[o][0][0] = 0;
    up(1, n, i) {
        up(0, t, j) up(0, m, k){
            int w = abs(l + j - i - 1);
            F[!o][j][k] = F[o][j][k];
            if(k >= w && j >= 1)
                F[!o][j][k] = min(F[!o][j][k], F[o][j - 1][k - w] + A[i]);
        }
        o ^= 1;
    }
    int ans = INF;
    up(0, m, i) ans = min(ans, F[o][t][i]);
    printf("%d\n", ans);
    return 0;
}
