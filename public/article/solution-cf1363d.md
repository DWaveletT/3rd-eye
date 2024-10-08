---
create_time: 1681895359
update_time: 1681895359
title: 题解 CF1363D 【Guess The Maximums】
board: 1
tag:
- 1
extension:
  problem:
    id: CF1363D
    type: CF
    title: Guess The Maximums
    difficulty: 8
    submitted: false
    accepted: false
---

很有趣，就是不是很有趣。

## 题解

首先发现如果题设所给的集合还有一些数字没选上，我们总是可以将剩下来的数字放在另外一个集合内。根据「题必有解」定理，因为数据完全可以这样多问你一个区间，所以这么做不会使得这道题目变得无解。

注意到我们回答答案时是以每个集合作为单位的，有个想法就是将一个集合内的所有点浓缩成一个点。因为询问的时候返回的是最大值，所以就想着把每个集合合并成它里面的最大值吧。询问一些「点」的最大值就是询问对应集合的并集的最大值。

问题就被简化成了，有 $k+1$ 个点 $w_1,w_2,w_3,\cdots,w_{k+1}$，你需要对于每个 $i$ 求出 $\max \{w_1,w_2,\cdots,w_{i-1},w_{i+1},\cdots,w_{k},w_{k+1}\}$。

容易注意到：

- 如果某个数不是序列的最大值，那么对于它而言答案总是整个序列的最大值；
- 如果多个数都是序列的最大值，那么对于它而言答案也是整个序列的最大值；
- 如果仅有一个数是序列的最大值，那么对于它而言答案就是序列的次大值。

那么我们先通过一次询问求出整个序列的最大值 $m$，再通过二分随便找一个最大值的位置 $w_f=m$。然后通过一次询问 $w_f$ 以外的数字的最大值来确定 $w_f$ 是不是唯一的最大值。

总询问次数是 $1+\lceil \log_2 1000\rceil+1=12$，刚好符合题目要求。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 1e3 + 3;
int C[MAXN]; vector <int> V[MAXN]; bool F[MAXN];
int query(vector <int> &X){
    int s = 0, w = 0;
    for(auto &x : X) s += V[x].size();   cout << "? " << s;
    for(auto &x : X) for(auto &y : V[x]) cout << " "  << y;
    cout << endl; cin >> w;
    return w;
}
int main(){
    int T; cin >> T;
    up(1, T, _){
        int n, k;
        cin >> n >> k;
        up(1, k, i){
            cin >> C[i];
            up(1, C[i], j){
                int a; cin >> a; V[i].push_back(a), F[a] = true;
            }
        }
        ++ k;
        up(1, n, i) if(!F[i]) V[k].push_back(i);
        vector <int> X0;
        vector <int> X1;
        up(1, k, i) X0.push_back(i);
        int ans = 0, m = query(X0);
        dn(9, 0, i){
            int p = ans | 1 << i;  if(p >= k) continue;
            vector <int> X; up(1, p, j) X.push_back(j);
            if(query(X) != m) ans = p;
        }
        ++ ans;
        up(1, k, i) if(i != ans) X1.push_back(i);
        int t = query(X1);
        cout << "!";
        up(1, k - 1, i){
            if(i == ans) cout << " " << t;
                else     cout << " " << m;
        }
        cout << endl;
        string result; cin >> result;
        up(1, k, i) V[i].clear();
        up(1, n, i) F[i] = false;
    }
    return 0;
}
