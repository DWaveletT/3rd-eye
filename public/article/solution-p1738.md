---
create_time: 1582120212
update_time: 1582120212
title: 【题解】【P1738- 洛谷的文件夹】
board: 1
tag:
- 1
extension:
  problem:
    id: P1738
    type: P
    title: 洛谷的文件夹
    difficulty: 5
    submitted: true
    accepted: true
---

## 题目简述

给出$n$个地址，每次询问需要至少多少个文件夹才能使这些地址都合法。

$n\leq 10^3,|S_i|\leq100.$

---

## 题解

大家都写了不少$\text{Trie}$(字典树)和$\text{map}$的题解，这里就讲一讲哈希和关于字符串的一些坑点吧。

### 关于字符串哈希

一种非常简单的哈希方法：

$$
H(S)=\sum_{i=1}^{|S|}(S_i\times seed^{i-1}) \mod P
$$

**注：这里字符串下标从1开始**

简单地理解一下，就是将$S$当作一个$seed$进制数。这种哈希算法本质就是将它转化成十进制（并取模）。

写成代码就是

```cpp
int hash(char *s,int l){
    int ret=0;
    for(int i=1;i<=l;i++)
    ret=(ret*seed+s[i])%P;
    return ret;
}
```
通常我们可以直接使用$\text{unsigned long long}$的自然溢出（即自动对$2^{64}$取模）。

### 关于哈希的实现细节

我们已经成功写出哈希函数了。然而由于哈希碰撞（即产生了相同的哈希值，程序判断两个元素相等），~~一定是因为我太非了~~，导致这种哈希方法可能会$\red{\text{WA}}$，最后只拿了$50\text{pts}$。

因此我们可以选择链式哈希，即开数量较多的链表（比如$10^6$个），通过取模将要查找的值定位在对应的链表里，然后查找是否有相同的数字。这种方法可以**避免**因为哈希碰撞造成的问题，又可以一定程度上降低时空复杂度。

另外，这里~~为了偷懒~~用了一个可能有点迷惑的办法。在实现图的存储的时候，我们往往使用链式前向星。然而链式前向星本质就是链表。$\text{head}$数组相当于刚刚说的表头，而**加边相当于在对应链表中添加元素**。

```cpp
//注：ULL即unsigned long long
const int MAXS=1e6+3;
int head[MAXS],nxt[MAXS],tot;
ULL val[MAXS];
void add(int u,ULL w){	//经典的链式前向星加边
    nxt[++tot]=head[u],val[tot]=w,head[u]=tot;
}
char *c; int n,ans;
bool gethsh(ULL t){
    for(int i=head[t%MAXS];i;i=nxt[i]){
        if(val[i]==t) return true;
    }
    add(t%MAXS,t);	//相当于在表[t%MAXS]中添加了值为t的元素。
    return false;
}
```

这个实现方式可能比较迷惑，这里稍微说明一下。这是有向边，从表头发射的边的边权才是对应的数字，因此这条边指向谁都无所谓。（甚至可以让它们都指向同一个点）。所以我们可以直接把这些边**指向的点**都砍掉而只保留边权。

~~当然你直接用map代替哈希表当我没说~~

### 读入的细节

众所周知，因为$\text{Windows,Linux}$的差别，生成出来的数据是不一样的。（$\text{Linux}$的数据换行时会多添加一个`'/r'`）。所以往往$\text{getline,scanf,cin,fread}$等众多输入方法不得不面对这个问题。这里给出的解决方法是手写一个$\text{getline}$。（不过由于这题的特殊性质，每行只有一个字符串，所以可以大胆使用$\text{cin,scanf}$）。

**但是要注意的是读入字符串的长度问题**（可能长度会因为`'\r'`而+1之类）。所以建议手写一个读入吧。

```cpp
int readl(char *s){	//读入整行
    int l=0; char c;
    while((c=getchar())=='\r'||c=='\n'); s[++l]=c;
    while((c=getchar())!='\r'&&c!='\n')  s[++l]=c;
    return l;
}
void read(int &l,ULL &ret){	//从字符串S的第l位置读入，并将结果以哈希的形式并入ret
    char c; while((c=S[++l])!='/') ret=ret*seed+c;
}
```

### 拼接起所有的部分

对于每一次输入，我们先读入整段。然后分段进行哈希，检查哈希值是否出现过。要注意的是，'/'字符也需要并入地址中。

```cpp
n=qread(); for(int i=1;i<=n;i++){
        ULL nw=0;int p=1,l=readl(S);S[l+1]='/'; while(p<=l){
        read(p,nw); if(!gethsh(nw)) ++ans;
        nw=nw*seed+19260817;
    }
    printf("%d\n",ans);
}

```
### 该题的数据缺陷

为什么我要手写一个全行读入？因为第六个测试点结尾出现了`'/'`。原计划是边读边计算，读到`'\n'`就判断该次询问结束，`'\r'`就判断该次询问继续。然后炸惹$\text{qaq}$。

[给管理员看的帖子，内含第六个测试点的保证不会出错的数据生成器，请尽快修复第六个点](https://www.luogu.com.cn/discuss/show/192333)

[第⑥个点挂掉惹QAQ](https://www.luogu.com.cn/record/30792858)

---

## 参考程序

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
const ULL seed=13331;
const int MAXL =100+3;char S[MAXL];
int readl(char *s){			//全行读入
    int l=0; char c;
    while((c=getchar())=='\r'||c=='\n'); s[++l]=c;
    while((c=getchar())!='\r'&&c!='\n')  s[++l]=c;
    return l;
}
void read(int &l,ULL &ret){	//从字符串内读入
    char c; while((c=S[++l])!='/') ret=ret*seed+c;
}
const int MAXS=1e6+3;
int head[MAXS],ver[MAXS],nxt[MAXS],tot;
ULL val[MAXS]; int cnt[MAXS];
void add(int u,int v,ULL w){
    ver[++tot]=v,nxt[tot]=head[u],val[tot]=w,head[u]=tot;
}
char *c; int n,ans;
bool gethsh(ULL t){		//查询
    for(int i=head[t%MAXS];i;i=nxt[i]){
        if(val[i]==t) return true;
    }
    add(t%MAXS,++cnt[t%MAXS],t); return false;
}
int main(){
    n=qread(); up(1,n,i){
        ULL nw=0;int p=1,l=readl(S);S[l+1]='/'; while(p<=l){
            read(p,nw); if(!gethsh(nw)) ++ans;
            nw=nw*seed+19260817;
        }
        printf("%d\n",ans);
    }
    return 0;
}
//不要吐槽我为什么不用string，因为我觉得string下标从零开始等迷惑特性很难受
```
