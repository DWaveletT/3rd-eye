---
create_time: 1683602972
update_time: 1683602972
title: 题解 CF1824C 【LuoTianyi and XOR-Tree】
board: 1
tag:
- 1
extension:
  problem:
    id: CF1824C
    type: CF
    title: LuoTianyi and XOR-Tree
    difficulty: 8
    submitted: true
    accepted: true
---

萌萌题。

## 题解

考虑随便树上一个节点 $u$，以及 $u$ 子树内某个叶子节点 $x$。从 $1$ 到 $x$ 的路径可视为 $1\to\cdots\to u\to \cdots \to x$，所以从 $u$ 到任意一个 $x$ 的路径，异或和都要是相等的。

记 $f_u$ 表示从 $u$ 出发，到达 $u$ 子树内每个叶子节点，路径权值相同，至少需要修改多少个节点。显然，只是为了达成「路径权值相同」这一个条件的话，$u$ 的权值没有必要修改。

下面考虑转移。假设 $u$ 有一堆儿子 $v_1,v_2,\cdots,v_k$，那么首先要让 $v_i$ 到 $v_i$ 子树内的叶子的路径权值相等，所以首先要操作 $\sum f_{v_i}$ 次；接着此时 $v_i$ 的权值肯定都没有修改，所以我们要修改尽可能少的 $v_i$ 的权值，这样才能使得 $u$ 到 $u$ 子树内叶子结点的权值相等。

此时出现了困难。因为花费最少次数让 $v_i$ 到 $v_i$ 内叶子节点的权值相等，最终相等的权值可能有很多种情况。我们记「**在修改次数最少的情况下**」可以取得的相等的值，组成的集合为 $M_{v_i}$。为什么非得是修改次数最少？这是因为，在修改次数不是最小的情况下，即使可以使得所有权值都等于某个值 $w$，也不如任取某个修改次数最小的情形，通过修改 $v_i$ 的权值使得相等的权值为 $w$。

那么就变成了这样一个过程：

- 先递归计算出 $M_{v_1},M_{v_2},\cdots,M_{v_k}$；
- 维护可重集 $S=M_{v_1}\cup M_{v_2}\cup\cdots\cup M_{v_k}$；
- 找到 $S$ 中出现次数最多的那一些元素，记最多的出现次数为 $t$，那么 $f_u=(\sum f_{v_i})+k-t$。同时将这些出现次数最多的元素，**异或上** $u$ 的权值，放到 $M_u$ 里。

如此操作，直到计算出 $f_1$ 和 $M_1$，检查 $M_1$ 里有没有元素 $0$。如果有元素 $0$，答案就是 $f_1$，否则答案为 $f_1+1$。

于是可以考虑启发式合并。先计算出 $u$ 的重儿子 $g$ 的相等值集合 $M_g$，然后考虑将其他儿子的答案合并进去。我们可以先将 $g$ 以外的儿子的 $M$ 值合并进 $S$，合并完后，**对于 $\bm S$ 内的每个键值**查询在不在 $M_g$ 里，如果在，就把对应的次数 $+1$。（如果遍历 $M_g$ 更新 $S$ 的值，复杂度就成了 $O(\mathit{size}_u \log n)$，但是遍历 $S$ 内的元素来更新 $S$，复杂度就成功降到了 $O((\mathit{size}_u-\mathit{size}_g) \log n)$）。如果出现次数最多的元素，出现次数超过了 $1$，那么这些元素**一定是在 $\bm S$ 里的**，那么就可以抛弃 $M_g$，遍历 $S$ 内的元素放到 $M_u$ 里；否则，如果出现次数最多的元素只出现了 $1$ 次，就说明 $M_u=M_g\cup S$。这个时候，仍然是遍历 $S$ 的元素插入到 $M_g$ 里，接着把 $M_u$ 指向 $M_g$。

但是这时又有最后一个问题。我们需要把 $M_u$ 内所有元素异或上 $u$ 的权值。解决起来很简单，维护一个标记 $K_u$，$M_u$ 里实际存储的元素是代码里写着的 $M_u$ 里的值异或上 $K_u$。所以，在把 $M_{v_i}$ 合并进 $S$ 时，要把对应元素异或上 $K_{v_i}$ 再合并；在 $u$ 直接拿来 $M_g$ 充当 $M_u$ 时，也需要精细考虑对应的标记。

上文提到的 $M$ 和 $S$ 都可以直接用 $\text{map}$ 实现。复杂度最坏为 $\mathcal O(n\log ^2n)$，在原树是一棵完全二叉树时取得。

实现细节有点多，可以看代码。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 1e5 + 3;
vector <int> V[MAXN];
int G[MAXN], T[MAXN], K[MAXN], A[MAXN], F[MAXN], S[MAXN];
void dfs0(int u, int f){
    S[u] = 1;
    for(auto &v : V[u]) if(v != f){
        dfs0(v, u), S[u] += S[v];
        if(S[v] > S[G[u]]) G[u] = v;
    }
}
map<int, bool> M[MAXN];
void dfs(int u, int f){
    if(V[u].size() == 1 && f){
        T[u] = u, M[T[u]][0] = true, K[u] = A[u], F[u] = 0;
    } else {
        map<int, int> S;
        dfs(G[u], u);
        T[u] = T[G[u]];
        K[u] = K[G[u]];
        int c = 1, sum = F[G[u]], w = 1;
        for(auto &v : V[u]) if(v != f && v != G[u]){
            dfs(v, u);
            for(auto &x : M[T[v]]){
                S[x.first ^ K[v]] ++;
            }
            ++ c, sum += F[v];
        }
        for(auto &x : S){
            if(M[T[u]].count(x.first ^ K[u])) ++ x.second;
            w = max(w, x.second);
        }
        if(w == 1){
            for(auto &x : S){
                M[T[u]][x.first ^ K[u]] = true;
            }
        } else {
            M[T[u]].clear();
            for(auto &x : S){
                if(x.second == w)
                    M[T[u]][x.first ^ K[u]] = true;
            }
        }
        K[u] ^= A[u];
        F[u] = sum + c - w;
    }
}
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    int n = qread();
    up(1, n, i) A[i] = qread();
    up(1, n - 1, i){
        int u = qread(), v = qread();
        V[u].push_back(v);
        V[v].push_back(u);
    }
    dfs0(1, 0);
    dfs(1, 0);
    for(auto &x : M[T[1]]){
        if((x.first ^ K[1]) == 0){
            printf("%d\n", F[1]); exit(0);
        }
    }
    printf("%d\n", F[1] + 1);
    return 0;
}
