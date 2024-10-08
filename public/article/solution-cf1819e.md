---
create_time: 1682571401
update_time: 1682571401
title: 题解 CF1819E 【Roads in E City】
board: 1
tag:
- 1
extension:
  problem:
    id: CF1819E
    type: CF
    title: Roads in E City
    difficulty: 2147483647
    submitted: true
    accepted: true
---

小清新交互题。

## 题解

首先观察题目中所给的询问操作到底有什么用处。发现，如果整张图是一个连通图，那么每次询问的结果必定是 $1$；否则可能是 $1$ 也可能是 $0$（因为总是有概率从你选定的 $s$ 处出发，这样必然能到达）。

下文中所有「连通」、「不连通」、「桥」的概念全是在只考虑图上关键边的情况下。

假设原图本来是一个连通图，我们把某条边 $\langle u,v\rangle$ 删除后，变成了两个连通块，$u, v$ 所在的连通块的大小分别为 $a,b$，那么我们询问 $u$ 时有 $\dfrac{a}{a+b}$ 的概率得到 $1$，询问 $v$ 时有 $\dfrac{b}{a+b}$ 的概率得到 $1$。分别询问 $k$ 次，得到的询问中存在 $0$ 的概率是 $1-\left(\dfrac{a}{a+b}\right)^k\left(\dfrac{b}{a+b}\right)^k$。因为 $a/(a+b)$ 和 $b/(a+b)$ 里肯定有一个不超过 $1/2$，所以当 $k=20$ 时询问出现 $0$ 的概率不小于 $99.9999\%$，可以近似为一定会出现。也就是说，我们通过 $2k+1$ 次操作就可以判定 $\langle u,v\rangle$ 是不是原图的桥。

然而无向连通图还是不太好下手。考虑随便选取其中一个生成树。那么生成树上每条边肯定都是桥。现在要检查不在生成树上的一条边 $\langle s,t\rangle$ 是不是关键边，只要随便把生成树上 $s,t$ 之间的任意一条边断开，把 $\langle s,t\rangle$ 连上，再花 $2k$ 次操作检查 $s,t$ 是否连通即可。不过检查完记得恢复成原样。

不过怎么获得原图的一个生成树呢？可以考虑枚举每条边，判断它是不是桥，如果不是桥就把它删掉，这样剩下来的边肯定能组成一个生成树，正确性比较显然。当然在这个过程中可能会有关键边被删掉，所以需要按照上述步骤在找到生成树后检查被删除的边。

总操作次数 $(4k+o)m$。这里取了 $k=20$。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 2e3 + 3;
const int MAXM= 2e3 + 3;
int U[MAXM], V[MAXM], n, m, k = 20;
bool check_cut(int x){
    int u = U[x], v = V[x], t;
    bool f = false;
    up(1, k, i){
        cout << "? " << u << endl; cin >> t; f |= (t == 0);
        cout << "? " << v << endl; cin >> t; f |= (t == 0);
        if(f == true) break;
    }
    return f;
}
vector <pair<int, int> > X[MAXN];
int F[MAXN], D[MAXN]; bool E[MAXN], I[MAXN];
void dfs(int u, int f){
    for(auto &e : X[u]) if(e.second != f){
        int v = e.second;
        F[v] = e.first, D[v] = D[u] + 1, dfs(v, u);
    }
}
int main(){
    int T; cin >> T;
    up(1, T, _){
        cin >> n >> m;
        up(1, n, i) F[i] = D[i] = 0, X[i].clear();
        up(1, m, i) E[i] = I[i] = 0;
        up(1, m, i){
            cin >> U[i] >> V[i];
        }
        up(1, m, i){
            int u = U[i], v = V[i];
            cout << "- " << i << endl;
            if(check_cut(i)){
                X[u].push_back({i, v});
                X[v].push_back({i, u});
                cout << "+ " << i << endl;
                I[i] = true;
            } else E[i] = true;
        }
        dfs(1, 0);
        // up(1, n, i) printf("%d ", F[i]); puts("");
        up(1, m, i) if(E[i]){
            int u = U[i], v = V[i];
            if(D[u] < D[v]) swap(u, v);
            cout << "- " << F[u] << endl;
            cout << "+ " <<   i  << endl;
            if(!check_cut(i)) I[i] = true;
            cout << "- " <<   i  << endl;
            cout << "+ " << F[u] << endl;
        }
        cout << "!";
        up(1, m, i) cout << " " << I[i];
        cout << endl;
        int f; cin >> f; if(f == 0) return 0;
    }
    return 0;
}
