---
create_time: 1678616189
update_time: 1678616189
title: 题解 【P9149 串串题】
board: 1
tag:
- 1
extension:
  problem:
    id: P9149
    type: P
    title: 串串题
    difficulty: 8
    submitted: true
    accepted: true
---

感觉不如上一题有意思。

## 题解

容易发现，计算所有方案的贡献之和，可以转化为计算每个可能的匹配的位置，在所有方案下匹配上 $B$ 的次数之和。假定 $A$ 数组里，原来在 $[l,r]$ 位置的数字在删数之后变成了一个 $B$（$l$ 位置和 $r$ 位置上的数字没有被删）。

容易注意到两条关键性质：

- 在 $B$ 里面的元素一定不会被删除；
- 妨碍形成一个匹配的元素一定会被删除。换言之，在 $[l,r]$ 内出现的不在 $B$ 里面的元素一定会被删掉。

考虑枚举 $l$ 的值。一个 $l$ 是合法的，当且仅当在删除所有不在 $B$ 里的元素后，$[l,r]$ 区间剩下来的元素恰好是 $B$。那么可以先把所有不在 $B$ 里的元素都删掉，然后跑一下 $\text{KMP}$，就知道哪些 $l$ 是合法的了。顺便可以知道 $r$ 的值。

然后就是统计 $[l,r]$ 区间出现了**多少种**不在 $B$ 里的元素。记这个种类数为 $a$。同时我们记 $B$ 里面出现的元素种类数为 $b$。

那么，$[l,r]$ 里出现的不在 $B$ 里的元素肯定要被删掉，$B$ 里出现的元素肯定不能被删，剩下来的数字可删可不删。也就是说，我们要从剩下的这 $W-a-b$ 个数里选择 $d-a$ 个数字删掉。

所以这个位置 $l$ 对答案的贡献就是 $\dbinom{W-a-b}{d-a}$。计算所有 $l$ 的贡献之和即可。

$l$ 可以直接枚举。对于 $r$，容易发现随着 $l$ 的增长 $r$ 也是单调的。那么对 $a$ 的维护可以看成一个双指针，每次 $l$ 增大后维护 $r$ 的值，开一个桶存一下此时 $[l,r]$ 区间内每个元素出现的次数。这样做的复杂度是 $\mathcal O(n)$。

整个的时间复杂度容易做到 $\mathcal O(W+\sum n_i)$。但是我太懒了没写线性求逆元，写了个 $\mathcal O(W\log W+\sum n_i)$ 的代码。

## 参考代码 

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 1e6 + 3;
const int MOD = 1e9 + 7;
int P[MAXN], Q[MAXN], o = 1e6;
int power(int a, int b){
    int r = 1;
    while(b){
        if(b & 1)r = 1ll * r * a % MOD;
        b >>= 1, a = 1ll * a * a % MOD;
    }
    return r;
}
int choose(int a, int b){
    if(a < 0 || b < 0 || a - b < 0) return 0;
    return 1ll * P[a] * Q[b] % MOD * Q[a - b] % MOD;
}
int qread(){
    int w=1,c,ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int n, m, w, d;
int A[MAXN], B[MAXN], C[MAXN], D[MAXN], N[MAXN], T[MAXN];
int X[MAXN], Y[MAXN];
int main(){
    P[0] = Q[0] = 1;
    up(1, o, i)
        P[i] = 1ll * P[i - 1] * i % MOD, Q[i] = power(P[i], MOD - 2);
    up(1, qread(), _){
        n = qread(), m = qread(), w = qread(), d = qread();
        int t = 0, val = 0, res = 0;
        up(1, n, i) A[i] = qread();
        up(1, m, i) B[i] = qread(), val += !X[B[i]], X[B[i]] = true;
        up(1, n, i) C[i] = D[i] = N[i] = T[i] = 0;
        up(1, n, i) if(X[A[i]]) C[++ t] = A[i], D[t] = i;
        N[1] = 0, A[n + 1] = B[m + 1] = 0;
        up(2, m, i){
            int p = N[i - 1];
            while(p != 0 && B[p + 1] != B[i])
                p = N[p];
            if(B[p + 1] == B[i]) N[i] = p + 1; else N[i] = 0;
        }
        up(1, t, i){
            int p = T[i - 1];
            while(p != 0 && B[p + 1] != C[i])
                p = N[p];
            if(B[p + 1] == C[i]) T[i] = p + 1; else T[i] = 0;
        }
        int l = 1, r = 0, ans = 0;
        up(1, t, i) if(T[i] == m){
            int y = D[i], x = D[i - m + 1];
            while(r < y){
                ++ r; if(!X[A[r]] && Y[A[r]] == 0) ++ ans;
                if(!X[A[r]]) Y[A[r]] ++;
            }
            while(l < x){
                if(!X[A[l]]) -- Y[A[l]];
                if(!X[A[l]] && Y[A[l]] == 0) -- ans; ++ l;
            }
            res = (res + choose(w - val - ans, d - ans)) % MOD;
        }
        up(1, m, i) X[B[i]] = 0;
        up(1, n, i) Y[A[i]] = 0;
        printf("%d\n", res);
    }
    return 0;
}
