---
create_time: 1696249474
update_time: 1696249474
title: 题解 P9689 【Bina.】
board: 1
tag:
- 1
extension:
  problem:
    id: P9689
    type: P
    title: Bina.
    difficulty: 6
    submitted: true
    accepted: true
---

出题人卡常数是什么心态。

## 题解

可以发现，给出的 $\verb!build!$ 函数本质就是建立一棵以 $p$ 为根节点，对应区间 $[l, r]$ 的线段树。这个节点的左儿子是 $2p$，右儿子是 $2p+1$。

套路地，应用大小为 $n$ 的线段树区间长度本质不同的节点个数只有 $\mathcal O(\log n)$ 种的结论。可以使用归纳法证明线段树每一层，区间长度最多只有 $\{2k+1,2k\}$ 两种（也可能只有一种，这个时候认为另外一种长度的数量为 $0$ 即可）：

- 第一层区间长度只有 $n$ 一种，符合归纳条件；
- 假设第 $i$ 层区间长度最多只有 $\{2k+1,2k\}$ 两种，可以发现下一层可能的区间长度只有 $\{k+1,k\}$ 两种。

由于线段树只有 $\mathcal O(\log n)$ 层，所以区间长度本质不同的节点个数只有 $\mathcal O(\log n)$ 个。

现在我们要计算长度为 $i$、根节点编号为 $x$ 的子树，限定它最多生长 $y$ 层，它里面所有结点的编号之和。可以证明对于固定的 $i$ 和 $y$ 而言，答案是一个关于 $x$ 的一次函数。同样是应用归纳证明：

- 对于叶子节点，答案显然是 $1\cdot x+0$；
- 从下往上看每个非叶子节点，它一定会有两个儿子 $2x$ 和 $2x+1$。应用归纳假设可以知道这两个子树里所有结点的编号之和分别可以表示成 $u_1\cdot(2x)+v_1$ 和 $u_2\cdot (2x+1)+v_2$ 的形式，其中 $u_1,v_1,u_2,v_2$ 是和 $x$ 无关的常数。于是对于 $x$ 来说，它子树内所有结点的编号之和是 $(2u_1+2u_2+1)\cdot x+(v_1+v_2+u_2)$，同样是关于 $x$ 的一次函数。

我们对于每个 $x,y$ 计算一下系数，由于本质不同的 $i$ 只有 $\mathcal O(\log n)$ 个，可能的 $y$ 也只有 $\mathcal O(\log n)$ 个，所以直接暴力做单次复杂度就是 $\mathcal O(\log ^2 n)$。不过需要注意到尽管区间长度种类不多，但是值比较大，可能需要用 $\mathrm{map}$ 或者哈希表来存，会有较大的常数。实现不太好的话就会被卡爆。

## 暴力做法

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long i64;

const int MAXN = (1 << 19) + 3;
const int MAXM =  19 + 3;
const int MAXK =  32 + 3;

int o = (1 << 19), g = 20;
tuple<int, i64, i64> H[MAXN][MAXM];

unordered_map <int, tuple<int, i64, i64>> M[MAXK];
void solve(int n, int d){
    if(n <= o && d <= g)
        return;
    if(M[d].count(n))
        return;
    if(n == 1 || d == 1){
        M[d][n] = {1, 1, 0};
        return;
    }
    const int n1 = (n + 1) / 2, n2 = n - n1;
    solve(n1, d - 1);
    solve(n2, d - 1);
    const auto &[c1, u1, v1] = n1 <= o ? H[n1][min(g, d - 1)] : M[d - 1][n1];
    const auto &[c2, u2, v2] = n2 <= o ? H[n2][min(g, d - 1)] : M[d - 1][n2];
    M[d][n] = {
        c1 + c2 + 1, 1 + 2 * u1 + 2 * u2, v1 + u2 + v2
    };
}

