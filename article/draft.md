---
create_time: 1553353436
update_time: 1553353436
title: 草稿
board: 1
tag:
- 2
---

## 必要的前言与说明

本文章算是我两个星期$\color{grey}\texttt{(其实是两个周末)}$以来研究网络流最大流的成果，也算得上是花费了好几个下午翻各种各样最大流资料和博客的一个交代吧$\color{white}\texttt{我这辈子都不想碰网络流了}$

本文章旨在对比各种各样算法$\color{black}[FF,EK,Dinic,ISAP,HLPP]$，以及对以上几个算法进行比较及分析$\color{green}\texttt{[还包括一些优化]}$，尽可能让你清楚的理解$\color{red}\texttt{最大流算法}$。毕竟整合了各种各样的算法，与其他题解或多或少有重合估计在所难免了$:>$

$\color{black}\texttt{注：这里感谢其他网络流的题解，它们或多或少为本篇提供了思路(及优化)}$

如果你对网络流的定义$[$比如说流量、容量之类$]$不是很熟悉，建议[点击这里](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E6%B5%81/2987528?fr=aladdin#2)

## update 2019.3.31
- 修改了部分算法的讲解，使得看上去更容易理解
- 增加了各个算法的各种特殊数据的比较
- 增加了一些gif动图，使算法过程更清晰(吧)，同时修了一些图

# 算法其一 FF算法[Ford-Fulksonff]

网络流，一个经典的思路就是去寻找$\color{black}\texttt{增广路}$

当我们写网络流时，想到的第一个思路大概就是写一个$dfs$，然后不断地枚举所有的可行的道路，直到找不到这样的路就结束算法。但很显然，我们可以找一个反例反驳它:

![1](https://i.loli.net/2019/03/24/5c96f421f130c.gif)

此时算法终止，结果为$6$，然而事实上真正结果为$7$

### 我们应该怎么办呢？

说的好。倘若我们可以给程序一个反悔的机会，让它重新选择，怎么样$？$

我们给每条边建立一个反边，使它初始容量为$0$。当我们走完一条路$(u->v,$设为$e)$，就给它的反边$($称为$e')$容量加上$e$**减少的量**$[e-=flw,e'+=flw]$。很显然，如果我们哪一次从$v$走到了$e'$，就相当于将$e$减少的一部分容量$flw'$还给了$e[e'-=flw',e+=flw']$。这部分操作，就相当于我们没有走过$e$,而用走到$v$的流**替换掉**原先的流。说的有些抽象，我们先画出上图例子的反边。

![2](https://i.loli.net/2019/03/24/5c96f4c9c1bc2.png)

图片有些复杂，因此调慢了运行过程。

![3](https://i.loli.net/2019/03/24/5c96f8a13417d.gif)

反边的作用，就是将从$1$流向$2$的流**反悔**了几个单位，流向了$T$，原来的那条流相当于被$S->2$这条流替换掉了。而$FF$算法的过程，就是不断寻找这样的$\color{red}\texttt{增广路}$直到找不到增广路为止。可以证明，此时结果不可能增加了。

## 简单的代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(register int i=l;i<=r;++i)
#define ergv(u) for(std::vector<edge>::iterator p=head[u].begin();p!=head[u].end();++p)
#define ergl(u) for(std::list<int>::iterator p=lst[u].begin();p!=lst[u].end();++p)
const int INF =2147483647;
const int MAXN = 10000+3,MAXM =100000+3;
using namespace std;
bool vis[MAXN];
int n,m,s,t,tot=1,U,V,K,ans;
int head[MAXN],nxt[MAXM*2],ver[MAXM*2],val[MAXM*2];
inline void add(int u,int v,int k){		//加边 
	ver[++tot]=v,val[tot]=k,nxt[tot]=head[u],head[u]=tot;
	ver[++tot]=u,val[tot]=0,nxt[tot]=head[v],head[v]=tot;
}
inline int FF(int u,int flw){			//主过程 
	if(u==t) return flw; vis[u]=true;	//到达终点 
	for(int i=head[u];i;i=nxt[i]) if(val[i]>0&&!vis[ver[i]]){
		int lft=FF(ver[i],min(flw,val[i]));
		if(!lft) continue;				//增广路寻找失败 
		val[i]-=lft,val[i^1]+=lft,vis[u]=false;
		return lft;
	}
	return vis[u]=false;				//vis函数防止出现环 
}
int main(){
	scanf("%d%d%d%d",&n,&m,&s,&t),vis[s]=true;
	up(1,m,i) scanf("%d%d%d",&U,&V,&K),add(U,V,K);
	for(int p;p=FF(s,INF);) ans+=p;
	printf("%d\n",ans);
	return 0;
}
```
~~损失惨重~~ [简单模板 30分](https://www.luogu.org/recordnew/show/17312142)

# 算法其二 EK算法[Edmonds-Karp]

吸取上面惨痛教训，我们发现有这样一个数据会有可能卡死我们

![样例2](https://cdn.luogu.com.cn/upload/pic/54285.png)

按照$FF$算法，最坏情况，你可能要跑$20000$次增广路。若容量更大$[$比如说$2^{31}-1]$，直接跑到$\color{blue}TLE$...

在我们做迷宫问题$\texttt{[注:经典的搜索题目]}$时，老师会告诉我们:

$\color{red}\texttt{在大多数情况下，bfs吊打dfs}\color{white}\texttt{[其实是我瞎编的]}$

我们能不能用$bfs$处理增广问题呢?

我们每一遍$bfs$寻找一条尽可能短的增广路去拓展，那么我们可以一定程度上减少时间复杂度$\color{grey}\texttt{[证明过程过于玄学]}$。不过上限和$FF$相同$[$不过好像挺难构造玄学算法卡掉EK算法的$]$。其实算法的全过程和$FF$类似，只不过每次寻找增广路用$bfs$跑而已。由于过程大同小异，这里就放一个代码吧。尽管同样是寻找增广路，但是在大多数情况下，时间效率远远高于$FF$算法。

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(register int i=l;i<=r;++i)
#define erg(u) for(int i=head[u],v=ver[i];i;i=nxt[i],v=ver[i])
const int INF =2147483647;
const int MAXN = 10000+3,MAXM =100000+3;
using namespace std;
bool vis[MAXN];
int n,m,s,t,tot=1,U,V,K,ans;
int head[MAXN],nxt[MAXM*2],ver[MAXM*2],val[MAXM*2];
inline void add(int u,int v,int k){		//加边 
	ver[++tot]=v,val[tot]=k,nxt[tot]=head[u],head[u]=tot;
	ver[++tot]=u,val[tot]=0,nxt[tot]=head[v],head[v]=tot;
}
int q[MAXN][4],front,rear;
inline int EK(){						//主过程 
	memset(vis,0,sizeof(vis)),vis[s]=true;
	front=rear=1,q[rear][0]=s,q[rear++][3]=INF;
	for(int u=q[front][0];front<rear;u=q[++front][0])
	erg(u) {	//遍历当前节点 
		if(!vis[v]&&val[i]>0){			//判断可行性 
			q[rear][0]=v,q[rear][1]=i,q[rear][2]=front,
			q[rear++][3]=min(val[i],q[front][3]),vis[v]=true;
			if(v==t) goto end;			//到达终点直接跳出 
		}
	}
	return false; end: rear--;
	for(int i=rear,flw=q[rear][3];q[i][2];i=q[i][2])
	val[q[i][1]]-=flw,val[q[i][1]^1]+=flw;
	return q[rear][3];
} 
int main(){
	scanf("%d%d%d%d",&n,&m,&s,&t),vis[s]=true;
	up(1,m,i) scanf("%d%d%d",&U,&V,&K),add(U,V,K);
	for(int p;p=EK();) ans+=p;
	printf("%d\n",ans);
	return 0;
}
```

### 几个算法的细节

第一次写$EK$，就想着反正也是跑增广路，就没写代码。但写完后才发现细节挺多。可以发现，用来$bfs$的$q$数组开了$4$个数据。第一个$_{\texttt{下标为0的那个}}$代表节点$u$，而第二个需要记录边$e$。特别的是，第二个得记录当前位置是由哪一个节点跳过来的，便于我们从后向前遍历增广路。第四个下标需要维护当前流。

苍天不负有心人，本算法已经可以[过掉简单模板](https://www.luogu.org/recordnew/show/17548193)。

# 算法其三 Dinic算法

以上两个算法，$FF$会被简单数据卡掉。尽管大多时候$EK$挺好用的，但是难敲啊。这时候，提出$EK$算法的$Dinic$搞事情地提出了大名鼎鼎的$Dinic$算法。有人曾经这么说过:

$\color{red}\texttt{"99\%的网络流算法，都可以用Dinic去解。卡Dinic的毒瘤出题人，都是*哔*"}$

$\color{white}\texttt{尽管还是我说的}$

$Dinic$算法，其实是$EK$算法的一个大优化。我们写$EK$时，会发现:$\texttt{每次增广都要跑一遍bfs。多浪费时间啊}$。因此，$Dinic$算法，本质上就是减少$bfs$次数以达到优化时间复杂度的目的。每轮只跑一次$bfs$，求出每个节点的初始高度$(ht)$，然后$\color{red}\texttt{严格按照}$$ht$的大小进行增广。显然每次跑完$bfs$之后至少可以找到一条增广路。由于每条增广路都满足$ht$单调递减，我们完全不用考虑环的问题。因此可以用一种叫做多路增广的东西，一次性从一个点增广很多条边，大大缩短了时间复杂度。优秀的时间复杂度和编写难度也是$Dinic$算法经久不衰的原
$$

按照惯例，放一张$Dinic$算法的$gif$吧。

![Dinic](https://i.loli.net/2019/03/30/5c9f868b8e11b.gif)

$[$其实个人对这张$gif$不怎么满意，毕竟没怎么体现$Dinic$的优点，好像遍历顺序还反掉了$]$

下面给出代码：

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define lw(l,r,i) for(int i=l;i>=r;i--)
using namespace std;
const int MAXN = 10000 +3;
const int MAXM = 100000+3;
const int INF  =2147483647;
typedef long long LL;
inline int qread(){
    int w=1,c,ret;
    while((c=getchar())> '9'||c<'0');
    ret=c-'0';
    while((c=getchar())>='0'&&c<='9')
    ret=ret*10+c-'0';
    return ret*w;
}
int n,m,s,t,t1,t2,t3,mxflow;
int tot=1,head[MAXN],nxt[MAXM*2],ver[MAXM*2],val[MAXM*2];
void add(int u,int v,int k){
    ver[++tot]=v,val[tot]=k,nxt[tot]=head[u],head[u]=tot;
    ver[++tot]=u,val[tot]=0,nxt[tot]=head[v],head[v]=tot;
}
int dis[MAXN],cur[MAXN];
int q[MAXN],front,rear;
bool bfs(){
    memset(dis,0,sizeof(dis));
    front=rear=1,q[rear++]=s,dis[s]=1;
    while(front<rear){
        int u=q[front++];
        for(int i=head[u];i;i=nxt[i]){
            int v=ver[i];
            if(dis[v]||!val[i]) continue;
            q[rear++]=v,dis[v]=dis[u]+1;
        }
    }
    return dis[t];
}
int dfs(int u,int flow){
    if(u==t&&((mxflow+=flow)||1)) return flow;
    int used=0;
    for(int &i=cur[u];i;i=nxt[i]){
        int v=ver[i];
        if(dis[v]==dis[u]+1){
            int lft=dfs(v,min(flow-used,val[i]));
            if(lft) val[i]-=lft,val[i^1]+=lft,used+=lft;
            if(used==flow) return flow;
        }
    }
    return used;
}
int main(){
    n=qread(),m=qread(),s=qread(),t=qread();
    up(1,m,i) t1=qread(),t2=qread(),t3=qread(),add(t1,t2,t3);
    while(bfs()) memcpy(cur,head,sizeof(head)),dfs(s,INF);
    cout<<mxflow<<endl;
    return 0;
}  
```

这时候，我们已经可以[吊打EK](https://www.luogu.org/recordnew/show/16276878)了。
~~然而在加强版数据中[依然爆炸](https://www.luogu.org/recordnew/show/16275546)~~

# 算法其四 ISAP算法[Improved Shortest Augmenting Path]

加强数据$\color{grey}\texttt{[比如本题]}$究竟怎么办?

$ISAP$算法，就是在$Dinic$算法上，进行了进一步优化，大概也是常见的最快的增广路算法了。

$ISAP$算法在这几个方面进行了大优化:

1. 引进了$gap$数组，优化了断层，一定程度上减少了不必要的时间损失
2. 你只需要一次$bfs$即可$\color{green}\texttt{[惊不惊喜，意不意外?]}$

## gap数组是什么?

$gap$数组，你可以认为是$cnt$数组，就是记录**某一个高度**的点有多少个。当出现断层$k$，就会有$gap[k]=0$。很显然，当$gap[ht[u]]=0$的时候，往往说明出现断层，也就是说，$S$和$T$此时已经不连通了，我们可以直接弹出程序，没必要继续去找增广路。很多时候，这种玄学优化可以使算法速度大幅度提升。$\color{white}\texttt{[当然，如果你脸黑可能然并卵]}$

## 下面是$ISAP$算法的优化重点

### 我们只需要从$T$开始，向$S$跑一遍$bfs$即可。

它基于下面这个大胆的思路：

当我们从终点向起点跑完$bfs$之后，就再也不需要重跑了。当我们遍历完一个节点，居然还剩下了一些流，那么我们只有将它的高度提高，才有可能在下一次遍历中把流推向其他边。不过这个算法最大的遗憾还是这张图：

![233](https://i.loli.net/2019/03/31/5ca001f3dee59.png)

很显然，按照$ISAP$算法，$S$的高度会不断提高$8$次才能开始从$1$增广。如果数据在强力一些，就有可能卡掉。

### 下面是代码

```
#include<bits/stdc++.h>
#define up(l,r,i) for(register int i=l;i<=r;++i)
#define lw(l,r,i) for(register int i=l;i>=r;--i)
using namespace std;
const int MAXN = 1200  +3;
const int MAXM = 120000+3;
const int INF  =2147483647;
typedef long long LL;
inline int qread(){
	int w=1,c,ret;
	while((c=getchar())> '9'||c<'0');
	ret=c-'0';
	while((c=getchar())>='0'&&c<='9')
	ret=ret*10+c-'0';
	return ret*w;
}
int n,m,s,t,t1,t2,t3,mxflow;
int tot=1,head[MAXN],nxt[MAXM*2],ver[MAXM*2],val[MAXM*2];
inline void add(int u,int v,int k){
	ver[++tot]=v,val[tot]=k,nxt[tot]=head[u],head[u]=tot;
	ver[++tot]=u,val[tot]=0,nxt[tot]=head[v],head[v]=tot;
}
int dis[MAXN],cur[MAXN];
int gap[MAXN],q[MAXN],front,rear;
inline void bfs(){
	front=rear=1,q[rear++]=t,gap[dis[t]=1]++;
	while(front<rear){
		int u=q[front++];
		for(int i=head[u];i;i=nxt[i]){
			int v=ver[i];
			if(dis[v]) continue;
			q[rear++]=v,gap[dis[v]=dis[u]+1]++;
		}
	}
}
int dfs(int u,int flow){
	if(u==t&&((mxflow+=flow)||1)) return flow;
	int used=0;
	for(int &i=cur[u];i;i=nxt[i]){
		int v=ver[i];
		if(dis[v]==dis[u]-1){
			int lft=dfs(v,min(flow-used,val[i]));
			if(lft) val[i]-=lft,val[i^1]+=lft,used+=lft;
			if(used==flow) return flow;
		}
	}
	(--gap[dis[u]])?(++gap[++dis[u]]):dis[s]=n+1;
	return used;
}
int main(){
	n=qread(),m=qread(),s=qread(),t=qread();
	up(1,m,i) t1=qread(),t2=qread(),t3=qread(),add(t1,t2,t3);
	bfs(); while(dis[s]<=n) memcpy(cur,head,sizeof(head)),dfs(s,INF);
	cout<<mxflow<<endl;
	return 0;
}  
```

# 算法其五 HLPP

## 本文重点内容，也是唯一一个能AC本题的算法$_{_{\color{white}\texttt{说白了，前面的都是废话}}}$
HLPP算法基于**预留推进算法**。

### 预流推进算法是什么？

我们假设起点$S$处是个水源，它可以源源不断地涌出水来。这就相当于它拥有$INF$的水资源。我们撑爆水管，将水资源运向周围节点。

对于每个拥有余流的节点，我们将它的水推向周围的点去。最终，所有的水会掉到一个叫做$T$的无底洞里面。最终$T$有多少水，就说明了网络流最大能流多少水。

很简单的想法吧。但是...

## 想得美

我们面临着这样一个大问题：万一两个点轮流将水推来推去，推到$\color{blue}TLE$该怎么办？

仿照$ISAP$算法，我们给每个节点安装一个高度$ht_i$，并确定水往低处流。不过实现算法时，我们又双叒规定，水往低处流，当且仅当这个点的高度恰好比下个点高一。$\color{pink}\texttt{又是一个玄学算法}\color{white}\texttt{[为什么说又?]}$

亲爱的$Tarjan\color{green}\texttt{[怎么叕是你？]}$及其他计算机科学家发现，每次从高度最高的点向外流，时间复杂度会变小。你可以这么理解：$[$先将高处的点的水移到低处，那么给低处节点推流时可以顺便带走$]$

初始版本的$HLPP$算法，就是这样，用一个优先队列$[priority\_queue]$，每次取最高的点向外流。

具体实现，分为两个重点操作：$push$和$relabel$

## push 操作，就是将一个点的水向其他点流去。
## relabel 操作，就是更新一个点的高度。

$push$操作，不用多讲了吧..

```cpp
inline void psh(int u){
	for(RIT i=head[u],v;i&&lft[u];i=nxt[i]){
        if(!val[i]||ht[v=ver[i]]>=ht[u]) continue;
		RIT mn=min(lft[u],val[i]);
        lft[u]-=mn,val[i]-=mn,val[i^1]+=mn,lft[v]+=mn;
        if(!inque[v]&&v!=s&&v!=t) pq.push(v),inque[v]=true;
    }
}//注:RINT=register int
```
$relabel$操作，很简单，就是寻找这个点周围高度最低的点，并将高度抬到那边。

```cpp
inline void update(int u){
    ht[u]=INF;
    erg(u)if(ht[u]>1+ht[ver[i]]&&val[i])ht[u]=ht[ver[i]]+1;
}//注:erg(u)就是遍历某个节点
```
轻而易举地，我们写出了源代码：
```cpp
#include<bits/stdc++.h>
#define RIT register int
#define up(l,r,i) for(RIT i=l;i<=r;++i)
#define lw(l,r,i) for(RIT i=l;i>=r;--i)
#define erg(u) for(RIT i=head[u];i;i=nxt[i])
using namespace std;
const int INF =2147483647;
const int MAXN = 1200+3,MAXM =120000+3;
int n,m,s,t,mxflow,cnt;
bool inque[MAXN];
int lft[MAXN],gap[MAXN],ht[MAXN];
int ver[MAXM*2],head[MAXM*2],nxt[MAXM*2],val[MAXM*2],tot=1;
inline int qread(){
    RIT ret,c;
    while((c=getchar())> '9'||c< '0');
    ret=c-'0';
    while((c=getchar())>='0'&&c<='9')
    ret=ret*10+c-'0';
    return ret;
}
inline void add(){
    RIT u=qread(),v=qread(),k=qread();
    ver[++tot]=v,nxt[tot]=head[u],head[u]=tot,val[tot]=k;
    ver[++tot]=u,nxt[tot]=head[v],head[v]=tot,val[tot]=0;
}
inline void bfs(){
    queue<int> q;
    for(q.push(t),ht[t]=0,inque[t]=true;!q.empty();){
        RIT u=q.front(),v;inque[u]=false,q.pop();
        erg(u)if(ht[v=ver[i]]>ht[u]+1&&val[i^1]&&!inque[v])
        ht[v]=ht[u]+1,q.push(v),inque[v]=true;
    }
    up(1,n,i) if(ht[i]!=INF) gap[ht[i]]++;
}
inline void update(int u){
    ht[u]=INF;
    erg(u)if(ht[u]>1+ht[ver[i]]&&val[i])ht[u]=ht[ver[i]]+1;
}
struct cmp{
    inline bool operator () (int a,int b) const{
        return ht[a]<ht[b];}
};
inline int HIPP(){
    up(1,n,i) ht[i]=INF;bfs();
    if(ht[s]==INF) return 0;
    priority_queue<int,vector<int>,cmp> pq;
    erg(s){
        lft[ver[i]]+=val[i],swap(val[i^1],val[i]);
        if(ver[i]!=t&&ver[i]!=s&&!inque[ver[i]])
        pq.push(ver[i]),inque[ver[i]]=true;
    }
    for(ht[s]=n;!pq.empty();){
        RIT u=pq.top(),v;
        inque[u]=false,pq.pop();
        for(RIT i=head[u];i&&lft[u];i=nxt[i]){
            if(!val[i]||ht[v=ver[i]]>=ht[u]) continue;
            RIT mn=min(lft[u],val[i]);
            lft[u]-=mn,val[i]-=mn,val[i^1]+=mn,lft[v]+=mn;
            if(!inque[v]&&v!=s&&v!=t) pq.push(v),inque[v]=true;
        }
        if(!lft[u]) continue;
        if(!(--gap[ht[u]])) up(1,n,i)
        if(i!=s&&i!=t&&ht[i]>ht[u]&&ht[i]<n+1) ht[i]=n+1,cnt++;
        update(u),++gap[ht[u]],pq.push(u),inque[u]=true;
        if(cnt==n) return lft[t];
    }
    return lft[t];
}
int main(){
    n=qread(),m=qread(),s=qread(),t=qread();
    up(1,m,i) add();
    printf("%d",HIPP());
    return 0;
}

```
但是，结果却...
[$\texttt{难受.jpg}$](https://cdn.luogu.com.cn/upload/pic/54296.png)

## 再次提醒：下文内容可能与部分题解有雷同，请见谅
### 感谢原第二 KevinYu 同志的题解给出的优化

#### 1.我们根本没有必要用优先队列...

$Q:$我们为什么用优先队列?

$A:$因为我们要取出当前高度最高的一个点。

不对啊!明明桶排序可以$O(1)$解决，我们为什么要拖到$O(logN)!$

我们多开一些类似$vector[\texttt{动态数组}]$以及$list[\texttt{链表}]$之类的玩意儿，假设当前高度是$nwh$，我们完全可以取$mlst[nwh].back()$这些东西进行$O(1)$操作...

#### 2.仔细回忆一下$gap$优化:当出现断层，我们可以直接退出。

尽管在这条题目中，由于推流的特殊情况，此方法不适用$\color{red}\texttt{[S和T不连接，不代表没有余流了。再说，此方法ht定义与dis不同]}$

但是，如果出现了断层，那么上面的点无论怎么更新都没办法将余流推到高度为$0$的$T$中，因此，当出现了断层，可以直接删除断层以上的点。具体操作如下：

定义$lst[i]$表示高度为$i$的点。那么出现断层时，从$ht[u]$一直到当前的最高高度$hst$之间的点都不要了。我们可以这么写：
```cpp
if(gap[htu]==1){
	up(htu,hst) ergl(i) --gap[ht[*p]],ht[*p]=n;
	hst=htu-1;return;
}//各种define缩写可以见下面的源码
```
#### 3.玄学的using namespace 优化
特别玄学，当你把$using\space namespace\space std$删掉，并将代码写成类似$std::min(a,b)$之类东西，可以一定程度上提速。

#### 4.list/vector 的玄学优化
那些写$STL$的人就是这么厉害，写的$vector$开了$O(2)$都比数组快。不过要注意的是，这样可能使得代码看上去很奇怪..请小心理解
#### 5.全局重贴标签
该优化就特别有意思了。原始版本每次推流结束都要更新一次。然而实际上推流过程中就可以进行更新标签。因此只需要刚开始就设置好初始高度$\color{green}\texttt{[还是从T开始倒推]}$，此后在玄学的$push$里顺便更新就行了。
#### 6.assign函数是个好东西
它可以修改大小以及初始化vector。用法很简单。

$vec.assign(size,num)$，将$vector$大小设为$size$,元素都变成$num$
#### 7.用邻接表替代链式前向星
~~这不是时代倒退~~

可能有人问了:用vector怎么实现取反向边呢？显然，每次加边，都要在head[u]以及head[v]里面加。那么，我们给每条边一个特殊的东西nxt,head[u].nxt就是反边在head[v]里面所在位置。
#### 经历了上述大幅优化，成绩显著。
[终于快进500ms了](https://www.luogu.org/recordnew/show/17105158)

但是，还有一个优化...
### 7.快读的究极大优化

我们往常写的快读大概是这样的。$\color{green}\texttt{这里抛弃了负数}$

```cpp
inline int qread(){
    int ret,c;
    while((c=getchar())> '9'||c< '0');ret=c-'0';
    while((c=getchar())>='0'&&c<='9')ret=ret*10+c-'0';
    return ret;
}
```
但是...你知道吗，还有一个快读的终极优化...
```cpp
const int SIZ =100000 +3;
char buf1[SIZ],buf2[SIZ];
char *p1=buf1,*p2=buf1;
inline char readchar(){
    if(p1==p2)p1=buf1,p2=buf1+fread(buf1,1,SIZ,stdin);
    return p1==p2?EOF:*p1++;
}
```
没错，是$fread$，这使代码提速$60ms$!!

## 下面给出终极程序
```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(register int i=l;i<=r;++i)
#define ergv(u) for(std::vector<edge>::iterator p=head[u].begin();p!=head[u].end();++p)
#define ergl(u) for(std::list<int>::iterator p=lst[u].begin();p!=lst[u].end();++p)
const int INF =2147483647;
const int MAXN = 1200+3,MAXM =120000+3;
int n,m,s,t,mxflow,hst,nwh;
std::vector<int> lft,gap,ht,q,mlst[MAXN];
struct edge{	//边
    int ver,nxt,flw;
    edge(int _ver,int _flw,int _nxt):
    ver(_ver),flw(_flw),nxt(_nxt){}
};
std::vector <edge> head[MAXN];
std::list   <int > lst[MAXN];
std::vector <std::list<int>::iterator> it;
const int SIZ =100000 +3;
char buf1[SIZ];
char *p1=buf1,*p2=buf1;
inline char readchar(){	//快速读入字符
    if(p1==p2)p1=buf1,p2=buf1+fread(buf1,1,SIZ,stdin);
    return p1==p2?EOF:*p1++;
}
inline int qread(){		//快读
    int ret,c;
    while((c=readchar())> '9'||c< '0');ret=c-'0';
    while((c=readchar())>='0'&&c<='9')ret=ret*10+c-'0';
    return ret;
}
inline void add(){		//连边
    int u=qread(),v=qread(),k=qread();
    head[u].push_back(edge(v,k,head[v].size()  ));
    head[v].push_back(edge(u,0,head[u].size()-1));
}
inline void rlb(){		//全局冲贴标签
    ht.assign(n+3,n),gap.assign(n+3,0),ht[t]=0;
    q.clear(),q.resize(n+3);
    int front=0,rear=0,u;
    for(q[rear++]=t;front<rear;){
        u=q[front++];
        ergv(u) if(ht[p->ver]==n&&head[p->ver][p->nxt].flw)
        ++gap[ht[p->ver]=ht[u]+1],q[rear++]=p->ver;
    }
    up(1,n,i) mlst[i].clear(),lst[i].clear();
    up(1,n,i) if(ht[i]<n){
        it[i]=lst[ht[i]].insert(lst[ht[i]].begin(),i);
        if(lft[i]>0) mlst[ht[i]].push_back(i);
    }
    hst=(nwh=ht[q[rear-1]]);
}
inline void psh(int u,edge &e){	//推流子函数
    int v=e.ver,df=std::min(lft[u],e.flw);
    e.flw-=df,head[v][e.nxt].flw+=df,lft[u]-=df,lft[v]+=df;
    if(lft[v]>0&&lft[v]<=df) mlst[ht[v]].push_back(v);
}
inline void psh(int u){			//真正的推流
    int nh=n,htu=ht[u];
    ergv(u)if(p->flw) if(ht[u]==ht[p->ver]+1){
            psh(u,*p); if(lft[u]<=0) return;
        } else nh=std::min(nh,ht[p->ver]+1);
    if(gap[htu]==1){		  //断层
        up(htu,hst,i){
            ergl(i) --gap[ht[*p]],ht[*p]=n;
            lst[i].clear();
        }
        hst=htu-1;
    }else{
        --gap[htu],it[u]=lst[htu].erase(it[u]),ht[u]=nh;
        if(nh==n) return;
        gap[nh]++,it[u]=lst[nh].insert(lst[nh].begin(),u);
        hst=std::max(hst,nwh=nh),mlst[nh].push_back(u);
    }
}
inline int HLPP(){
    nwh=hst=0,ht.assign(n+3,0),ht[s]=n,it.resize(n+3);
    up(1,n,i) if(i!=s)it[i]=lst[ht[i]].insert(lst[ht[i]].begin(),i);
    gap.assign(n+3,0),gap[0]=n-1,lft.assign(n+3,0),lft[s]=INF,lft[t]=-INF;
    ergv(s) psh(s,*p);rlb();
    for(int u;nwh;){ 
        if(mlst[nwh].empty()) nwh--; else
        u=mlst[nwh].back(),mlst[nwh].pop_back(),psh(u);
    }
    return lft[t]+INF;
}
int main(){
    n=qread(),m=qread(),s=qread(),t=qread();
    up(1,m,i) add();
    std::printf("%d\n",HLPP());
    return 0;
}
```
[排名第二](https://www.luogu.org/recordnew/show/17105834)

$update\space 3.31$ 第二被抢了...

### 以下是对代码的一些解释:

1. INF,就是正无穷，这里就是INT_MAX
2. hst是当前最高高度，用于gap优化。nwh是当前高度
3. lft是余流，ht是某个点的高度,mlst是桶排
4. lst[i]是高度为i的点集,it是个特别玄学的东西...
5. buf1,p1,p2都是fread配套用品
6. psh里面的htu就是点u的当前高度，nh是新的高度
7. 编者喜欢取单词的辅音字母作为简写，大概也能猜出来吧~~



------------

# 各个算法的特殊数据大对比

$update \space 3.31$

| 测试数据 | 性质1 | 性质2 | 性质3 | 性质4 | 性质5 | n | m |
| :----------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: |
| 1  | √ | √ | × | × | √ | $10^5$ | $3×10^5$ |
| 2  | √ | √ | × | × | √ | $10^5$ | $3×10^5$ |
| 3  | √ | √ | × | × | × | $10^5$ | $3×10^5$ |
| 4  | √ | √ | × | × | × | $10^5$ | $3×10^5$ |
| 5  | √ | × | √ | × | √ | $10^5$ | $3×10^5$ |
| 6  | √ | × | √ | × | √ | $10^5$ | $3×10^5$ |
| 7  | √ | × | √ | × | × | $10^5$ | $3×10^5$ |
| 8  | √ | × | √ | × | × | $10^5$ | $3×10^5$ |
| 9  | √ | × | × | × | √ | $10^5$ | $3×10^5$ |
| 10 | √ | × | × | × | √ | $10^5$ | $3×10^5$ |
| 11 | √ | × | × | × | × | $10^5$ | $3×10^5$ |
| 12 | √ | × | × | × | × | $10^5$ | $3×10^5$ |
| 13 | × | √ | × | × | √ | $10^5$ | $3×10^5$ |
| 14 | × | √ | × | × | √ | $10^5$ | $3×10^5$ |
| 15 | × | √ | × | × | × | $10^5$ | $3×10^5$ |
| 16 | × | √ | × | × | × | $10^5$ | $3×10^5$ |
| 17 | × | × | √ | × | √ | $10^5$ | $3×10^5$ |
| 18 | × | × | √ | × | √ | $10^5$ | $3×10^5$ |
| 19 | × | × | √ | × | × | $10^5$ | $3×10^5$ |
| 20 | × | × | √ | × | × | $10^5$ | $3×10^5$ |
| 21 | × | × | × | × | √ | $10^5$ | $3×10^5$ |
| 22 | × | × | × | × | √ | $10^5$ | $3×10^5$ |
| 23 | × | × | × | × | × | $10^5$ | $3×10^5$ |
| 24 | × | × | × | × | × | $10^5$ | $3×10^5$ |

## 解释

**性质一** :不会出现环

**性质二** :层次很少

**性质三** :层次数量很大

**性质四** :无解

**性质五** :答案较小

## 生成程序框架

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define lw(l,r,i) for(int i=l;i>=r;i--)
using namespace std;

typedef long long LL;
const int MAXN = 10000,MAXM=100000;
int n,m,s,t;
struct edge{
	int u,v,k;
}E[MAXM+3];
void make(){
	//do something...
}
inline qwrite(int x){
	if(x<0) x=-x,putchar('-');
	if(x>9) qwrite(x/10);
	putchar(x%10+'0');
}
int main()
{
	random_shuffle(E+1,E+1+MAXM);
	qwrite(MAXN),putchar(' '),qwrite(MAXM),putchar(' '),
	qwrite(s),putchar(' '),qwrite(t),putchar('\n');
	up(1,MAXM,i) qwrite(E[i].u),putchar(' '),
				 qwrite(E[i].v),putchar(' '),
				 qwrite(E[i].k),putchar('\n');
	return 0;
}

```

对于性质1，满足每次生成的边$v>u$即可;

对于性质2，满足$|u-v|$在一定范围内即可

对于性质3，手动调整每个节点的出度即可

对于性质4，满足$v\not=t$即可

对于性质5，对容量进行一定处理即可

## 参考数据生成器

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define lw(l,r,i) for(int i=l;i>=r;i--)
using namespace std;

typedef long long LL;
const int MAXN = 10000,MAXM=100;
const bool TYPE[5]={1,0,1,1,1};
unsigned long long seed=19260817;
int n,m,s,t,cnt[MAXN+3];
struct edge{
	int u,v,k;
}E[MAXM+3];
int rdw(){
	srand(seed=1+rand()+(seed<<(seed%10)+233)+clock());
	return  seed%INT_MAX;
}
void make(){
	up(1,MAXM,i){
		int u=rdw()%MAXN+1,v,k=rdw();
		while(TYPE[2]&&cnt[u]>100) u=rdw()%MAXN+1;
		if(TYPE[1]) v=u+(rdw()%5);
		else v=(u+seed%MAXN)%MAXN;
		if(TYPE[3]) if(v==t) v--;
		if(TYPE[4]) k%=10;
		if(TYPE[0]) if(u>v) swap(u,v);
		cnt[u]++,E[i].u=u,E[i].v=v,E[i].k=k;
	}
}
inline qwrite(int x){
	if(x<0) x=-x,putchar('-');
	if(x>9) qwrite(x/10);
	putchar(x%10+'0');
}
int main()
{
	s=rdw()%MAXN+1,t=rdw()%MAXN+1,make();
	random_shuffle(E+1,E+1+MAXM);
	qwrite(MAXN),putchar(' '),qwrite(MAXM),putchar(' '),
	qwrite(s),putchar(' '),qwrite(t),putchar('\n');
	up(1,MAXM,i) qwrite(E[i].u),putchar(' '),
				 qwrite(E[i].v),putchar(' '),
				 qwrite(E[i].k),putchar('\n');
	return 0;
}

```
$\texttt{注：由于数据过大，洛谷无法上传，这里用的是lemon测试的}$

# 选手们的成绩

| 序号 | $Dinic$ | $FF$ | $EK$  | 终极$HLPP$ | $ISAP$ |
| :-----------: | :-----------: | :-----------: | :-----------: | :-----------: | :-----------: |
| $1$ | $0.625s$ | $TLE$ | $0.171s$   | $0.125s$ | $0.265s$|
| $2$ | $0.562s$ | $TLE$ | $0.156s$   | $0.093s$ | $0.265s$|
| $3$ | $0.828s$ | $TLE$ | $0.625s$   | $0.093s$ | $0.390s$|
| $4$ | $0.578s$ | $TLE$ | $0.312s$   | $0.093s$ | $0.328s$|
| $5$ | $2.468s$ | $24.000s$ | $0.046s$   | $0.078s$ | $0.218s$|
| $6$ | $5.546s$ | $TLE$ | $0.078s$   | $0.140s$ | $0.203s$|
| $7$ | $5.218s$ | $10.984s$ | $0.109s$   | $0.125s$ | $0.328s$|
| $8$ | $7.812s$ | $49.953s$ | $0.218s$   | $0.109s$ | $0.265s$|
| $9$ | $1.281s$ | $TLE$ | $0.375s$   | $0.078s$ | $0.375s$|
| $10$ | $0.781s$ | $TLE$ | $0.156s$   | $0.062s$ | $0.187s$|
| $11$ | $0.312s$ | $TLE$ | $0.046s$   | $0.093s$ | $0.203s$|
| $12$ | $0.875s$ | $TLE$ | $2.703s$   | $0.078s$ | $0.328s$|
| $13$ | $0.703s$ | $TLE$ | $0.156s$   | $0.156s$ | $0.203s$|
| $14$ | $0.500s$ | $TLE$ | $0.328s$   | $0.109s$ | $0.218s$|
| $15$ | $0.296s$ | $TLE$ | $0.171s$   | $0.109s$ | $0.296s$|
| $16$ | $0.562s$ | $TLE$ | $0.234s$   | $0.125s$ | $0.296s$|
| $17$ | $4.687s$ | $TLE$ | $0.140s$   | $0.093s$ | $0.343s$|
| $18$ | $2.921s$ | $TLE$ | $0.031s$   | $0.156s$ | $0.296s$|
| $19$ | $2.359s$ | $TLE$ | $0.040s$   | $0.078s$ | $0.312s$|
| $20$ | $4.656s$ | $TLE$ | $0.078s$   | $0.062s$ | $0.390s$|
| $21$ | $0.500s$ | $TLE$ | $0.312s$   | $0.093s$ | $0.218s$|
| $22$ | $1.000s$ | $TLE$ | $0.203s$   | $0.109s$ | $0.234s$|
| $23$ | $0.343s$ | $TLE$ | $0.062s$   | $0.156s$ | $0.265s$|
| $24$ | $1.015s$ | $TLE$ | $0.281s$   | $0.140s$ | $0.328s$|
| 总用时 | $46.428s$ | $-$ | $7.037s$ | $2.553s$ | $6.754s$|

#### 注：
 - 由于我写的蒟蒻版$HLPP$用的数据结构有毒，导致运行错误，这里就不写出了。
 - 都开了快读，已将奇奇怪怪的因素降到了最低
 - 开了$O2$，时限$1min[$其实是用来给$FF$一个机会的$]$
 
 观察上面两个表格，我们可以发现：
 
 1. 有没有环其实影响不大，但有环总是可以卡死$FF$
 
2. 其实$EK$比$Dinic$快$!!?$$\color{grey}\texttt{怕不是程序出锅了(划掉)
$$
 
 3. 当层次数量很大，可以卡掉$Dinic$。~~千万不要让毒瘤出题人看见了~~
 
 4. 其实$EK$算法才是很诡异的吊打全场。但是偶然发现的第12个测试点好像可以卡掉...(注：编者反复测试多次都可以用12号测试点卡掉$EK$)
 
 5. 答案较小(即可以找到的增广路数量少)其实并不能对结果产生什么影响...
 
 ~~6. FF又被群殴了~~
 
 不过由于编者还是没怎么细想数据怎么出，估计有一定思路，欢迎提出**hack数据**。也许不怎么有参考性吧(逃
