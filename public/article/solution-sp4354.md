---
create_time: 1584944526
update_time: 1584944526
title: 题解 SP4354 【TWINSNOW - Snowflakes】
board: 1
tag:
- 1
extension:
  problem:
    id: SP4354
    type: SP
    title: TWINSNOW - Snowflakes
    difficulty: 7.6769
    submitted: true
    accepted: true
---

## 题目大意

给出$n$个六瓣雪花的顺时针**或**逆时针的长度，询问是否存在两个相同的雪花。

## 题解

容我先吐槽一下，为什么题目连数据范围和样例都没有，以及这个时限是什么东西……

这里提供一个非常简单粗暴的方法。我们只需要用字符串哈希，分别用暴力算法算出顺时针和逆时针的连续六个雪花瓣的哈希值，然后直接插入哈希表即可。

没错，这题真的就这么简单。不过，有好多细节：

- $1.$单哈希很有可能由于数据规模巨大而被卡掉。建议用双哈希。

- $2.$断环成链处理字符串哈希值，可以有效优化时间。

- $3.$用$\rm map$大概会超时，这里可能需要手写哈希。

这里提供一个很简单的手写链表哈希方法。很显然，我们可以将哈希值模一个比较大的质数，来减少空间的使用；但是，这样会大大增加哈希碰撞的概率。因此，我们还需要存入哈希值的原始值，用来避免因为取模造成的碰撞。于是考虑邻接表：

- 我们将第$i$个表头作为取模后哈希值为$i$的值的表。

- 当插入哈希值$h$时，只需要在表$h \mod p$的后面插入$h$。

- 查询是否存在哈希值$h$时，只需要在表$h \mod p$里暴力查询即可。

由于本题空间限制挺大，所以哈希表的大小可以开的比较大。因此，暴力查询的时间复杂度期望值很小，总查询复杂度几乎达到线性。

不过由于我们需要枚举雪花的顺序，因此时间复杂度还有一个比较大的常数。

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
const int SIZ=999997,MAXN=999997,MAXM=12+3;
typedef unsigned long long ULL;
int headA[SIZ],nxtA[MAXN],totA; ULL verA[MAXN];
ULL seedA[MAXM],seedB[MAXM],A[MAXM],P[MAXM],Q[MAXM];
void addA(int u,ULL v){
    verA[++totA]=v,nxtA[totA]=headA[u],headA[u]=totA;
}
int headB[SIZ],nxtB[MAXN],totB; ULL verB[MAXN];
void addB(int u,ULL v){
    verB[++totB]=v,nxtB[totB]=headB[u],headB[u]=totB;
}
bool fndA(ULL w){
    int p=w%SIZ; for(int i=headA[p];i;i=nxtA[i])
    if(verA[i]==w) return true; return false;
}
bool fndB(ULL w){
    int p=w%SIZ; for(int i=headB[p];i;i=nxtB[i])
    if(verB[i]==w) return true; return false;
}
ULL get(int l,int r,ULL *w,ULL *seed){
    return w[r]-w[l-1]*seed[r-l];
}
int n;
int main(){
    seedA[0]=13331,seedB[0]=19260817;
    up(1,12,i) seedA[i]=seedA[i-1]*seedA[0];
    up(1,12,i) seedB[i]=seedB[i-1]*seedB[0];
    n=qread(); up(1,n,i){
        up(1,6,j) A[j]=A[j+6]=qread();
        up(1,12,j){
            P[j]=P[j-1]*seedA[0]+A[j];
            Q[j]=Q[j-1]*seedB[0]+A[j];
        }
        up(1,6,j){
            ULL w1=get(j,j+5,P,seedA),w2=get(j,j+5,Q,seedB);
            if(fndA(w1)&&fndB(w2)) goto end;
            addA(w1%SIZ,w1),addB(w2%SIZ,w2);
        }
        reverse(A+1,A+1+12);
        up(1,12,j){
            P[j]=P[j-1]*seedA[0]+A[j];
            Q[j]=Q[j-1]*seedB[0]+A[j];
        }
        up(1,6,j){
            ULL w1=get(j,j+5,P,seedA),w2=get(j,j+5,Q,seedB);
            if(fndA(w1)&&fndB(w2)) goto end;
            addA(w1%SIZ,w1),addB(w2%SIZ,w2);
        }
    }
    puts("No two snowflakes are alike.");return 0;
    end: puts("Twin snowflakes found."); return 0;
}
/*参考样例，输出"Twin snowflakes found."。
2
1 2 3 4 5 6
4 3 2 1 6 5
*/
