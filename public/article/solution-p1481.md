---
create_time: 1583406230
update_time: 1583406230
title: 【题解】【P1481 魔族密码】
board: 1
tag:
- 1
extension:
  problem:
    id: P1481
    type: P
    title: 魔族密码
    difficulty: 4
    submitted: true
    accepted: true
---

## 题目大意

按照字典序输入$n$个长度不超过$75$的字符串。询问从中最多选择出多少歌字符串，使得每个字符串都是后面一个字符串的前缀。

## 题解

楼上给了挺多$\text{Trie,暴力匹配,map}$的做法，这里讲一讲$\text{Hash}$以及它的相关优化吧。

根据题意，设$dp_i$表示以第$i$个字符串结尾的字符串链的最大长度。那么我们可以推出状态转移方程：

$$
dp_i=\max_{\text{$s_j$为$s_i$前缀}}\{dp_j\}+1
$$

那么如何判断那些字符串是$i$的前缀呢？

题目非常良心地告诉了我们这些字符串都是按照字典序排列的。因此，若$s_j$为$s_i$的前缀，那么肯定就有$j<i$。于是，我们可以将$i$之前所有的字符串插入到哈希表里。然后搜索起来就非常方便了。

这里按照这样的方法进行哈希：

$$
H(S)=\sum_{i=0}^{S.size-1}S_i\times seed^i
$$

换句话说，就是将$S$转换成$seed$进制。为了方便处理，我们对它使用$\text{unsigned long long}$的自然溢出。(即自动对$2^{64}$取模)

很显然，当$i$进行到第$k$步时，$H$的值为$S$的前缀$S_{0..k}$的哈希值。因此我们只需要通过这个哈希值寻找前面是否有字符串的哈希值为$H$就可以了。关于哈希表的实现，最简单的方法就是用$\text{map}$直接映射。这里用链式前向星实现一个简单的链表哈希。

我们知道，链式前向星（就是图论里经常用来建图的那个），其本质为**动态链表**。$\text{add(u,v,w)}$本质上和邻接表类似，就是在头指针为$u$的链表里插入了两个数$u$和$w$。由于哈希值可能很大($2^{64}$级别)，所以我们将它对$T=10^5+3$取模，这样就可以进行初步分类（两个相同的哈希值模同一个数余数相同）；然后每个链表内插入哈希值原始数据$H$，查询的时候只需要搜索对应表头中是否有对应哈希值即可。

用这种方法的有点是在不开$O(2)$的情况下得到比$\text{map}$更快的速度(开了$O2$依旧容易被$\text{STL}$吊打$\text{orz}$)。同时用取模缩小了空间复杂度，用几乎可以忽略的小规模的搜索避免了哈希碰撞，最终能获得较好的效果。

时间复杂度$\mathcal O(L)$，其中$L$为字符串总长度。

虽然哈希算法讲了一大堆，然而实现起来只有链式前向星和几句话的查找。所以其实码量挺小的。

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
const int MAXN =2e3+3,MAXM=75+3;
int n,dp[MAXN],ans; char T[MAXM]; ULL seed=13331;

int reads(char *s){
    int len=0,c; while((c=getchar())==10||c==13||c==32);
    if(c==EOF) return -1;
    s[len++]=c;  while((c=getchar())!=10&&c!=13&&c!=32&&c!=EOF)
    s[len++]=c;  s[len]=0; return len;
}
const int SIZ=1e5+3;
int head[SIZ],nxt[MAXN],val[MAXN],tot; ULL ver[MAXN];
void add(int u,ULL v,int w){
    ver[++tot]=v,nxt[tot]=head[u],val[tot]=w,head[u]=tot;
}
int  fnd(ULL h){
    int p=h%SIZ; for(int i=head[p];i;i=nxt[i])
    if(ver[i]==h) return val[i]; return 0;
}
int main(){
    n=qread(); up(1,n,i){
        int lt=reads(T); ULL h=0; up(1,lt,j){
            h=h*seed+T[j-1],dp[i]=max(dp[i],dp[fnd(h)]);
        }
        ++dp[i]; add(h%SIZ,h,i),ans=max(ans,dp[i]);
    }
    printf("%d\n",ans);
    return 0;   
}
