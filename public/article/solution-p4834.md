---
create_time: 1682005234
update_time: 1682005234
title: 题解 P4834 【萨塔尼亚的期末考试】
board: 1
tag:
- 1
extension:
  problem:
    id: P4834
    type: P
    title: 萨塔尼亚的期末考试
    difficulty: 9.8333
    submitted: true
    accepted: true
---

## 题意

计算：

$$
\dfrac{1}{\sum_{i=1}^n i}\sum_{i=1}^n i\times \mathrm{Fib}_i \pmod {998{,}244{,}353}
$$

数据范围：$T$ 组数据，$1\le T\le 10^6$，$1\le n\le 10^9$。

## 题解

斐波那契数列乘上一个数字再求和，很难不想到一个经典结论：

$$
S_n=\sum_{i=1}^n \mathrm {Fib}_i=\mathrm {Fib}_{i+2}-1
$$

证明可用归纳法，这里不再赘述。

回到本题来，$i$ 的存在似乎不太好用这个结论。但如果稍微写过树状数组区间加区间求和，应该会比较熟悉某个变换（因为笔者太菜不太会语言叙述，可以到线段树模板题题解区看下）。应用到这题里来，

$$
\begin{aligned}
\sum_{i=1}^n i\times \mathrm{Fib}_i &=(n+1)S_n-\sum_{i=1}^n (n-i+1)\times \mathrm{Fib}_i\cr
&=(n+1)S_n-\sum_{i=1}^n S_i\cr
&=(n+1)S_n-\sum_{i=1}^n \left(\mathrm {Fib}_{i+2}-1\right) \cr
&=(n+1)S_n+n-S_{n+2}+S_2 \cr
&=(n+1)(\mathrm{Fib}_{n+2}-1)+n-\mathrm{Fib}_{n+4}+1+2\cr
&=(n+1)\mathrm{Fib}_{n+2}-\mathrm{Fib}_{n+4}+2
\end{aligned}
$$

然后套一个矩阵乘法板子就完事了。

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
const int MOD = 998244353;
struct Mat{ int a11, a12, a21, a22; };
struct Vec{ int a11, a12; };
Mat operator *(Mat a, Mat b){
    Mat c;
    c.a11 = (1ll * a.a11 * b.a11 + 1ll * a.a12 * b.a21) % MOD;
    c.a12 = (1ll * a.a11 * b.a12 + 1ll * a.a12 * b.a22) % MOD;
    c.a21 = (1ll * a.a21 * b.a11 + 1ll * a.a22 * b.a21) % MOD;
    c.a22 = (1ll * a.a21 * b.a12 + 1ll * a.a22 * b.a22) % MOD;
    return c;
}
Vec operator *(Vec a, Mat x){
    Vec c;
    c.a11 = (1ll * a.a11 * x.a11 + 1ll * a.a12 * x.a21) % MOD;
    c.a12 = (1ll * a.a11 * x.a12 + 1ll * a.a12 * x.a22) % MOD;
    return c;
}
const int MAXM = 30 + 3;
struct Mat M[MAXM];
int power(int a, int b){
    int r = 1;
    while(b){
        if(b & 1) r = 1ll * r * a % MOD;
        b >>= 1,  a = 1ll * a * a % MOD;
    }
    return r;
}
int main(){
    M[0].a11 = 0, M[0].a12 = 1;
    M[0].a21 = 1, M[0].a22 = 1;
    up(1, 30, i) M[i] = M[i - 1] * M[i - 1];
    up(1, qread(), _){
        int n = qread(), t = 0;
        int p = 2ll * power(n, MOD - 2) * power(n + 1, MOD - 2) % MOD;
        Vec T; T.a11 = 1, T.a12 = 1;
        dn(30, 0, i){
            if((t | 1 << i) <= n + 1)
                t |= 1 << i, T = T * M[i];
        }
        int a = T.a11;
        T = T * M[0];
        T = T * M[0];
        int b = T.a11;
        printf("%d\n", ((1ll * (n + 1) * a - b + 2) % MOD + MOD) * p % MOD);
    }
    return 0;
}
