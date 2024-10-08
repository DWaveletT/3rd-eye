---
create_time: 1586618816
update_time: 1586618816
title: 题解 P5131 【荷取融合】
board: 1
tag:
- 1
extension:
  problem:
    id: P5131
    type: P
    title: 荷取融合
    difficulty: 6
    submitted: true
    accepted: true
---
## 题目大意

$n$个数中选择$k$个（可以重合），求这$k$个数的乘积的期望。

## 题解

很显然，这个问题可以拆分为两部分：**求方案总数**，以及**求所有方案的贡献和**。

### 求方案总数

我们设$F_{i,j}$表示前$i$个数中，选择$j$个数的方案。那么考虑第$i$个数如何处理。

- $1.$不选择第$i$个数。它的方案总数为$F_{i-1,j}$。

- $2.$选择第$i$个数。它的方案总数为$F_{i,j-1}$。

那么有：

$$
F_{i,j}=F_{i-1,j}+F_{i,j-1}
$$

### 求贡献和

同样地，我们定义$G_{i,j}$表示前$i$个数中，选择$j$个数的贡献总和。与上文类似，考虑第$i$个数的情况。

- $1.$不选择第$i$个数。这一部分的贡献总和为$G_{i-1,j}$。

- $2,$选择第$i$个数。这一部分的贡献总和为$G_{i,j-1}\times A_i$。

也就是说，

$$
G_{i,j}=G_{i-1,j}+G_{i,j-1}\times A_i
$$


最后的答案为$\frac{G_{n,k}}{F_{n,k}}$。用快速幂求出$F_{n,k}$的逆元即可。

### 空间优化

开$\mathcal O(n\times k)$的空间会爆炸。因此考虑滚动数组优化。

$F_{i,x},G_{i,x}$的值只和$F_{i-1,x}$和$G_{i-1,x}$的值相关。因此我们只需要保留上一个枚举到的$i$即可。具体的实现中，我们只需要用布尔变量$o$表示当前所用的数组，而$\operatorname{not} o$表示上一个枚举到的$i$时所用的数组。每次枚举完$i$，就令$o\gets \operatorname{not} o$即可。

时间复杂度$\mathcal O(n\times k)$，空间复杂度$\mathcal O(k)$。

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
const int MOD =19260817;
const int MAXN =1e5+3,MAXK=300+3;
int F[2][MAXK],G[2][MAXK],P[MAXN];
int n,k; bool o;
int pwr(int x,int y){
    int ret=1,t=x; while(y){
        if(y&1) ret=(LL)ret*t%MOD; y>>=1,t=(LL)t*t%MOD;
    }
    return ret;
}
int main(){
    n=qread(),k=qread(); up(1,n,i) P[i]=qread();
    F[!o][0]=1;
    up(1,n,i){
        F[o][0]=1; up(1,k,j)F[o][j]=(F[!o][j]+F[o][j-1])%MOD;
        G[o][0]=1; up(1,k,j)G[o][j]=((LL)G[!o][j]+(LL)G[o][j-1]*P[i])%MOD;
        o=!o;
    }
    printf("%d\n",(LL)G[!o][k]*pwr(F[!o][k],MOD-2)%MOD);
    return 0;
}
