---
create_time: 1584501494
update_time: 1584501494
title: 【题解】【P2745  [USACO5.3]窗体面积Window Area】
board: 1
tag:
- 1
extension:
  problem:
    id: P2745
    type: P
    title: '[USACO5.3] 窗体面积Window Area'
    difficulty: 7.4773
    submitted: true
    accepted: true
---

如果$\LaTeX$崩了，[请在博客中查看](https://www.luogu.com.cn/blog/McHf/p2745-discrete)。

## 题目大意

要求模拟一个窗体界面。共有若干操作：

- 创建一个新窗体：$\operatorname{w}(I,x,y,X,Y)$，标识符为$I$，两个对角为$(x,y),(X,Y)$

- 将窗体置顶： $\operatorname{t}(I)$，置顶标识符为$I$的窗体。

- 将窗体置底： $\operatorname{b}(I)$，置底标识符为$I$的窗体。

- 删除一个窗体：$\operatorname{d}(I)$，删除标识符为$I$的窗体。

- 输出窗体可见部分的百分比：$\operatorname{s}(I)$。

满足$I\in\mathtt{\{'a'\cdots 'z','A'\cdots 'Z','1'\cdots'9'\}}, x,y\in[1,32767],s\text{操作不超过500次}$
## 题解

### 读入数据

对于每个操作，我们只需要读入第一个字母，再根据操作的种类确定接下来要读入什么就行了。可以手写读入，排除`(`,`)`,`\n`,`\r`这些无用的符号。

### 窗口模拟

这是一道挺好的模拟题，挺考验选手的码力的……

虽然题目并没有明确写出总操作数是多少，以及窗口的具体数量，但从标识符的可能种类可以发现窗口在同一时刻不会很多；查询操作不会很多。其他的操作越快越好。

因此我们可以用链表模拟窗口的删除、置顶、置底、创建。具体来说，我们可以直接用双向链表实现删除和创建；对于置底、置顶，先创建一个虚的最顶层窗口$head$，以及虚的最底层窗口$tail$。置顶$I$相当于删除$I$并在$head$后面插入$I$；置底相当于在$tail$前面插入$I$。

### 查询操作

很显然，我们只需要处理在$I$之上的块。考虑到$x,y\in[1,32767]$，我们先进行离散化。同时，我们计算出离散化后每个有用的点（即当前存在的所有窗口的$4$个顶点坐标），然后用差分的方法染色，最后统计有多少块被覆盖。

举个栗子：

$$
\tt\begin{matrix}\backslash  & -200 & -150 & 0 & 12 & 16 & 233\cr -100 & A & A & A\cr 25 & A & AB & AB & B & B\cr 500 &  & B & B & B & B\cr 700\cr \end{matrix}
$$

我们进行离散化

$$
\tt\begin{matrix}\backslash  & 1 & 2 & 3 & 4 & 5 & 6\cr 1 & A & A & A\cr 2 & A & AB & AB & B & B\cr 3 &  & B & B & B & B\cr 4\cr \end{matrix}
$$

然后进行差分。

$$
\tt\begin{matrix}\backslash  & 1 & 2 & 3 & 4 & 5 & 6\cr 1 & +1 & 0 & 0 & -1 & 0 & 0\cr 2 & 0 & +1 & 0 & 0 & 0 & -1\cr 3 & -1 & 0 & 0 & +1 & 0 & 0\cr 3 & 0 & -1 & 0 & 0 & 0 & +1\cr \end{matrix}
$$

我们将它竖着扫一遍

$$
\tt\begin{matrix}\backslash  & 1 & 2 & 3 & 4 & 5 & 6\cr 1 & +1 & 0 & 0 & -1 & 0 & 0\cr 2 & +1 & +1 & 0 & -1 & 0 & -1\cr 3 & 0 & +1 & 0 & 0 & 0 & -1\cr 3 & 0 & 0 & 0 & 0 & 0 & 0\cr \end{matrix}
$$

再横着扫一遍（其实先横着扫再竖着扫也一样）

$$
\tt\begin{matrix}\backslash  & 1 & 2 & 3 & 4 & 5 & 6\cr 1 & 1 & 1 & 1 & 0 & 0 & 0\cr 2 & 1 & 2 & 2 & 1 & 1 & 0\cr 3 & 0 & 1 & 1 & 1 & 1 & 0\cr 3 & 0 & 0 & 0 & 0 & 0 & 0\cr \end{matrix}
$$

最后，按照我们要查询的那个窗口的坐标暴力扫描里面的块。若权值不为$0$，答案减去它离散化前的面积。

时间复杂度$\mathcal O(N\times N \times M)$。其中$N$为存在的块的总个数，$M$为查询操作的总个数。因为$N\le 62,M\le 500$，可以通过本题。

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
    while((c=getchar())>='0' &  & c<='9')
    ret=ret*10+c-'0';
    return ret*w;
}  
int hsh(char ID){
    if('a'<=ID &  & ID<='z') return ID-'a'+1;
    if('A'<=ID &  & ID<='Z') return ID-'A'+1+26;
    return ID-'0'+26+26+1;
}
char readc(){
    char c; while(((c=getchar())=='('||c==')'||c==' '||c=='\n'||c=='\r') &  & c!=EOF); return c;
}
const int MAXN =26+26+10+3;
int X1[MAXN],Y1[MAXN],X2[MAXN],Y2[MAXN],rd;
int bef[MAXN],nxt[MAXN];
void dlt(int ID){
    nxt[bef[ID]]=nxt[ID],bef[nxt[ID]]=bef[ID];
}
void ist(int bf,int ID){
    bef[ID]=bf,nxt[ID]=nxt[bf],bef[nxt[bf]]=ID,nxt[bf]=ID;
}
int e=MAXN-1,tot,tp1,tp2,Q1[MAXN*2],Q2[MAXN*2];
bool use[MAXN*2][MAXN*2];
map<int,int> mmpA,mmpB;
int main(){
    bef[e]=0,nxt[0]=e;
    while((rd=readc())!=EOF){
        int ID=hsh(readc()); 
        if(rd=='w'){
            ist(0,ID),X1[ID]=qread(),Y1[ID]=qread(),
            X2[ID]=qread(),Y2[ID]=qread();
            if(X1[ID]>X2[ID]) swap(X1[ID],X2[ID]);
            if(Y1[ID]>Y2[ID]) swap(Y1[ID],Y2[ID]);
        }
        else if(rd=='d') dlt(ID);
        else if(rd=='t') dlt(ID),ist(0,ID);
        else if(rd=='b') dlt(ID),ist(bef[e],ID);
        else if(rd=='s'){
            mmpA.clear(),mmpB.clear(); tp1=tp2=0; int ans=0;
            for(int i=0;i!=ID;){
                i=nxt[i];
                Q1[++tp1]=X1[i],Q1[++tp1]=X2[i],Q2[++tp2]=Y1[i],Q2[++tp2]=Y2[i];
            }
            sort(Q1+1,Q1+1+tp1),sort(Q2+1,Q2+1+tp2);
            tp1=unique(Q1+1,Q1+1+tp1)-Q1-1,tp2=unique(Q2+1,Q2+1+tp2)-Q2-1;
            up(1,tp1,i) mmpA[Q1[i]]=i;up(1,tp2,i) mmpB[Q2[i]]=i;
            memset(use,0,sizeof(use));
            for(int i=nxt[0];i!=ID;i=nxt[i]){
                up(mmpA[X1[i]],mmpA[X2[i]]-1,a)
                up(mmpB[Y1[i]],mmpB[Y2[i]]-1,b) use[a][b]=true;
            }
            up(mmpA[X1[ID]],mmpA[X2[ID]]-1,a)
            up(mmpB[Y1[ID]],mmpB[Y2[ID]]-1,b)
            if(!use[a][b]) ans+=(Q1[a+1]-Q1[a])*(Q2[b+1]-Q2[b]);
            printf("%.3lf\n",(double)100.0*ans/((X2[ID]-X1[ID])*(Y2[ID]-Y1[ID])));
        }
    }
    return 0;
}
