---
create_time: 1655545013
update_time: 1655545013
title: 题解 P4813 【[CCO 2014]Troy 与三角形】
board: 1
tag:
- 1
extension:
  problem:
    id: P4813
    type: P
    title: '[CCO2014] Troy 与三角形'
    difficulty: 7.1538
    submitted: false
    accepted: false
---
## 题解

记大小为 $k$ 的符合题意的三角形为 $k$ 阶三角形。现在考虑以 $(x,y)$ 作为上顶点的三角形。考虑如下事实；

- 首先 $(x,y)$ 这个位置肯定得是个 $\verb!#!$，不然就一定不是一个三角形的上顶点了。
- 如果 $(x,y)$ 可以作为 $k$ 阶三角形的上顶点，那么它同样可以作为 $1\sim (k-1)$ 任意一阶三角形的上顶点。
- 如果 $(x,y)$ 可以作为 $k$ 阶三角形的上顶点，那么 $(x+1,y-1),(x+1,y),(x+1,y+1)$ 都可以作为 $k-1$ 阶三角形的顶点。

于是，记 $F_{x,y}$ 表示 $(x,y)$ 这个点最多可以作为哪一阶三角形的上顶点。有如下状态转移方程：

$$
F_{x,y}=\begin{cases}
0 & S_{x,y}=\verb!.! \cr
1+\min\{F_{x+1,y-1},F_{x+1,y},F_{x+1,y+1}\} & S_{x,y}=\verb!#!
\end{cases}
$$

从最后一行开始向上转移就行了。最终答案显然就是 $\sum F_{i,j}$。时间复杂度 $\mathcal O(n^2)$。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l,END##i=r;i<=END##i;++i)
#define dn(r,l,i) for(int i=r,END##i=l;i>=END##i;--i)
using namespace std;
typedef long long i64;
const int INF =2147483647;
const int MAXN=2e3+3;
char S[MAXN][MAXN]; int n,F[MAXN][MAXN]; i64 ans;
int qread(){
    int w=1,c,ret;
    while((c=getchar())> '9'||c< '0') w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9') ret=ret*10+c-'0';
    return ret*w;
}
int main(){
    n=qread(); up(1,n,i) scanf("%s",S[i]+1);
    dn(n,1,i){
        up(1,n,j) if(S[i][j]=='#')
            F[i][j]=1+min({F[i+1][j],F[i+1][j-1],F[i+1][j+1]}),
            ans+=F[i][j];
    }
    printf("%lld\n",ans);
    return 0;
}
