---
create_time: 1681489249
update_time: 1681489249
title: '题解 P9215 【[入门赛 #11] 扶苏与 1 (Hard Version)】'
board: 1
tag:
- 1
extension:
  problem:
    id: P9215
    type: P
    title: '[入门赛 #11] [yLOI2021] 扶苏与 1 (Hard Version)'
    difficulty: 6
    submitted: true
    accepted: true
---

## 题解

首先考虑一个简单的问题：怎么样使得进位的数字最多。

非常暴力且偷懒的想法是，构造 $y=\overline{999\cdots 999}$ 即可使得进位的数字最多。容易发现发生进位的数量就是 $x$ 除去末尾的 $0$ 之后的长度。记最多的次数为 $m$，那么显然 $m<k$ 就无解。

现在 $m\ge k$，设法构造一个解出来。

一个朴素的想法是将 $y$ 末尾的一些 $9$ 全变成 $0$，也就是保留最前面的 $k$ 个 $9$。很不幸，这种构造做法会在 $x$ 内部出现 $0$ 的时候发生一点小问题，进不了位。例如，下面这个例子，$m=10$，$k=6$。

$$
\begin{aligned}
x&=10001\textcolor{red}010110000\cr
y&=99999\textcolor{red}900000000
\end{aligned}
$$

不过这启发我们将 $x$ 按照 $0$ 分段。还是上面那个例子：

$$
x=\textcolor{red}{\underline{1}}\textcolor{blue}{\underline{0001}}\textcolor{red}{\underline{01}}\textcolor{blue}{\underline{01}}\textcolor{red}{\underline{1}}0000
$$

除了第一段没有 $0$ 以外，每一段都分成至少一个 $0$ 加上恰好一个非 $0$ 数的形式。假设第 $i$ 段长度为 $l_i$。那么总是可以找到一个最大的 $p$，使得 $l_1+l_2+\cdots+l_{p-1}\le k$，$l_1+l_2+\cdots+l_p> k$。对于前 $p-1$ 段，我们让这些段全部都发生进位，也就是塞上一大堆的 $9$；对于第 $p$ 段，我们要进位恰好 $k-(l_1+l_2+\cdots+l_{p-1})$ 次，那就塞上形如 $\overline{00\cdots 099\cdots 9}$ 的东西就行。

## 代码

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
const int MAXN = 1e4 + 3;
char S[MAXN]; int n, k;
int main(){
    up(1, qread(), _){
        scanf("%s", S + 1), n = strlen(S + 1);
        k = qread(); int f = n, t = 1;
        while(S[f] == '0') -- f;
        if(f < k) puts("-1"); else {
            while(k > 0){
                int p = 1;
                while(S[t] == '0') ++ t, ++ p;
                if(p <= k){
                    up(1, p, i) putchar('9');
                } else {
                    up(1, p - k, i) putchar('0');
                    up(1, k, i) putchar('9');
                }
                k -= p, ++ t;
            }
            up(t, n, i) putchar('0');
            puts("");
        }
    }
    return 0;
}
