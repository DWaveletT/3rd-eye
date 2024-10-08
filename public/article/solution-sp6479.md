---
create_time: 1588329757
update_time: 1588329757
title: 题解 SP6479 【VGCD - The Very Greatest Common Divisor】
board: 1
tag:
- 1
extension:
  problem:
    id: SP6479
    type: SP
    title: VGCD - The Very Greatest Common Divisor
    difficulty: null
    submitted: false
    accepted: false
---
## 题目大意

$T$组数据 $(T\le 10^3)$。每组两个数 $a,b(a,b\le 10^{12540})$，求 $\gcd(a,b)$。

另外，满足 $a,b$ 是形如

$$
\begin{pmatrix}
1 & 1 & 0 & \cdots & 0 \cr
-1 & 1 & 1 & \ddots & \vdots \cr
0 & -1 & \ddots & \ddots & 0 \cr
\vdots & \ddots & \ddots & \dots & 1 \cr
0 & \cdots & 0 & -1 & 1 \cr
\end{pmatrix}
$$

的矩阵的**行列式**。

由于该题比较 $\stackrel{\text{duliu}}{\text{麻烦}}$，这里分为三块来解决这个问题。

### $\rm Part1$ 询问的本质

这题好像是快速 $\rm GCD$，但是看这个数据范围，显然会爆炸（一般 $\rm gcd$ 的时间复杂度为 $\mathcal O(\log_2 n)$，但是因为这题要用到高精度，所以实际上会带有很大的常数）。所以考虑这题究竟在问什么。

观察题目给出的矩阵，求它的行列式，我们能发现一件惊奇的事情：**行列式的值恰好为斐波那契数列的某一项**。

#### 证明

考虑将矩阵化为**行阶梯矩阵**。（差不多是高斯消元那样的方法）

这里举个简单的栗子：

$$
A=\begin{pmatrix}
1 & 1 & 0 & 0 & 0 \cr
-1 & 1 & 1 & 0 & 0 \cr
0 & -1 & 1 & 1 & 0 \cr
0 & 0 & -1 & 1 & 1 \cr
0 & 0 & 0 & -1 & 1 \cr
\end{pmatrix}
$$

每次选择第$i$行的行，消去下方所有第 $i$ 列不为 $0$ 的行。

$$
\begin{pmatrix}
1 & 1 & 0 & 0 & 0 \cr
-1 & 1 & 1 & 0 & 0 \cr
0 & -1 & 1 & 1 & 0 \cr
0 & 0 & -1 & 1 & 1 \cr
0 & 0 & 0 & -1 & 1 \cr
\end{pmatrix}
$$

$$
\begin{pmatrix}
1 & 1 & 0 & 0 & 0 \cr
0 & 2 & 1 & 0 & 0 \cr
0 & -1 & 1 & 1 & 0 \cr
0 & 0 & -1 & 1 & 1 \cr
0 & 0 & 0 & -1 & 1 \cr
\end{pmatrix}
$$

$$
\cdots
$$

$$
\begin{pmatrix}
1 & 1 & 0 & 0 & 0 \cr
0 & 2 & 1 & 0 & 0 \cr
0 & 0 & \frac{3}{2} & 1 & 0 \cr
0 & 0 & 0 & \frac{5}{3} & 1 \cr
0 & 0 & 0 & -1 & 1 \cr
\end{pmatrix}
$$

$$
\begin{pmatrix}
1 & 1 & 0 & 0 & 0 \cr
0 & 2 & 1 & 0 & 0 \cr
0 & 0 & \frac{3}{2} & 1 & 0 \cr
0 & 0 & 0 & \frac{5}{3} & 1 \cr
0 & 0 & 0 & 0 & \frac{8}{5} \cr
\end{pmatrix}
$$

将对角线上所有的数字乘起来，就能得到它的行列式 $=8$。

考虑更一般的情形。设我们进行到了第 $i$ 行，其中 $A_{i,i}=\frac{feb_{i+1}}{feb_i},A_{i,i+1}=1$，这一行其他的都是 $0$。

此时第 $i+1$ 行满足 $A_{i+1,i}=-1,A_{i+1,i+1}=1$。

那么我们用第 $i$ 行消去 $A_{i+1,i}$，就会使得 $A_{i+1,i+1}=1+\frac{feb_{i}}{feb_{i+1}}=\frac{feb_{i+2}}{feb_{i+1}}$。

