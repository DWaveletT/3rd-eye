---
create_time: 1687411454
update_time: 1687411454
title: 题解 CF553A 【Kyoya and Colored Balls】
board: 1
tag:
- 1
extension:
  problem:
    id: CF553A
    type: CF
    title: Kyoya and Colored Balls
    difficulty: 5
    submitted: true
    accepted: true
---

## 题解

记颜色为 $i$ 的球的个数为 $c_i$。

考察颜色编号最大的那一种球（即颜色为 $k$ 的球）。容易发现，最后一个被取走的球的颜色一定为 $k$。那么对于剩下来的那 $c_{k}-1$ 个球，总是可以任意安排取走的顺序而不影响到别的球。

当我们把编号为 $k$ 的球安排好之后，最大的颜色编号变成了 $k-1$。按照上述过程如法炮制安排好颜色为 $k-1$ 的球，接着安排颜色为 $k-2$ 的球，以此类推，直到安排完所有的球，就可以得到最终答案：

$$
\mathit{ans}=\prod_{i=1}^k \dbinom{n-\sum_{j=i+1}^{k} c_j - 1}{c_i - 1}
$$

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
const int MAXN = 1e3 + 3;
const int MOD  = 1e9 + 7;
int C[MAXN], n, T[MAXN][MAXN], ans = 1;
int main(){
    int k = qread(), t = 1e3;
    up(0, t, i) T[i][0] = 1;
    up(1, t, i){
        up(1, i, j){
            T[i][j] = (T[i - 1][j] + T[i - 1][j - 1]) % MOD;
        }
    }
    up(1, k, i) C[i] = qread(), n += C[i];
    dn(k, 1, i){
        ans = 1ll * ans * T[n - 1][C[i] - 1] % MOD;
        n -= C[i];
    }
    printf("%d\n", ans);
    return 0;
}
