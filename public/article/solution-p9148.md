---
create_time: 1678615410
update_time: 1678615410
title: 题解 【P9148 除法题】
board: 1
tag:
- 1
extension:
  problem:
    id: P9148
    type: P
    title: 除法题
    difficulty: 6
    submitted: true
    accepted: true
---

## 题解

注意到我们要统计 $\Big\lfloor\dfrac{a}{b}\Big\rfloor\Big\lfloor\dfrac{a}{c}\Big\rfloor\Big\lfloor\dfrac{b}{c}\Big\rfloor$ 的和。只有当 $a\ge b$，$a\ge c$，$b\ge c$ 的时候才会对结果有贡献。再加上题设给出的 $a,b,c$ 互不相等的条件，于是一定有 $a>b>c$。

最暴力的想法是，分别枚举 $a,b,c$ 的值再统计贡献。时间复杂度为 $\mathcal O(n^3)$，铁定超时。于是我们希望只枚举 $a,b$，然后快速求出 $c$ 的贡献。枚举完 $a,b$ 之后 $\Big\lfloor\dfrac{a}{b}\Big\rfloor$ 的值已经确定，我们更加关心**后面两个除式的值**。

可以反过来去枚举 $c$，然后设法维护这个 $c$ 对 $a,b$ 的贡献。

注意到在 $c$ 确定的情况下 $\Big\lfloor\dfrac{a}{c}\Big\rfloor$ 和 $\Big\lfloor\dfrac{b}{c}\Big\rfloor$ 的可能取值都只有 $\Big\lfloor\dfrac{v}{c}\Big\rfloor$ 个（$v$ 是值域）。考虑分别枚举 $\Big\lfloor\dfrac{a}{c}\Big\rfloor$ 和 $\Big\lfloor\dfrac{b}{c}\Big\rfloor$ 的值。此时对应的 $a$ 的范围和 $b$ 的范围都是可以计算得到，不妨设 $a\in[a_1,a_2]$，$b\in [b_1,b_2]$（由于 $a\neq c$，$b\neq c$，记得抠掉 $a=c$ 或者 $b=c$ 的情况）。那么点对 $(a,b)$ 应该是一个矩形。考虑维护一个二维数表，第 $i$ 行第 $j$ 列的值表示 $a=i$，$b=j$ 的贡献。我们要做的事情就是对这个二维数表做一个子矩阵加法，这是可以用**二维差分**在单次 $\mathcal O(1)$ 的情况下做到的。所有 $c$ 的贡献计算完后，再分别枚举 $a,b$ 的值计算贡献。

## 时间复杂度

枚举 $c$ 的复杂度为：

$$
\sum_{i=1}^v\dfrac{v}{i}\times \dfrac{v}{i}=v^2\times \sum_{i=1}^v\dfrac{1}{i^2}
$$

欧拉已经证明了 $\sum \dfrac{1}{i^2}$ 是收敛的，且收敛到 $\dfrac{\pi^2}{6}$。所以这部分复杂度是 $\mathcal O(v^2)$。

最后枚举 $a,b$ 的时间复杂度显然也是 $\mathcal O(v^2)$。所以总时间复杂度为 $\mathcal O(v^2)$。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 5000 + 3;
int n, m = 5000, A[MAXN]; bool C[MAXN];
unsigned ans = 0, D[MAXN][MAXN];
int qread(){
    int w=1,c,ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    n = qread();
    up(1, n, i) A[i] = qread(), C[A[i]] = true;
    up(1, m, c) if(C[c]){
        up(1, m, i){
            int a1 = c * i, a2 = min(c * (i + 1) - 1, m);
            if(a1 > a2) break;
            up(1, m, j){
                int b1 = c * j, b2 = min(c * (j + 1) - 1, m);
                if(b1 > b2) break;
                a1 = max(a1, c + 1);
                b1 = max(b1, c + 1);
                D[    a1][    b1] += i * j;
                D[    a1][b2 + 1] -= i * j;
                D[a2 + 1][    b1] -= i * j;
                D[a2 + 1][b2 + 1] += i * j;
            }
        }
    }
    up(1, m, i) up(1, m, j){
        D[i][j] += D[i][j - 1];
    }
    up(1, m, i) up(1, m, j){
        D[i][j] += D[i - 1][j];
    }
    up(1, m, a) up(1, m, b) if(a > b){
        if(C[a] && C[b])
            ans += (a / b) * D[a][b];
    }
    printf("%u\n", ans);
    return 0;
}
```

## 后记

直接观察差分数组，可以发现很明显的规律。根据这个规律可以大幅减小常数（但是没办法优化时间复杂度）。

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 5000 + 3;
int n, m, A[MAXN]; bool C[MAXN];
unsigned ans = 0, D[MAXN][MAXN];
int qread(){
    int w=1,c,ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    n = qread();
    up(1, n, i) A[i] = qread(), m = max(m, A[i]), C[A[i]] = true;
    up(1, m, c) if(C[c]){
        for(int i = 2 * c;i <= m;i += c)
        for(int j = 2 * c;j <= m;j += c)
            ++ D[i][j];
        for(int i = 2 * c;i <= m;i += c)
            ++ D[c + 1][i], ++ D[i][c + 1];
        ++ D[c + 1][c + 1];
    }
    up(1, m, i) up(1, m, j){
        D[i][j] += D[i - 1][j] + D[i][j - 1] - D[i - 1][j - 1];
        if(C[i] && C[j] && i > j)
            ans += (i / j) * D[i][j];
    }
    printf("%u\n", ans);
    return 0;
}
