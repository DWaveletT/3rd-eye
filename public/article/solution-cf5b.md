---
create_time: 1586665979
update_time: 1586665979
title: 题解 CF5B 【Center Alignment】
board: 1
tag:
- 1
extension:
  problem:
    id: CF5B
    type: CF
    title: Center Alignment
    difficulty: 2.8333
    submitted: false
    accepted: false
---

## 题目大意

给出一个文本，要求居中，并用星号围起来。若无法准确居中，则第一次向左偏，第二次向右偏……依次类推。**可能有空行**。

## 题解

楼上大多用了较为繁琐的直接模拟，这里就介绍两个函数 $\tt memset$ 和 $\tt memcpy$ 吧。

### $\tt memset$ 函数

**函数原型**：$\verb!void* memset(void* dest,int ch,std::size_t count);!$

它的含义是，从位置 $\tt dest$ 开始，向后 $\tt count$ 位全部填充 $\tt ch$ 字符。虽然大多数人将其用作数组清空、赋值一个很大的数，但他的本来的用途的确是填充字符。举个例子：

假设有字符数组 $S$，下标从 $0$ 开始，

$$
S=\texttt{\{a b c d d d a s e f g a\}}
$$

我们现在需要从第 $3$ 位向后填充 $5$ 个$\tt e$，那么只需要执行 $\verb!memset(S+3,'e',5);!$ 即可。最终的结果为：

$$
S=\texttt{\{a b c e e e e e e f g a\}}
$$

用 $\tt memset$ 函数的好处是，填充第一行和最后一行的星号十分方便，并且中间内容初始化上空格也十分方便。

### $\tt memcpy$ 函数

**函数原型**：$\verb!void* memcpy(void* dest,const void* src, std::size_t count);!$

它的含义是，从位置 $\tt dest$ 开始，向后 $\tt count$ 位按位填充 $\tt src$ 的对应字符。同样地，我们举一个例子：

$$
\begin{aligned}S&=\texttt{\{a b c d d d a s h f g a\}}\cr T&=\texttt{\{a p p l e\}}\end{aligned}
$$

此时我们希望从 $S$ 的第 $4$ 位，填充从 $T$ 的第 $0$ 位开始的 $4$ 个字符 $\tt appl$，也就是 $\verb!memcpy(S+4,T+0,4);!$ 执行后的结果为：

$$
S=\texttt{\{a b c d a p p l h f g a\}}
$$

这个函数可以很方便地帮助我们向结果串里复制文本串。

### 读入整行

由于本题会出现空行，于是我们以 $\verb!`\n'!$ 作为分割线，每次读入整行，直到遇到 $\tt EOF$（即文件末尾，$\text{End Of File}$）。从中遇到的合法字符都读入到字符串内。同时，我们统计总行数 $n$，以及最长的字符串长度 $m$。

### 居中操作

这是本题比较重要的一个操作。具体而言，我们现在需要填充第 $i$ 个字符串 $S$，那么我们就需要找到这个字符串的开头应该填在哪里。记 $l$ 为 $S$ 的长度，那么当 $m-l\equiv 0\pmod 2$ 时，说明恰好可以填充，字符串第一位应该在 $1+\left\lfloor\frac{m}{2}\right\rfloor-\left\lfloor\frac{l}{2}\right\rfloor$。否则，如果无法恰好填充，那么就需要进行微调。记录一个布尔变量$d$，表示当前应该向左缩进还是向右缩进。特别要注意下取整等问题。

最后的代码其实非常简短。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;

typedef long long LL;
const int INF =2147483647;
bool flg=true;
int readln(char *s){
    int len=0,c; while((c=getchar())!=10&&c!=EOF)
    if(c!=13) s[len++]=c; if(c==EOF) flg=false;
    return len;
}
const int MAXN =1000+2+3;
int L[MAXN],n,m;
char S[MAXN][MAXN],T[MAXN][MAXN]; bool d;
int main(){
    while(flg) ++n,L[n]=readln(S[n]),m=max(m,L[n]); --n;
    memset(T[0],'*',m+2),memset(T[n+1],'*',m+2); 
    up(1,n,i){
        memset(T[i]+1,' ',m),T[i][0]=T[i][m+1]='*';
        int ps=1+m/2-(L[i])/2; if((m-L[i])&1){
            if(m&1) ps+=d,d=!d; else d=!d,ps-=d;
        }
        memcpy(T[i]+ps,S[i],L[i]);
    }
    up(0,n+1,i) printf("%s\n",T[i]); puts("");
    return 0;
}
