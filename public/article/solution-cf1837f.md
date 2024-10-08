---
create_time: 1685112312
update_time: 1685112312
title: 题解 CF1837F 【Editorial for Two】
board: 1
tag:
- 1
extension:
  problem:
    id: CF1837F
    type: CF
    title: Editorial for Two
    difficulty: 8
    submitted: true
    accepted: true
---

赛时被卡麻了。

## 题解

题面可以转化为从原数列里选出一个大小为 $k$ 的子序列 $M$，接着将这个子序列分为两段 $M=A+B$，最小化 $\max\{\operatorname{sum} A,\operatorname{sum} B\}$ 的值。其中 $\operatorname{sum} M$ 表示 $M$ 中的元素之和。

那么我们枚举 $A$ 里面的元素的下标的最大值 $i$。那么 $A$ 里的元素的下标肯定在 $[1,i]$ 内，$B$ 里的元素的下标肯定在 $[i+1,n]$ 内。接着我们需要贪心地去选择 $k$ 个元素，假设在 $A$ 中选择了 $k_1$ 个，那一定要选择 $A$ 当中前 $k_1$ 小的元素；在 $B$ 中选择了 $k_2=k-k_1$ 个，一定要选择 $B$ 当中前 $k_2$ 小的元素。

接着发现，随着 $k_1$ 的增大，$\operatorname{sum} A$ 会单调增大，$\operatorname{sum} B$ 会单调减小。因为我们要最小化 $\max\{\operatorname{sum} A,\operatorname{sum} B\}$，所以总是可以二分出这样的 $k_1=x$，使得 $\operatorname{sum} A\le \operatorname{sum} B$，最优的 $k_1$ 的值肯定是 $x$ 或者 $x+1$。

那么我们需要这样一个数据结构来动态维护 $A,B$，它支持以下功能：

- 插入一个元素 $x$；
- 删除一个元素 $x$；
- 查询前 $k$ 小的元素之和。

容易使用平衡树实现，复杂度为 $\mathcal O(n\log^2 n)$。如果常数太大就会像我这样 fhqTreap 写了一年卡半天常数遗憾退场。赛后我写了个替罪羊树。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
typedef unsigned int       u32;
typedef unsigned long long u64;
namespace SCT{
    const double alpha = 0.8;
    const int SIZ = 6e5 + 3;
    int L[SIZ], R[SIZ], C[SIZ], S[SIZ], H[SIZ], W[SIZ];
    int size; i64 X[SIZ];
    void pushup(int t){
        S[t] = S[L[t]] + S[R[t]] + C[t];
        X[t] = X[L[t]] + X[R[t]] + 1ll * C[t] * W[t];
        H[t] = H[L[t]] + H[R[t]] +    1;
    }
    int newnode(int w){
        ++ size;
        L[size] = R[size] = 0;
        S[size] = C[size] = H[size] = 1;
        W[size] = X[size] = w;
        return size;
    }
    void dfs(int t){
        if(L[t]) dfs(L[t]);
        printf("%d : %d\n", C[t], W[t]);
        if(R[t]) dfs(R[t]);
    }
    void solve1(vector<pair<int, int>> &N, vector<int> &I, int t){
        if(L[t]) solve1(N, I, L[t]);
        N.push_back(make_pair(C[t], W[t]));
        I.push_back(t);
        if(R[t]) solve1(N, I, R[t]);
    }
    int  solve2(vector<pair<int, int>> &N, vector<int> &I, int l, int r){
        if(l > r) return 0; else {
            int m = l + r >> 1, u = I[m];
            L[u] = solve2(N, I, l, m - 1);
            R[u] = solve2(N, I, m + 1, r);
            C[u] = N[m].first ;
            W[u] = N[m].second;
            pushup(u);
            return u;
        }
    }
    int check(int t){
        if(max(H[L[t]], H[R[t]]) >= max(5.0, H[t] * alpha + 1)){
            // puts("REBUILD");
            static vector<pair<int, int>> N;
            static vector<int>            I;
            N.clear(), I.clear();
            solve1(N, I, t);
            return solve2(N, I, 0, N.size() - 1);
        }
        return t;
    }
    int insert(int t, int w){
        if(t == 0) return newnode(w);
        if(w == W[t]) ++ C[t], pushup(t); else 
        if(w <  W[t]) L[t] = insert(L[t], w), pushup(t);
            else      R[t] = insert(R[t], w), pushup(t);
        return check(t);
    }
    int erase(int t, int w){
        if(t == 0) return 0;
        if(w == W[t]) -- C[t], pushup(t); else 
        if(w <  W[t]) L[t] = erase(L[t], w), pushup(t);
            else      R[t] = erase(R[t], w), pushup(t);
        return check(t);
    }
    i64 find_kth(int t, int k){
        if(k == 0) return 0;
        if(k <= S[L[t]]       ) return find_kth(L[t], k);
        if(k <= S[L[t]] + C[t]) return X[L[t]] + 1ll * W[t] * (k - S[L[t]]);
        return find_kth(R[t], k - S[L[t]] - C[t]) + X[L[t]] + 1ll * W[t] * C[t];
    }
    void clear(){
        size = 0;
    }
}
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
const int MAXN= 3e5 + 3;
int A[MAXN];
int main(){
    up(1, qread(), _){
        int n = qread(), k = qread();
        int t1 = 0, t2 = 0, h = 18;
        up(1, n, i) A[i] = qread();
        up(1, n, i) t2 = SCT :: insert(t2, A[i]);
        i64 val = 1e18;
        up(0, n, i){
            if(i > 0){
                t1 = SCT :: insert(t1, A[i]);
                t2 = SCT :: erase (t2, A[i]);
            }
            int ans = 0;
            int l = max(0, k - SCT :: S[t2]);
            int r = min(k,     SCT :: S[t1]);
            // printf("[%d, %d]\n", l, r);
            dn(h, 0, j){
                int s1 = l - 1 + (ans | 1 << j);
                int s2 = k - s1;
                if(s1 <= r){
                    i64 w1 = SCT :: find_kth(t1, s1);
                    i64 w2 = SCT :: find_kth(t2, s2);
                    // printf("val = %lld, %lld\n", w1, w2);
                    if(w1 <= w2) ans |= 1 << j;
                    val = min(val, max(w1, w2));
                }
            }
        }
        printf("%lld\n", val);
        SCT :: clear();
    }
    return 0;
}
