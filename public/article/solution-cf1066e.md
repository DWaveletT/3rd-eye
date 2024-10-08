---
create_time: 1684327632
update_time: 1684327632
title: 题解 CF1066E【Binary Numbers AND Sum】
board: 1
tag:
- 1
extension:
  problem:
    id: CF1066E
    type: CF
    title: Binary Numbers AND Sum
    difficulty: 7.425
    submitted: true
    accepted: true
---

## 题解

注意到 $A$ 不动，始终是 $B$ 在向右移动。我们考虑 $A$ 的每一个位上的 $1$ 对答案的贡献次数。显然从右往左数第 $i$ 位上的 $1$ 贡献的次数，就是 $B$ 里面从右往左数，第 $i$ 位以及往左的所有 $1$ 的个数。

可以拿如下这个例子来理解：

$$
\begin{array}{rl}
10110\textcolor{red} 10101 & :A \cr\hline
111010\textcolor{red}11111 & : B_0 \cr
11101\textcolor{red}01111 & : B_1 \cr
1110\textcolor{red}10111 & : B_2 \cr
111\textcolor{red}01011 & : B_3 \cr
11\textcolor{red}10101 & : B_4 \cr
1\textcolor{red}11010 & : B_5 \cr
\textcolor{red}11101 & : B_6 \cr
1110 & : B_6 \cr
\cdots
\end{array}
$$

我们观察与 $A$ 当中标红的那个 $1$，与它进行二进制与操作后，产生贡献的次数就是 $B$ 中标红的部分为 $1$ 的位的个数。

那么我们对 $B$ 求一个后缀和即可。时间复杂度 $\mathcal O(n+m)$。

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
const int MAXN = 2e5 + 3;
const int MOD  = 998244353;
char A[MAXN], B[MAXN];
int S[MAXN], ans = 0, t = 1;
int main(){
    int n = qread(), m = qread();
    scanf("%s", A + 1);
    scanf("%s", B + 1);
    dn(m, 1, i) S[i] = S[i + 1] + (B[i] == '1');
    dn(n, 1, i){
        if(m - (n - i) + 1 >= 1 && A[i] == '1')
            ans = (ans + 1ll * (S[1] - S[m - (n - i) + 1]) * t) % MOD;
        t = 2ll * t % MOD;
    }
    printf("%d\n", ans);
    return 0;
}
