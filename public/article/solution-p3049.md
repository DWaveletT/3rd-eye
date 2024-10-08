---
create_time: 1582949463
update_time: 1582949463
title: 【题解】【P3049 [USACO12MAR]Landscaping S】
board: 1
tag:
- 1
extension:
  problem:
    id: P3049
    type: P
    title: '[USACO12MAR] Landscaping S'
    difficulty: 6
    submitted: true
    accepted: true
---

## 题目大意

有$n$个花坛，编号为$1,2\dots n$。现在第$i$个花坛有$A_i$单位土壤，需要通过以下操作将它变成$B_i$单位的土壤。

- 按照单价$X$元购买土壤。

- 花费每单位$Y$元移走土壤。

- 向$j$花坛运送土壤，每单位$Z\times|i-j|$元。

求最小的总花费。

## 题解

$\qquad$上面既然给出了贪心和$dp$的解法，这里就给一个非常容易理解的网络流费用流方法吧。

$\qquad$为了控制第$i$个花坛拥有$B_i$单位土壤，我们可以将它向汇点$T$连一条边，容量为$B_i$，费用为$0$，这样满流之后就能保证每个花坛恰好有$B_i$单位土壤。节点之间传递土壤非常简单：对于点$i$，向$i-1,i+1$分别连接容量为$+\infty$，费用为$Z$的边。如何购买土壤？我们只需要从源点向每个花坛连出容量为$+\infty$，费用为$X$的边。也就是说，如果某个花坛想要多获得一份土地，他就需要多花费$X$元。

$\qquad$同时我们要从源点$S$向每个点连接一条边来处理初始情况（即每个花坛里有$A_i$的土壤）。但是要注意的是，由于我们初始时**必须**给每个点$A_i$的土壤，因此$S$向每个点连的边边权应该是$-Y$，同时我们要给结果加上$A_i\times Y$。如何理解？我们可以认为如果点$i$想要退回$1$单位的土壤，他就必须花费$Y$元；此时我们已经给他们垫付了$A_i\times Y$，因此结果需要加上$A_i\times Y$。

## 参考代码

```
#include<bits/stdc++.h>
#define pLi pair<LL,int>
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
const int MAXN =1e5+3,MAXM=3e5+3;
class graph{
	public:
	LL n,m,s,t,ans; bool vis[MAXN],inq[MAXN];
	LL head[MAXN],nxt[MAXM*2],ver[MAXM*2],val[MAXM*2];
	LL tot,flw[MAXM*2],deg[MAXN],ufw[MAXN];
	graph():s(1),n(0),tot(1){
		memset(dep ,0,sizeof(dep ));
		memset(vis ,9,sizeof(vis ));
		memset(head,0,sizeof(head));
		memset(nxt ,0,sizeof(nxt ));
		memset(ver ,0,sizeof(ver ));
		memset(flw ,0,sizeof(flw ));
		memset(h   ,0,sizeof(h   ));
		memset(id  ,0,sizeof(id  ));
	}
	void _add(int u,int v,LL f,LL w){
		ver[++tot]=v,flw[tot]=f,val[tot]=w,
		nxt[tot]=head[u],head[u]=tot;
	}
	void add(int u,int v,LL f,LL w){
		deg[u]++,_add(u,v,f,w),_add(v,u,0,-w);
	}
	LL dep[MAXN],h[MAXN],id[MAXN];
};
bool dijstra(graph &g){
	priority_queue<pLi,vector<pLi >,greater<pLi > > pq;
	while(!pq.empty()) pq.pop(); int flg=INF;
	up(1,g.n,i) g.dep[i]=g.ufw[i]=INF,g.vis[i]=false;
	pq.push(make_pair(0ll,g.s)); while(!pq.empty()){
		pLi x=pq.top(); pq.pop();
		LL u=x.second,w=x.first,hu=g.h[u];
		if(g.vis[u]||w>flg) continue; g.vis[u]=true,g.dep[u]=w;
        if(u==g.t) flg=w;
		for(int i=g.head[u];i;i=g.nxt[i]){
			LL v=g.ver[i],hv=g.h[v],lmt=min(g.ufw[u],g.flw[i]);
			if(!g.vis[v]&&lmt&&g.dep[v]>g.dep[u]+g.val[i]+hu-hv){
				g.dep[v]=g.dep[u]+g.val[i]+hu-hv; 
				g.ufw[v]=lmt,g.id[v]=i;
				pq.push(make_pair(g.dep[v],v));
			}
		}
	}
	return g.dep[g.t]!=INF;
}
void SPFA(graph &g){
	up(1,g.n,i) g.inq[i]=false,g.dep[i]=INF;
	queue <int> q; q.push(g.s),g.inq[g.s]=true,g.dep[g.s]=0;
	while(!q.empty()){
		int u=q.front(); q.pop(),g.inq[u]=false; 
		for(int i=g.head[u];i;i=g.nxt[i]){
			int v=g.ver[i]; if(g.flw[i]&&g.dep[v]>g.dep[u]+g.val[i]){
				g.dep[v]=g.dep[u]+g.val[i];
				if(!g.inq[v]) q.push(v),g.inq[v]=true;
			}
		}
	}
	memcpy(g.h,g.dep,sizeof(g.h));
}
LL ans=0,cst=0;
void MCMA(graph &g){
	SPFA(g);
	while(dijstra(g)){
		LL mxflw=g.ufw[g.t],mncst=mxflw*(g.dep[g.t]-g.h[g.s]+g.h[g.t]);
		ans+=mxflw,cst+=mncst; for(int i=g.t;i!=g.s;i=g.ver[g.id[i]^1])
		g.flw[g.id[i]]-=mxflw,g.flw[g.id[i]^1]+=mxflw;
		up(1,g.n,i) g.h[i]+=g.dep[i];
	}
}
struct graph G;
int tp,x,y,z,a,b,num,ID[MAXN],sum;
int main(){
    num=qread(),x=qread(),y=qread(),z=qread();
    int s=++tp,t=++tp; up(1,num,i) ID[i]=++tp;
    up(1,num,i) {
        a=qread(),b=qread(),sum+=a*y;
        G.add(s,ID[i],a,-y),G.add(ID[i],t,b,0);
        G.add(s,ID[i],INF,x);
    }
    G.n=tp; G.s=s,G.t=t;
    up(1,num-1,i) G.add(ID[i],ID[i+1],INF,z),G.add(ID[i+1],ID[i],INF,z);
    MCMA(G);
    printf("%d\n",cst+sum);
    return 0;
}
```

