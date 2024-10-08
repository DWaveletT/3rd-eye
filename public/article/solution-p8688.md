---
create_time: 1682172049
update_time: 1682172049
title: 题解 P8688 【[蓝桥杯 2019 省 A] 组合数问题】
board: 1
tag:
- 1
extension:
  problem:
    id: P8688
    type: P
    title: '[蓝桥杯 2019 省 A] 组合数问题'
    difficulty: 10
    submitted: true
    accepted: true
---

## 题解

首先 $m>n$ 多出来的部分毫无意义，所以第一步 $m\gets \min(n,m)$ 可以避免一些无意义的讨论。

观察到 $1\le n,m\le 10^{18}$ 过大，很明显没法用正常的方法去做。不过注意到 $k\le 10^8$ 是一个质数，可以从这里先下手。

对于一个组合数模一个质数，可以想到 $\text{Lucas}$ 定理：

$$
\dbinom{x}{y}\bmod p=\dbinom{x\operatorname{div} p}{y\operatorname{div} p}\times \dbinom{x\bmod p}{y\bmod p}\bmod p
$$

在使用 $\text{Lucas}$ 定理计算组合数模 $p$ 的值时，通常会递归处理。因此在本题中我们也考虑递归地展开 $\dbinom{x}{y}\bmod p$ 的值。

具体地，我们把 $x$ 和 $y$ 看作 $k$ 进制数并进行分解。也就是，

$$
\begin{aligned}
x&= a_0+a_1k+a_2k^2+\cdots +a_u k^u \cr
y&= b_0+b_1k+b_2k^2+\cdots +b_v k^v \cr
\end{aligned}
$$

其中，$0\le a_i,b_i<k$。那么应用 $\text{Lucas}$ 定理并将其递归展开后，可以得到如下形式：

$$
\dbinom{x}{y}\bmod p=\dbinom{a_0}{b_0}\dbinom{a_1}{b_1}\dbinom{a_2}{b_2}\cdots \dbinom{a_{\max (u,v)}}{b_{\max(u,v)}}\bmod p
$$

在这个式子中我们认为当 $i>u$ 时 $a_i=0$，当 $i>v$ 时 $b_i=0$。

我们随便选取其中某一项，可以发现 $\dbinom{a_i}{b_i}\neq 0$ 的充要条件是 $a\ge b$。这是因为，$a<b$ 时显然 $\dbinom{a}{b}=0$，而 $a\ge b$ 时将组合数展开为阶乘形式，就能发现最终计算结果不可能带有 $p$ 作为因子。

接着发现要存在至少一个 $i$ 满足 $a_i<b_i$，不如从总方案数里减去对于所有 $i$ 都有 $a_i\ge b_i$ 的方案数。总方案数显然为 $nm-\dfrac{m(m+1)}{2}$。但是需要特别小心对总方案数的取模，因为 $n,m$ 均为 $\text{long long}$ 级别，取模稍有不慎就会溢出！

这题到这里其实已经很容易解决了。我们只需要将每一对 $(a_i,b_i)$ 看作数码，跑一个数位 dp 就行。记 $l=\max(u,v)$ 是 $x,y$ 的最长长度，$f(i,0/1,0/1)$ 表示当前处理到第 $i\sim l$ 位，其中第 $i$ 位在 $x$ 中这一位有没有被限制，在 $y$ 中这一位有没有被限制。可以得到状态转移方程式：

$$
\begin{aligned}
f(i,1,1) =&\ f(i+1,1,1)\operatorname{bitand} [a_i>b_i] \cr
f(i,1,0) =&\ f(i+1,1,1)\times \min(a_i+1,b_i)+f(i+1,1,0)\times (a_i+1) \cr
f(i,0,1) =&\ f(i+1,1,1)\times \max(a_i-b_i,0)+f(i+1,0,1)\times (k-a_i) \cr
f(i,0,0) =&\ f(i+1,1,1)\times g(a,b)+f(i+1,1,0)\times g(a,k)\cr
+&\ f(i+1,0,1)\times g(k,b)+f(i+1,0,0)\times g(k,k)
\end{aligned}
$$

