---
create_time: 1574562905
update_time: 1574562905
title: 【题解】【P5656-【模板】二元一次不定方程(exgcd)】
board: 1
tag:
- 1
extension:
  problem:
    id: P5656
    type: P
    title: 【模板】二元一次不定方程 (exgcd)
    difficulty: 6
    submitted: true
    accepted: true
---

## 题目简述

$T(T\leq2 *10^5)$组数据,每组给出$a,b,c$,询问使得$ax+by=c$成立的解.$a,b,c\in[1,10^9]$

若有正整数解,输出:

- **正整数解**的个数
- **正整数解**中,最小的$x$与最小的$y$
- **正整数解**中,最大的$x$与最大的$y$

否则,若有整数解,输出:

- 所有**整数解**中 $x$ 的最小正整数值， $y$ 的最小正整数值

否则,输出$-1$.

---

## 题解

由**裴蜀定理**可知,$a,b$可以组成所有的$\gcd(a,b)$的倍数.因此,我们只需要判断$c$是否为$\gcd(a,b)$的倍数,即可判断是否有解.

如果有解我们可以用**扩展欧几里得算法**求出一组特解$x',y'$,使得$ax'+by'=\gcd(a,b)$.我们设$d=\gcd(a,b)$.

$\text{exgcd}($扩展欧几里得算法$)$详情可~~上百度~~[参考OI-WIKI](https://oi-wiki.org/math/gcd/),这里不再赘述.


我们需要求出使得$ax_0+by_0=c$的解.这时候,我们只需要将$a,b$分别乘上$\frac{c}{d}$即可获得$x_0,y_0$.**接下来的算法将会大量运用这组特解.**

虽然获得了一组解,但是他却$\text{too simple}$.这很显然对我们的解题帮助不大.因此我们需要变换一下$x_0,y_0$.

假设我们要将$x_0$扩大,即变成$x_0+p$.~~观察可得~~我们需要将$y_0$缩小,即$y_0$需要变成$y_0-q$.

$$
\begin{cases}a*(x_0+p)+b*(y_0-q)=c\\a*x_0+b*y_0=c\end{cases}
$$

解得$p=\frac{b*q}{a}$.我们需要获得尽可能小的**正整数**$p,q$.那么就有$a|b*q,b|b*q$.即$b*q$的最小值为$\text{lcm}(a,b)=\frac{a*b}{gcd(a,b)}$.得出:

$$
\begin{cases}p_{min}=\frac{b}{d}\\q_{min}=\frac{a}{d}\end{cases}
$$

### 下面是最关键的操作

我们需要将$x_0$调至最小正整数,同时改变$y_0$的值.

具体操作,就是我们求最小的$k$,使得$x_0+k*p\geq1$.移项,可得
$$
k>\lceil\frac{1-x_0}{p}\rceil
$$

接着,我们就可以$x_0+=p*k,y_0+=q*k$,来构造出一组船新的特解,使得$x_0$为**最小正整数**.

回到题目.~~这条题目要求是真™多~~

首先判断有解.然后判断$y_0$是否大于$0($因为我们已经保证了$x_0>0)$来处理是否有正整数解.

有整数解,那么我们要输出$5$个数字.让我们分别处理:

### 有正整数解

注:下述情况均为正整数解的情况.

1.**解的个数**.很显然,我们只需要不断将$y_0$减去$q$,同时$x_0$加上$p$即可构造出所有可行解.解的总个数为$\lfloor (y-1)/q\rfloor +1$

2.**$x$的最小正整数值**.这就是我们求出的$x_0$,输出即可.

3.**$y$的最小正整数值**.我们只需要将$y_0$不断减去$q($因为$x_0$最小时,$y_0$一定最大$)$,即答案为$(y-1)\%q+1$.需要特殊注意一下$0$的情况.

4.**$x$的最大正整数值**.我们需要将$x_0$加上尽可能多的$p$,也就是$y_0$要减去尽可能多的$q$.答案为$x+\lfloor(y-1)/q\rfloor*p$

5.**$y$的最大正整数值**.$x_0$为最小正整数时,$y_0$自然最大,输出即可.

### 无正整数解

1.**$x$的最小正整数值**,同上,当前的$x_0$即为最小的正整数值.

2.**$y$的最小正整数值**.很显然,当前$y_0\leq 0($不然就存在正整数解了$)$.我们需要执行构造$x_0$的方法,即$y_0+q*\lceil((1.0-y)/q)\rceil$

### 最后要注意的

1. 一定要开$\text{long long}$,不然会爆~~血的教训~~

2. 该题细节超多,比如上取整,下取整这些东西都要涉及一定类型转换

## 参考程序

```cpp
#include<bits/stdc++.h>
#define debug(x) printf("In function [%s],the value of ["#x"] is %d\n",__FUNCTION__,x)
#define up(l,r,i) for(register int i=l;i<=r;++i)
#define dn(r,l,i) for(register int i=r;i>=l;--i)
using namespace std;
typedef long long LL;
const int INF =2147483647;
int qread(){
	int w=1,c,ret=0;
	while((c=getchar())> '9'||c< '0')
	w=(c=='-'?-1:1); ret=c-'0';
	while((c=getchar())>='0'&&c<='9')
	ret=ret*10+c-'0';
	return ret*w;
}
void qwrite(int x){
	if(x<0) x=-x,putchar('-');
	if(x>9) qwrite(x/10);
	putchar('0'+x%10);
}
LL exgcd(LL a,LL b,LL &x,LL &y){
	LL d=a; if(b==0) x=1,y=0; else{
		d=exgcd(b,a%b,y,x),y-=a/b*x;
	}
	return d;
}
int main(){
	dn(qread(),1,T){
		LL a=qread(),b=qread(),c=qread(),x,y;
		LL d=exgcd(a,b,x,y);
		if(c%d!=0) puts("-1"); else{
			x*=c/d,y*=c/d; LL p=b/d,q=a/d,k;
			if(x<0) k=ceil((1.0-x)/p),x+=p*k,y-=q*k; else	//将x提高到最小正整数 
			if(x>=0)k=(x-1)/p ,x-=p*k,y+=q*k;		//将x降低到最小正整数 
			if(y>0){	//有正整数解 
				printf("%lld ",(y-1)/q+1);	//将y减到1的方案数即为解的个数 
				printf("%lld ",x);			//当前的x即为最小正整数x
				printf("%lld ",(y-1)%q+1); 	//将y取到最小正整数 
				printf("%lld ",x+(y-1)/q*p);	//将x提升到最大 
				printf("%lld ",y);			//特解即为y最大值 
			} else{		//无整数解 
				printf("%lld " ,x);			//当前的x即为最小的正整数x 
				printf("%lld",y+q*(LL)ceil((1.0-y)/q)); //将y提高到正整数 
			}
			puts("");
		}
	}
	return 0;
}
```

---

