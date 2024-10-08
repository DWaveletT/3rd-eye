---
create_time: 1661822003
update_time: 1661822003
title: 题解 【WR2-1B】【「Wdoi-2」死亡之后愈发愉悦】
board: 1
tag:
- 1
extension:
  problem:
    id: P8541
    type: P
    title: 「Wdoi-2」死亡之后愈发愉悦
    difficulty: 10
    submitted: true
    accepted: true
---
## 题解

首先可以根据一个数是不是 $\mathrm{\frak{cute}\ number}$，将它染色为黑色或者白色。那么整个数轴就是由白色段与黑色段交替排列。记第 $i$ 个黑色段的长度为 $a_i$，第 $i$ 个白色段的长度为 $b_i$。

注意到，一个黑色段的第一个数字肯定是一个完全平方数。更一般地，第 $i$ 个黑色段第一个数字肯定是 $i^2$。那么下一个完全平方数就是 $(i+1)^2$。考虑到两者的间距为 $2i+1$，稍加推理即可得到 $a_i=i+1$，$b_i=i$。

![](https://cdn.luogu.com.cn/upload/image_hosting/zar054l0.png)

于是注意到，所有段的长度应该是按照 $2,1,3,2,4,3,\cdots$ 这样的方式交替排列的。黑色段后面的白色段长度比它小 $1$，白色段后面的黑色段长度比它长 $1$。接着对于 $a$ 的颜色进行分类讨论。

由于两种情况基本类似，因此这里以 $a$ 为黑色点开始讨论。

![](https://cdn.luogu.com.cn/upload/image_hosting/n1k978kx.png)

考虑设 $a$ 到它所处的黑色线段最后一个黑点的距离为 $s_1$；它下一个白段的长度为 $s_2$；再下一个黑段的长度为 $s_3$。另外，这黑—白—黑的区域不妨编号为 $1,2,3$。

一个朴素的想法是，从 $a$ 点处开始倍增，一直找到第一个在区域 $2$ 内的点。但是倍增有一个前提：你不能一下子跳过了区域 $2$，直接跑到区域 $3$ 里边去了，这样就找不到了。

考虑这样一个简单的策略（称作策略 $\alpha$）：

> 在点 $x$ 右边长度为 $a$ 的区域为黑色，再右边长度为 $b$ 的区域为白色。现在从 $x$ 点通过倍增（每次跳 $2^i$ 距离，即每次检查 $x+2^i$ 是否为白色区域）的方法起跳，不能跳过白色区域外。

容易发现，最容易一步跳到白色区域外的位置，就是 $x+a$ 这个点。从它最远可以跳到的位置是 $x+2a$，它应该不超过 $x+a+b$。因此得到，$x+2a\le x+a+b$，即 $a\le b$。

也就是说，在这个模型下，每次跳 $2^i$ 这个策略成立的前提条件是 $a\le b$。

---

在上文中，可以发现，$s_1$ 必然不超过 $s_2$，于是这种策略成立。

![](https://cdn.luogu.com.cn/upload/image_hosting/114ikw5r.png)

这样，我们找到了在第一个白色段内的元素 $t$，以及它到 $a$ 的距离 $|t-a|=2^k$。

![](https://cdn.luogu.com.cn/upload/image_hosting/2u7g8arq.png)

接着需要找到 $t$ 往两侧走到的最远的距离 $p$ 和 $q$（$t-p$ 和 $t+q$ 均为该段两侧端点处的白色点）。

考虑对上述策略进行简单的延申（称作策略 $\beta$）：

> 在点 $x$ 右边长度为 $a$ 的区域为黑色，再右边长度为 $b$ 的区域为白色。目前已知 $x+2^k$ 是白色点，现在要找到最后一个黑色点到 $x$ 的距离。

考虑这样的结论：$1+2^1+2^2+\cdots +2^{k-1}=2^k-1$。那么我们直接从 $k-1$ 开始，不断尝试 $x+2^i$，如果 $x+2^i$ 是黑色点，就 $x\gets x+2^i$，否则啥事不干。那么就可以找到最后一个黑色点到 $x$ 的距离，**也就求出了** $\bm a$。

---

运用策略 $\beta$，可以求出 $p$。又因为 $q\le s_3$，因此可以运用策略 $\alpha$，结合策略 $\beta$，求出 $q$。

交互次数分析：

- 找到 $k$ 需要用 $\log \sqrt v$ 次交互机会。
- 找到 $p$ 需要用 $k=\log \sqrt v$ 次交互机会。
- 找到 $q$ 需要用 $2\log \sqrt v$ 次交互机会。

总交互次数为 $4\log\sqrt v\approx 80$ 次。这是不行的。考虑哪里还能优化。

我们发现，计算 $q$ 的时候要先运用策略 $\alpha$ 从 $2^0$ 开始倍增。能不能第一次步子迈大一点呢？答案是可以的。因为我们只要不迈出区域 $3$ 就行了，那么只要步子大小不超过 $s_3$ 即可。又因为 $2s_3\ge s_1+s_2\ge 2^k$，于是发现 $s_3\ge 2^{k-1}$。那么倍增的第一步可以取 $2^{k-1}$。重新分析交互次数：

- 找到 $k$ 需要用 $k\le \log \sqrt v$ 次交互机会。
- 找到 $p$ 需要用 $k\le \log \sqrt v$ 次交互机会。
- 从 $q$ 出发找到第一个在区域 $3$ 内的点，需要 $k'=\log\sqrt v-k$ 次交互机会。
- 从 $q$ 往回走，需要 $k''=\log\sqrt v$ 次交互机会。

总交互次数为 $3\log\sqrt v\approx 60$ 次。可以通过该题。

## 代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l,END##i=r;i<=END##i;++i)
#define dn(r,l,i) for(int i=r,END##i=l;i>=END##i;--i)
using namespace std;
typedef long long i64;
const int INF =2147483647;
i64 qread(){
    i64 w=1,c,ret;
    while((c=getchar())> '9'||c< '0') w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9') ret=ret*10+c-'0';
    return ret*w;
}
map<int,bool> M;
bool ask(i64 x){
    if(M[x]) return M[x];
    cout<<"? "<<x<<endl; bool t; cin>>t; if(t==-1) exit(0); return M[x]=t;
}
void rpt(i64 a){ cout<<"! "<<a<<endl; }
const int MAXN=1e6+1+3;
int n=1e6+1,A[MAXN],B[MAXN];i64 P[MAXN],Q[MAXN];
int main(){
    A[1]=2,B[1]=1;
    up(2,n,i) A[i]=A[i-1]+1,B[i]=B[i-1]+1;
    P[A[1]]=1,Q[B[1]]=3;
    up(2,n,i){
        P[A[i]]=Q[B[i-1]]+B[i-1];
        Q[B[i]]=P[A[  i]]+A[  i];
    }
    up(1,qread(),T){
        M.clear();
        bool c=ask(0),d=!c; int a=0,b=0,l=0,u=20,p=0,q=0;
        up(  0,u,i) if(i==u||ask(   1<<i )==d){a=i;break;} l=1<<a;
        dn(a-1,0,i) if(ask(l-(p+(1<<i)))==d) p|=1<<i;a=max(a,1);
        up(a-1,u,i) if(i==u||ask(l+(1<<i))==c){b=i;break;}
        dn(b-1,0,i) if(ask(l+(q+(1<<i)))==d) q|=1<<i;
        int s1=l-p-1,s2=p+q+1;
        if(d) rpt(P[s2]-s1-1); else rpt(Q[s2]-s1-1);
    }
    return 0;
}