其中，

$$
g(n,m)=\sum_{i=0}^{n-1}\sum_{j=0}^{m-1}[i\ge j]
$$

分类讨论一下，容易可以得到 $g$ 的表达式：

$$
g(n,m)=\begin{cases}\dfrac{m(m+1)}{2}+(n-m)m & n\ge m \cr \dfrac{n(n+1)}{2} & n< m\end{cases}
$$

每种情形都很简单，但是讨论起来异常麻烦。读者有兴趣可以自行推导。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN=  60 + 3;
const int MOD = 1e9 + 7;
int A[MAXN], B[MAXN], k;
int F[MAXN][2][2];
void add_to(int &a, int b){
    a = (a + b) % MOD;
}
int calc(int a, int b){
    if(a >= b){
        return (1ll * b * (b + 1) / 2 + 1ll * (a - b) * b) % MOD;
    } else
        return  1ll * a * (a + 1) / 2 % MOD;
}
int dp(int l, bool f, bool g){
    if(F[l][f][g] != -1) return F[l][f][g];
    F[l][f][g] = 0;
    int a = A[l];
    int b = B[l];
    if(f == true && g == true){
        F[l][f][g] = dp(l + 1, true, true) & (a >= b);
    } else if(f == true){
        add_to(F[l][f][g], 1ll * dp(l + 1,  true,  true) * min(a + 1, b) % MOD);
        add_to(F[l][f][g], 1ll * dp(l + 1,  true, false) *    (a + 1)    % MOD);
    } else if(g == true){
        if(a - b > 0)
        add_to(F[l][f][g], 1ll * dp(l + 1,  true,  true) * (a - b) % MOD);
        add_to(F[l][f][g], 1ll * dp(l + 1, false,  true) * (k - b) % MOD);
    } else {
        add_to(F[l][f][g], 1ll * dp(l + 1,  true,  true) * calc(a, b) % MOD);
        add_to(F[l][f][g], 1ll * dp(l + 1,  true, false) * calc(a, k) % MOD);
        add_to(F[l][f][g], 1ll * dp(l + 1, false,  true) * calc(k, b) % MOD);
        add_to(F[l][f][g], 1ll * dp(l + 1, false, false) * calc(k, k) % MOD);
    }
    return F[l][f][g];
}
i64 qread(){
    i64 w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    int T = qread(); k = qread();
    up(1, T, _){
        i64 n = qread(), nn = n; int a = 0;
        i64 m = qread(), mm = m; int b = 0;
        mm = m = min(n, m);
        while(nn) A[++ a] = nn % k, nn /= k;
        while(mm) B[++ b] = mm % k, mm /= k;
        int c = max(a, b);
        up(a + 1, c, i) A[i] = 0;
        up(b + 1, c, i) B[i] = 0;
        up(1, c, i){
            F[i][0][0] = F[i][0][1] = -1;
            F[i][1][0] = F[i][1][1] = -1;
        }
        F[c + 1][1][1] = 1;
        F[c + 1][1][0] = 0;
        F[c + 1][0][1] = 0;
        F[c + 1][0][0] = 0;
        int w = 0;
        add_to(w, dp(1, 0, 0));
        add_to(w, dp(1, 0, 1));
        add_to(w, dp(1, 1, 0));
        add_to(w, dp(1, 1, 1));
        int ans = ((m + 1) % MOD * ((n + 1) % MOD) % MOD - w + MOD) % MOD;
        if(m % 2 == 0)
            ans = (ans - (m / 2) % MOD * ((m + 1) % MOD) % MOD + MOD) % MOD;
        else 
            ans = (ans - m % MOD * (((m + 1) / 2) % MOD) % MOD + MOD) % MOD;
        printf("%d\n", ans);
    }
    return 0;
}
