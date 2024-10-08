---
create_time: 1661821950
update_time: 1661821950
title: 题解 【WR2-1A】【「Wdoi-2」夜空中的 UFO 恋曲】
board: 1
tag:
- 1
extension:
  problem:
    id: P8540
    type: P
    title: 「Wdoi-2」夜空中的 UFO 恋曲
    difficulty: 8
    submitted: true
    accepted: true
---
## 题解

考虑每一次操作：

$$
a\gets a^{2c}\oplus c
$$

按照奇偶进行讨论。首先讨论两种简单情形：

- $a$ 是奇数，$c$ 是偶数。那么每次变换后，$a$ 都是奇数。这是因为 $a^{2c}$ 必然是奇数，异或上 $c$ 后肯定还是奇数。
- $a$ 是偶数，$c$ 是偶数。  
  设 $a=u\cdot 2^p,c=v\cdot 2^q$，其中 $u,v$ 均为奇数，且 $p,q\ge 1$。  
那么第一次变换后，$a\gets u^{2c}\cdot 2^{2pv2^q}\oplus v\cdot 2^q$。$\oplus$ 两侧，前者的 $\text{lowbit}$ 值为 $2^{2pv2^q}$，后者为 $2^q$。由于 $2pv2^q>q$，于是 $a$ 的 $\text{lowbit}$ 为 $2^q$。设此时 $a$ 为 $w\cdot 2^q$。  
于是第二次变换后，$a\gets w^{2c}\cdot 2^{2qv2^q}\oplus v\cdot 2^q$，发现 $a$ 的 $\text{lowbit}$ 还是 $2^q$。以此类推，任意次操作后，$a$ 的 $\text{lowbit}$ 都是 $2^q$。 

接着是要考虑剩下的两种复杂点的情形：

- $c$ 是奇数，$a$ 是偶数。
- $c$ 是奇数，$a$ 是奇数。第一次操作后，$a\gets a^{2c}\oplus c$ 变成了一个偶数。可以归纳到上一种情形里。


考虑前者。下文中，取 $2c\ge 2^d>c$。

同样地，设 $a=u\cdot 2^p$，那么 $a^{2c}\oplus c=u^{2c}\cdot 2^{2pc}\oplus c\equiv c\pmod{2^{2c}}\equiv c\pmod {2^d}$。下次迭代后成了 $c^{2c}\oplus c$。下面证明 $c^{2c}\oplus c\not\equiv 0\pmod {2^d}$。

也就是要证明：

$$
c^{2c-1}-1\not\equiv 0\pmod{2^d}
$$

考虑直接使用二项式定理将左侧展开。

$$
(c-1+1)^{2c-1}-1=\sum_{i=0}^{2c-1}\binom{2c-1}{i}(c-1)^i-1=\sum_{i=1}^{2c-1}\binom{2c-1}{i}(c-1)^i
$$

注意到，$c-1$ 是一个偶数，由于 $c>1$，上式的 $\text{lowbit}$ 值就是 $c-1$ 的 $\text{lowbit}$ 值。那么，

$$
\operatorname{lowbit}(c^{2c-1}-1) = \operatorname{lowbit}(c-1)<2^d
$$

所以，

$$
c^{2c-1}-1\not\equiv 0\pmod{2^d}
$$

## 代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l,END##i=r;i<=END##i;++i)
#define dn(r,l,i) for(int i=r,END##i=l;i>=END##i;--i)
using namespace std;
typedef unsigned int       u32;
typedef unsigned long long u64;
typedef long long i64;
const int INF =2147483647;
i64 qread(){
    i64 w=1,c,ret;
    while((c=getchar())> '9'||c< '0') w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9') ret=ret*10+c-'0';
    return ret*w;
}
i64 lowbit(i64 x){
    return x&-x;
}
i64 power(i64 x,i64 y){
    u64 r=1,t=x;
    while(y){if(y&1) r=r*t; t=t*t,y>>=1;}
    return r;
}
void solve(i64 b,i64 c){
    if(b%2==1) printf("%lld\n",lowbit(c));
    else       printf("%lld\n",lowbit(power(c,2*c)^c));
}
int main(){
    i64 a=qread(),b=qread(),c=qread();
    if(a%2==1&&c%2==0) puts("1"),exit(0);
    if(a%2==0&&c%2==0) printf("%lld\n",lowbit(c)),exit(0);
    if(a%2==0&&c%2==1) solve(b  ,c);
    if(a%2==1&&c%2==1) solve(b-1,c);
    return 0;
}
