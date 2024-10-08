---
create_time: 1675142789
update_time: 1675142789
title: 题解 【CF1380G Circular Dungeon】
board: 1
tag:
- 1
extension:
  problem:
    id: CF1380G
    type: CF
    title: Circular Dungeon
    difficulty: 10
    submitted: true
    accepted: true
---

## 题解

虽然套了层期望的壳，但很容易发现期望值就是从每个点出发获得的收益之和，除以 $n$。

现在考虑这样一串宝箱的收益（其中 $\mathrm{Fake}$ 表示假宝箱）：

$$
[b_1, b_2,b_3,\cdots b_k,\mathrm{Fake}]
$$

容易发现它们的贡献为：

$$
(b_1+b_2+\cdots+b_k)+(b_2+b_3+\cdots+b_k)+\cdots=b_1+2b_2+3b_3+\cdots+kb_k
$$

也就是说，越靠近 $\mathrm{Fake}$，它的权重越大。并且权重就是到 $\mathrm{Fake}$ 走过的步数。容易贪心地去想，将 $b$ 数组从大到小排列（可以用邻项交换证明）。

可以进一步推广这个结论。假设一共有 $k$ 个假宝箱，那么权值为 $1$ 的宝箱数量最多有 $k$ 个（可以放在每个假宝箱后一个位置），权值为 $2$ 的宝箱最多有 $k$ 个（可以放在每个假宝箱后两个位置）……

容易贪心地去把前 $k$ 大的宝箱都设为假宝箱，这样肯定不劣。接着我们贪心地分配权值。给真宝箱前 $k$ 大的宝箱权重设为 $1$，剩下的真宝箱里前 $k$ 大的权重设为 $2$……将数列 $a$ 排序后做一个前缀和，那么就可以 $\mathcal O(1)$ 计算排名连续的宝箱的价值之和。我们暴力地分配权重，得到复杂度：

$$
\mathcal O\left(\sum_i\dfrac{n-i}{i}\right)= \mathcal O\left(\sum_i\dfrac{n}{i}-n\right)=\mathcal O(n\log n)
$$

那么这题就做完了。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
int qread(){
    int w=1,c,ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
const int MAXN = 3e5 + 3;
const int MOD  = 998244353;
int n, A[MAXN], S[MAXN], ans, t;
int pwr(int a, int b){
    int r = 1;
    while(b){
        if(b & 1) r = 1ll * r * a % MOD;
        a = 1ll * a * a % MOD, b >>= 1;
    }
    return r;
}
bool cmp(int a, int b){ return a > b; }
int main(){
    n = qread(), t = pwr(n, MOD - 2);
    up(1, n, i) A[i] = qread();
    sort(A + 1, A + 1 + n, cmp);
    up(1, n, i) S[i] = (S[i - 1] + A[i]) % MOD;
    up(1, n, i){
        int tot = 0;
        for(int l = i + 1, r = min(l + i - 1, n), c = 1;l <= n;l += i, r = min(n, l + i - 1), ++ c){
            tot = (tot + 1ll * (S[r] - S[l - 1] + MOD) * c % MOD) % MOD;
        }
        printf("%lld%c", 1ll * tot * t % MOD, " \n"[i == n]);
    }
    return 0;
}
