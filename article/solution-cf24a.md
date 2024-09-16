---
create_time: 1540090623
update_time: 1540090623
title: CF24A-Ring road
board: 1
tag:
- 1
extension:
  problem:
    id: CF24A
    type: CF
    title: Ring road
    difficulty: 4.2727
    submitted: true
    accepted: true
---

~~** 震惊！辣鸡城市为了交通秩序竟然...**~~
## 思路
第一次看到题目，其实我挺懵的。题意似乎是有向图中两两节点都要互相到达，询问最小边权。这不是**强连通分量**吗...还要用给定的边建图，还要边权最小...
### 一脸茫然.jpg
**但是**仔细分析题目，再看看题目标题，"**环路**"，**有且仅有$n$条边**，问题还**必定有解**。那么想要两城到达，只有一种情况:
###  形成一个环
顿时问题迎刃而解。具体思路如下：
按照题目要求建**无向图**，那么建好的图，一定是一个环。**【不然不满足必定有解的要求】**。随便找一个点，顺时针和逆时针跑一下遍历，统计边权，最后做个大小比较。
## 细节
光有思路可不行，~~说不定哪天爆零了怎么办~~

第一点，也是最重要的一点，拜访标记的处理。$dfs/bfs$实现起来就很简单了，这里不细讲了。难点在于循环做法。用链式前向星做，该怎么打标记?vis[ver[i]]还是vis[i]?

考虑到每条有向边只能遍历一次，反边恰好在i+1,我们不妨直接这样做:**vis[i]=vis[i^1]=true**//注：不同起点可能下可能稍有不同

第二点细节：注意顺时针和逆时针两种情况。
## 代码
```cpp
#include<bits/stdc++.h>
using namespace std;
const int MAXN =100 +3;
const int MAXM =MAXN;
int tot,head[MAXN],nxt[MAXM*2],ver[MAXM*2],val[MAXM*2];
void add(int u,int v,int k){	//前向星
	tot++;
	ver[tot]=v,val[tot]=k;
	nxt[tot]=head[u],head[u]=tot;
}
bool vis[MAXN*2];
int ans,sum,n,t;
int main()
{
 	cin>>n;
 	for(int i=1;i<=n;i++){		//读入
 		int u,v,k;
		 cin>>u>>v>>k;
		 add(u,v,0);
		 add(v,u,k);
		 sum+=k; 
	}
	for(int i=head[1];i;i=t,t=nxt[i]){
		int v=ver[i];			//遍历
		if(vis[i]) continue;
		vis[i]=vis[((i-1)^1)+1]=true;
		ans+=val[i],t=head[v];
	}
	cout<<min(sum-ans,ans);		//比较
	return 0;
}

