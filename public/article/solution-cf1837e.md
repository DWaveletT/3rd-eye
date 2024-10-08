---
create_time: 1685106901
update_time: 1685106901
title: 题解 CF1837E 【Playoff Fixing】
board: 1
tag:
- 1
extension:
  problem:
    id: CF1837E
    type: CF
    title: Playoff Fixing
    difficulty: 8
    submitted: true
    accepted: true
---

## 题解

记 $n=2^k$。容易发现，编号为 $(n/2+1)\sim n$ 的队伍，必须要在第一轮被淘汰。

那么对于形如 $2i-1$ 和 $2i$ 的位置，这两个位置里必须**恰好**有一支队伍的编号在 $(n/2+1)\sim n$。这能告诉我们安排编号为 $(n/2+1)\sim n$ 的队伍的方案数。对于每一个形如 $2i-1$ 和 $2i$ 的位置对：

- 如果 $a_{2i-1}$ 和 $a_{2i}$ 都为 $-1$，那么可以放恰好一个被淘汰的队伍，有两种放法；
- 如果 $a_{2i-1}$ 和 $a_{2i}$ 有一个是 $-1$，另一个在 $1\sim (n/2)$，那么可以放恰好一个被淘汰的队伍，有一种放法；
- 如果 $a_{2i-1}$ 和 $a_{2i}$ 都在 $1\sim (n/2)$ 或者都在 $(n/2+1)\sim n$，那一定是无解；
- 别的情况不会对方案数产生影响。

公式化一点，假设一共有 $x$ 个被淘汰的队伍需要安排位置，共有 $y$ 个第一种情况，并且在安排被淘汰的队伍时没有出现必定无解的情况，那么这些被淘汰的队伍的安排方法共有 $x!\times 2^y$ 个。

假设现在安排好了那些被淘汰的队伍。然后我们发现剩下来的队伍就变成了一个规模折半的子问题。因为那些被淘汰的队伍的安排方式并不会影响到剩下来的队伍的安排情况，所以可以应用乘法原理，将每个子问题的方案数给乘起来。

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
const int MAXN = (1 << 19) + 3;
const int MOD  = 998244353;
int F[MAXN], G[MAXN];
int solve(vector <int> V){
    if(V.size() == 1) return 1;
    int ret = 1, n = V.size(), t = n / 2;
    int c = 0, d = n / 2, e = 0;
    vector <int> T;
    up(0, n - 1, i) d -= (V[i] > t);
    up(0, n / 2 - 1, i){
        int p = 2 * i;
        int q = 2 * i + 1;
        if(V[p] != -1 && V[q] != -1){
            if((V[p] <= t) == (V[q] <= t))
                return 0;
        }
        {
            if(V[p] == -1 && V[q] == -1) ++ c;
            if(V[p] != -1 && V[p] <= t) T.push_back(V[p]); else 
            if(V[q] != -1 && V[q] <= t) T.push_back(V[q]); else 
                T.push_back(-1);
        }
    }
    return 1ll * G[c] * F[d] % MOD * solve(T) % MOD;
}
int main(){
    int k = qread(); vector <int> P;
    G[0] = F[0] = 1;
    up(1, 1 << k, i)
        G[i] = 1ll * G[i - 1] * 2 % MOD,
        F[i] = 1ll * F[i - 1] * i % MOD;
    up(1, 1 << k, i) P.push_back(qread());
    printf("%d\n", solve(P));
    return 0;
}
