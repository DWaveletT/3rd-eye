---
create_time: 1674639368
update_time: 1674639368
title: 题解 P8967 【追寻 | Pursuit of Dream】
board: 1
tag:
- 1
extension:
  problem:
    id: P8967
    type: P
    title: 追寻 | Pursuit of Dream
    difficulty: 10
    submitted: true
    accepted: true
---

## 题解

考虑设 $f_i$ 表示，从第 $i$ 个地点出发，到达终点的期望步数。特别地，记 $f_0$ 表示从起点 $(0,0,\cdots,0)$ 出发到达终点的期望步数。比较显然的思路是设法算出 $f_i$ 之间的表达式。

从一个点出发，走过了若干步后，总是会到达以下两个情况之一：

- 失足从 $k$ 个起点中的某一个从头来过；
- 顺利到达终点。

前者很不容易计算，因此考虑先算出第二种情况的概率，再回来算出第一种情况。

从 $(a_1,a_2,\cdots,a_n)$ 到达 $(d_1,d_2,\cdots,d_n)$ 的总步数，显然一定是 $s=\sum |d_i-a_i|$。发生的概率是多少呢？需要注意以下两种情况：

- 在前进的时候不慎从头开始了；
- 某一维的值超过了对应的 $d_i$，此时不可能顺利到达终点，只有可能从某个地方从头来过。

前者需要保证在 $s$ 步内都没有失足，后者则可以转化为从 $s$ 个球里取 $d_1-a_1$ 个红球，取 $d_2-a_2$ 个蓝球，……，这样的组合问题。于是得到概率：

$$
q=\dfrac{s!}{(d_1-a_1)!(d_2-a_2)!\cdots (d_n-a_n)!\times n^s}\times (1-p)^s
$$

特别地，若存在 $d_i<a_i$，则 $q=0$。

对于 $i=0,1,\cdots,k$ 都可以计算出对应的 $q_i$。接下来考虑失足的情况。

似乎 $f_i$ 的值会与 $f_j\ (j=1,2,\cdots,k)$ 有关。但是我们不希望用 $f_j\ (j=1,2,\cdots,k)$ 写到 $f_i$ 的表达式中，这会变成一个 $k$ 阶的线性方程组，用朴素的高斯消元无法求解。但是注意到从 $f_i$ 失足掉进某一个 $f_j$ 中，这个过程与 $i$ 无关。于是考虑设一个中间变量 $g$ 表示从一个失足过程开始（还没有决定好掉到 $1\sim k$ 中的哪个位置）需要的期望步数。

容易得到 $g$ 的表达式：

$$
g=\sum_{i=1}^k \dfrac{p_i}{p}f_i
$$

现在继续计算 $f$ 的表达式：

$$
f_i=q_is_i+(1-q_i)g+?
$$

到这一步，发现很难表示出从起点出发一直到失足前到底走了多少步。考虑使用容斥，假设压根没有终点只是到处乱走，那么在失足前的期望步数显然就是 $\dfrac{1}{p}$。现在加上了终点，那么走到终点之后再失足这一部分的期望步数就消失了。这一部分的期望应该是 $q_i\times \left(\dfrac{1}{p}+s_i\right)$。换言之，问号部分的值应该为：

$$
\frac{1}{p}-q_i\times \left(\dfrac{1}{p}+s_i\right)
$$

整理一下 $f$：

$$
f_i=(1-q_i)\left(g+\frac{1}{p}\right)
$$

现在考虑解出 $g$。将 $f_i$ 代入到 $g$ 的表达式里：

$$
g=\sum_{i=1}^k \dfrac{p_i}{p}\times(1-q_i)\left(g+\frac{1}{p}\right)
$$

将含有 $g$ 的项全部整理到等号的左侧：

$$
\left(1+\sum_{i=1}^k \dfrac{p_i}{p}(q_i-1)\right)g=\sum_{i=1}^k\dfrac{p_i}{p}\times \left(\dfrac{1}{p}-\dfrac{q_i}{p}\right)
$$

其中 $q_i,s_i,p_i$ 都很容易计算，那么就可以愉快地解出 $g$ 了。将其代入到 $f$ 的表达式里，即可解出 $f$ 的值。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MOD = 998244353;
int qread(){
    int w=1,c,ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int qpower(int x, int y){
    int r = 1;
    while(y){
        if(y & 1) r = 1ll * r * x % MOD;
        x = 1ll * x * x % MOD, y >>= 1;
    }
    return r;
}
const int MAXT = 1e7 + 3;
const int MAXN = 1e2 + 3;
const int MAXK = 1e4 + 3;
int o = 1e7, n, k, p, g;
int D[MAXN], S[MAXK], Q[MAXK], P[MAXK], F[MAXK];
int M[MAXT], N[MAXT], X[MAXT], Y[MAXT], A[MAXK][MAXN];
int main(){
    n = qread(), k = qread();
    M[0] = 1, N[0] = 1, X[0] = 1;
    up(1, o, i) M[i] = 1ll * M[i - 1] *   i  % MOD;
    up(1, o, i) X[i] = 1ll * X[i - 1] * M[i] % MOD;
    Y[o] = qpower(X[o], MOD - 2);
    dn(o, 1, i) Y[i - 1] = 1ll * Y[i] * M[i    ] % MOD;
    up(1, o, i) N[i]     = 1ll * Y[i] * X[i - 1] % MOD;
    up(1, n, i) D[i] = qread();
    up(1, k, i){
        up(1, n, j) A[i][j] = qread(); P[i] = qread();
        P[i] = 1ll * P[i] * qpower(1e8, MOD - 2) % MOD;
        p = (p + P[i]) % MOD;
    }
    up(0, k, i){
        bool f = 0;
        up(1, n, j) if(D[j] < A[i][j]) f = true;
        up(1, n, j) S[i] += D[j] - A[i][j];
        if(f == true) Q[i] = 0; else {
            Q[i] = 1ll * M[S[i]]
                * qpower(qpower(n, S[i]), MOD - 2) % MOD 
                * qpower(1 - p + MOD, S[i]) % MOD;
            up(1, n, j) Q[i] = 1ll * Q[i] * N[D[j] - A[i][j]] % MOD;
        }
    }
    int u = 0, v = 1, np = qpower(p, MOD - 2);
    up(1, k, i)
        u = (u + 1ll * P[i] * np % MOD * (np - 1ll * Q[i] * qpower(p, MOD - 2) % MOD + MOD) % MOD) % MOD;
    up(1, k, i)
        v = (v + 1ll * P[i] * np % MOD * (Q[i] - 1 + MOD) % MOD) % MOD;
    g = 1ll * u * qpower(v, MOD - 2) % MOD;
    up(0, k, i)
        F[i] = (1ll * (1 - Q[i] + MOD) * g % MOD + np - 1ll * Q[i] * qpower(p, MOD - 2) % MOD + MOD) % MOD;
    printf("%d\n", F[0]);
    return 0;
}
