---
create_time: 1709980451
update_time: 1709980451
title: 题解 P10239【 [yLCPC2024] G. 系ぎて】
board: 1
tag:
- 1
extension:
  problem:
    id: P10239
    type: P
    title: '[yLCPC2024] G. 系ぎて'
    difficulty: 8
    submitted: true
    accepted: true
---

## 题解

考虑优秀的拆分方案数本质上是什么。

由于我们要找到一个有序三元组 $(i,j,k)$ 使得 $i\times j\times k=n$，如果当 $i,j$ 确定后 $k$ 也就唯一确定了。也就是说，对于数字 $n$ 来说它的拆分数量就是如下式子：

$$
f(n)=\sum_{i=1}^n\sum_{j=1}^n[ij\mid n]
$$

然后要对 $p=1,2,3,\cdots,n$ 求和，也就是要求：

$$
\sum_{p=1}^n f(p)=\sum_{p=1}^n\sum_{i=1}^p\sum_{j=1}^p[ij\mid p]
$$

做一些推导：

$$
\begin{aligned}
\sum_{p=1}^n\sum_{i=1}^p\sum_{j=1}^p[ij\mid p]&=\sum_{p=1}^n\sum_{i=1}^n\sum_{j=1}^n[ij\mid p] \\
&=\sum_{i=1}^n\sum_{j=1}^n \left\lfloor\dfrac{n}{ij}\right\rfloor\\
&=\sum_{m=1}^n\left\lfloor\dfrac{n}{m}\right\rfloor\sum_{i=1}^n\sum_{j=1}^n [ij=m] \\
\end{aligned}
$$

看上去那个 $\sum_i\sum_j[ij=m]$ 不太好搞，可以先去看前面那个 $\lfloor n/m\rfloor$。看上去是一个整除分块的形式。所以我们枚举整除分块的二元组 $(l,r)$ 如下：

$$
\begin{aligned}
\sum_{m=1}^n\left\lfloor\dfrac{n}{m}\right\rfloor\sum_{i=1}^n\sum_{j=1}^n [ij=m]&=\sum_{(l,r)}\left\lfloor\dfrac{n}{l}\right\rfloor \sum_{i=1}^n\sum_{j=1}^n [l\le ij\le r]\\
&=\sum_{(l,r)}\left\lfloor\dfrac{n}{l}\right\rfloor(S(r)-S(l-1))
\end{aligned}
$$

其中，

$$
\begin{aligned}
S(m)&=\sum_{i=1}^n\sum_{j=1}^n [ij\le m] \\
&=\sum_{i=1}^n \left\lfloor\dfrac{m}{i}\right\rfloor
\end{aligned}
$$

显然也是可以整除分块的。

---

如果这样做，复杂度可以做如下估计：

$$
\begin{aligned}
\sum_{i=1}^{\sqrt n}\sqrt{n/i}+\sqrt i&\approx \int_{0}^{n^{0.5}} \left(\dfrac{n}{i}\right)^{0.5} \mathrm dx \\
&= n^{0.5}\times \left. 2x^{0.5}\right|_{0}^{n^{0.5}}\\
&=2n^{0.75}
\end{aligned}
$$

额，然后因为评测机太慢就 TLE 了（尽管本地看上去能过）。所以需要用一个经典优化，也就是对于一个阈值 $h\ge \sqrt{n}$，设法快速求出 $S(1),S(2),S(3),\cdots,S(h)$，则复杂度可以如下估计：

$$
\begin{aligned}
T(h)+\sum_{i=1}^{n/h}\sqrt{n/i}&\approx T(h)+\int_{0}^{n/h} \left(\dfrac{n}{i}\right)^{0.5} \mathrm dx \\
&=T(h)+ n^{0.5}\times \left. 2x^{0.5}\right|_{0}^{n/h}\\
&=T(h)+2n/h^{0.5}
\end{aligned}
$$

其中 $T(h)$ 表示计算 $S(1),S(2),S(3),\cdots,S(h)$ 的复杂度。

---

回到原题目上，我们现在要对于 $m=1,2,\cdots,h$ 都计算出：

$$
S(m)=\sum_{i=1}^n \left\lfloor\dfrac{m}{i}\right\rfloor=\sum_{i=1}^m \left\lfloor\dfrac{m}{i}\right\rfloor
$$

直接计算比较困难。但可以考虑从 $i$ 的角度出发去更新 $S$ 的值。换言之，对于 $i=1,2,\cdots,h$，去把它的贡献累加到对应的 $S$ 上面去。那么可以发现，对于一个特定的 $i$，它会对 $j=i,i+1,i+2,\cdots,i+i-1$ 位置的 $S(j)$ 产生 $1$ 大小的贡献；对 $j=2i,2i+1,2i+2,\cdots,2i+i-1$ 位置的 $S(j)$ 产生 $2$ 大小的贡献；以此类推。那么可以使用差分数组进行维护，修改差分数组贡献的复杂度为：

$$
O\left(\sum_{i=1}^h \lfloor h/i\rfloor \right)=O(h\log h)
$$

从差分数组还原出 $S$ 的复杂度显然为 $O(h)$。

所以我们得到了一个复杂度为 $O(h\log h+n/h^{0.5})$ 的做法。取 $h=n^{2/3}$ 时可以得到一个比较优秀的 $O(n^{2/3}\log n)$ 的做法（这个不是最优的 $h$，但是最优的 $h$ 我不会表示）。然后就能过了。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;

unsigned long long n;

long long cnt = 0;

const int MAXN = 1e6 + 3;
const int o = 1e6;

unsigned long long F[MAXN];

unsigned long long get_sum(unsigned long long m){
    if(m <= o)
        return F[m];

    unsigned long long ans = 0;
    for(unsigned long long l = 1, r;l <= m;l = r + 1){
        r = min(n, m / (m / l));
        ans += 1ull * (r - l + 1) * (m / l);
        cnt ++;
    }
    return ans;
}
unsigned long long get_ans(){
    unsigned long long ans = 0;
    unsigned long long tmp = 0;
    for(unsigned long long l = 1, r;l <= n;l = r + 1){
        r = min(n, n / (n / l));
        unsigned long long sum = get_sum(r);
        ans += 1ull * (n / l) * (sum - tmp);
        tmp = sum;
    }
    return ans;
}

int main(){
    
    for(int i = 1;i <= o;++ i){
        for(int j = 1;j <= o / i;++ j){
            F[i * j] += j;
            if(i * j + i <= o)
                F[i * j + i] -= j;
        }
    }

    for(int i = 1;i <= o;++ i)
        F[i] += F[i - 1];

    cin >> n;
    cout << get_ans() << endl;
    return 0;
}
