---
create_time: 1682611283
update_time: 1682611283
title: 题解 P3519 【[POI2011]ROZ-Difference】
board: 1
tag:
- 1
extension:
  problem:
    id: P3519
    type: P
    title: '[POI2011] ROZ-Difference'
    difficulty: 8.8049
    submitted: true
    accepted: true
---

## 题解

考虑枚举在最终选出的子段中，出现次数最少的字符为 $a$，出现次数最多的字符为 $b$。即使枚举到的字符不是实际出现最多/最少的，也没关系，因为我们总是能枚举到最多/最少的字符对，而不正确的枚举并不会导致实际不能取得的更优的答案，而是会被正确的字符对取代。

接着考虑把 $a$ 出现的位置的值看作 $-1$，$b$ 出现的位置看作 $+1$，其余字符均为 $0$。那么对于字符对 $\langle a,b\rangle$，我们要求出它的最大子段和。

这是一个经典问题。考虑从左往右依次枚举，用变量 $s$ 存储当前考虑到的最大子段和。每次 $s\gets \max(0,s+w_i)$。对于点对 $a,b$，它们的答案 $\mathrm{ans}_{a,b}$ 赋值为这些过程中最大的 $s$。

需要注意的是，最终选出来的子段里必须同时出现 $a,b$ 才行。在忽略这个条件的情况下，可能出现选出的子段里只有 $b$ 而没有 $a$ 的情形，那我们就随便选个 $a$ 进去，所以最后一步要 $\mathrm{ans}_{a,b}\gets \min(\mathrm{ans}_{a,b},\operatorname{count}(b)-1)$。

直接这样枚举 $a,b$，扫描一遍原数组做最大子段和的复杂度为 $\mathcal O(n|\Sigma|^2)$，考虑优化。

注意到 $a,b$ 以外的字符对应的权值均为 $0$，也就是说，这些字符压根不用考虑。所以我们预处理出 $a,b$ 出现的位置放到 $\text{vector}$ 里，每次做最大子段和的复杂度降为了 $\operatorname{count}(a)+\operatorname{count}(b)$。所以总复杂度为：

$$
\begin{aligned}\sum_{a}\sum _b \operatorname{count}(a)+\operatorname{count}(b)&=2\sum _a \sum_b \operatorname{count}(a)\cr
&=2\sum _a \operatorname{count}(a)\sum _b 1\cr
&=\mathcal O(n |\Sigma|)
\end{aligned}
$$

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 1e6 + 3;
const int MAXM=  26 + 3;
vector <int> P[MAXM]; char S[MAXN];
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int n, m = 26;
int main(){
    n = qread(); scanf("%s", S + 1);
    up(1, n, i){
        P[S[i] - 'a' + 1].push_back(i);
    }
    int ans = 0;
    up(1, m, a) if(P[a].size())
        up(1, m, b) if(a != b && P[b].size()){
            int p = 0, q = 0, s = 0;
            int ans0 = 0;
            while(p < P[a].size() && q < P[b].size()){
                if(P[a][p] < P[b][q]){
                    s = max(0, s - 1), ++ p;
                    ans0 = max(ans0, s);
                } else {
                    s = max(0, s + 1), ++ q;
                    ans0 = max(ans0, s);
                }
            }
            while(p < P[a].size()) s = max(0, s - 1), ++ p, ans0 = max(ans0, s);
            while(q < P[b].size()) s = max(0, s + 1), ++ q, ans0 = max(ans0, s);
            ans0 = min(ans0, (int)P[b].size() - 1);
            ans = max(ans, ans0);
        }
    printf("%d\n", ans);
    return 0;
}
