---
create_time: 1586705287
update_time: 1586705287
title: 题解 P6365 【众数出现的次数】
board: 1
tag:
- 1
extension:
  problem:
    id: P6365
    type: P
    title: '[传智杯 #2 初赛] 众数出现的次数'
    difficulty: 4
    submitted: false
    accepted: false
---
## 题目大意

$n$ 个数对 $(a_i,b_i)$。现在可以从每个数对中选择 $a_i$ 或者 $a_i\operatorname{xor}b$，使得新生成的数列的众数出现的次数尽量多。输出那个众数。若两个众数出现的次数一样多，输出最小的。

## 题解

没有人用链式前向星哈希吗？哈希表会伤心的！

很显然，如果 $b_i=0$，即 $a_i\operatorname{xor}b_i=a_i$，那么只需要向结果数列中插入 $a_i$ 即可。如果 $b_i\ne 0$，那么可以**将两个都插入**。可以证明这样对答案不会造成影响，因为如果答案是其中某个数，那么另外一个数并不会对答案造成影响。

因此，我们要做的事情其实很简单。若 $b_i\ne 0$，将 $a_i$ 和 $a_i\operatorname{xor}b_i$ 都插入哈希表；否则就将 $a_i$ 插入哈希表中。最后统计众数即可。

哈希表可以用链式前向星解决。具体而言，我们对插入的数字 $w$ 按照模 $\rm SIZ$ 的余数分配到对应的邻接表中，进行初步筛选。这一步保证了复杂度的正确性。同时，我们给对应位置加上原数 $w$ 和出现的次数两个信息。每次查询 $w$ 时，只需要遍历表 $w\bmod {\rm SIZ}$，然后**判断原始数据**是否等于 $w$。（不然可能哈希碰撞导致出错）若相同，则找到了哈希表中存储的位置。

每次插入数字，就是找到对应的信息位置，并使存储的出现次数 $+1$ 即可，顺便统计一遍它的出现次数，然后更新答案。

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
const int SIZ =999997,MAXN=1e5+3;
int head[SIZ],ver[MAXN],nxt[MAXN],val[MAXN],tot;
void add(int u,int v,int w){
    ver[++tot]=v,nxt[tot]=head[u],val[tot]=w,head[u]=tot;
}
int fnd(int w){
    for(int p=head[w%SIZ];p;p=nxt[p])
    if(ver[p]==w) return p; return 0;
}
void inc(int w){
    int t=0; if(t=fnd(w)) ++val[t]; else
    add(w%SIZ,w,1); 
}
int n,ans,flg;
int main(){
    n=qread(); up(1,n,i){
        int a=qread(),b=qread(),c=0;
        if(!b) inc(a); else inc(a),inc(a^b); 
        if((c=val[fnd(a)])>ans) ans=c,flg=a; else
        if(c==ans&&a<flg) flg=a;
        if((c=val[fnd(a^b)])>ans) ans=c,flg=a^b; else
        if(c==ans&&a<flg) flg=a^b;
    }
    printf("%d\n",flg);
    return 0;
}
