---
create_time: 1589118445
update_time: 1589118445
title: 题解 CF991C 【Candies】
board: 1
tag:
- 1
extension:
  problem:
    id: CF991C
    type: CF
    title: Candies
    difficulty: 5.6
    submitted: false
    accepted: false
---

## 题目大意

两个人轮流吃糖果。第一个人会吃 $k$ 个，第二个会吃 $\left\lfloor\frac{\text{当前个数}}{10}\right\rfloor$ 个。求最小的 $k$，使得第一个人吃的糖果总数不小于一半。

## 题解

这里提供一个倍增的解法吧。

有个结论：$\bm k$** 越大，最终第一个人吃到的糖果越多**。

#### 简证

假设两个人轮流吃糖果的过程为一回合。设 $f(x,y)$ 为 $k=y$ 时第 $x$ 回合剩余的糖果总数，有：

$$
\text{x回合第一个人吃掉的糖果数}=x-f(x+1,y)=k+\left\lfloor\frac{y-k}{10}\right\rfloor
$$

最后一个式子，由于 $1\ge\left\lfloor\frac{y-k}{10}\right\rfloor-\left\lfloor\frac{y-k-1}{10}\right\rfloor$，因而总是单调不减的。于是，$f(x+1,y)$ 总是随着 $y$ 的增大而不断减小。因此，第二个人每回合吃到的糖果数越来越少，而总回合数也越来越少，于是第一个人吃到的总糖果数越来越多。

我们似乎可以倍增。但是，还要解决一个小问题，就是如果 $k$ 很小，会不会需要很长时间。事实上，即使 $k=1,n=10^{18}$，那么也只需要 $400$ 次左右的循环即可让糖果被吃完。

还有一个小小的优化是，我们让倍增量 $t=2^{60}$，此后不断判断答案或上 $t$ 是否能使得最终迟到的糖果**严格小于一半**，并折半 $t$。因为，只有找到能够使得吃到的糖果总数严格小于一半的最大的 $k$，才能使得最终的答案 $(k+1)$ 最小。而且，从大到小去考虑可以稍稍减去判断时所花费的循环次数。（当然，你也可以循环到第二个人吃掉的糖果已经超过一半时就直接跳出循环）。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;

typedef long long LL;
const int INF =2147483647;
LL qread(){
    LL w=1,c,ret;
    while((c=getchar())> '9'||c< '0')
    w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9')
    ret=ret*10+c-'0';
    return ret*w;
}
LL n,p,k=1ll<<60;
bool chk(LL x){
    LL t=n,cnt=0; while(t>0){
        cnt+=min(x,t),t-=min(x,t),t-=t/10ll;
    }
    return cnt>=n/2+n%2;
}
int main(){
    n=qread(); for(;k;k>>=1){if(!chk(p|k)) p|=k;
    printf("%lld\n",p+1);
    return 0;
