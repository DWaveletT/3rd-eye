---
create_time: 1661822073
update_time: 1661822073
title: 题解 【WR2-1D】【「Wdoi-2」纯粹的复仇女神】
board: 1
tag:
- 1
extension:
  problem:
    id: P8543
    type: P
    title: 「Wdoi-2」纯粹的复仇女神
    difficulty: 10
    submitted: true
    accepted: true
---
## 题解

注意到，这是个不带修改的区间查询的问题。根据一般套路，我们可以先将所有的询问离线下来，枚举询问的右端点 $r$，再来解决所有 $r_i=r$ 的询问。

![](https://cdn.luogu.com.cn/upload/image_hosting/eivxdrka.png)

如图所示。我们以数组下标作为横轴，以每一种颜色作为纵轴，绘制题目中所给出的 $a_i$。

假定现在我们要处理一组询问 $(l,r)$，也就是处理这样一个红色的矩形。矩形的每一行的权值就是该行元素的最小值；所求即为所有行的权值的最大值。

因为我们已经把操作离线下来，因此可以先看作 $r$ 是定值来思考。可以发现，对于每一列，这个 $l$ 越小，这一列的权值单调不增。光有这个还不够。注意到，第 $i$ 列上某个元素会成为这一列的权值，所对应的 $l$，应该是**连续的一段区间**。

![](https://cdn.luogu.com.cn/upload/image_hosting/x5qhz6od.png)

如图所示，取出其中的一列。可以发现，当 $l$ 向左移动的时候，这一列的权值共发生了三次变化：$5\to 3\to 2$。事实上，我们可以计算出每个 $a_i$ 成为该列的权值时，所对应的区间 $[p_i,q_i]$。那么问题转化为了对一系列区间的操作（区间 $[p_i,q_i]$ 的权值就是 $a_i$）。

那么在枚举 $r$ 的时候，我们要干这样几件事：

- 将区间 $[p_r,q_r](a_r)$ 加入。
- 处理右端点为 $r$ 的所有询问 $(l_i,r_i)$。
- 将 $q_i=r$ 的区间都删除。

我们要用一种数据结构能够维护这三种操作。这个结构要求可以支持加入指定区间、删除指定区间、查询包含 $l$ 的区间的权值的最大值。

这是可以使用加上了**标记永久化**的线段树实现的。标记永久化的含义是，当执行修改操作恰好覆盖了当前节点，我们给它打上的标记是永久化的。当有询问操作要经过这个线段树节点时，我们用这个标记更新这次询问的答案。

具体而言，我们开一个线段树，维护不同的 $l$ 所查询到的答案。线段树的每个节点都要维护一个 $\verb!set!$，这个 $\verb!set!$ 就是永久化了的标记。

- 对于加入区间 $[p,q](a)$ 操作，我们先找到对应的线段树节点们，向它们的 $\verb!set!$ 里加入 $a$。
- 对于删除区间 $[p,q](a)$ 操作，我们同样找到对应的线段树的节点们，从他们的 $\verb!set!$ 里删除 $a$。
- 对于查询操作，我们一路上，访问节点的时候，从标记里找最大值（如果有最大值的话）并更新答案即可。

标记永久化的好处：如果不永久化，那么查询的时候需要将标记下推，但是由于我们的标记是 $\verb!set!$，下推起来复杂度会爆炸。

还有个问题，就是对于每个 $i$，找到 $[p_i,q_i]$。容易发现，这等价于找到，颜色等于 $c_i$，值不超过 $a_i$ 的最靠近它的两个点。可以使用单调队列维护。

## 关于卡常

由于本题需要卡掉 $\mathcal O(m\sqrt n)$ 的做法，因此对时限卡的略紧（但保证是 $\text{std}$ 两倍时限以上）。

直接使用 $\text{multiset}$ 维护标记的话，常数较大。但是由于本题需要支持的操作较少（插入、删除、查找最大值），我们可以用两个堆来替代这个 $\text{multiset}$：

- 用两个堆 $P,Q$，$P$ 存储每个元素的值，$Q$ 用来懒惰删除。
- 对于插入操作，直接向 $P$ 中插入元素。
- 对于删除操作，直接向 $Q$ 中**插入**元素。
- 对于查询操作，不断比较 $P$ 和 $Q$ 的堆顶（如果有的话），如果堆顶相同，就说明 $P$ 堆顶的元素应该是在某个时候被删除掉了。那么 $P,Q$ 同时弹出堆顶，一直到堆顶不同。

容易发现，对于每个元素只会被插入、弹出最多一次，因此均摊时间复杂度是 $\mathcal O(\log n)$ 的。

但是堆的常数明显小于平衡树，因此可以极大减小常数。下面的代码里用的是手写配对堆，但是实测用 $\text{STL}$ 里的优先队列也能无压力过题。

另外有一点就是，计算 $[p_i,q_i]$ 时需要用到栈。但是栈基于 $\text{deque}$ 实现，无论是时间常数还是空间常数都很大，建议使用 $\text{vector}$ 替代。

## 代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l,END##i=r;i<=END##i;++i)
#define dn(r,l,i) for(int i=r,END##i=l;i>=END##i;--i)
using namespace std;
typedef long long i64;
const int INF =2147483647;
const int MAXN= 2e5 + 3;
const int SIZ = 8e5 + 3;
multiset <int,greater<int>> O[SIZ];
#define lc(t) (t<<1  )
#define rc(t) (t<<1|1)
void modify(int t,int a,int b,int l,int r,int w){
    if(l<=a&&b<=r){
        if(w>0) O[t].insert(w);
        if(w<0) O[t].erase (O[t].find(-w));
    } else {
        int c=a+b>>1;
        if(l<=c) modify(lc(t),a,c  ,l,r,w);
        if(r> c) modify(rc(t),c+1,b,l,r,w);
    }
}
void query(int t,int a,int b,int p,int &w){
    if(!O[t].empty()) w=max(w,*O[t].begin());
    if(a==b) return; int c=a+b>>1;
    if(p<=c) query(lc(t),a,c  ,p,w);
    if(p> c) query(rc(t),c+1,b,p,w);
}
int qread(){
    int w=1,c,ret;
    while((c=getchar())> '9'||c< '0') w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9') ret=ret*10+c-'0';
    return ret*w;
}
int n,q,A[MAXN],C[MAXN],L[MAXN],R[MAXN],W[MAXN];
stack <int> S1[MAXN],S2[MAXN];
struct Node1{int l,r,w;};
struct Node2{int l,x  ;};
vector<Node1> V[MAXN]; vector<Node2> Q[MAXN];
int main(){
    n=qread(),q=qread(); A[0]=A[n+1]=-INF;
    up(1,n,i) S1[i].push(0),S2[i].push(n+1);
    up(1,n,i) C[i]=qread();
    up(1,n,i) A[i]=qread();
    up(1,n,i){
        while(A[S1[C[i]].top()]>=A[i]) S1[C[i]].pop();
        L[i]=S1[C[i]].top()+1,S1[C[i]].push(i);
    }
    dn(n,1,i){
        while(A[S2[C[i]].top()]>=A[i]) S2[C[i]].pop();
        R[i]=S2[C[i]].top()-1,S2[C[i]].push(i);
    }
    up(1,n,i){
        V[  i   ].push_back({L[i],i, A[i]});
        V[R[i]+1].push_back({L[i],i,-A[i]});
    }
    up(1,q,i){
        int l=qread(),r=qread(); Q[r].push_back({l,i});
    }
    up(1,n,i){
        for(auto &p:V[i]) modify(1,1,n,p.l,p.r,p.w);
        for(auto &p:Q[i]) query(1,1,n,p.l,W[p.x]);
    }
    up(1,q,i) printf("%d\n",W[i]);
    return 0;
}
