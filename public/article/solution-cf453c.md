---
create_time: 1681807878
update_time: 1681807878
title: 题解 CF453C 【Little Pony and Summer Sun Celebration】
board: 1
tag:
- 1
extension:
  problem:
    id: CF453C
    type: CF
    title: Little Pony and Summer Sun Celebration
    difficulty: 8
    submitted: true
    accepted: true
---

## 题解

题面上可能有点小问题。「一个节点没有被访问过」被算作「一个节点被访问偶数次」，为此 WA 了一发……

注意到我们需要构造出来的答案的长度只需要不超过 $4n$，因此无解条件应该是简单的，而剩余有解情况都可以通过比较简单的方法进行构造。

题目所给的是 $n$ 个点 $m$ 条边的无向图。按照上述思路，如果这个无向图有解，那么它的极大生成树森林应该也有解。这样就把问题简化了。

考虑一个平凡的树上 dfs 过程：从 $u$ 出发，遍历它的每个子树，再回溯。这个过程会遍历每条边恰好两次，产生的节点编号序列长度不超过 $2n$。当我们从子树 $v$ 回溯上来时，如果 $v$ 总访问次数的奇偶性与要求不一致，那总是容易构造 $u\to v\to u$ 的路径来使得奇偶性一致。它会在根节点出现特例，因为根节点没有父亲。但是注意到最后生成的序列最后一个元素一定是根节点，所以如果它的访问次数不符合要求，把序列最后一个元素去除就行。每一条边的遍历次数不超过 $4$ 次，产生的节点编号序列长度不超过 $4n$，符合题设。

如果一棵生成树里存在节点需要被遍历奇数次，那么它所在的生成树一定要被遍历。如果有多棵生成树一定要遍历，因为它们在不同的连通块内，所以肯定无解。这也就是上文所述「应该是简单的」无解条件。

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
const int MAXN = 1e5 + 3;
int n, m, C[MAXN], D[MAXN]; bool F[MAXN];
vector <int> V[MAXN], A;
void dfs(int u, int g){
    F[u] = true;
    for(auto &v : V[u]) if(!F[v]){
        A.push_back(v), ++ D[v];
        dfs(v, g);
        A.push_back(u), ++ D[u];
        if(C[v] != D[v] % 2)
            A.push_back(v), ++ D[v],
            A.push_back(u), ++ D[u];
    }
}
int main(){
    n = qread(), m = qread();
    up(1, m, i){
        int u = qread(), v = qread();
        V[u].push_back(v);
        V[v].push_back(u);
    }
    up(1, n, i) C[i] = qread();
    up(1, n, i) if(C[i]){
            A.push_back(i), ++ D[i], dfs(i, i);
        if(C[i] != D[i] % 2) A.pop_back(), -- D[i];
        break;
    }
    up(1, n, i) if(C[i] != D[i] % 2) puts("-1"), exit(0);
    printf("%d\n", A.size());
    for(auto &x : A) printf("%d ", x);
    return 0;
}
