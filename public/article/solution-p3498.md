---
create_time: 1584512152
update_time: 1584512152
title: 【题解】【P3498 [POI2010]KOR-Beads】
board: 1
tag:
- 1
extension:
  problem:
    id: P3498
    type: P
    title: '[POI2010] KOR-Beads'
    difficulty: 7
    submitted: true
    accepted: true
---

## 题目简述

$n$个数，可以按照长度为$k$分为$[1,k],[k+1,2\times k],\cdots$共$\left\lfloor\dfrac{n}{k}\right\rfloor$条数字串。要求互不相同的串尽量多。**一条串翻转后被认为是同一条串**。

## 题解

非常好的字符串哈希题。

### 求哈希值

很显然，我们可以枚举每个$k$，然后判断$\left\lfloor\dfrac{n}{k}\right\rfloor$个串中互不相同的串有多少个。我们可以用哈希表判重。但是如何快速算出$[(i-1)\times k+1,i\times k]$这个子串的哈希值呢？

我们可以按照这样的方法进行字符串哈希：

$$
H(S)=\left(\sum_{i=1}^{S.length}S_i\times seed^{i-1}\right) \bmod 2^{64}
$$

这种方法，**本质上**就是把字符串转成了$seed$进制的数，并对$2^{64}$取模（即$\text{unsigned long long}$自然溢出）
。举个栗子：一个十进制数$1145141919810$，我们要取出它从左往右第三位到第七位，那么就是$1145141-11\times 10^5=45141$。$seed$进制同理，

$$
H(S_{sub[l,r]})=\left(pre_r-pre^{l-1}\times seed^{r-l+1}\right) \bmod 2^{64}
$$

其中$pre_i$表示$S$的前$i$个字符的哈希值。翻转的数字串同理即可。

然后是关于哈希表的问题。

### 建哈希表

最简单的方法，就是用$\rm map$直接插入哈希值。这样时间复杂度单次其实是$\mathcal O(\log N)$。我们希望更快的时间复杂度，又希望较少的空间复杂度，还不希望因此增加哈希碰撞的概率，怎么办？这里给出更快的方法。

图论中的链式前向星，给每个邻接表添加节点$\operatorname{add}(u,v)$，本质上就是给链表$u$增加了一个元素$v$。那么我们完全可以将$u$变为哈希值对分配的内存$SIZE$取模后的结果，而$v$变为哈希值本来的值。

```
\\链式前向星加点
void add(int u,ULL v){
    ver[++tot]=v,nxt[tot]=head[u],head[u]=tot;
}
\\给哈希表增加元素
add(h%SIZ,h);
```

关于查询操作，为了减少哈希碰撞，我们扫描一遍哈希值取模后的值所对应的邻接表的元素，检查是否存在元素的值等于它。

```
bool fnd(ULL hsh){
    int p=hsh%SIZ; for(int i=head[p];i;i=nxt[i])
    if(ver[i]==hsh) return true; return false;
}
```
这样可以在最大程度避免哈希碰撞的情况下减少了空间损耗。

### 算复杂度

虽然好像枚举了一遍$k$，又枚举了每个块，但是时间复杂度是$\sum\limits_{i=1}^{N}\left\lfloor\dfrac{N}{i}\right\rfloor\le N \log N$，近似为$\mathcal O(N \log N)$，可以通过本题。

用哈希表替代$\text{map}$，有个好处就是时间极短，在$\text{171ms}$就可以通过本题。是所有不开$\rm O2$的程序中较快的程序。最大的点也只需要$\rm 60+ms$。

~~开$\sout{\rm{O2}}$被$\sout\text{map}$吊打，我也很无奈呀~~


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
typedef unsigned long long ULL;
const int SIZ =999997,MAXN=2e5+3;
int head[SIZ+3],nxt[SIZ+3],tot;ULL ver[SIZ+3];
void add(int u,ULL v){ver[++tot]=v,nxt[tot]=head[u],head[u]=tot;}
ULL seed[MAXN]={19260817},pre[MAXN],suf[MAXN];
ULL getA(int l,int r){return pre[r]-pre[l-1]*seed[r-l];}
ULL getB(int l,int r){return suf[l]-suf[r+1]*seed[r-l];}
bool fnd(ULL hsh){
    int p=hsh%SIZ; for(int i=head[p];i;i=nxt[i])
    if(ver[i]==hsh) return true; return false;
}
int P[MAXN],vis[MAXN*2],res[MAXN],cnt,flg,top,ans,n;
int main(){
    n=qread(); up(1,n,i) P[i]=qread();
    up(1,n,i) seed[i]=seed[i-1]*seed[0];
    up(1,n,i) pre[i]=pre[i-1]*seed[0]+P[i];
    dn(n,1,i) suf[i]=suf[i+1]*seed[0]+P[i];
    up(1,n,i){
        up(1,cnt,i) head[vis[i]]=0; tot=cnt=flg=0;
        if(n/i<ans) break;
        for(int j=1;i*j<=n;++j){int l=(j-1)*i+1,r=j*i;
            ULL wA=getA(l,r),wB=getB(l,r);
            if(!(fnd(wA)||fnd(wB))){
                add(wA%SIZ,wA),add(wB%SIZ,wB),++flg;
                vis[++cnt]=wA%SIZ,vis[++cnt]=wB%SIZ;
            }
        }
        if(flg==ans) res[++top]=i; else if(flg<ans) continue;
        else top=0,ans=flg,res[++top]=i;
    }
    printf("%d %d\n",ans,top);
    up(1,top,i) printf("%d ",res[i]); puts("");
    return 0;
}
