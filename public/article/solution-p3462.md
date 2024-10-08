---
create_time: 1682520395
update_time: 1682520395
title: 题解 P3462 【[POI2007]ODW-Weights】
board: 1
tag:
- 1
extension:
  problem:
    id: P3462
    type: P
    title: '[POI2007] ODW-Weights'
    difficulty: 8.8571
    submitted: true
    accepted: true
---

适合老年人锻炼记忆力的萌萌贪心题好啊。

## 题解

注意到题目中一条重要性质：对于任意 $1\le i,j\le m$，必有 $m_i\mid m_j$ 或者 $m_j\mid m_i$。那么假如我们把 $m$ 数组从小到大排序去重放到数组 $m'$ 里，那一定有 $m'_1\mid m'_2\mid m'_3\mid \cdots \mid m'_k$。换一个表现形式，$m'_i=p_1p_2\cdots p_{i-1}\times m'_1$，其中 $1<p_i$，所以最多只会有 $\log v$ 种不同的 $m$。将其用桶存储下来，记第 $i$ 种重量为 $w_i$，数量有 $h_i$ 个。

因为题目只要求求出最多能放多少个砝码，所以可以用一种「反悔」的思想：大砝码总是可以被替换成小砝码而使结果不劣。同时注意到，如果先往容器里放小砝码，有可能出现在不同容器里放了小砝码导致大砝码放不进去的问题。因为我们反悔的思路是把大砝码替换成小砝码，所以最开始先优先放大砝码，即从大到小枚举砝码将其尽可能多地放到容器里。

为什么这样做，不会出现因为大砝码放的容器不同而导致能放进去的小砝码的数量变少呢？这里仍然是使用题目所给的倍数条件。对于两种不同的放大砝码方案，新产生的空挡可以完全被小砝码放进去而相当于一个大砝码。

在这样填充完毕后，剩下来的空隙一定不足以容纳剩下来的最小的砝码。那些边角料已经失去了用途。

接着是考虑反悔。从大到小枚举砝码 $i$，去看看有没有大砝码 $j$ 可以被替换掉。替换的过程仍然是贪心的：拿掉尽可能少的大砝码，使得小砝码都可以放进去，所以被替换的法码 $j$ 的重量仍然是从大到小枚举。拿掉大砝码填充小砝码后可能会产生新的边角料，而这些边角料是可以被使用的（因为这些边角料一定是更小的法码的倍数）。需要拿一个变量存储，填充砝码 $i$ 时优先从边角料开始填充。

上述过程具体实现可以参考代码。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 1e5 + 3;
const int MAXM=  30 + 3;
int H[MAXM], G[MAXM], W[MAXM];
map<int, int> M;
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int A[MAXN], n, m, t, ans; i64 s;
int main(){
    n = qread(), m = qread();
    up(1, n, i) A[i] = qread();
    up(1, m, i) M[qread()] ++ ;
    for(auto &p : M){
        W[++ t] = p.first, H[t] = p.second;
    }
    dn(t, 1, i){
        up(1, n, j){
            if(A[j] >= W[i]){
                int a = min(H[i], A[j] / W[i]);
                H[i] -= a, G[i] += a;
                A[j] -= a * W[i];
                ans += a;
                if(H[i] == 0) break;
            }
        }
    }
    dn(t, 1, i){
        int a = min(1ll * H[i], s / W[i]);
        H[i] -= a, G[i] += a, s -= a * W[i];
        dn(t, i + 1, j) if(G[j]){
            int k = W[j] / W[i];
            int u = min(G[j], H[i] / k + !!(H[i] % k));
            int v = min(1ll * H[i], 1ll * u * k);
            H[i] -= v, G[i] += v;
            H[j] += u, G[j] -= u;
            s = s + 1ll * u * W[j] - 1ll * v * W[i];
            ans = ans + v - u;
            if(H[i] == 0) break;
        }
    }
    printf("%d\n", ans);
    return 0;
}
