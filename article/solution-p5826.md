---
create_time: 1576683428
update_time: 1576683428
title: P5826 【模板】子序列自动机
board: 1
tag:
- 1
extension:
  problem:
    id: P5826
    type: P
    title: 【模板】子序列自动机
    difficulty: 7
    submitted: true
    accepted: true
---

## 题目大意

给出长度为$n$的正整数序列$A$。有$q$次询问，每次询问序列$B$是否为$A$的子序列。

这里的子序列定义为若从$A$中删去若干个数字$($也可以不去除$)$后与$B$相等，则$A=B$。$($是不是比题面给的简单多了$)$

---

## 题解

**看题解**：可持久化线段树$!!?$ 这是什么神仙操作$!!?$ ~~肯定是我太弱了~~

来一个非常简单的甚至连$\text{STL}$都用不着的~~玄学~~算法吧。

当第一眼看到这条题目的时候，我想到一个$O(N*Q)$的算法：

开一个指针$p$。枚举$i$从$1$到$n$，若有$A_i=B_p$则$p++$。若$p=m+1$，则判定$B$是$A$的子序列。

这个算法其实理解起来并不难。并且代码也非常简单。

```cpp
up(1,q,i){
	m=qread(); if(m>n) puts("No"); else{
		up(1,m,j) Q[j]=qread(); p=1;
		up(1,n,j) if(P[j]==Q[p]) p++;
		puts(p>m?"Yes":"No");
	}
}
//注：其中up(l,r,i)表示for(int i=l;i<=r;i++),qread()是快读。
```
然后光荣的$\text{T}$掉了$\dots$ [记录](https://www.luogu.com.cn/record/28519252)

让我们思考一下：这个算法为什么会$\text{T}$掉?

很显然，每次从$1$扫描到$n$，有很多数字完全可以跳过。但是这段代码做了很多无用功，导致$n$非常大而$l$非常小的时候，会浪费非常多的时间$(-1s)$。

但是观察发现：$\sum{L_i}$比较小。如果我们换一个思路：不是用$B$去匹配$A$，而是用$A$匹配$B$结果会如何？

可能非常的抽象。详细的说，在上面一段代码中我们相当于每个$B$都开了一个指针$p_i$进行匹配操作。但是我们现在开一个总指针$p_0$指向$A$的起点，然后试图用它去匹配这么多的$p_i$会怎么样？

假设现在$p_0$指向$A$中的数字$x$，那么**所有的指向$x$的指针$p_i$都会加$1$**

如果你理解了上一句话，那么你就离搞出这个算法不远了。

我们如何获取所有指向$x$的指针$p_i$呢？非常简单，我们用一个"桶"就行了。$(m\leq 10^5$，当然就算$m$很大我们也可以进行离散化$)$

---

上面是主要的算法过程。下面就该讲讲怎么实现这个~~玄学~~算法了。

首先，我们会建立$q$个指针$p_i$，初始都指向$B_i$的开始。并且我们建立了$m$个桶，并且已经将满足$B_p=x$的所有指针$p$扔在了桶$x$里了。

然后从$1$枚举总指针$p_0$。每次执行清空桶$x$，使里面的所有指针+1并且将新的数字加入对应的桶内。**注意：很有可能出现$B_{p+1}=x$的情况，这需要特判**。

每次更新$p_i$的时候检查$p_i$是否等于$L_i$。若已经匹配到了序列的最后一位则完成匹配。

___

$($注：下面为拓展内容，可能运用类似**链式前向星之类**结构极其特殊性质$)$

上面算法写起来好麻烦啊~

不用慌，让我们慢慢处理。

最关键的，就是这个能伸能缩♂的桶的处理问题。~~当然如果你比较懒直接用$\sout{vector}$就行了~~

由于非常麻烦的字符串结构，这里选用了**链式前向星**来处理这个桶。链式前向星有一个好处：**只要将$\bold{head_i}$赋值为$0$,我们就抹杀掉这个桶了。**

```cpp
int head[MAXN],ver[MAXM],nxt[MAXM],tot;
int add(int u,int v){
	return ver[++tot]=v,nxt[tot]=head[u],head[u]=tot;
}
//注：为了实现诡异的三目运算符，这里强行返回了一个东西。你可以当作不存在
```

下面是最麻烦的更新操作。我们要如何解决上面提到的特判问题呢？

**这是这个算法最神奇的地方：当我们"清空"了$\bold{head_i}$之后，我们只需要直接加边即可，并不需要顾虑什么$p_0$又双叒访问到刚刚加入的$p_i$了。**

~~看到没有，这就是不用$\sout{\text{STL}}$的优越性~~

~~原理读者自证。~~ 简单的说一下：在开始遍历的时候，$head_i$指向当前最后一个$p_i$的位置。新加入的$p_i'$只会排在它的后面。

```cpp
up(1,n,i){
	int j=head[P[i]]; head[P[i]]=0;
	for(;j;j=nxt[j]){
		int u=ver[j],v=aft[u];
		v<0?(fnd[-v]=true):(add(val[v],v));
	}
}
```
补充一点：这里为了判定当前$p_i$已经到了$B_i$末尾，我们令$after_{p_i}=-i$就行了。既判定了匹配到了末尾，又判定了当前所在的字符串，可谓一举两得~

可以很容易的证明这个算法是$O(N+\sum{L_i})$，也就是线性复杂度的

至此，这个算法就大功告成了~

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;

typedef long long LL;
const int INF =2147483647;
const int SIZ =1e5;
char bef[SIZ+3],*p1=bef,*p2=bef;
char readc(){
	if(p1==p2) p1=bef,p2=bef+fread(bef,1,SIZ,stdin);
	return *p1++;
}
int qread(){
	int w=1,c,ret;
	while((c=readc())> '9'||c< '0')
	w=(c=='-'?-1:1); ret=c-'0';
	while((c=readc())>='0'&&c<='9')
	ret=ret*10+c-'0';
	return ret*w;
}
const int MAXN =1e5+3,MAXM=1e6+3;
int aft[MAXM],val[MAXM],len[MAXN];
int n,q,num,P[MAXN]; bool fnd[MAXN];
int head[MAXN],ver[MAXM],nxt[MAXM],tot;
int add(int u,int v){
	return ver[++tot]=v,nxt[tot]=head[u],head[u]=tot;
}
#define wrtyes (putchar('Y'),putchar('e'),putchar('s'),putchar('\n'))
#define wrtno  (putchar('N'),putchar('o'),putchar('\n'))
int main(){
	qread(),n=qread(),q=qread(),qread();
	up(1,n,i) P[i]=qread();
	up(1,q,i){
		len[i]=qread(),val[++num]=qread(),add(val[num],num);
		up(2,len[i],j) aft[num]=num+1,val[++num]=qread();
		aft[num]=-i;
	}
	up(1,n,i){
		int j=head[P[i]]; head[P[i]]=0;
		for(;j;j=nxt[j]){
			int u=ver[j],v=aft[u];
			v<0?(fnd[-v]=true):(add(val[v],v));
		}
	}
	up(1,q,i) fnd[i]?wrtyes:wrtno;
	return 0;
}
```
## 后记(啰嗦几句)

当时我一交上去，神™就$\text{rank2}$了[?](https://www.luogu.com.cn/record/28559824)这还没吸氧呢。然后加了个快速输出就$\text{rank1}$了[。](https://www.luogu.com.cn/record/28559933)

~~吊打了出题人的$\sout{O(N\log N)}$珂还行~~。不过其他人的最优解好像没加入代码公开计划，看不到。挺难受的。

