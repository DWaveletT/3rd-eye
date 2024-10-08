---
create_time: 1668693476
update_time: 1668693476
title: 题解 【P8808 [蓝桥杯 2022 国 C] 斐波那契数组】
board: 1
tag:
- 1
extension:
  problem:
    id: P8808
    type: P
    title: '[蓝桥杯 2022 国 C] 斐波那契数组'
    difficulty: 5
    submitted: true
    accepted: true
---
## 题解

记 $\mathrm{Fib}(i)$ 表示斐波那契数列的第 $i$ 项。其中，

$$
\mathrm{Fib}(n)=\begin{cases}1 & n = 0 \text{ or } n = 1 \\ \mathrm{Fib}(n - 1)+\mathrm{Fib}(n - 2) & n > 1\end{cases}
$$

记修改完后的序列为 $b$。取 $e=b_0$。由题设，$b_0=b_1=e$，也就有 $b_0=\mathrm{Fib}(0)\cdot e,b_1=\mathrm{Fib}(1)\cdot e$。

容易根据数学归纳法得到，

$$
b_n=b_{n-1}+b_{n-2}=(\mathrm{Fib}(n-1)+\mathrm{Fib}(n-2))\cdot e=\mathrm{Fib}(n)\cdot e
$$

假如 $a_n=b_n$，也就是我们不需要修改这个位置的数，那就有：

$$
e=a_n\div \mathrm{Fib}(n)
$$

不过，这个式子成立的前提是 $\mathrm{Fib}(n)\mid a_n$。如果不成立的话那就找不到这个 $e$，这个位置就必须要被修改了。另外斐波那契数列的增长速度很快的。当 $\mathrm{Fib}(n)$ 已经大于值域 $m=10^6$ 那也就不用管了。

当然，最终 $e$ 肯定只能有唯一一个。于是要使结果最小，也就是保留最多的位置，那就选择出现次数最多的那个 $e$。开一个桶统计一下就行。

时间复杂度 $\mathcal O(m)$。比楼下的快很多。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
int qread(){
    int w=1,c,ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
const int MAXN = 1e6 + 3;
int H[MAXN], u = 1, v = 1, t, m = 1e6;
int main(){
    int n = qread();
    up(1, n, i){
        int a = qread(); if(a % u == 0) H[a / u] ++;
        if(u < m) t = v, v = u + v, u = t;
    }
    int ans = INF;
    up(1, m, i) ans = min(ans, n - H[i]);
    printf("%d\n", ans);
    return 0;
}
