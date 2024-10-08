---
create_time: 1587397645
update_time: 1587397645
title: 题解 CF21B 【Intersection】
board: 1
tag:
- 1
extension:
  problem:
    id: CF21B
    type: CF
    title: Intersection
    difficulty: 5
    submitted: false
    accepted: false
---

## 题目大意

两个点集 $P=\{(x,y)|A_1x+B_1y+C_1=0\}$，$Q=\{(x,y)|A_2x+B_2y+C_2=0\}$，求 $P\cap Q$ 的元素个数。如果有无穷个元素，输出 $-1$。

## 题解

非常初级的计算几何，但是要特判的地方有一点多……


给出的两个集合，都是直线的标准式 $Ax+By+C=0$ 的形式。但这并不意味着两个都是直线。因此需要分别考虑。为了方便下面的讨论，我们设全集 $U=\{(x,y)|x\in R,y\in R\}$，也就是平面上**所有**点的集合；空集为 $\varnothing$。

### $\textbf{1.P,Q}$ 存在一个不是直线

$Ax+By+C=0$ 不是直线，当且仅当 $A=B=0$。

显然，如果 $C=0$，那么该集合为 $U$；否则，如果 $C\ne 0$，那么就是 $\varnothing$。

如果存在一个集合是空集，那么显然结果是 $0$，因为空集与任何集合的交都为空；否则如果存在一个集合为 $U$，那么答案为 $-1$。因为只要有一个集合为全集 $U$，那么他与另外一个集合的交就是另外一个集合本身。而无论是直线集还是全集，它的元素个数都是无穷大。

### $\textbf{2.P,Q}$ 均为直线

这一部分内容相对容易判断，因为两条直线之间的关系只有**三**种情况：相交，平行，和**重合**。

有一个结论是，如果$P,Q$各项系数都不为零，那么 $P,Q$ 平行当且仅当 $\frac{A_1}{A_2}=\frac{B_1}{B_2}\ne \frac{C_2}{C_2}$。

关于这个式子的证明，我们可以将原来的标准式化为斜截式（即经典的 $y=kx+b$ 的形式），然后我们发现 $P=-\frac{A_1}{B_1}x+\frac{C_1}{B_1},Q=-\frac{A_2}{B_2}x+\frac{C_2}{B_2}$。两直线平行必有斜率相等，且 $y$ 轴上的截距不等。即 $\frac{A_1}{B_1}= \frac{A_2}{B_2},\frac{C_1}{B_1}\ne \frac{C_2}{B_2}$，化简就能得到上式。

关于系数为 $0$ 的特殊情况，可以分类讨论。这里不详细展开。

最后，我们能够得到这样的一个式子，$P/\!\!/Q$，当且仅当：

$$
A_1\times B_2=A_2\times B_1\text{且}A_1\times C_2\ne A_2\times C_1\text{且}B_1\times C_2\ne B_2\times C_1
$$

平行时，无交点，答案为 $0$；重合时，无穷个交点，答案为 $-1$；相交时，答案为 $1$。

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
int a1,a2,b1,b2,c1,c2,f1,f2;
int main(){
    a1=qread(),b1=qread(),c1=qread();
    a2=qread(),b2=qread(),c2=qread();
    if(a1==0&&b1==0&&c1==0) f1= 1; else
    if(a1==0&&b1==0&&c1!=0) f1=-1;
    if(a2==0&&b2==0&&c2==0) f2= 1; else
    if(a2==0&&b2==0&&c2!=0) f2=-1;
    if(f1==-1||f2==-1) puts("0"); else
    if(f1== 1||f2== 1) puts("-1");else
    if(b1*a2-a1*b2!=0) puts("1"); else
    if(a1*c2==a2*c1&&b1*c2==b2*c1) puts("-1");
    else puts("0");
    return 0;
}
