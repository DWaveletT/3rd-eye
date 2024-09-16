---
create_time: 1582891336
update_time: 1582891336
title: 【题解】P5192 有源汇上下界最大流
board: 1
tag:
- 1
extension:
  problem:
    id: P5192
    type: P
    title: Shoot the Bullet|东方文花帖|【模板】有源汇上下界最大流
    difficulty: 9
    submitted: true
    accepted: true
---

## 题目大意

Aya超可爱的~ [题目传送门](https://www.luogu.com.cn/problem/P5192)

题意非常清晰：共有若干组数据 $( \leq 10)$。每组数据文文要从 $m$ 名 $\stackrel{BBA}{\text{少女}}$ 中收集 $n$ 天的照片，其中第$i$名少女共要收集**至少** $G_i$ 张。

文文第 $i$ 天可以拍摄 $D_i$ 张照片，取材范围为$C_i$位编号为 $T_{i,j}$ 的 $\stackrel{BBA}{\text{少女}}$，其中第 $j$ 位 $\stackrel{BBA}{\text{少女}}$ 需要拍摄 $[L_{i,j},R_{i,j}]$ 张照片。

现在求文文 $n$ 天最多收集多少张照片。如果无解，输出 $-1$。

$n\leq365,m\leq 1000,G_x\in[0,10^5],(1\leq C\leq 300,0\leq D\leq30000),(0\leq T_i<m,0\leq L_{i,j} \leq R_{i,j}\leq 100)$

## 题解

(**前置知识**：网络流最大流。)

虽然题目要求有源汇有上下界的最大流，但先让我们考虑**无源汇有上下界可行流**。

### 无源汇有上下界可行流

它的定义非常简单：一张 $n$ 个点 $m$ 条边网络流，其中每条边有一个流量限制 $[L_i,R_i]$ 表示这条边**流量的范围**。因为没有源汇，所以这张网络流需要满足**流入每个点的流量总量$ = $流出的流量总量**。

既然每个点都有上下界，那么我们先满足它的下界好了。即**对于每条边先填充 $\mathbf{L_i}$ 的流量**。但是这样显然流量不平衡，也就是说，有的点凭空流出了流量，但是又有流量流入点之后消失了。不过，我们可以惊喜的发现，问题已经转化为了：

每个点有一个权值$\mathbf{W_i}$表示当前在这个点上**积蓄/欠缺的流量**，同时每条边有一个流量限制 $\mathbf{[0,R_{i}-L_{i}]}$。现在要你求出一种方案，使得每个点积蓄/欠缺的流量全部用完，并且每条边满足流量限制。

如果我们再改一下题面：有一个超级源点 $S$ 向满足 $W_i>0$ 的点连了一条容量为 $|W_i|$ 的边。同时又有一个超级汇点$T$使得所有满足$W_i<0$的边都有一条容量为 $|W_i|$ 连向了 $T$。这条题目是不是非常像有源汇的网络流最大流？

**让我们重新梳理一下上述内容**:我们强制给每条边添上了一些流，或者说将这条边的流量范围变为了 $[0,R_i-L_i]$ 的普通版最大流。这样做会造成一些点上多出或欠缺一些流量。这时我们将欠的流量当作是 $S$ 给他们的流量，多出来的流量要还给 $T$，我们就能用最大流给他们疏通疏通经脉，满足约束条件。**此时我们能够使得每条边满足约束条件并且流量平衡**。

因为对于每条边 $(u,v,w)$，我们都让它的起始点 $u$ “透支”了 $w$ 的流量，而给终止点 $v$“借了”$w$ 流量，因此整张网络上的流量总和为 $0$。

但是先别高兴，我们要解决的是**有源汇有上下界可行流**。

### 有源汇有上下界可行流

**有源汇**这个条件给了我们什么东西呢？他给了我们源点 $s$ 和汇点 $t$，其中 $s$ 只输出流量，而 $t$ 只接受流量。对于这两个点，我们不要求它们流入的量 = 流出的量。但是如何把它转化为无源汇的上下界可行流呢？

其实，我们可以通过连接一条边 $t\to s$，容量为 $[0,+\infty]$，这样就能使得 $S$ 流出的流量由 $T$ 提供，$T$ 流入的量由 $S$ 提供，进而达到收支平衡。这样子跑一遍无源汇有上下界可行流，就可以使得到一组可行解了。其中，在 $t\to s$ 这条边上**流过的**流量就是一个可行的方案的答案了。换句话说，在 $t\to s$ 这条边流过的流量就是它的反向边（即残量网络的对应边）的流量。

### 有源汇有上下界最大流

但是我们的问题是要求最大流呀！不要慌，至少我们已经找到了一种合法的情况了。最大流算法需要扩大答案怎么办？在残量网络上跑增广路。而有源汇有上下界最大流也不例外（因为我们实际上已经把问题转化为了最大流问题，不过是多出了两个特殊点 $S$ 和 $T$）。如果我们从 $s$ 向 $t$ 增广会发生什么呢？

让我们重新回忆一下增广路的概念：从点 $s$ 到点 $t$ 增广，就是尽可能地在残量网络中寻找一条 $s\to t$ 的道路并转化为 $s\to t$ 的流量。

由于 $S$ 没有入边，而 $T$ 没有出边，因此增广路不会经过 $S,T$，也就不会导致约束条件失效（即始终满足流量平衡）。

### 建图

说了那么多，应该回到题目了。记 $D'_i$ 表示每一天对应的点，$G'_i$ 为每一位少女对应的点。首先我们需要建立一个源点$s$，由于每一天拍摄的照片数量不超过$D_i$，因此从 $s$ 向 $D_i$ 连上约束为 $[0,D_i]$  的边。对于第 $i$ 天，我们从该天向少女$T_{i,j}$连上边 $D'_i\to G'_{T_{i,j}}$，约束条件为 $[L_{i,j},R_{i,j}]$。最后，每名少女需要向汇点 $T$ 连边 $G'_i\to T$，约束条件为 $[G_i,+\infty]$。跑一遍有源汇有上下界最大流即可。

**总结**：这条题目的流程为读入边，处理边，跑普通版最大流。因此编写难度并不是很大。


### 扩展：关于最高标号预留推进（HLPP）

很显然，上面利用超级源汇点疏通边权达到进出平衡的算法可以用 $\text{HLPP}$ 实现。预留推进算法实质就是从每个点向其他点“推送”流量，这刚好符合我们的意图。

不过，由于使用 HLPP 算法有点大炮打蚊子了，所以这里直接使用的 $\text{Dinic}$ 算法。

## 参考代码

```
#include <bits/stdc++.h>
using namespace std;

int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}

using i64 = long long;
const int INF  =  1e9;
const i64 INFL = 1e18;

namespace MCMF{
    const int MAXN = 1e5 + 3;
    const int MAXM = 2e5 + 3;
    int H[MAXN], V[MAXM], N[MAXM], F[MAXM], o = 1, n;
    void add0(int u, int v, int f){
        V[++ o] = v, N[o] = H[u], H[u] = o, F[o] = f;
        V[++ o] = u, N[o] = H[v], H[v] = o, F[o] = 0;
        n = max(n, u);
        n = max(n, v);
    }
    i64 D[MAXN];
    bool bfs(int s, int t){
        queue <int> Q;
        for(int i = 1;i <= n;++ i)
            D[i] = 0;
        Q.push(s), D[s] = 1;
        while(!Q.empty()){
            int u = Q.front(); Q.pop();
            for(int i = H[u];i;i = N[i]){
                const int &v = V[i];
                const int &f = F[i];
                if(f != 0 && !D[v]){
                    D[v] = D[u] + 1;
                    Q.push(v);
                }
            }
        }
        return D[t] != 0;
    }
    int C[MAXN];
    i64 dfs(int s, int t, int u, i64 maxf){
        if(u == t)
            return maxf;
        i64 totf = 0;
        for(int &i = C[u];i;i = N[i]){
            const int &v = V[i];
            const int &f = F[i];
            if(f && D[v] == D[u] + 1){
                i64 f = dfs(s, t, v, min(1ll * F[i], maxf));
                F[i    ] -= f;
                F[i ^ 1] += f;
                totf += f;
                maxf -= f;
                if(maxf == 0){
                    return totf;
                }
            }
        }
        return totf;
    }
    i64 mcmf(int s, int t){
        i64 ans = 0;
        while(bfs(s, t)){
            memcpy(C, H, sizeof(H));
            ans += dfs(s, t, s, INFL);
        }
        return ans;
    }
    int G[MAXN];
    void add(int u, int v, int l, int r){
        G[v] += l;
        G[u] -= l;
        add0(u, v, r - l);
    }
	void clear(){
		for(int i = 1;i <= o;++ i){
			N[i] = F[i] = V[i] = 0;
		}
		for(int i = 1;i <= n;++ i){
			H[i] = G[i] = C[i] = 0;
		}
		o = 1, n = 0;
	}
    bool solve(){				// 无源汇
        int s = ++ n;
        int t = ++ n;
        i64 sum = 0;
        for(int i = 1;i <= n - 2;++ i){
            if(G[i] < 0)
                add0(i, t, -G[i]);
            else
                add0(s, i,  G[i]), sum += G[i];
        }
        auto res = mcmf(s, t);
        if(res != sum)
            return true;
        return false;
    }
    i64 solve(int s0, int t0){	// 有源汇
        add0(t0, s0, INF);
        int s = ++ n;
        int t = ++ n;
        i64 sum = 0;
        for(int i = 1;i <= n - 2;++ i){
            if(G[i] < 0)
                add0(i, t, -G[i]);
            else
                add0(s, i,  G[i]), sum += G[i];
        }
        auto res = mcmf(s, t);
        if(res != sum)
            return -1;
        return mcmf(s0, t0);
    }
}

const int MAXN = 1e3 + 3;
const int MAXM = 365 + 3;

int G[MAXN], A[MAXN], B[MAXM];

int main(){
	ios :: sync_with_stdio(false);
	cin.tie(nullptr);

	int n, m, o = 0;
	while(cin >> n >> m){

		int s = ++ o;
		int t = ++ o;

		for(int i = 1;i <= m;++ i){
			cin >> G[i];
			A[i] = ++ o;
			MCMF :: add(A[i], t, G[i], INF);
		}
		for(int i = 1;i <= n;++ i){
			B[i] = ++ o;

			int c, d;
			cin >> c >> d;

			MCMF :: add(s, B[i], 0, d);

			for(int j = 1;j <= c;++ j){
				int t, l, r;
				cin >> t >> l >> r;
				t ++;
				MCMF :: add(B[i], A[t], l, r);
			}
		}
		cout << MCMF :: solve(s, t) << "\n\n";

		MCMF :: clear();
	}
	
	return 0;
}
```


## 后记

明明说好的是模板题，然而并不是赤裸裸的板题（虽然一眼就能看出来是板子），所以调试起来挺麻烦的。但只要你有足够扎实的最大流功底，这条题目对于你就是小菜一碟。

另外，要注意少女的下标从$0$开始。虽然题目明确指出，但还是要小心成为星际玩家orz。

~~其实我做这条题目的动机完全是因为文文~~

