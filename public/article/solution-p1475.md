---
create_time: 1582544165
update_time: 1582544165
title: 【题解】【P1475 控制公司】
board: 1
tag:
- 1
extension:
  problem:
    id: P1475
    type: P
    title: '[USACO2.3] 控制公司 Controlling Companies'
    difficulty: 4
    submitted: true
    accepted: true
---

## 题目大意

若公司$A,B$满足公司$A$所控制的公司持有$B$的股票总和大于$50\%$或$A=B$则$A$控制$B$。现给出$n$条关系$(i,j,p)$表示公司$i$持有公司$j\ p\%$的股票，求满足$A$控制$B$且$A\not=B$的$(A,B)$。

公司总数小于$100$。

## 题解

虽然代码比较简单，但的确不是一道容易思考的题目。

假设当前各公司的关系为$C_{i,j}$，若$C_{i,j}=1$则公司$i$控制了公司$j$。由题意，$C_{i,i}=1$。

我们设**初始情况**下公司$A$持有公司$B$的股票占比为$P_{i,j}$。每一轮我们先算出**当前这一轮**公司$i$持有公司$j$的股票为$Q_{i,j}$。即：

$$
Q_{i,k}=\sum_{C_{i,j}=1}P_{j,k}
$$

然后我们根据$Q_{i,j}$来更新$C_{i,j}$。反复操作使得不再产生更新即可。


## 参考代码

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
const int MAXN =100+3;
int n,m=100;
int P[MAXN][MAXN],Q[MAXN][MAXN]; bool C[MAXN][MAXN];
int main(){
    n=qread(); up(1,n,i){
        int u=qread(),v=qread(),p=qread();
        P[u][v]+=p;
    }
    up(1,m,i) C[i][i]=true;
    up(1,m,T){
        memset(Q,0,sizeof(Q));
        up(1,m,i) up(1,m,j) if(C[i][j]) up(1,m,k) Q[i][k]+=P[j][k];
        up(1,m,i) up(1,m,j) if(Q[i][j]>50) C[i][j]=true;
    }
    up(1,m,i) up(1,m,j) if(i!=j&&C[i][j]) printf("%d %d\n",i,j);
    return 0;
}
