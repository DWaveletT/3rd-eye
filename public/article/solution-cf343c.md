---
create_time: 1657288891
update_time: 1657288891
title: 题解 CF343C 【Read Time】
board: 1
tag:
- 1
extension:
  problem:
    id: CF343C
    type: CF
    title: Read Time
    difficulty: 5.625
    submitted: true
    accepted: true
---

## 题目大意

在一个无限长的数轴上有 $n$ 个指针与 $m$ 个点。指针的位置是 $h_1,h_2,\cdots h_n$，点的位置是 $p_1,p_2,\cdots p_m$。现在每个时刻可以让每个指针向左或者向右移动一个单位，求在最优操作下让指针扫过（到达过）所有点所需要的时间。

## 题解

容易发现答案满足单调性：如果使用 $t_0$ 时间可以满足题设要求，那么对于任意的 $t>t_0$ 时间都可以满足要求。因此考虑二分答案。假设现在二分的答案为 $x$。

注意一个重要结论：最优情况下，**每个指针扫过的区域不重叠**。假设两个指针扫过的区间产生了重叠，那么我们哪怕让某个指针止步在另一个指针扫过区域的边界，都不会使答案更劣。

于是从左到右考虑每个点。当前最左侧的点（位置记为 $p_0$）必须是最左侧的指针（位置记为 $h_0$）扫过，不然指针扫过的区域必然会发生重叠（因为右侧指针必须跨过最左侧指针，这就不可避免重叠），这样会使答案不优。那么如何让最左侧指针扫过当前最左侧的点呢？有两种情况要讨论：

- $h_0<p_0$。那么显然这个指针一路向右扫是最好的。
- $h_0\ge p_0$。那么又要分出两种可能的情况：
  - 第一种情况，该指针先往左扫扫到 $p_0$，再不断地往右扫。那么它向右的最大距离就是 $\max(0,x-2\times (p_0-h_0))$。
  - 第二种情况，该指针先往右扫扫到尽量远的地方，但是要保证此时它往回扫可以扫到 $p_0$。那么它往右扫的最大距离 $s$ 应当满足 $2\times s+h_0-p_0\le x$，解得 $s=\left\lfloor\dfrac{x+p_0-h_0}{2}\right\rfloor$。  
- 这两种情况往右扫的最大距离取 $\max$，得到在最左侧指针扫到 $p_0$ 的情况下，往右最多扫描的距离。

容易发现，我们扫过的区域肯定是从最左侧点开始连续的一个区间。于是在代码实现上，我们记 $l$ 表示当前未扫到的点中，最靠左的点。然后依次枚举每个指针，然后更新 $l$。考虑到 $l$ 会依次扫过每个点不超过一次，因此每次 $\text{check}$ 的时间复杂度为 $\mathcal O(n+m)$ 的。

加上二分，总时间复杂度为 $\mathcal O((n+m)\log v)$。顺带一提，不知道出题人咋想的，坐标范围开到 $10^{10}$，必须要开 $\text{long long}$ 存储。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l,END##i=r;i<=END##i;++i)
#define dn(r,l,i) for(int i=r,END##i=l;i>=END##i;--i)
using namespace std;
typedef long long i64;
const int INF =2147483647;
const int MAXN=1e6+3;
i64 qread(){
    i64 w=1,c,ret;
    while((c=getchar())> '9'||c< '0') w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9') ret=ret*10+c-'0';
    return ret*w;
}
i64 n,m,H[MAXN],P[MAXN];
bool chk(i64 x){
    int p=1; up(1,n,i){
        if(P[p]<=H[i]){
            if(H[i]-P[p]>x) return false;
            i64 d=H[i]-P[p];
            while(p<=m&&(P[p]-H[i]<=x-2*d||2*(P[p]-H[i])+d<=x)) ++p;
        } else {
            while(p<=m&&P[p]-H[i]<=x) ++p;
        }
        if(p>m) return true;
    }
    return false;
}
i64 ans=-1;
int main(){
    n=qread(),m=qread();
    up(1,n,i) H[i]=qread();
    up(1,m,i) P[i]=qread();
    dn(35,0,i) if(!chk(ans+(1ll<<i))) ans+=1ll<<i;
    printf("%lld\n",ans+1);
    return 0;
}
