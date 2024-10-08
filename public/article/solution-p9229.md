---
create_time: 1682178275
update_time: 1682178275
title: 题解 P9229 【扩展九连环】
board: 1
tag:
- 1
extension:
  problem:
    id: P9229
    type: P
    title: 简单九连环
    difficulty: 8
    submitted: true
    accepted: true
---

## 题解

为了方便起见，我们记 $s_i$ 表示**在打算修改第 $i$ 个位置的情况下**，$t_{1},t_2,\cdots,t_{i-1}$ 所应该成为的字符串，也就是给定的字符串 $s$ 的后缀 $s[n-i+2:n]$。特别地，我们记 $s_{0}=000\cdots 000$ 是一个长度为 $n+1$ 的全 $0$ 串。

因为我们最后要使得 $t$ 达到 $111\cdots 111$ 的局面，容易想到一个贪心：

- 先用最少步数把 $t_1,t_2,\cdots,t_{n}$ 给变成 $s_{n+1}$，并修改 $s_{n+1}$ 为 $1$；
- 从上一位开始一直往前找，直到找到一个位置满足 $t_x=0$。那么我们要做的是把 $t_{1},t_2,\cdots,t_{x-1}$ 给变成 $s_x$，然后修改 $t_x$ 为 $1$；
- 从上一位开始一直往前找，直到找到一个位置满足 $t_y=0$。那么我们要做的是把 $t_{1},t_2,\cdots,t_{y-1}$ 给变成 $s_y$，然后修改 $t_y$ 为 $1$；
- 重复以上步骤向前找非 $1$ 元素，将其修改为 $1$。容易发现按照这样的贪心策略，最后的步数肯定是最少的。

在上述过程中频繁出现了「原来 $t_1,t_2,\cdots,t_{u-1}$ 是 $s_u$，现在要将 $t_1,t_2,\cdots,t_{v-1}$ 给修改成 $s_v$」的操作。这启发我们定义一个这样的状态：

- 记 $\mathit{dp}(x,y)$ 表示当前 $t$ 的前缀为 $s_x$，现在修改一次 $y$ 位置，所需要的最少步数。其中 $x=0$ 或者 $x>y$。

同样是按照刚刚所述的贪心的思想，因为我们要修改 $y$ 位置，所以要把 $t_1,t_2,\cdots,t_{y-1}$ 给变成 $s_y$，那从 $t_{y-1}$ 开始向前找，找到最大的 $i$，满足 $s_x[i]\neq s_y[i]$。这个时候就得把 $t_1,t_2,\cdots,t_{i-1}$ 先给变成 $s_i$，所花的步数显然是 $dp(x,i)$。需要注意的是，在修改完后，$t_1,t_2,\cdots,t_{i-1}$ 已经变成了 $s_i$，所以在修改 $i$ 前面某位数字 $j$ 时就不再是计算 $dp(x,j)$，而是计算 $dp(i,j)$。

为此，先令 $l=x$。找到最大的 $i<y$ 满足 $s_{x}[i]\neq s_{y}[i]$，花 $dp(l,i)$ 步数修改 $t_i$，此时 $l\gets i$。修改完后，再找最大的 $i<y$ 满足 $s_{x}[i]\neq s_{y}[i]$，花 $dp(l,i)$ 步数修改 $t_i$，再令 $l\gets i$……如此循环，直到没有这样的 $i$，退出程序。

上述过程可以用代码机械地描述出来，其中 $F$ 数组用于记忆化：

```cpp
int dp(int x, int y){
    if(F[x][y] != -1) return F[x][y];
    F[x][y] = 1; int l = x;
    dn(y - 1, 1, i){
        char a = S[n - y + 1 + i];
        char b = S[n - l + 1 + i];
        if((l == 0 && a == '1') || (l != 0 && a != b)){
            F[x][y] = (F[x][y] + dp(l, i)) % MOD;
            l = i;
        }
    }
    return F[x][y];
}
```

这样我们得到了一个 $\mathcal O(n^3)$ 复杂度的算法，喜提 $56$ 分。下面考虑优化。

这个算法复杂度的瓶颈在于转移时花费的 $\mathcal O(n)$ 时间。如果能设法优化就好了。我们记全过程中 $l$ 取值变化分别为 $l_1=x,l_2,l_3,\cdots$，那么这一连串的算式对 $dp(x,y)$ 的贡献为：

$$
\sum dp(l_i, l_{i+1})
$$

接着注意到：

