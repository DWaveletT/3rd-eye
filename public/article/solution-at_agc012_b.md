---
create_time: 1657177785
update_time: 1657177785
title: 题解 AT2362 【[AGC012B] Splatter Painting】
board: 1
tag:
- 1
extension:
  problem:
    id: AT_agc012_b
    type: AT
    title: '[AGC012B] Splatter Painting'
    difficulty: 6
    submitted: true
    accepted: true
---

## 题解

注意到 $d\le 10$，于是可以考虑分层图。具体而言，我们将每个点拆成 $11$ 个，分别对应 $d=0,1,2\cdots 10$。首先，第 $i$ 层上的 $u$ 号点向 $i-1$ 层上的 $u$ 号点连有向边。

对于每条边 $u\leftrightarrow v$，枚举 $i=1,2\cdots 10$，进行如下操作：

- 将第 $i$ 层上的 $u$ 号点连向第 $i-1$ 层上的 $v$ 号点。
- 将第 $i$ 层上的 $v$ 号点连向第 $i-1$ 层上的 $u$ 号点。

我们设从点 $u$ 出发可以到达的第 $0$ 层上的点称为被 $u$ 控制的点。容易发现，第 $i$ 层上的 $u$ 号点控制的点恰好就是原图上到 $u$ 的距离不超过 $i$ 的点的集合。这是容易证明的，因为每向下走一层，能够到达的点到 $u$ 的距离就会增加 $1$。

那么对于第 $i$ 个操作 $v,d,u$，我们向第 $d$ 层上的点 $v$ 打上标记 $\{i,c\}$。$i$ 是时间戳，$c$ 是我们给它染上的颜色。$q$ 次操作以后，从最高层开始沿着有向边往下转移标记。注意：时间戳更大的标记可以覆盖时间戳更小的标记。这样就保证了总时间复杂度的正确性。

容易发现，时间复杂度为 $\mathcal O(d_{\max}\times (n+m))$。值得注意的是，我们一共创建了 $(d_{\max}+1)\times n$ 个点，建立了 $d_{\max}\times (2\times m+n)$ 条边。不要开小数组导致 $\text{RE}$。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l,END##i=r;i<=END##i;++i)
#define dn(r,l,i) for(int i=r,END##i=l;i>=END##i;--i)
using namespace std;
typedef long long i64;
const int INF =2147483647;
const int MAXN=1e5+3;
const int MAXM=1e5+3;
const int MAXD=10+3;
int H[MAXN*MAXD],V[MAXN*MAXD*2],N[MAXN*MAXD*2],t;
void add(int u,int v){
    V[++t]=v,N[t]=H[u],H[u]=t;
}
int n,m,q,X[MAXD][MAXN],Y[MAXN*MAXD];
int qread(){
    int w=1,c,ret;
    while((c=getchar())> '9'||c< '0') w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9') ret=ret*10+c-'0';
    return ret*w;
}
struct Node{
    int t,c; Node(int _t=0,int _c=0):t(_t),c(_c){}
}O[MAXD][MAXN];
int main(){
    n=qread(),m=qread(); int o=0;
    up(0,10,i) up(1,n,j) X[i][j]=++o,Y[o]=j;
    up(1,10,i) up(1,n,j) add(X[i][j],X[i-1][j]);
    up(1,m,i){
        int u=qread(),v=qread();
        up(1,10,j){
            add(X[j][u],X[j-1][v]);
            add(X[j][v],X[j-1][u]);
        }
    }
    q=qread();
    up(1,q,i){
        int v=qread(),d=qread(),c=qread();
        O[d][v]={i,c};
    }
    dn(10,0,i){
        up(1,n,u){
            for(int j=H[X[i][u]];j;j=N[j]){
                int v=Y[V[j]];
                if(O[i][u].t>O[i-1][v].t)
                    O[i-1][v]=O[i][u];
            }
        }
    }
    up(1,n,i) printf("%d\n",O[0][i].c);
    return 0;
}
