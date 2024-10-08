---
create_time: 1681798932
update_time: 1681798932
title: 题解 CF961D 【Pair Of Lines】
board: 1
tag:
- 1
extension:
  problem:
    id: CF961D
    type: CF
    title: Pair Of Lines
    difficulty: 7.76
    submitted: true
    accepted: true
---

随机化萌萌题。

## 题解

注意到题目本质上是把点集划分成了两个集合 $A,B$，两个集合分别可用一条直线贯穿。由于两点确定一条直线，所以只要知道 $A$ 或 $B$ 里的任意两个点就能确定对应的直线长啥样。

注意到 $\max \{|A|,|B|\}\ge \dfrac{n}{2}$。我们从全集 $U$ 里随便取两个点 $x,y$，那么这两个点在同一个集合里的概率不小于 $\dfrac{1}{4}$。

当我们知道两个点 $x,y$ 后，就可以确定 $x,y$ 所在那个集合对应的直线 $L$。那么就可以将剩下来所有点进行划分。对于点 $i$，如果 $i$ 在 $L$ 上就贪心地不管，否则说明它在另外一个集合上。当确定了两个不在 $L$ 上的点时，就能确定另外一个集合对应的直线 $L'$ 了。如果找到一个既不在 $L$ 又不在 $L'$ 上的点，那么说明要么 $x,y$ 其实不在一个集合里，要么无解。

假设有解，那么随机一对 $x,y$ 出来进行检查通过的概率不小于 $\dfrac{1}{4}$。进行 $k$ 次检查，通过的概率不小于 $1-\left(\dfrac{3}{4}\right)^k$。取 $k=50$ 时概率不小于 $99.9999\%$。

也就是说，如果检查了 $k=50$ 次后还不合法，就可以直接认为无解了。出错概率不超过 $0.00001\%$。

但是 Hack 数据不讲武德，第 $117$ 个测试点对着使用初始种子的 mt19937 卡。所以需要随机一个值，比如 $114514$，作为初始种子。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
const int MAXN = 1e5 + 3;
int X[MAXN], Y[MAXN], n;
bool check(int x, int y){
    int x0 = X[x], dx = X[x] - X[y];
    int y0 = Y[x], dy = Y[x] - Y[y];
    int p = 0, q = 0;
    up(1, n, i){
        if(1ll * (X[i] - x0) * dy == 1ll * (Y[i] - y0) * dx) continue; else {
            if(p == 0) p = i; else 
            if(q == 0) q = i; else {
                i64 u = 1ll * (X[i] - X[p]) * (Y[p] - Y[q]);
                i64 v = 1ll * (Y[i] - Y[p]) * (X[p] - X[q]);
                if(u != v) return false;
            }
        }
    }
    return true;
}
int m = 50;
mt19937 MT(114514);
int main(){
    n = qread();
    if(n == 1) puts("YES"), exit(0);
    up(1, n, i) X[i] = qread(), Y[i] = qread();
    uniform_int_distribution <int> U(1, n);
    up(1, m, i){
        int a = U(MT);
        int b = U(MT);
        if(a == b) continue;
        if(check(a, b)){
            puts("YES"); return 0;
        }
    }
    puts("NO");
    return 0;
}
