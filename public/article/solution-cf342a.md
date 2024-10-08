---
create_time: 1589374452
update_time: 1589374452
title: 题解 CF342A 【Xenia and Divisors】
board: 1
tag:
- 1
extension:
  problem:
    id: CF342A
    type: CF
    title: Xenia and Divisors
    difficulty: 5
    submitted: false
    accepted: false
---
## 题目大意

$n(n<10^5)$ 个正整数，要求选出 $\frac{n}{3}$ 对数对 $(a,b,c)$，使得每对数对满足 $a<b<c,a|b,b|c$。无解输出 $-1$。

保证每个数字不超过 $7$，且 $n$ 是 $3$ 的倍数。

## 题解

观察到每个数字不大于 $7$，因此我们可以进行一系列简单的分类讨论。

- 首先，一旦出现 $5,7$ 就无解。

很显然，$5,7$ 前面只能放 $1$。而 $1$ 只能放在第一个。又由于没有不超过 $7$ 的数字能够被 $5,7$ 整除，因此无解。

目前还剩下 $\{1,2,3,4,6\}$，继续讨论。

- $3$ 只能放在第二位。

这个结论很容易通过枚举得出来。显然，如果 $3$ 放在第一位，那么第二位就要放 $6$，第三位无数字可放；如果 $3$ 放在最后一位，那么它的前面只能放 $1$，而 $1$ 的前面就不能放任何数字了。

还剩下 $\{1,2,4,6\}$ 需要讨论。

- 去掉 $3$ 之后，$6$ 只能组成 $(1,2,6)$。

非常显然的结论。因此我们可以直接将所有的 $6$ 组成这种格式。

此时我们能够发现，剩下的数字 $\{1,2,4\}$ 只能组成一种组合，因此直接全部输出就行了。

## 参考代码

```
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;

typedef long long LL;
const int INF =2147483647;
int qread(){
    int w=1,c,ret;
    while((c=getchar())> '9'||c< '0')
    w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9')
    ret=ret*10+c-'0';
    return ret*w;
}
#define no puts("-1"),exit(0)
int n,cnt[8],_136,_126,_124;
int main(){
    n=qread();
    up(1,n,i) ++cnt[qread()];
    if(cnt[5]||cnt[7]) no;
    if(cnt[6]<cnt[3]||cnt[1]<cnt[3]) no;
    _136+=cnt[3],cnt[6]-=_136,cnt[1]-=_136;
    if(cnt[2]<cnt[6]||cnt[1]<cnt[6]) no;
    _126+=cnt[6],cnt[2]-=_126,cnt[1]-=_126;
    if(cnt[1]!=cnt[2]||cnt[2]!=cnt[4]) no;
    _124+=cnt[1];
    up(1,_136,i) puts("1 3 6");
    up(1,_126,i) puts("1 2 6");
    up(1,_124,i) puts("1 2 4");
    return 0;