int main(){
    int T;
    cin >> T;
    for(int i = 1;i <= o;++ i){
        for(int j = 1;j <= g;++ j){
            if(i == 1 || j == 1){
                H[i][j] = {1, 1, 0};
            } else {
                const int n1 = (i + 1) / 2, n2 = i - n1;
                const auto &[c1, u1, v1] = H[n1][j - 1];
                const auto &[c2, u2, v2] = H[n2][j - 1];
                H[i][j] = {
                    c1 + c2 + 1, 1 + 2 * u1 + 2 * u2, v1 + u2 + v2
                };
            }
        }
    }
    for(int _ = 1;_ <= T;++ _){
        int n, m, h = 32;
        for(int i = 1;i <= h;++ i)
            M[i].clear();
        cin >> n >> m;
        i64 ans = -1, tot = 2 * n - 1;
        for(int k = 1;k <= h;++ k){
            solve(n, k);
            auto [c, x, y] = n <= o ? H[n][min(g, k)] : M[k][n];
            if(c <= tot - m){
                ans = max(ans, (x + y) / k);
            } else break;
        }
        cout << ans << endl;
    }
    return 0;
}
```

为了去掉多余的那个 $\log$，需要对 $y$ 下手。假设在剪掉不少于 $m$ 个节点的情况下树的深度最大为 $t$，可以合理猜测最优的 $t_{\mathrm{best}}$ 要么等于 $t$ 要么等于 $t-1$（证明留给读者）。然后就做完了。时间复杂度 $\mathcal O(T\log n)$。

## 参考代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long i64;

const int MAXN = (1 << 19) + 3;
const int MAXM =  19 + 3;
const int MAXK =  32 + 3;

int o = (1 << 19), g = 20;
tuple<int, i64, i64> H[MAXN][MAXM];

unordered_map <int, tuple<int, i64, i64> > M[MAXK];
void solve(int n, int d){
    if(n <= o && d <= g)
        return;
    if(M[d].count(n))
        return;
    if(n == 1 || d == 1){
        M[d][n] = {1, 1, 0};
        return;
    }
    const int n1 = (n + 1) / 2, n2 = n - n1;
    solve(n1, d - 1);
    solve(n2, d - 1);
    const auto &[c1, u1, v1] = n1 <= o ? H[n1][min(g, d - 1)] : M[d - 1][n1];
    const auto &[c2, u2, v2] = n2 <= o ? H[n2][min(g, d - 1)] : M[d - 1][n2];
    M[d][n] = {
        c1 + c2 + 1, 1 + 2 * u1 + 2 * u2, v1 + u2 + v2
    };
}

int main(){
    int T;
    cin >> T;
    for(int i = 1;i <= o;++ i){
        for(int j = 1;j <= g;++ j){
            if(i == 1 || j == 1){
                H[i][j] = {1, 1, 0};
            } else {
                const int n1 = (i + 1) / 2, n2 = i - n1;
                const auto &[c1, u1, v1] = H[n1][j - 1];
                const auto &[c2, u2, v2] = H[n2][j - 1];
                H[i][j] = {
                    c1 + c2 + 1, 1 + 2 * u1 + 2 * u2, v1 + u2 + v2
                };
            }
        }
    }
    for(int _ = 1;_ <= T;++ _){
        int n, m, h = 32;
        for(int i = 1;i <= h;++ i)
            M[i].clear();
        cin >> n >> m;
        i64 ans = -1, tot = 2 * n - 1 - m;
        i64 sum1 = 1, val1 = n;
        i64 sum2 = 0, val2 = n - 1;
        int t = 0;
        if(tot < 1){
            cout << -1 << endl;
            continue;
        } else 
            -- tot;
        for(int k = 2;k <= h;++ k){
            i64 tval1 = (val1 + 1) / 2;
            i64 tval2 = (val1 + 1) / 2 - 1;
            i64 tsum1 = 0, tsum2 = 0;
            for(auto [sum, val] : {
                make_tuple(sum1, val1),
                make_tuple(sum2, val2)
                }){
                if(val == 1)
                    continue;
                if((val + 1) / 2 == tval1)
                    tsum1 += sum;
                else 
                    tsum2 += sum;
                if(val - (val + 1) / 2 == tval1)
                    tsum1 += sum;
                else
                    tsum2 += sum;
            }
            sum1 = tsum1, val1 = tval1;
            sum2 = tsum2, val2 = tval2;
            tot -= sum1 + sum2;
            if(tot < 0){
                t = k - 1; break;
            } else 
            if(tot == 0){
                t = k; break;
            }
        }
        for(auto &t0 : {t, t - 1}){
            if(t0 == 0)
                continue;
            solve(n, t0);
            auto [c, x, y] = n <= o ? H[n][min(g, t0)] : M[t0][n];
            ans = max(ans, (x + y) / t0);
        }
        
        cout << ans << endl;
    }
    return 0;
}
