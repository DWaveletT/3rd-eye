---
create_time: 1586239141
update_time: 1586239141
title: 题解 P6312 【[PA2018]Palindrom】
board: 1
tag:
- 1
extension:
  problem:
    id: P6312
    type: P
    title: '[PA2018] Palindrom'
    difficulty: 5
    submitted: true
    accepted: true
---
## 题目大意

输入一个字符串 $\left({\mathrm{len}(S)}\le10^7\right)$，判断它是不是回文串。

## 题解

由于题目的空间限制非常小（$\tt 4MB$ 左右），所以这种大小的字符串显然不能全部读入。因此考虑边读入边进行哈希操作。

考虑使用一个非常传统的字符串哈希：

$$
\operatorname{Hash}(S)=\sum_{i=0}^{\mathrm{len}(S)-1}b^i\times S_i \pmod {m}
$$

但是我们同时要计算出 $S$ 的反转字符串 $S'$ 的哈希值。

我们能够发现，

$$
\operatorname{Hash}(S')=\sum_{i=0}^{\mathrm{len}(S)-1}b^i\times S_{len-i-1}\pmod {m}
$$

如果我们记 $S_{0..r}$ 表示 $S$ 的前缀 $S_0,S_1,\cdots,S_r$ 组成的字符串，那么有：

$$
\begin{aligned}\operatorname{Hash}(S_{0,k})=&\operatorname{Hash}(S_{0,k-1})\times b+S_k &\pmod {m}\cr \operatorname{Hash}(S'_{0,k})=&\operatorname{Hash}(S'_{0,k-1})+b^k\times S_k & \pmod {m}\end{aligned}
$$

两者都可以很容易地维护。最后比较 $\operatorname{Hash}(S)$ 和 $\operatorname{Hash}(S')$ 即可。为了保险起见，可以取两组不同的 $(b,m)$ 分别计算，只有两次检验得到的哈希值都相同才算 $\verb!TAK!$。

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
char c; int h1, h2, g1, g2, tmp, base1 = 1, base2 = 1;
const int BASE1 = 13331, MOD1 = 1e9 + 7;
const int BASE2 = 131  , MOD2 = 1e9 + 9;
int main(){
    while(!isalpha(c = getchar()));
    do{
        h1 = (1ll * h1 * BASE1 + c) % MOD1;
        h2 = (1ll * c * base1 + h2) % MOD1;
        base1 = 1ll * base1 * BASE1 % MOD1;
        g1 = (1ll * g1 * BASE2 + c) % MOD2;
        g2 = (1ll * c * base2 + g2) % MOD2;
        base2 = 1ll * base2 * BASE2 % MOD2;
    }while(isalpha(c = getchar()));
    puts(h1 == h2 && g1 == g2 ? "TAK" : "NIE");
    return 0;
}
```

