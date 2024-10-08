---
create_time: 1587814078
update_time: 1587814078
title: 题解 CF12D 【Ball】
board: 1
tag:
- 1
extension:
  problem:
    id: CF12D
    type: CF
    title: Ball
    difficulty: 8
    submitted: true
    accepted: true
---

## 题目大意

有三个数列 $A_i,B_i,C_i$，询问有多少个 $i$，使得存在 $j$，使得 $A_i<A_j,B_i<B_j,C_i<C_j$。

## 题解

题面虽然看上去像是三维偏序，但可以通过一系列转换求解。

首先，我们可以按照 $A_i$ 进行排序。这样的好处是，可以保证符合题意的 $j>i$。然后考虑如何寻找满足 $B_j>B_i$ 的 $j$。

这里使用**值域线段树+动态开点**。

具体而言，我们在值域 $[1,10^9]$ 上维护一个线段树。每次计算完元素 $i$ 的结果，就将线段树上**下标**为 $B_i$ 的位的最大值用 $C_i$ 进行更新。也就是说，如果我们需要访问大于 $B_i$ 的所有元素，本质上就是访问线段树上 $(B_i,10^9]$ 的这一段。取其中 $C_i$ 的最大值，就能知道是否存在元素 $j$，使得$A_i<A_j,B_i<B_j,C_i<C_j$。

动态开点的好处是，只有需要访问线段树对应节点时，再申请该节点空间。

当然，要注意的是，元素 $j$ 可以被加入线段树当且仅当 $A_j>A_i$。

## 参考代码


```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;
const int MAXN =4e6+3,MAXM=1e9+3;
int tot,n,ans;
int qread(){
    int w=1,c,ret;
    while((c=getchar())> '9'||c< '0')
    w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9')
    ret=ret*10+c-'0';
    return ret*w;
}
#define lc(t) (L[t]?L[t]:(L[t]=++tot))
#define rc(t) (R[t]?R[t]:(R[t]=++tot))
class Seg{
    public:
        int L[MAXN*4],R[MAXN*4],M[MAXN*4];
        void cng(int t,int a,int b,int k,int w){ 
            M[t]=max(M[t],w);if(a==b) return; int mid=(a+b)>>1;
            if(k<=mid) cng(lc(t),a,mid,k,w);
            if(k> mid) cng(rc(t),mid+1,b,k,w);
        }
        int  qry(int t,int a,int b,int l,int r){
            if(l<=a&&b<=r) return M[t];
            int mid=(a+b)>>1,ret=0;
            if(l<=mid) ret=max(ret,qry(lc(t),a,mid,l,r));
            if(r> mid) ret=max(ret,qry(rc(t),mid+1,b,l,r));
            return ret;
        }
}T;
struct Node{
    int a,b,c;
    bool operator <(Node t){
        return a==t.a?(b==t.b?c<t.c:b<t.b):a<t.a;
    }
}P[MAXN];
int main(){
    n=qread(),++tot;
    up(1,n,i) P[i].a=qread();
    up(1,n,i) P[i].b=qread();
    up(1,n,i) P[i].c=qread();
    sort(P+1,P+1+n),P[n+1].a=MAXM;
    dn(n,1,i){
        if(P[i+1].a!=P[i].a){
            for(int p=i+1;P[p].a==P[i+1].a;++p)
            T.cng(1,0,MAXM,P[p].b,P[p].c);
        }
        if(T.qry(1,0,MAXM,P[i].b+1,MAXM)>P[i].c) ++ans;
    }
    printf("%d\n",ans);
    return 0;
}
