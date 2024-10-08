---
create_time: 1681809924
update_time: 1681809924
title: 题解 CF346A 【Alice and Bob】
board: 1
tag:
- 1
extension:
  problem:
    id: CF346A
    type: CF
    title: Alice and Bob
    difficulty: 5
    submitted: true
    accepted: true
---

我愿称之为伪博弈论题。

## 题解

注意到题设所给过程很像辗转相除法。由于 $d\mid x,d\mid y\Rightarrow d\mid (x-y)$，所以最终整个序列里，每个元素都是它们的最大公因数 $d=\gcd_i \{a_i\}$ 的倍数。同时总是可以按照辗转相除的方法，使得 $d$ 在最终的序列里。

接着注意到 $|x-y|< x$ 且 $|x - y|<y$，所以最后整个序列最大值就是原来的最大值 $m=\max_i \{a_i\}$。

当一名玩家无法操作时，整个序列肯定是 $[d,2d,3d,\cdots,m]$，否则如果 $kd$ 不在序列里而 $(k+1)d$ 在序列里，总是可以选择 $(k+1)d$ 和 $d$ 将 $kd$ 添加进去。所以最终局面是唯一确定的。

所以操作了恰好 $\dfrac{m}{d}-n$ 次后一定会到达最终局面。而在此之前一定可以进行操作。

所以根据 $\dfrac{m}{d}-n$ 的奇偶性输出结果就行，和两人采取什么策略完全没有关系。

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
int main(){
    int n = qread(), d = 0, m = 0;
    up(1, n, i){
        int a = qread(); m = max(m, a);
        d = __gcd(a, d);
    }
    puts((m / d - n) % 2 == 1 ? "Alice" : "Bob");
    return 0;
}