矩阵的行列式 $\det A=\prod_{i=1}^{n}A_{i,i}=feb_{n+1}$。

也就是说，每个询问的**本质**，其实是询问两个斐波那契数列上的数的最大公约数。

### $\rm Part2$ 求 $\gcd(feb_n,feb_m)$

给出结论：$\gcd(feb_n,feb_m)=feb_{\gcd(n,m)}$。可以参考[这题](https://www.luogu.com.cn/problem/P1306)。

因为在洛谷有类似的题目，所以这里就只给出简要证明。

#### 证明

不妨设 $n<m$。

首先，由辗转相减，有 $\gcd(feb_n,feb_{n+1})=\gcd(feb_{n+1}-feb_{n},feb_n)$。由于 $feb_{n+1}=feb_{n}+feb_{n-1}$，那么 $\gcd(feb_n,feb_{n+1})=\gcd(feb_{n-1},feb{n})=\cdots=\gcd(feb_{1},feb_{2})=1$。

设 $F_n=x,feb_{n+1}=y$，则 $feb_m=feb_{m-n-1}\times x+feb_{m-n}\times y$。

因此，$\gcd(feb_n,feb_m)=\gcd(x,feb_{m-n-1}\times x+feb_{m-n}\times y)=\gcd(feb_n,feb_{m-n})$

然后我们就能发现，这是一个辗转相减的式子。于是，$\gcd(feb_n,feb_m)=feb_{\gcd(n,m)}$。

### $\rm Part3$ 从 $F_n$ 找回 $n$

这一块其实非常简单。由于题目保证 $a,b\le 10^{12540}$，那么对应的斐波那契的项数不会超过 $\log_{\frac{5}{3}}12540< 6\times 10^4$。

然后只需要计算出 $f_i \mod 2^{64}$ 作为他的哈希值，然后塞到哈希表里就行了。查询的时候直接求输入的数字对 $2^{64}$ 取模的结果，然后在表里查询即可。

然后是关于高精度。由于该题数据有点毒瘤，所以这里用了压了 $9$ 位的压位高精来卡时间。因为只需要高精度加法，所以实现起来相当简单。

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
const int LEN =1e9,MAXN=6e4+3,SIZ=999997;
struct Node{
    int len; vector <int> dt;
    Node(int _len=0):len(_len){dt.resize(len+2);}
    Node operator +(Node t){
        int l=max(len,t.len); Node ret(l);
        up(1,l,i) ret.dt[i]=dt[i]+t.dt[i];
        up(1,l,i) ret.dt[i+1]+=ret.dt[i]/LEN,ret.dt[i]%=LEN;
        if(ret.dt[l+1]) ++ret.len,ret.dt.push_back(0);
        return ret;
    }
}P[MAXN];
typedef unsigned long long u64;
u64 a,b,c,t1,t2,t3,ver[MAXN];
int head[SIZ],nxt[MAXN],val[MAXN],tot;
void add(int u,u64 v,int w){
    ver[++tot]=v,nxt[tot]=head[u],val[tot]=w,head[u]=tot;
}
int  fnd(u64 t){
    for(int p=head[t%SIZ];p;p=nxt[p])
    if(ver[p]==t) return val[p]; return 0;
}
int  gcd(int a,int b){
    return a?gcd(b%a,a):b;
}
int main(){
    P[1]=P[2]=Node(1),P[1].dt[1]=P[2].dt[1]=1;
    a=b=1,c=0; add(1,1,1);
    up(3,MAXN-1,i){
        P[i]=P[i-1]+P[i-2],c=a+b,a=b,b=c;
        add(c%SIZ,c,i);
    }
    dn(qread(),1,T){
        t1=t2=t3=0;
        while(!isdigit(c=getchar())); t1=c-'0';
        while( isdigit(c=getchar()))  t1=t1*10+c-'0';
        while(!isdigit(c=getchar())); t2=c-'0';
        while( isdigit(c=getchar()))  t2=t2*10+c-'0';
        t1=fnd(t1),t2=fnd(t2); if(t1>t2) swap(t1,t2);
        t3=gcd(t1,t2); printf("%d",P[t3].dt[P[t3].len]);
        dn(P[t3].len-1,1,i){
            int w=P[t3].dt[i],t=0;
            up(1,9,j) t=t*10+w%10,w/=10;
            up(1,9,j) putchar('0'+t%10),t/=10;
        }
        puts("");
    }
    return 0;
}
```
