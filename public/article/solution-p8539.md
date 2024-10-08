---
create_time: 1661829555
update_time: 1661829555
title: 题解 【WR2-2C】【来自地上的支援】
board: 1
tag:
- 1
extension:
  problem:
    id: P8539
    type: P
    title: 「Wdoi-2」来自地上的支援
    difficulty: 6
    submitted: true
    accepted: true
---
> $\text{upd 2022.9.11}$：原来有几句神志不清写错了，现在已经修正。

## 题解

注意到这样一个性质：每次操作选择的值（假设为 $c_i=a_i+b_iv$，其中 $b_i$ 是之前选中这个位置的次数）肯定会构成一些公差为 $v$ 的等差数列，且对于相邻的两个等差数列，后一个等差数列的第一项减去前一个等差数列的最后一项 $>v$。
  
这个性质可以这样理解：在第 $i$ 次操作选择了位置 $j$ 之后，相当于是给 $j$ 的价值加上了 $v$，而对于第 $i + 1$ 次操作，因为第 $i$ 次操作选了位置 $j$，所以 $a_j + b_j \times v$ 是 $[1,i]$ 中最大的，现在 $b_j \leftarrow b_j + 1$，$a_j + b_j \times v$ 一定也还是 $[1,i]$ 中最大的，所以第 $i$ 次操作要么选第 $i - 1$ 次操作选的位置，要么选第 $i$ 个位置。
  
而选择第 $i$ 个位置的充分条件就是第 $i$ 个位置不劣，即 $c_i \ge c_{i - 1} + v$。

若第 $i$ 个位置劣于 $i - 1$ 次操作选择的位置，则第 $i$ 次操作还是选择第 $i - 1$ 次操作选择的位置，$c_i = c_{i - 1} + v$。

由这个性质，可以发现选择第 $x$ 个位置的操作一定是在一个连续子区间 $[x,y]$ 中。

## $\mathcal O(n\log n)$ 做法
    
现在把一段等差数列压成一段一起维护，记录每一段的首项位置。
    
然后用一个指针 $i$ 从右向左扫，每次维护的是当只考虑 $[i,n]$ 时，$[i,n]$ 每一个位置对应的 $c_i$ 构成的那些等差数列。

先讲一下这个东西怎么维护：每次从 $i + 1$ 的结果推导出 $i$ 的结果，那么后面的一些段可能会转而选择 $i$，即 $a_i$ 较优，显然可以发现两点：
    
1. 如果一个等差数列的首项选择了 $i$，那么这个等差数列会全部选择 $i$；
2. 一定是一些连续的等差数列选择 $i$。
    
每次我们可以暴力去删除选择 $i$ 的段，然后加入一个新的等差数列，这个是均摊 $O(1)$ 的。每次查询的时候，找到 $[x + 1,n]$ 对应的信息，这样就成功撤销掉了 $x$ 的影响。
    
然后在这些等差数列段上面二分，找到最少选择几个段才能使有 $ k - 1$ 次操作选择 $x$，然后通过数学方法计算出，$a_x$ 最小修改为多少，可以使得最后一个必须选择 $x$ 的段选择 $x$。

不过这样我们没有考虑 $[1,x - 1]$ 的影响，所以我们还要将答案与需要使 $x$ 选择 $x$ 的答案取 $\max$。

## $\mathcal O(n)$ 做法

考虑第 $i$ 次操作。啥时候我们要选择 $j\;(j<i)$ 位置而不选择 $i$ 位置呢？那应该是 $a_j+v(i-j)\ge a_i$。移项，发现 $a_j-vj\ge a_i-vi$。

根据刚刚的结论，选择位置 $i$ 的操作一定是一段连续的区间 $[i,i+t]$。现在我们希望选择位置 $x$ 的操作要至少 $k$ 个。那需要满足两个要求：

- 第 $x$ 次操作选择了 $x$ 位置。
- 第 $y$ 次操作选择了 $x$ 位置，其中 $y=x,x+1,\cdots,x+k-1$。

记 $w_i=a_i-vi$，那么这两个要求相当于：

- $w_x\ge\max_{y<x} \{w_y\}$。注意这是大于等于，因为 $w$ 值相同时会选择最靠后的那个。
- $w_x> \max_{x<y\le x+k-1} \{w_y\}$。这里是严格大于，原因同上。

记 $s_i=\max_{j\le i} \{w_j\}$，容易发现第一个操作就相当于 $w_x\ge s_x$。问题在于第二个操作。如果 $s_{x+k-1}$ 第一次取得最大值时，选取的就是 $w_x$，那无法通过 $w_{x+k-1}$ 得到结果。但是若 $s_{x+k-1}$ 第一次取最大值时不是由于 $w_x$，那就可以直接选取。

为什么呢？此时 $w_x$ 的值，就等于：

$$
\max_{y\le x+k-1,y\neq x}\{w_y\}=\max\{\max_{y<x}\{w_y\},\max_{x<y\le x+k-1} \{w_y\}\}
$$

现在处理 $s_{x+k-1}$ 取最大时选取的就是 $w_x$ 的情况。考虑前缀非严格次大值 $s'_{x+k-1}$，那么它就相当于从 $x$ 以外的位置选取最大值了。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;
typedef long long i64;
const int INF =2147483647;
const int MAXN =1e7+3;
int n,m,v,w,l,F[MAXN],G[MAXN],A[MAXN],X[MAXN],K[MAXN];
i64 ans1,ans2; char _file[256];
int qread(){
	int w=1,c,ret;
	while((c=getchar())> '9'||c< '0') w=(c=='-'?-1:1); ret=c-'0';
	while((c=getchar())>='0'&&c<='9') ret=ret*10+c-'0';
	return ret*w;
}
int main(int argc,char **argv){
	n=qread(),m=qread(),v=qread();
	up(1,n,i) A[i]=qread();
	up(1,m,i) X[i]=qread(),K[i]=qread();	
    A[0]=-INF;
	up(1,n,i){
		A[i]=w=A[i]-i*v;
		if(w>=A[F[i-1]]) G[i]=F[i-1],F[i]=i; else
		if(w>=A[G[i-1]]) G[i]=i,F[i]=F[i-1]; else
		G[i]=G[i-1],F[i]=F[i-1];
	}
	up(1,m,i){
		int x=X[i],k=K[i],y=x+k-1; l=0;
		if(y<n) l=max(0,x*v+(F[y]==x?A[G[y]]+(G[y]>x):A[F[y]]+(F[y]>x)));
        ans1^=l,ans2+=l;
	}
    printf("%lld %lld\n",ans1,ans2);
	return 0;
}
