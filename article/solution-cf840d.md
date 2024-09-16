---
create_time: 1690788792
update_time: 1690788792
title: 题解 CF840D 【Destiny】
board: 1
tag:
- 1
extension:
  problem:
    id: CF840D
    type: CF
    title: Destiny
    difficulty: 10
    submitted: true
    accepted: true
---

提供一个极其简单并且正确性高的随机化做法。

## 题解

注意到 $k\le 5$，于是如果答案存在，那么它占 $[l, r]$ 的比例一定不小于 $\dfrac{1}{5}$。考虑随机检查 $[l, r]$ 区间里的 $h$ 个数字，再检查它的出现次数是否大于 $\dfrac{r-l+1}{k}$。这 $h$ 次检查里，检查到答案的概率为 $1-\left(\dfrac{k-1}{k}\right)^h$。当 $h=100$ 时，出错概率约为 $10^{-10}$。

在另外一篇随机化题解里，它使用了莫队统计 $[l, r]$ 区间里每一个数字出现的次数。不过实际上，我们可以避免莫队统计元素个数的过程。因为，**我们只关心**某个数字出现次数是否大于等于某个值 $p=1+\left\lfloor\dfrac{r-l+1}{k}\right\rfloor$。

依然是将询问离线，枚举询问的右端点 $r$，接着用 $n$ 个 $\text{vector}$ 维护每个元素出现的位置。用 $E_a$ 表示元素 $a$ 出现的位置的下标 $\{E_{a}(0),E_{a}(1),\cdots,E_{a}(k)\}$。

当我们检查元素 $v$ 时，如果 $E_v$ 的大小比 $p$ 小，显然 $v$ 不合法；否则取出 $E_v$ 里倒数第 $p$ 个元素（即，倒数第 $p$ 个值为 $v$ 的元素的下标），如果其值小于 $l$，显然不合法，否则合法。

时间复杂度为 $\mathcal O(n+mh)$。下文代码取了 $h=100$。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 3e5 + 3;
int A[MAXN], B[MAXN], h = 100;
vector <int> E[MAXN];
vector <int> F[MAXN];
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
mt19937 MT;
vector <tuple<int, int, int> > Q[MAXN];
int main(){
    int n = qread(), m = qread();
    up(1, n, i) A[i] = qread();
    up(1, m, i){
        int l = qread(), r = qread(), k = qread();
        Q[r].push_back(make_tuple(l, k, i));
    }
    up(1, n, i){
        F[A[i]].push_back(i);
        for(auto &q : Q[i]){
            int l = get<0>(q);
            int r = i;
            int k = get<1>(q);
            int x = get<2>(q);
            int t = (r - l + 1) / k + 1;
            int ans = INF;
            uniform_int_distribution <int> U(l, r);
            up(1, h, j){
                int p = A[U(MT)], g;
                if((g = F[p].size()) >= t && F[p][g - t] >= l){
                    if(p < ans)
                        ans = p;
                }
            }
            if(ans == INF)
                B[x] = -1;
            else
                B[x] = ans;
        }
    }
    up(1, m, i)
        printf("%d\n", B[i]);
    return 0;
}