$$
\begin{aligned}
(l_1,y)&\to l_2, \quad \text{贡献}=dp(l_1,l_2)\cr
(l_2,y)&\to l_3, \quad \text{贡献}=dp(l_2,l_3)\cr
(l_3,y)&\to l_4, \quad \text{贡献}=dp(l_3,l_4)\cr
(l_4,y)&\to l_5, \quad \text{贡献}=dp(l_4,l_5)\cr
\cdots 
\end{aligned}
$$

记 $g(l_0,y)$ 表示在 $l$ 一开始为 $l_0$ 时，产生的总贡献。可以发现转移方程：

$$
g(l_0,y)=\begin{cases}dp(l_0,l)+g(l,y) & l<\min(l_0,y),\ s_{l0}[l]\neq s_y[l] \text{ 且 } l \text{最大} \cr 0  & \text{不存在这样的 } l\end{cases}
$$

怎么找这样的 $l$？暴力枚举。可以写出这样的代码进行记忆化：

```cpp
int dp1(int l, int y){
    if(G[l][y] != -1) return G[l][y];
    G[l][y] = 0;
    dn(min(l == 0 ? n + 1 : l, y) - 1, 1, i){
        char a = S[n - y + 1 + i];
        char b = l == 0 ? '0' : S[n - l + 1 + i];
        if(a != b){
            G[l][y] = (dp1(i, y) + dp2(l, i)) % MOD;
            return G[l][y];
        }
    }
    return G[l][y];
}
int dp2(int x, int y){
    if(F[x][y] != -1) return F[x][y];
    F[x][y] = 1; int l = x;
    F[x][y] = (F[x][y] + dp1(l, y)) % MOD;
    return F[x][y];
}
```

看上去这份代码复杂度仍然是 $\mathcal O(n^3)$，但很神奇的是，它可以在很短时间内通过所有测试数据。

~~优质解答：我不知道。复杂度可能确实是平方，留作读者思考。~~

这里提供另外一个更容易证明复杂度是 $\mathcal O(n^2)$ 的做法。观察上述代码，发现复杂度可能的瓶颈在于使用循环来找两个子串最靠后的不同的字符出现在哪里。那我们只需要再开一个 $h(x,y)$，表示两个分别以 $x,y$ 结尾的子串，到最靠后的不同的字符的距离。容易得到转移方程：

$$
h(x,y)=\begin{cases}h(x-1,y-1)+1 & s[x]=s[y] \cr 0 & s[x]\neq s[y]\end{cases}
$$

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 2e3 + 3;
const int MOD = 1e9 + 7;
int F[MAXN][MAXN]; char S[MAXN];
int n;
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int G[MAXN][MAXN], H[MAXN][MAXN], T[MAXN];
int dp1(int l, int y);
int dp2(int x, int y);
int cc = 0;
int dp3(int x, int y){
    if(H[x][y] != -1) return H[x][y];
    if(S[x] != S[y])
        return H[x][y] = 0;
    return H[x][y] = 1 + dp3(x - 1, y - 1);
}
int dp1(int l, int y){
    if(G[l][y] != -1) return G[l][y];
    G[l][y] = 0;
    int t = 0, i = 0;
    if(l == 0) i = T[y]; else {
        int u = min(l, y) - 1;
        t = dp3(n - y + 1 + u, n - l + 1 + u);
        i = u - t;
    }
    if(i >= 1){
        G[l][y] = (dp1(i, y) + dp2(l, i)) % MOD;
    }
    return G[l][y];
}
int dp2(int x, int y){
    if(F[x][y] != -1) return F[x][y];
    F[x][y] = 1; int l = x;
    F[x][y] = (F[x][y] + dp1(l, y)) % MOD;
    return F[x][y];
}
int main(){
    n = qread();
    scanf("%s", S + 1);
    up(1, n + 1, i){
        dn(i - 1, 1, j) if(S[n - i + 1 + j] == '1') {T[i] = j; break;}
    }
    up(0, n + 1, i) up(0, n + 1, j) F[i][j] = -1;
    up(0, n + 1, i) up(0, n + 1, j) G[i][j] = -1;
    up(1, n + 1, i) up(1, n + 1, j) H[i][j] = -1;
    int ans = 0, l = 0;
    dn(n + 1, 1, i){
        if(l == 0 || S[n - l + 1 + i] != '1')
            ans = (ans + dp2(l, i)) % MOD, l = i;
    }
    printf("%d\n", ans);
    return 0;
}
```

