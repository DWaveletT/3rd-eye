---
create_time: 1586784936
update_time: 1586784936
title: 题解 P6364 【1024 程序员节发橙子】
board: 1
tag:
- 1
extension:
  problem:
    id: P6364
    type: P
    title: '[传智杯 #2 初赛] 1024 程序员节发橙子'
    difficulty: 3
    submitted: false
    accepted: false
---
## 题目大意

$n$ 个人排成一列，要求每个人发若干个橘子，使得相邻的两个人中分数高的橘子更多。若相同，则两人拿的橘子一样多。

## 题解

这里给出一个略不同于楼上的思路。

首先，题目中有一个条件：**两个相邻的人，如果分数相同，则拿一样多的橙子**。那么我们可以将这两个人缩在一起。同理，更多的人分数相同也可以缩成一个点。由于每个人橘子数相同，所以不会影响这些人左右的人的橘子数。

缩完点之后，我们开始贪心。

很显然，如果一个人分数最低，那么他只用拿一个橘子。

如果他旁边有一个人，分数次低，那么就只用给他发两个橘子就够了。可以保证这样的正确性。因为他显然不能再拿更少的橘子了；而如果他拿了更多的橘子，显然答案不会更优。

于是，我们按照分数从小到大考虑每一个人（点）。只需要给他发尽量少的橘子，使得他的橘子数多余周围的分数更低的人。

由于周围分数比他更低的人一定已经先考虑过了（分数相等的人已经与他缩在了同一个点内），而分数更高的人一定还没有分配，此时橘子数为 $0$，因此只需要取左右两个点的最大值 $+1$ 即可。

比如这样一个例子：

$$
\tt\{1,12,4,4,4,3,2,4,6,1\}
$$

先进行缩点，将中间三个相同的 $4$ 缩掉。

$$
\tt\{1,12,\stackrel{3}{4},3,2,4,6,1\}
$$

从小到大考虑每个人。左右两个人只需要发一个橘子。

$$
\tt\{1,0,\stackrel{3}{0},0,0,0,0,1\}
$$

分数为$2$的人，也只需要一个就够了。

$$
\tt\{1,0,\stackrel{3}{0},0,1,0,0,1\}
$$

此时考虑分数为$3$的人（即第$4$个点）。我们发现，他最少需要拿 $2$ 个。

$$
\tt\{1,0,\stackrel{3}{0},2,1,0,0,1\}
$$

同理，执行上述操作，最后结果为：

$$
\tt\{1,4,\stackrel{3}{3},2,1,2,3,1\}
$$

统计答案，就是$1+4+3\times 3+2+1+2+3+1=23$。

**注意要开 $\textbf{long long}$（即 $\bf{64}$ 位长整数）。**

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
const int MAXN =1e6+3;
LL n,ans,W[MAXN],t,T[MAXN];
void write(LL t){
    if(t>9) write(t/10); putchar('0'+t%10);
}
struct Node{
    int w,p,c;
    bool operator <(Node t){
        return w<t.w;
    }
}P[MAXN];
int main(){
    P[0].w=-1;
    n=qread(); up(1,n,i){
        int w=qread(); if(w==P[t].w) ++P[t].c;
        else P[++t].w=w,P[t].p=t,P[t].c=1;
    }
    sort(P+1,P+1+t); up(1,t,i){
        int w=P[i].w,id=P[i].p; T[id]=P[i].c;
        W[id]=max(W[id-1],W[id+1])+1;
    }
    up(1,t,i) ans+=(LL)T[i]*W[i];
    write(ans);
    return 0;
}
/*
7
3 4 4 4 5 4 3
*/
