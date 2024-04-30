---
time: 123456
title: "大家好啊，我是说的道理"

type: "题解"
problem: "CF1824C"
---

## $F = ma$

$F = ma$。

<!-- 大家好啊，我是注释 -->

## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 测试 1
### 测试 11
### 测试 12
### 测试 13

- 无序列表 1
- 无序列表 2
- 无序列表 3
- 无序列表 4

1. 有序列表 1
2. 有序列表 2
3. 有序列表 3
4. 有序列表 4

> [[ red ]]
> 我是引用块。
> 我是引用块。
> 我是引用块。
> 我是引用块。
> 我是引用块。
> 我是引用块。

**我是加粗**，_我是斜体_。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 1e5 + 3;
vector <int> V[MAXN];
int G[MAXN], T[MAXN], K[MAXN], A[MAXN], F[MAXN], S[MAXN];
void dfs0(int u, int f){
    S[u] = 1;
    for(auto &v : V[u]) if(v != f){
        dfs0(v, u), S[u] += S[v];
        if(S[v] > S[G[u]]) G[u] = v;
    }
}
map<int, bool> M[MAXN];
void dfs(int u, int f){
    if(V[u].size() == 1 && f){
        T[u] = u, M[T[u]][0] = true, K[u] = A[u], F[u] = 0;
    } else {
        map<int, int> S;
        dfs(G[u], u);
        T[u] = T[G[u]];
        K[u] = K[G[u]];
        int c = 1, sum = F[G[u]], w = 1;
        for(auto &v : V[u]) if(v != f && v != G[u]){
            dfs(v, u);
            for(auto &x : M[T[v]]){
                S[x.first ^ K[v]] ++;
            }
            ++ c, sum += F[v];
        }
        for(auto &x : S){
            if(M[T[u]].count(x.first ^ K[u])) ++ x.second;
            w = max(w, x.second);
        }
        if(w == 1){
            for(auto &x : S){
                M[T[u]][x.first ^ K[u]] = true;
            }
        } else {
            M[T[u]].clear();
            for(auto &x : S){
                if(x.second == w)
                    M[T[u]][x.first ^ K[u]] = true;
            }
        }
        K[u] ^= A[u];
        F[u] = sum + c - w;
    }
}
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    int n = qread();
    up(1, n, i) A[i] = qread();
    up(1, n - 1, i){
        int u = qread(), v = qread();
        V[u].push_back(v);
        V[v].push_back(u);
    }
    dfs0(1, 0);
    dfs(1, 0);
    for(auto &x : M[T[1]]){
        if((x.first ^ K[1]) == 0){
            printf("%d\n", F[1]); exit(0);
        }
    }
    printf("%d\n", F[1] + 1);
    return 0;
}
```