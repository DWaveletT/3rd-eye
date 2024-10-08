---
create_time: 1681789258
update_time: 1681789258
title: 题解 CF346C 【Number Transformation II】
board: 1
tag:
- 1
extension:
  problem:
    id: CF346C
    type: CF
    title: Number Transformation II
    difficulty: 7
    submitted: true
    accepted: true
---

卡常给我卡麻了。

## 题解

容易想到一个显然的贪心，那就是每次选择使 $a$ 在不小于 $b$ 的情况下最小的 $x$ 肯定是不劣的。具体可以用动态规划的转移式感性证明。

我们设 $f_i$ 表示从 $i$ 到 $b$ 的最小步数，那么 $f_i$ 可以从一些合法的 $f_j$ 转移过来。随着 $i$ 的增大，合法的 $j$ 的集合里，一些更小的 $j$ 会被移出集合，而一些更大的 $j$ 会被加入集合。也就是说，这样的 $j$ 满足某种「单调性」。记 $i$ 的所有合法转移来的 $j$ 里面，最小的 $j$ 为 $g_i$，容易发现 $g_i$ 单调不减。

接着考虑应用归纳法。假设 $f_b\le f_{b+1}\le \cdots \le f_{b+k}$ 成立，此时一定会有 $f_i=f_{g_i}+1$。那么对于 $f_{b+k+1}$，它的最优的转移点肯定是 $g_{b+k+1}$，而 $g_b\le g_{b+1}\le \cdots \le g_{b+k+1}$，且 $g_{b+k+1}\le b+k$，所以一定有 $f_b\le f_{b+1}\le \cdots \le f_{b+k}\le f_{b+k+1}$。

现在考虑对于每个 $i\in [b, a]$，维护这个最小的 $j$。从 $x$ 出发，对于 $[x,2x)$ 里的 $i$，决策点会包含 $x$；对于 $[2x,3x)$ 里的 $i$，决策点会包含 $2x$；对于 $[kx,(k+1)x)$ 里的 $i$，决策点会包含 $kx$……我们可以偷懒地维护这些决策点，开一个 $\text{multiset}$ 来维护决策点的最小值，当 $i$ 枚举到 $kx$ 的时候就从这个 $\text{multiset}$ 里移除一个 $(k-1)x$，再加进来一个 $x$。

容易发现这些插入删除操作的总次数是 $\mathcal O\left(\dfrac{a-b+1}{x}\right)$ 的。首先可以对 $x$ 去重，对于剩下来的 $x$，插入删除的总次数应该不超过：

$$
\sum_{i=1}^{n}\mathcal O\left(\dfrac{a-b+1}{i}\right)=\mathcal O(m\log m)
$$

其中 $m=a-b+1$。

但是用一个 $\text{multiset}$ 维护最小值的话，复杂度会多一只 $\log$。不过由于值域很小，而且最小值是单调不减的，所以可以直接开一个桶来维护。这样就可以去掉因为 $\text{multiset}$ 而产生的 $\log$。

然后如果你用 $\text{vector}$ 存储在每个 $i$ 处有哪些 $x$ 要被移出去、移进来，就会莫名其妙常数太大爆掉，同时这样空间复杂度也是 $\mathcal O(m\log m)$ 很不优美。有一个懒惰的方法就是将 $i$ 位置的 $x$ 加入后再往 $i+x$ 位置放哪些 $x$ 要被加进来，空间复杂度就降到了 $\mathcal O(n)$，时间常数莫名其妙能过了。

## 参考代码

```cpp
#pragma GCC optimize(3)
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 1e5 + 3;
const int MAXM= 1e6 + 3;
int F[MAXM], a, b, n, p, A[MAXN], H[MAXM], o = 1e6;
map<int, bool> M;
vector <int> V[MAXM];
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    n = qread();
    up(1, n, i) A[i] = qread(), M[A[i]] = true;
    sort(A + 1, A + 1 + n);
    b = qread(), a = qread();
    int c = 0;
    up(1, n, i) if(A[i] != A[i - 1]){
        int l = a / A[i] * A[i];
        int r = b / A[i] * A[i];
        if(l < a) l += A[i];
        if(l - a <= o) V[l - a].push_back(A[i]);
    }
    p = a;
    up(a, b, i){
        for(auto &x : V[i - a]){
            if(i - x - a >= 0) -- H[i - x - a];
            H[i - a] ++;
            if(i + x - a <= o) V[i + x - a].push_back(x);
        }
        V[i - a].clear();
        V[i - a].shrink_to_fit();
        while(H[p - a] == 0 && p < i) ++ p;
        if(i == a) F[i - a] = 0; else {
            if(p == i) F[i - a] = F[p - a - 1] + 1;
            else       F[i - a] = F[p - a    ] + 1;
        }
    }
    printf("%d\n", F[b - a]);
    return 0;
}
