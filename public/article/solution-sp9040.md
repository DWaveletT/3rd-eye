---
create_time: 1584406369
update_time: 1584406369
title: 【题解】【 SP9040 TUG - Tug of War】
board: 1
tag:
- 1
extension:
  problem:
    id: SP9040
    type: SP
    title: TUG - Tug of War
    difficulty: 0
    submitted: true
    accepted: true
---

## 题目大意

有$n$个人，每个人都有一个力量值$W_i$，满足$0<W_i<100$。现在，我们需要从中选出两拨人，两拨人的力量之和相等。

$T$组数据，$T\le 100$。每组数据输出$\rm YES$或者$\rm NO$表示是否存在合法方案。

## 题解

很显然，如果有两个人的力量值相等，那么我们只需要选这两个人就够了。由于题目保证了$0<W_i<100$，因此只要$n\ge 100$，我们就可以直接输出$\rm YES$。不过别忘了把这组数据剩下的$n$个$W_i$读进去。

下面让我们考虑$n<100$的情况。

很显然，每个人有三种选择：加入$\rm A$组，加入$\rm B$组，不加入任何一组。如果我们把$\rm A$组的力量值看作正数，$\rm B$组看作负数，那么当两组力量相等时，他们的力量和为$0$。因此，第$i$个人加入$\rm A$组就相当于给力量总和加上了$W_i$，加入$\rm B$组减去$W_i$。我们用数组$P_{i,j}$存储到第$i$个人，当前的力量值之和是否能达到$j$。那么当$\rm P_{i,0}=true$时，我们就找到了一种合法情况。转移方程：

$$
P_{i,j}=P_{i-1,j-W_i} \textrm{ or } P_{i-1,j} \textrm{ or } P_{i-1,j+W_i}
$$

其中$\rm or$是“或”运算。我们可以用滚动数组去掉一维空间。

$\rm C++ \ STL$库中提供了$\rm bitset$容器，它可以在$\mathcal O\left(\dfrac{N}{w}\right)$的复杂度进行位运算。其中$N$为$\rm bitset$的长度，$w$一般为$32$。上述操作可以简化为`P|=(P<<w)|(P>>w)`。当然，不要忘了$P_{W_i}=P_{-W_i}=\rm true$。

另外，如果你使用$\rm bool$数组的话，有一种非常偷懒的方法处理负数下标：设数组为$P$，空间为$2\times N$，那么我们可以开一个指针$Q$指向$P+N$。$\rm C++$数组中的$[\ ]$操作本质就是指针的偏移，因此$Q[-W_i]$指向了$P[N-W_i]$，所以不会$\rm RE$。

## 参考代码

```cpp
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
const int MAXN =10000+3,MAXM=MAXN*2;
bitset<MAXN*2> P;
int main(){
    dn(qread(),1,T){
        int n=qread(); if(n>=100){
            up(1,n,i) qread(); puts("YES");
        } else{
            P.reset(); bool flg=false;
            up(1,n,i){
                int w=qread(); if(flg) continue;
                P|=(P<<w)|(P>>w),P[MAXN+w]=P[MAXN-w]=true;
                if(P[MAXN]) flg=true;
            }
            puts(flg?"YES":"NO");
        }
    }
    return 0;
}
/*
2
4
10 20 30 40
3
10 18 15
*/
