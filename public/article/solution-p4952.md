---
create_time: 1624634957
update_time: 1624634957
title: 题解 P4952 【[USACO04MAR]Financial Aid】
board: 1
tag:
- 1
extension:
  problem:
    id: P4952
    type: P
    title: '[USACO04MAR] Financial Aid'
    difficulty: 8
    submitted: false
    accepted: false
---
## 题解

这里提供一个比较简单，容易实现的**二分**做法。

由于我们希望在花费的金额最少的情况下，让中位数最大，那么我们可以**直接二分**这个中位数，然后想办法计算出这个中位数下最少的钱。一个容易想到的做法是，对于二分的中位数 $x$，将超过它的所有数排个序，不超过它的所有数再排一个序，两边分别取 $\frac{1}{2}n$ 个最小值。但仔细想想，这样对吗？

但正如 @Kewth 神仙所说，可能存在某两个方案，其中一个**中位数更大但花费更小**（也就不满足单调性了）。因为可能存在这样一种情况：某个 $\verb!CSAT!$ 值**不低于** $x$ 的奶牛（不妨称为优等生），所需的奖学金**低于**另外一个 $\verb!CSAT!$ 值低于 $x$ 的奶牛（不妨称为劣等生）。因此，我们选择了劣等生，反而花费了更多钱。

具体解决办法很简单：把多余的优等生“滥竽充数”填补到劣等生里，重新排序。

可能你会有疑问：这样选出来的方案，它的中位数不就大于 $x$ 了吗？事实确实如此。但是当 $x$ 取得最大值时，**必然存在这样的合法方案**（否则，我们总能取一个更大的 $x$）。因为这种二分方法是满足单调性的。随着 $x$ 的不断增大，优等生的条件变得更加苛刻，于是优等生的价格越来越贵；而劣等生本来就是用来填补价格空位的。优等生价格上涨，表现在决策上就是本来最贵的劣等生（或者拉来替补的优等生）被换成了最贵的优等生。

当然，还有一些细节。如果我们能选出的优等生还没有 $\frac{n}{2}+1$ 个，那么显然选不出这么多人；我们先把所有牛按照费用从小到大排序后，就不需要二分后再进行排序了。此外，下方代码直接二分了中位数的值而非按照  $\verb!CSAT!$ 值排序后，取得中位数的牛的编号，但可以证明这样没有问题。

时间复杂度 $\mathcal O(n\log w)$，常数应该小于平衡树和堆。

此外，由于作者的个人原因（指到今天还不会写纯正的二分……）所以下面的代码其实是倍增写法（或者说是倍减？）但是 $\verb!check!$ 函数与一般的二分相同。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l,END##i=r;i<=END##i;++i)
#define dn(r,l,i) for(int i=r,END##i=l;i>=END##i;--i)
using namespace std;
const int MAXN=2e5+3;
int n,c,f,p,C[MAXN],Q[MAXN],I[MAXN]; bool T[MAXN];
bool chk(int x){
    int w=0,t=0; memset(T,0,sizeof(T));
    up(1,c,i) if(C[I[i]]>=x &&t<n/2+1) T[i]=1,w+=Q[I[i]],++t;
    if(t<n/2+1) return false; t=0;
    up(1,c,i) if(T[i]==false&&t<n/2  )        w+=Q[I[i]],++t;
    return w<=f;
}
int qread(){
    int w=1,c,ret;
    while((c=getchar())> '9'||c< '0') w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9') ret=ret*10+c-'0';
    return ret*w;
}
bool cmp(int a,int b){return Q[a]<Q[b];}
int main(){
    n=qread(),c=qread(),f=qread();
    up(1,c,i) C[i]=qread()+1,Q[i]=qread(),I[i]=i;
    sort(I+1,I+1+c,cmp);
    dn(30,0,i) if(chk(p|(1<<i))) p|=1<<i;
    printf("%d\n",p==0?-1:p-1);
    return 0;
}
```
