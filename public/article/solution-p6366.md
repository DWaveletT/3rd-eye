---
create_time: 1586703306
update_time: 1586703306
title: 题解 P6366 【特殊的翻转】
board: 1
tag:
- 1
extension:
  problem:
    id: P6366
    type: P
    title: '[传智杯 #2 初赛] 特殊的翻转'
    difficulty: 6
    submitted: false
    accepted: false
---
## 题目大意

给出一个 $16$ 进制串，要求转换为一个 $01$ 串并去掉前导零。现在可以用翻转操作，每次能翻转一个数字和它旁边的两个数字。询问最少需要翻转多少次才能使这个 $01$ 串变成 $0$。

## 题解

将原串转换为 $01$ 串，首先需要将读入的每个十六进制字符转换成对应数字。也就是说，

$$
F(c)=\begin{cases}c-\texttt{'0'} & (c\in\tt\{'1','2',\cdots '9'\})\cr c-\texttt{'A'}+10 & (c\in\tt\{'A','B',\cdots,'F'\})\end{cases}
$$

然后只要分别对这个数字的二进制位进行判断即可完成转换。

下面就是对$01$串进行翻转。有一个比较显然的结论是，**一个字符最多反转 $\bf 1$ 次**。不然，如果翻转两次，相当于没有翻转。

考虑下面这个例子：

$$
\texttt{\{0,1,0,1,1,0,1\}}
$$

假设我们第一步翻转第一个字符。

$$
\texttt{\{1,0,0,1,1,0,1\}}
$$

这时，考虑第二个字符。我们发现，它**不得不**翻转。因为如果不反转，那么第一个字符就**无法**变为 $0$。

$$
\texttt{\{0,1,1,1,1,0,1\}}
$$

此时考虑第三个字符。同理，我们发现，我们**不得不**翻转它。

$$
\texttt{\{0,0,0,0,1,0,1\}}
$$

这时候，我们考虑第四个字符。我们却发现，我们**不能**翻转它。因为，一旦翻转，那么第三个字符就会变成 $1$，那么就无法挽回。同样地，第五个字符也无法翻转，它受到第 $4$ 个字符的制约。

我们按照上述方法处理第六个字符，发现最终变成了：

$$
\texttt{\{0,0,0,0,0,1,0\}}
$$

很不幸的是，无论我们是否翻转第七个字符，都无法使整个字符串变为 $0$。

从上述例子，我们发现，只要决定了第一个字符是否翻转，那么后面**每一个**字符是否翻转都已经确定了。于是，只需要枚举第一个字符的两种情况即可。

具体做法是，复制一遍处理后的字符串，然后翻转它的第一个字符，进行一遍模拟；同时，将不翻转第一个字符的原字符串按照同样操作模拟即可。最后答案取两种方案的最小值。如果不存在合法方案，输出 $\tt No$。

另外，其实这条题目可以在常数大小的空间开销内解决，也就是每读入一个字符，就进行相应操作。但由于本题空间限制比较大，因此没有必要。读者可以留作思考。~~其实是我懒~~。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;
const int INF =2147483647;
const int MAXN =1e6+3;
bool S[MAXN*4],T[MAXN*4]; int p,q,ans,t;
int calc(bool *s,int p){
    int ret=0;
    up(p+2,q+1,i){
        if(s[i-2]) s[i-2]^=1,s[i-1]^=1,s[i]^=1,++ret;
    }
    if(s[q]) return INF/2; return ret;
}
int main(){
    char c;
    while((c=getchar())!='\n'&&c!='\r'){
        if(c>='A'&&c<='F') t=c-'A'+10; else t=c-'0';
        S[q++]=t&8,S[q++]=t&4,S[q++]=t&2,S[q++]=t&1;
    }
    for(p=0;!S[p];++p); --q; memcpy(T,S,sizeof(S));
    ans=calc(S,p),T[p]^=1,T[p+1]^=1,ans=min(ans,calc(T,p)+1);
    if(ans>=INF/2) puts("No"); else printf("%d\n",ans);
    return 0;
}
```

