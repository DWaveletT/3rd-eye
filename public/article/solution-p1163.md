---
create_time: 1583474018
update_time: 1583474018
title: 【题解】【P1163 银行贷款】
board: 1
tag:
- 1
extension:
  problem:
    id: P1163
    type: P
    title: 银行贷款
    difficulty: 3.0247
    submitted: true
    accepted: true
---

## 题目大意

给出$n,m,k$，求贷款者向银行支付的利率$p$,使得:

$$
\sum_{i=1}^{k}\dfrac{m}{(1+p)^i}=n
$$

按百分比形输出，精确到小数点后一位。

## 题解

$\text{orz}$，光是理解题意就理解了半天……果然语文差学$\text{OI}$也很难受。

题目中提到了一句很重要的话：**利率按月累计**。这是什么意思呢？这是指，假如第一个月的利率为$(1+p)$，那么第二个月就变成了$(1+p)^2$了。那么这两个月，你偿还的金额实际相当于你借得的$\frac{m}{1+p}+\frac{m}{(1+p)^2}$元。我们已知一共借了$n$元，那么就能得到上面提到的公式了。

关于如何计算$m$。首先，~~根据生活常识~~利率越大你实际偿还的金额（即你借到的$n$元）越小。我们对上式移项：

$$
\sum_{i=1}^{k}\dfrac{1}{(1+p)^i}=\dfrac{n}{m}
$$

当$p$小于正确答案时，左式就会小于右式。反之左式就会大于右式。因此我们可以根据$p$的单调性倍增。

我们设$f(p)=\text{左式}=\sum\limits_{i=1}^{k}\frac{1}{(1+p)^i}$。设当前答案为$p$,倍增量为$k$。那么如果$f(p)<\frac{n}{m}$，我们就可以让$p$加上$k$,**同时将$\bold k$翻倍**。否则将$k$减半。当$k$小于某个阈值（即精度）时，此时的$p$就是答案。

倍增算法有一个好处是，你几乎不用考虑上界（即使银行放超高利贷$\text{orz}$）。并且精度非常容易控制：你只需要将$p$和$k$初始为非常小的数(比如$10^{-6}$)，然后退出条件为$k$是否大于$10^{-11}$即可。

倍增的复杂度与二分相同，为$\mathcal O(K \log N)$。其中$N$为答案除以精度，$K$为分期付款总天数。

## 参考代码

代码异常简短，尤其是倍增只要两三行就能搞定了。

```
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
int n,m,t;
bool chk(double x){	//检查当前答案是否偏小
    double w=1,tot=0;
    up(1,t,i) w/=(1+x),tot+=w;
    return tot>(double)n/m;
}
int main(){
    n=qread(),m=qread(),t=qread();
    double p=-1e-9,k=1e-9; while(k>1e-11){	//倍增
        if(chk(p+k)) p+=k,k*=2.0; else k/=2.0;
    }
    printf("%.1lf\n",(p*100.0));
    return 0;
}
