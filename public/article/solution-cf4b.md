---
create_time: 1586658310
update_time: 1586658310
title: 题解 CF4B 【Before an Exam】
board: 1
tag:
- 1
extension:
  problem:
    id: CF4B
    type: CF
    title: Before an Exam
    difficulty: 2.381
    submitted: false
    accepted: false
---

## 题目大意

$n$ 天，每天可以选择 $[L_i,R_i]$ 时间用来复习。求是否可以使复习时间**恰好**为 $s$。若可以，求出方案。

## 题解

很显然这 $n$ 天的总复习时间可以为 $\left[\sum\limits_{i=1}^nL_i,\sum\limits_{i=1}^nR_i\right]$。

如果存在合法方案，那么每一天**必定**要学习至少 $L_i$ 时长。那么我们不妨先给每一天选择$L_i$时长，此时这一天**还可以**学习 $T_i=(R_i-L_i)$ 时长。初步分配后，我们还需要选择 $t=\left(s-\sum\limits_{i=1}^nL_i\right)$ 时长的学习时间。

此时依次考虑每一天。我们贪心地分配剩余地时间，即越靠前的天数多学习越多的时长。若 $T_i\le t$，那么就将这一天全部选满，并且令 $t\gets (t-T_i)$。如果出现了 
 $T_i>t$，那么只需要再学习 $T_i-t$ 天，那么就可以完成学习计划。

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
const int MAXN =30+3;
int n,s,t,L[MAXN],R[MAXN],T[MAXN];
int main(){
    n=qread(),s=qread();
    up(1,n,i){
        L[i]=qread(),R[i]=qread();
        s-=L[i],T[i]=R[i]-L[i],t+=R[i]-L[i];
    }
    if(s<0||s>t) puts("NO"),exit(0);
    puts("YES"); up(1,n,i){
        if(s>=T[i]) s-=T[i],printf("%d ",L[i]+T[i]);
        else printf("%d ",L[i]+s),s=0;
    }
    return 0;
}
