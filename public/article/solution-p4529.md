---
create_time: 1585795278
update_time: 1585795278
title: 【题解】【P4529 [SCOI2003]切割多边形】
board: 1
tag:
- 1
extension:
  problem:
    id: P4529
    type: P
    title: '[SCOI2003] 切割多边形'
    difficulty: 10
    submitted: true
    accepted: true
---

## 题意简述

在一张$n\times m$的纸中，需要裁剪出其中的一个凸$k$边图案。每次裁剪会将一张纸剪成两张，并扔去其中一张。现在询问最短的裁剪线之和。

## 题解

感觉这题有一点恶评了，难度应该在绿~蓝以内。

为了方便书写，我们使用直线的一般形式表示，即$l:Ax+By+C=0$。

这边先普及一下解析几何中关于直线方程的相关知识。如果你已经学过，我觉得你不需要看这篇题解也能切这道题……

### 直线的交点

考虑两条直线：

$$
\begin{cases}Ax+By+C&=0\cr A'x+B'y+C'&=0 \end{cases}
$$

我们将$1$式乘上$A'$,$2$式乘上$A$，那么可以得到：

$$
\begin{cases}AA'x+A'By+A'C&=0\cr AA'x+AB'y+AC'&=0 \end{cases}
$$

上下两个式子相减，可以得到：

$$
(A'B-AB')y=A'C-AC'
$$

同理，我们也可以得到：

$$
(A'B-AB')x=B'C-BC'
$$

于是，我们就能够得到它们的交点为$\left(\dfrac{BC'-B'C}{AB'-A'B},\dfrac{AC'-A'C}{AB'-A'B}\right)$。

当然，还有一种特殊情况，就是两条直线平行。由于本题的特殊情况，不存在两条直线重合。因此，当出现两条直线平行（即$AB'=A'B$），特判即可。

特别值得注意的是，上述式子$A,A',B,B'$中存在$0$并不会影响结果的正确性。

### 两点确定直线

本题按照顺时针顺序输入各点坐标，我们需要根据每两个相邻的点求出过他们的直线。

考虑两个点$(a,b),(c,d)$，我们现在需要求出**一个**直线$l:Ax+By+C=0$。为什么要说是**一个**呢？因为$Akx+Bky+Ck=0$其实与上式等价。

分两种情况讨论：

- $C=0$。 这种情况非常简单。因为$aA+Bb=0$，所以可以直接得到$A=b,B=-a$时满足条件。

- $C\ne 0$。这种情况比较复杂。让我们讨论讨论。

由$Ax+By+C\Leftrightarrow Akx+Bky+Ck=0 \quad(k\ne 0)$，我们可以令$C=1$。可以联立方程组：

$$
\begin{cases}Aa+Bb+1&=0 \cr Ac+Bd+1&=0 \end{cases}
$$

考虑按照上面的方法，让一式乘以$c$，二式乘以$a$，得到：

$$
\begin{cases}Aac+Bbc+c&=0 \cr Aac+Bad+a&=0 \end{cases}
$$

同样的，让一式减去二式，得到$(bc-ad)B=a-c$

同理可以推出$(ad-bc)A=b-d$

那么这种情况下，可以得到一个$l:\dfrac{b-d}{ad-bc}x+\dfrac{a-c}{bc-ad}y+1=0$。

### 交点的位置

这里应该是最后一个要考虑的问题了。

我们在一张纸的**内部**，按照一条多边形的边做直线，我们需要知道它究竟会与哪两条直线产生交点。为了方便起见，我们求出这条边的中点$M\left(\dfrac{x_1+x_2}{2},\dfrac{y_1+y_1}{2}\right)$。

显然，只需要暴力枚举之前的每条直线，与当前直线求出交点，然后判断其中的哪两个点**刚好**包围了$M$。

$$
\begin{gathered}\stackrel{\normalsize P_1}{\bullet}\kern{20pt}\stackrel{\normalsize P_2}{\bullet}\kern{20pt}\stackrel{\normalsize M}{\bullet}\kern{30pt}\stackrel{\normalsize P_3}{\bullet}\kern{10pt}\stackrel{\normalsize P_4}{\bullet}\kern{60pt}\stackrel{\normalsize P_5}{\bullet}\\[-19pt]\underline{\kern{250pt}}\end{gathered}
$$

