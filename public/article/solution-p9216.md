---
create_time: 1681488217
update_time: 1681488217
title: '题解 P9216 【[入门赛 #11] 写大作业 (Hard Version)】'
board: 1
tag:
- 1
extension:
  problem:
    id: P9216
    type: P
    title: '[入门赛 #11] 写大作业 (Hard Version)'
    difficulty: 6
    submitted: true
    accepted: true
---

## 题解

如何判定两个序列可通过重新排列使得两数列相等？不妨想想有什么东西是和序列有关而又可以重新排列的。我们可以想到这样的一个多项式：

$$
F_a(x)=(x+a_1)(x+a_2)\cdots(x+a_{n-1})(x+a_n)
$$

那么如果 $F_a(x)=F_b(x)$，就说明 $a,b$ 可以通过重排变得相同。

但本题中我们显然不可能跑个分治 FFT 啥的（况且复杂度估计要炸）。因为我们只是要判定两个多项式是否相同，一种简便可靠的做法是，选取 $k$ 个不同的 $x$ 的值 $x_1,x_2,\cdots x_k$，分别带入两个多项式进行计算。那么两个多项式相同的一个必要条件显然是：

$$
\begin{cases}F_a(x_1)=F_b(x_1)\cr F_a(x_2)=F_b(x_2)\cr\cdots \cr F_a(x_k)=F_b(x_k)\cr\end{cases}
$$

然后考虑到写高精度复杂度还是会爆炸的，所以将等式两边同时对一个模数 $M$ 取模（不同的模数也行，反正也卡不掉，这里只是为了实现方便）。因此一个必要条件是：

$$
\begin{cases}F_a(x_1)\equiv F_b(x_1) & \pmod M\cr F_a(x_2)\equiv F_b(x_2) & \pmod M\cr\cdots \cr F_a(x_k)\equiv F_b(x_k) & \pmod M\end{cases}
$$

具体实现上，我们对于序列 $a$ 计算出一个序列 $H_a=\{F_a(x_1)\bmod M,F_a(x_2)\bmod M,\cdots,F_a(x_k)\bmod M\}$ 作为它的特征值（相当于哈希值）。判定两个序列 $a,b$ 是否可通过重新排列变得相等，只要判断 $H_a$ 和 $H_b$ 是否相等就行，正确率应该很高（~~我猜的~~）。复杂度是 $\mathcal O(k)$。

然后对于序列拼接操作，显然 $H_{a+b}=H_a\cdot H_b$，这是因为 $F_{a+b}(x)=F_a(x)F_b(x)$，把 $F$ 的定义式展开就能得到。所以复杂度仍然是 $\mathcal O(k)$。

总时间复杂度为 $\mathcal O(nk+qk)$。下面代码中取了 $k=30$。

经过实测即使 $k=1$ 也能通过所有数据……

## 代码

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
const int MAXN = 5e5 + 3;
const int MAXM = 5e5 + 3;
const int MAXK = 30 + 3;
const int MOD  = 1e9 + 7;
int S[MAXN][MAXK], T[MAXK], k = 30, n, q;
mt19937 MT;
int main(){
    n = qread(), q = qread();
    uniform_int_distribution <int> U(0, MOD - 1);
    up(1, k, i) T[i] = U(MT);
    up(1, n, i){
        int m = qread();
        up(1, k, j) S[i][j] = 1;
        up(1, m, j){
            int a = qread();
            up(1, k, t)
                S[i][t] = 1ll * S[i][t] * (a + T[t]) % MOD;
        }
    }
    int ans = 0;
    up(1, q, i){
        int o = qread();
        if(o == 1){
            int x = qread(), y = qread();
            up(1, k, j)
                S[y][j] = 1ll * S[y][j] * S[x][j] % MOD;
        } else {
            int x = qread(), y = qread();
            bool flag = true;
            up(1, k, j)
                if(S[x][j] != S[y][j])
                    flag = false;
            if(flag) ans ^= i;
        }
    }
    printf("%d\n", ans);
    return 0;
}
