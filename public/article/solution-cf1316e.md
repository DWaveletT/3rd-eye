---
create_time: 1584714138
update_time: 1584714138
title: 【题解】 【CF1316E Team Building】
board: 1
tag:
- 1
extension:
  problem:
    id: CF1316E
    type: CF
    title: Team Building
    difficulty: 9
    submitted: true
    accepted: true
---

## 题目大意

$n$个人，每个人作为观众时可以产生$a_i$的价值，作为第$j$位队员时可以产生$b_{i,j}$的价值。现在需要**恰好**选出$p$名队员与$k$名观众，求最大的价值。保证$p\le 7,p+k\le n,n\le 10^5,$所有数字大于$0$。

## 题解

这篇题解与楼上不同的地方在于，这里主要使用了递推进行更新。

### 思路

很显然，假如我们选出了$p$名队员，那么选出的$k$个观众**必定**是按照$a_i$从大到小排列的前$k$个人。因此，我们可以先将所有人按照$a_i$从大到小排序，那么若某个人当不了队员，那就尽量让他当观众。不然，后面的观众产生的贡献必定小于他作为观众产生的贡献。

由于题目中$p$很小，因此我们可以考虑**状态压缩动态规划**。

我们用$dp_{i,j}$表示当前考虑到$i$个人，**此时**队员的选择情况为$j$，能够产生的最大价值。那么，我们可以用它更新下一个人。即：

$$
\begin{aligned}dp_{i+1,j}&\gets\max\left\{dp_{i+1,j},dp_{i,j}\right\} & \text{第}i\text{个人什么也不做} \cr dp_{i+1,j}&\gets\max\left\{dp_{i+1,j},dp_{i,j}+a_i\right\} &\text{第}i\text{个人可以当观众}\cr dp_{i+1,j \operatorname{or} 2^k}&\gets\max\left\{dp_{i+1,j \operatorname{or} 2^k},dp_{i,j}+b_{i,k} \right\}& \text{第}i\text{个人可以作为队员}k \end{aligned}
$$

其中第二个式子的要求是： $i-\text{状态j中的队员数}\le k$，即在$i$前面所有的人都作为观众或队员后$i$是否能选；第三个式子的要求是$j \operatorname{and} 2^i=0$。

**时间复杂度**$\mathcal(N\times p \times 2^p)$，可以通过本题。

### 小优化

这个式子是可以用滚动数组进行优化的。

我们发现，若当前队员数为$c$，那么只能影响到队员数$>c$的状态以及它本身。于是我们将需要枚举的状态按照$1$的数量进行排序。对于数字$1$的统计既可以用内置函数，也可以直接用$\rm lowbit$暴力统计。

优化成果：**空间复杂度**:$\mathcal O(N\times 2^p)\to \mathcal O(2^p)$。另外这样也能节省不少常数，于是$\rm 36.39s\to 16.35s$。（注：这里比较的是总时间）

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;

typedef long long LL;
const int INF =2147483647;
int qread(){
    int w=1,c,ret;
    while((c=getchar())> '9'||c< '0')
    w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9')
    ret=ret*10+c-'0';
    return ret*w;
}
const int MAXN =1e5+3,MAXP=7+3,MAXS=(1<<7)+3;
LL n,p,k,t,dp[MAXS],C[MAXS];
struct NodeA{
    int a,b[MAXP]; bool operator <(NodeA t){return a>t.a;}
}P[MAXN];
struct NodeB{
    int s,c;       bool operator <(NodeB t){return c>t.c;}
}Q[MAXS];
#define ckm(a,b) (b>a?(a=b):0)
int main(){
    n=qread(),p=qread(),k=qread();
    up(1,n,i) P[i].a=qread();
    up(1,n,i) up(1,p,j) P[i].b[j]=qread();
    sort(P+1,P+1+n); t=(1<<p)-1;		//对人员进行排序
    up(0,t,i){
        int w=i,c=0; while(w) w-=(w&-w),++c;
        Q[i+1].s=i,Q[i+1].c=c;
    }
    sort(Q+1,Q+2+t); up(1,t,i) dp[i]=-INF;	//对枚举状态进行排序&初始化
    up(1,n,i) up(1,t+1,j){    //当前状态为j，此时考虑第i个人
        int s=Q[j].s,c=Q[j].c; LL w=dp[s];
        if(w<0) continue; if(i-c<=k) dp[s]+=P[i].a;
        up(1,p,k) if(!(s&(1<<k-1))) ckm(dp[s|(1<<k-1)],w+P[i].b[k]);
    }
    printf("%lld\n",dp[t]);
    return 0;
}
