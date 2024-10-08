---
create_time: 1583478902
update_time: 1583478902
title: 【题解】【P3743 kotori的设备】
board: 1
tag:
- 1
extension:
  problem:
    id: P3743
    type: P
    title: 小鸟的设备
    difficulty: 5
    submitted: true
    accepted: true
---

## 题意简述

$n$个设备，初始电量为$B_i$单位，耗电速度为$A_i$且在实数域上连续。现在有个充电宝，可以给任意设备充电，充电速度为$p\text{单位}/s$。求最大的时间$t$，使得没有任何设备在$t$时刻之前耗完电。

## 题解

$\qquad$很显然，$t$满足单调性。而因为充电宝切换充电设备的时间不计，因此我们只需要考虑$t$时刻需要的总电量以及可以提供的总电量。我们可以使用倍增求出最大的$t$。

$\qquad$假设现在答案为$t'$。那么在$t'$时刻内，我们一共可以充$t'\times p$单位的电量。对于每个设备，这段时间内一共会消耗$C_i=A_i\times t' $的电量。我们判断$B_i$是否大于$C_i$。若$B_i<C_i$，我们就需要用总电量减去需要的电量$C_i-B_i$。最后检查剩余的总电量是否大于$0$即可。

$\qquad$然后是关于这题的精度问题。如果用倍增算法，可以很容易地控制精度：倍增量$k$从$10^{-11}$开始。另外，有一个技巧：控制循环的次数（比如$200$次），这样就可以在保证精度的情况下不会$\text{TLE}$。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;
typedef long long LL;
int qread(){
    int w=1,c,ret;
    while((c=getchar())> '9'||c< '0')
    w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9')
    ret=ret*10+c-'0';
    return ret*w;
}
const int MAXN =1e5+3;
int n,v,A[MAXN],B[MAXN];
typedef double LD;
bool chk(LD t){
    LD w=t*v; up(1,n,i){
        if((LD)B[i]<(LD)A[i]*t)
        w-=(LD)A[i]*t-B[i];
    }
    return w>1e-13;
}
LD INF =1e30;
int main(){
    n=qread(),v=qread();
    up(1,n,i) A[i]=qread(),B[i]=qread();
    LD p=1e-9,k=1e-9; up(1,200,i){
        if(p+k<INF&&chk(p+k)) p+=k,k*=2.0; else k/=2.0;
    }
    if(p>=INF/2) puts("-1"); else
    printf("%.10lf\n",p);
    return 0;
}