在这张图中，$P_2,P_3$即为我们的所求点。

（由于作者太菜了，只能画水平的直线。实际情况这条线可能是斜的，甚至有可能是垂直于$x$轴的。）

那么我们可以用两个点$L,R$表示当前**最接近**$M$的左右两个点的坐标。

同样的，有两种情况要考虑：

- 斜率不存在，即目前的交点$P$满足$P_x=M_x$。这种情况我们比较$P_y,M_y$，决定$P$在$M$的哪一侧即可。

- 斜率存在。直接判断$P_x,M_x$，判定$P$在$M$的哪一侧即可。

那么，这条剪切线的长度就是$|LR|=\sqrt{(L_x-R_x)^2+(L_y-R_y)^2}$。

### 暴力枚举

由于本题$k$的范围极小，所以可以直接$\mathcal O(k\times k!)$暴力搜索。

初始时，向当前的选边集合加入四条直线$x=0,y=0,x=n,y=m$即可。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;
typedef double LF;
const int MAXN =8+3;
struct Node{
    LF a,b,c; Node(LF _a=0,LF _b=0,LF _c=0):a(_a),b(_b),c(_c){}
}R[MAXN+3],L[MAXN+3];
LF X[MAXN],Y[MAXN],n,m; int k;
void get(Node l1,Node l2,LF &x,LF &y){
    if(fabs(l1.a*l2.b-l1.b*l2.a)<1e-9) {x=y=-1;return;}
    x=(l1.b*l2.c-l1.c*l2.b)/(l1.a*l2.b-l1.b*l2.a);
    y=(l1.c*l2.a-l1.a*l2.c)/(l1.a*l2.b-l1.b*l2.a);
}
double ans=INFINITY; bool vis[MAXN];
int _;
void dfs(int stp,double sum){
    if(stp==k+1){ans=min(ans,sum); return;}
    up(1,k,i){
        if(vis[i]) continue; vis[i]=true;
        LF mx=(X[i]+X[i+1])/2.0,my=(Y[i]+Y[i+1])/2.0;
        LF nsum=sum,px,py,qx,qy,dp=INFINITY,dq=INFINITY;
        up(1,stp+3,j){
            LF nx,ny; get(L[i],R[j],nx,ny); if(fabs(nx+1)<1e-9) continue;
            LF dis=sqrt((nx-mx)*(nx-mx)+(ny-my)*(ny-my));
            if(fabs(mx-nx)<1e-9){
                if(ny>my){if(dp>dis) dp=dis,px=nx,py=ny;}
                else {if(dq>dis) dq=dis,qx=nx,qy=ny;}
            } else{
                if(nx>mx){if(dp>dis) dp=dis,px=nx,py=ny;}
                else {if(dq>dis) dq=dis,qx=nx,qy=ny;}
            }
        }
        nsum+=sqrt((px-qx)*(px-qx)+(py-qy)*(py-qy));
        R[stp+4]=L[i]; dfs(stp+1,nsum); vis[i]=false;
    }
}
int main(){
    scanf("%lf%lf%d",&n,&m,&k);
    R[1].a=0,R[1].b=1,R[1].c=0;
    R[2].a=0,R[2].b=1,R[2].c=-m;
    R[3].a=1,R[3].b=0,R[3].c=0;
    R[4].a=1,R[4].b=0,R[4].c=-n;
    up(1,k,i) scanf("%lf%lf",&X[i],&Y[i]);
    X[k+1]=X[1],Y[k+1]=Y[1]; up(1,k,i){
        LF a=X[i],b=Y[i],c=X[i+1],d=Y[i+1];
        if(fabs(a*d-b*c)<1e-9) L[i].a=b,L[i].b=-a,L[i].c=0;
        else{
            L[i].a=(b-d)/(a*d-b*c);
            L[i].b=(a-c)/(b*c-a*d);
            L[i].c=1.0;
        }
    }
    dfs(1,0); printf("%.3lf\n",ans);
    return 0;
}
