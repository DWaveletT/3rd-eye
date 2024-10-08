---
create_time: 1586793683
update_time: 1586793683
title: 题解 P5390 【[Cnoi2019]数学作业】
board: 1
tag:
- 1
extension:
  problem:
    id: P5390
    type: P
    title: '[Cnoi2019] 数学作业'
    difficulty: 6
    submitted: true
    accepted: true
---
## 题目大意

$T$ 组数据。每组给出一个长度为 $n$ 的数列 $A_i$，求：

$$
\sum_{S\subset A}\left(\bigoplus_{p\in S}p\right)
$$

## 题解

没想到正解的公式……但是推了一个应该比较简单的 $\rm dp$。

很显然，题目中提到的异或操作只与每一位的值相关。于是我们可以按位进行操作。也就是说，分别取$A$数列的每个数二进制下的第 $k$ 位，求这 $n$ 个二进制位组成的 $01$ 串的所有子集的异或和。

可能有一点绕口。比如说，数列 $A$ 为 $(1,1,4,5)$，那么二进制下分别为 $(001)_{(2)},(001)_{(2)},(100)_{(2)},(101)_{(2)}$。取最后一位，组成 $\{1,1,0,1\}$。那么它的子集的异或值之和为 $8$。

我们记前 $i$ 个数，异或值为 $1$ 的子集个数为 $F_i$，为 $0$ 的子集个数为 $G_i$。

考虑第 $i$ 个数，每个数有两种情况：

* 值为 $1$。
  * 选择它，异或和为 $1$ 的方案数为 $G_{i-1}$，为 $0$ 的方案数为 $F_{i-1}$。
  * 不选择它，那么异或和为 $1$ 的方案数为 $F_{i-1}$，为 $0$ 的方案数为 $G_{i-1}$。
* 值为 $0$。
  * 选择它，异或和为 $1$ 的方案数为 $F_{i-1}$，为 $0$ 的方案数为 $G_{i-1}$。
  * 不选择它，那么异或和为 $1$ 的方案数为 $F_{i-1}$，为 $0$ 的方案数为 $G_{i-1}$。
    
也就是说，

$$
F_i=\begin{cases}F_{i-1}+G_{i-1} & (A_i\operatorname{and}2^k=1)\cr 2\times F_{i-1} & (A_i\operatorname{and}2^k=0)\end{cases}
$$
    
$$
G_i=\begin{cases}F_{i-1}+G_{i-1} & (A_i\operatorname{and}2^k=1)\cr 2\times G_{i-1} & (A_i\operatorname{and}2^k=0)\end{cases}
$$

~~看上去完全一样嘛~~

但是初始值不一样，$F_0=0,G_0=1$。因为有空集的情况需要考虑。

最后第 $k$ 位的贡献为在第 $k$ 位上出现 $1$ 的次数，乘上 $2^k$。每组数据的结果就是每一位的贡献和。

复杂度$\mathcal O(m\times\log_2 v)$，其中 $m$ 为 $\sum|V_i|$，$v$ 为值域。时限有点紧……

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
const int MAXN =30+3;
const int MOD  =998244353;
int c1[MAXN],c0[MAXN];
int main(){
    dn(qread(),1,T){
        int n=qread(),ans=0;
        up(0,30,i) c1[i]=0,c0[i]=1;
        up(1,n,i){
            int w=qread(); up(0,30,p){
                if(w&1){
                    int t1=c1[p],t0=c0[p];
                    c1[p]=c0[p]=(t1+t0)%MOD;
                }else c1[p]=(c1[p]<<1)%MOD,c0[p]=(c0[p]<<1)%MOD;
                w>>=1;
            }
        }
        up(0,30,i) ans=((LL)ans+((LL)c1[i]<<i))%MOD;
        printf("%d\n",ans);
    }
    return 0;
}
