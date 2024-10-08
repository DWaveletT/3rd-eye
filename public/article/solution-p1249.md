---
create_time: 1583587602
update_time: 1583587602
title: 【题解】【P1249 最大乘积】
board: 1
tag:
- 1
extension:
  problem:
    id: P1249
    type: P
    title: 最大乘积
    difficulty: 4
    submitted: true
    accepted: true
---

## 题目大意

将$n(n\leq 10^4)$拆分成若干个**互不相同**数字之和(可以只有$1$个数)，求这些数乘积的最大值。输出方案和最大值。

## 题解

楼上给了很多贪心的做法，然而并不是那么容易理解。这里给一个非常容易理解~~然而复杂度很劣~~的$01$背包做法吧。

**互不相同**这个条件可以改为从$1,2,\cdots,n$这$n$个数中选出一些数，使得它们的和为$n$。但是，$01$背包只能处理从$a$个物品中选出总共$b$空间的物品，使得它们的**价值和**最大，可是我们要求乘积呀？

在数学里，对数有一个很好的性质：

$$
\ln a+\ln b=\ln(a\times b)
$$

假如我们要选出一些数使得它们的乘积最大，就等价于**这些数的对数之和最大**。

因此题目就很显然了。$n$个物品，背包体积为$n$，每个物品体积$C_i$为$i$，价值$W_i$为$\ln i$。设$dp_{i,j}$为前$i$个物品总共花费了$j$的空间的最大和，转移方程：

$$
dp_{i,j}=\min\{dp_{i-1,j-C_i}+W_i,dp_{i-1,j}\}
$$

然后滚动数组优化一下，就可以$\mathcal O(N^2)$时间复杂度，$\mathcal O(N)$空间复杂度求出最大乘积的**方案**了。（因为答案过大，而精度不够高，因此最大乘积直接输出$\exp(dp_{n,n})$显然是不行的）

接着我们只需要写一个高精乘低精的乘法就行了。

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
const int MAXN =1e4+3,MAXL=1e5+3;
int n,C[MAXN],flg[MAXN];double W[MAXN],dp[MAXN];
vector <int> ans;
struct Node{
    int dt[MAXL],len; Node():len(0){memset(dt,0,sizeof(dt));}
    Node operator *(int t){
        Node res; up(1,len,i) res.dt[i]=dt[i]*t;
        up(1,len+10,i){
            res.dt[i+1]+=res.dt[i]/10,res.dt[i]%=10;
            if(res.dt[i]) res.len=i;
        }
        return res;
    }
}val;
int main(){
    n=qread(); up(1,n,i) W[i]=log(i);
    up(1,n,i) dp[i]=-INF;
    up(1,n,i) dn(n,i,j){
        if(dp[j-i]+W[i]>dp[j]) dp[j]=dp[j-i]+W[i],flg[j]=j-i;
    }
    for(int p=n;p;p=flg[p]) ans.push_back(p-flg[p]);
    dn(ans.size(),1,i) printf("%d ",ans[i-1]); puts("");
    val.len=1,val.dt[1]=1;
    up(1,ans.size(),i) val=val*ans[i-1];
    dn(val.len,1,i) putchar('0'+val.dt[i]); puts("");
    return 0;
}

```

## 其他

虽然这个算法跑得没有贪心快，但是应该是比较容易理解的（万一哪天题目改成另外一种选法，这个算法的**思想**依然适用，即化积为和。）~~而且这种算法不需要脑子，证明超简单，随手就能写出来~~

