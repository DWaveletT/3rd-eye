---
create_time: 1573995383
update_time: 1573995383
title: 【题解】【CSP2019普及组复赛】
board: 1
tag:
- 2
---

## 更新

$\text{upd 2019.11.18: T4自测数据已出，修复T4代码潜在Bug}$

## 提示
$\quad 0.\sout\text{本文章为作者在CSP2019提高组写到绝望的背景下写的，可能言语有些过激}$

$\quad 1.\text{由于今年普及组难度远远低于去年NOIp}\sout\text{这个已死的竞赛}\text{，因此可能部分题目并不详细，请酌情}$
$\quad \text{参考本题解}$

$\quad 2.\text{本人并未实际参加CSP2019普及组复赛，而是参考了洛谷的自测题目，可能有误，请谅解}$

$\text{让我们开始这次CSP}\sout\text{爆零之旅}\text{吧}$

---

# P5660 数字游戏 

[题目地址戳这里>>](https://www.luogu.org/problem/P5660?contestId=24102)

## 题目简述

$\text{输入一个长度为8的01字符串，询问里面有多少个1}$

$\text{...我觉得可能并不需要过多的解释了}$

## 参考题解

$\text{似乎无论如何，你都可以写过去...}$

$\text{最简单粗暴的方法，就是直接判断字符的每一位是否为1。若是，则cnt++。最后输出即可}$

$\text{另外，你还可以读入这个数字，并不断模10，判断最后一位是否为1}$

$\text{还有一种更加有逼格的做法：想办法读入这个二进制数，设为A。我们用lowbit函数，每次读取最}$

$\text{后一个1，统计即可}$

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;

typedef long long LL;
const int INF =2147483647;
int main(){ char c; int cnt=0;
	while((c=getchar())=='1'||c=='0')
	if(c=='1') cnt++;
	printf("%d\n",cnt);
	return 0;
}
```
---
# P5661 公交换乘

[题目地址戳这里>>](https://www.luogu.org/problem/P5661?contestId=24102)
## 题目简述

$\text{小明有两种出行方式：乘地铁和乘公共汽车。每种交通工具都需要支付一定费用}pri_i$

$\text{现在有一个优惠政策：每次乘坐地铁，都可以获得一张优惠卷，可以免去\red{45}分钟内乘公交车的费用。}$

$\text{小明按照这样的策略用票：\text{若有可用的优惠卷，就选最早的使用。}}$

## 参考题解

$\text{按照往年(虽然并没有往年CSP)惯例，T2是一道模拟题。题目保证了}pri\leq10^3\text{，因此我们可以开}$

$\text{pri个队列，分别记录每一个优惠卷的获得日期(截止日期亦可)。对于每个公交车的记录，先删去}$

$\text{到期的优惠卷，然后从合法的优惠卷里选择日期最早的使用。}$

$\text{时间复杂度}O(N^2)\text{。}$

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
int n,lst,pri,t,ans,tmp,flag;
const int MAXN =1e3+3;
queue <int> q[MAXN];
int main(){
	n=qread(); up(1,n,i) switch(qread()){
		case 0:
			pri=qread(),t=qread(),ans+=pri; q[pri].push(t); break;
		case 1:
			pri=qread(); t=qread();
			up(1,MAXN-1,j) while((!q[j].empty())&&t-q[j].front()>45) q[j].pop();
			tmp=INF; up(pri,MAXN-1,j) if((!q[j].empty())&&q[j].front()<tmp) tmp=q[j].front(),flag=j;
			if(tmp!=INF) q[flag].pop();
			else ans+=pri;
	}
	printf("%d\n",ans);
	return 0;
}
```
---
# P5662 纪念品

[题目地址戳这里>>](https://www.luogu.org/problem/P5662?contestId=24102)

## 题目简述

$\text{给出T天以来n种商品每天的价格，现在小明有m元，他可以每天买进/卖出若干件某种商品，或者}$

$\text{不做任何操作。但是不能出现钱数为负数的情况。第T天他要卖出所有剩余商品，询问最多赚取多}$

$\text{少钱。}$

## 参考题解
$\text{有意思\dots}$

$\text{考虑第t天最多能赚取多少钱。}$

$\text{假设他在\red{这一天}通过卖掉第i种商品}A_i\text{件最后赚取了这么多钱，那么很显然可以再买回来。}$

$\text{那么我们就有这样一个算法：采用\red{买空卖空}的方法，保证每天都卖完了所有商品并获得了最多利润}$

$\text{。那么到了第t天，}$

$\text{我们可以通过\red{反悔上一天卖出的某件商品并转到今天卖出}来取得当天利润最大值。}$

$\text{很显然，我们能反悔的\red{上一天物品的价格总和}就是\red{上一天赚到的最大利润}}_{\text{想想看，为什么?}}$

$\text{那么该天的最大利润问题成了一个无限背包。容量为上一天最大利润，每件物品体积为上一天价格，}$

$\text{价值为这一天对应商品的价格。对于每一天我们都跑一次无限背包，就可以求出正解。}$

$\text{考虑到一些普及组选手可能并不是非常了解无限背包，这里简单讲解一下：}$

> 无限背包如同普通的背包问题(容量固定，每个物品有一个体积以及价格，每个物品最多选一次。询问最多能获得多少价值。)，不过将每个物品"选一次"变成了"无限制"。

$\text{我们定义}dp_{i,j}\text{表示前i件物品背包容量为j时取得的最大价值}$

$$
dp_{i,j}=\min\{dp_{i-1,j-k*C_j}+k*W_j\}
$$

$\text{我们可以发现：当我们计算}\min\{dp_{i-1,j-k*C_j}+k*W_j\}\text{时，已经计算完了}\min\{dp_{i-1,j-(k-1)*C_j}+$

$(k-1)*W_j\}=dp_{i,j-(k-1)*C_j}$

$\text{因此我们可以直接利用已经算出来的}dp_{i,j-(k-1)*C_j}\text{，做到}O(NM)\text{的复杂度。}$

$\text{该题的时间复杂度为}O(T*N*M)\text{。}$

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
const int MAXN =100+3,MAXM=1e3+3,MAXP=1e4+3;
int t,n,m,P[MAXM],Q[MAXM],C[MAXM],lst[MAXM];
int dp[MAXP],res;
int main(){
	t=qread(),n=qread(),res=m=qread();
	up(1,n,i) lst[i]=qread();
	up(1,m,i) dp[i]=i;
	up(2,t,i){
		up(1,n,j) P[j]=qread(),C[j]=lst[j];
		up(1,res,i) dp[i]=i;
		up(1,n,j) up(1,res,k){
			if(k>=C[j]) dp[k]=max(dp[k],dp[k-C[j]]+P[j]);
		}
		res=dp[res];
		memcpy(lst,P,sizeof(lst));
	}
	printf("%d\n",res);
	return 0;
}
```

---

# P5663 加工零件

[题目地址戳这里>>](https://www.luogu.org/problem/P5663?contestId=24102) $\quad\sout\text{注：编辑时尚未有民间/官方数据，请理性偷税}$

$\quad\text{注：T4自测数据已出(2019.11.18)，然后被一个数据点坑了5分...}$

## 题目简述

$\text{有一张n个点m条边的图描述工人间的关系。现在已知某个工人每生产一个等级为L(L>1)的零件}$

$\text{都必须要\red{与之直接相连的工人}生产一个L-1级别的零件。若L=1,则需与之直接相连的工人提供原材料。}$

$\text{现在有q个询问。每次询问一个工人a生产等级为L的零件的订单时是否需要1号工人提供原材料}$

## 参考题解

$\text{很显然，当存在一条生产链(从原料到等级为L的零件)连接工人1与工人a时，工人1需要提供原料。}$

$\text{问题转化为\red{是否存在一条长度为L的生产链连接1与a}}$

$\text{很显然，生产链可以反复横跳(即a->b->a->b\dots)，因此我们只需要按照L的奇偶性分类。}$

$\text{设}dis_{i,j=1/0}\text{表示工人1到工人i之间长度为奇数/偶数的路径的最小值。初始为INF。那么我们完全可}$

$\text{以bfs计算。}$

$\text{最后查询的时候根据L的奇偶性判断}dis_{a,L\%2}\text{是否}\leq L$

$\text{upd 2019.11.18:这条题目还有一个小坑：}$

$\text{如果并没有任何工人与1号工人直接相连，那么1号工人可以\red{直接}造出L号零件而不需要提供原材料，}$

$\text{需特判}$

$\textit{但是由于CCF可能并未考虑到这种情况，因此并不保证官方数据有坑(希望如此)}$

$\text{时间复杂度为}O(M+Q)\text{。}$

## 参考代码 $_\text{(并不能保证100\%正确,欢迎Hack)}$

$\textit{已修复没有工人与1号工人直接相连的特判}$

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
const int MAXN =1e5+3;
const int MAXM =1e5+3;
int tot,head[MAXN],ver[MAXM*2],nxt[MAXM*2];
void add(int u,int v){
	ver[++tot]=v,nxt[tot]=head[u],head[u]=tot;
}
int dis[MAXN][2]; bool vis[MAXN][2];
typedef pair<int,int> pii;
void calc(){
	queue <pii> q; q.push(make_pair(0,1));
	while(!q.empty()){
		pii pr=q.front(); int u=pr.second;bool tp=pr.first; q.pop();
		for(int i=head[u];i;i=nxt[i]){
			int v=ver[i]; if(!vis[v][!tp]){
				dis[v][!tp]=dis[u][tp]+1;
				q.push(make_pair(!tp,v)),vis[v][!tp]=true;
			}
		}
	}
}
int n,m,q; bool flag;
int main(){
	n=qread(),m=qread(),q=qread();
	up(1,n,i) dis[i][0]=dis[i][1]=INF;
	up(1,m,i){
		int u=qread(),v=qread(); add(u,v),add(v,u);
	}
	vis[1][0]=true,dis[1][0]=0,calc();
	up(1,q,i){
		int a=qread(),l=qread();
		if(a==1&&!flag) puts("No"); else
		puts(((l&1)?dis[a][1]<=l:dis[a][0]<=l)?"Yes":"No");
	}
	return 0;
}

```

---
#### 虽然很遗憾，并没有参加CSP-J，不过自测赛的确体验了一把$\sout\text{切题的快感}$

#### 总体而言，今年(虽然并没有去年的CSP-J)普及组难度并不高。

#### 怎么说呢，无论好坏，CSP终于结束了。该退役的也退役了，该AK的也AK了。继续努力吧~

