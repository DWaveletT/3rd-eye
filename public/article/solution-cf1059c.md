---
create_time: 1686276329
update_time: 1686276329
title: 题解 CF1059C【Sequence Transformation】
board: 1
tag:
- 1
extension:
  problem:
    id: CF1059C
    type: CF
    title: Sequence Transformation
    difficulty: 5
    submitted: true
    accepted: true
---

非常有趣问题。

## 题解

我们要让答案的字典序最大。注意到答案序列最前面应该都是 $1$，为了让字典序最大，容易想到这两点：

- 要让 $1$ 序列的长度尽量小；
- 要让 $1$ 序列后面那个数字尽量大。这里的“最大”是在 $1$ 序列长度最小的前提上的。

可以发现 $1$ 序列后面那个数字就是删除完若干次操作后整个序列的 $\gcd$。记这个 $\gcd$ 的值为 $d$，那么为了让所有数字的最大公约数是 $d$，至少要删除 $n-\left\lfloor\dfrac{n}{d}\right\rfloor$ 个数字，并且删除的数字最少的唯一方案，就是把那些不是 $d$ 的倍数的数删除。同时，需要删除的数的个数就是 $1$ 序列的长度。

容易发现 $n-\left\lfloor\dfrac{n}{d}\right\rfloor$ 关于 $d$ 是单调不减的。进一步发现，$n-\left\lfloor\dfrac{n}{2}\right\rfloor \le n-\left\lfloor\dfrac{n}{3}\right\rfloor$，$n-\left\lfloor\dfrac{n}{2}\right\rfloor \textcolor{red}{<} n-\left\lfloor\dfrac{n}{4}\right\rfloor$（~~其实是我打表发现的~~），所以 $d$ 的候选只有 $2$ 和 $3$。因为我们还要让 $1$ 序列后面那个数字尽量大，所以出现取等的情况时应该取 $d=3$。

接着注意到，我们按照最优策略使得剩下来的所有数字的 $\gcd$ 为 $d$ 后，这些数字应该恰好为 $1\times d,2\times d,\cdots,\left\lfloor\dfrac{n}{d}\right\rfloor \times d$。无论怎么删除这里面的数字，最大公约数都肯定还是 $d$ 的倍数。于是发现整个问题变成 $n\gets \left\lfloor\dfrac{n}{d}\right\rfloor$ 的子问题了。可以递归求解。

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
int main(){
    int n = qread(), t = 1;
    while(1){
        if(n == 1){
            printf("%d\n", t); return 0;
        }
        int a = n / 2;
        int b = n / 3;
        if(b >= a){
            up(1, n - b, i) printf("%d ", t);
            n = b, t *= 3;
        } else {
            up(1, n - a, i) printf("%d ", t);
            n = a, t *= 2;
        }
    }
    return 0;
}
