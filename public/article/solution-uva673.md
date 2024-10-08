---
create_time: 1584411374
update_time: 1584411374
title: 【题解】【UVA673 平衡的括号 Parentheses Balance】
board: 1
tag:
- 1
extension:
  problem:
    id: UVA673
    type: UVA
    title: 平衡的括号 Parentheses Balance
    difficulty: 3
    submitted: true
    accepted: true
---

## 题意简述

多组数据。每行数据输入一个由方括号与圆括号组成的字符串，**可以为空**，判断括号是否匹配。

## 题解

非常经典的栈的匹配问题。这里举$\colorbox{#f0f0f0}{( ( ) [ ] )}$例子。

$\quad 0.$为了防止栈空导致$\rm RE$，我们先放入一个“哨兵”。

$$
\large\boxed{\vphantom{|}\#}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}
$$

$\quad 1.$首先，我们读入了一个$\colorbox{#f0f0f0}{(}$。

$$
\large\boxed{\vphantom{|}\#}\boxed{\vphantom{|}(\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}
$$

$\quad 2.$然后，我们读入了一个$\colorbox{#f0f0f0}{(}$。此时，栈中有两个括号。

$$
\large\boxed{\vphantom{|}\#}\boxed{\vphantom{|}(\kern{5pt}}\boxed{\vphantom{|}(\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}
$$

$\quad 3.$接着，我们读到了一个$\colorbox{#f0f0f0}{)}$。发现栈顶有一个$\colorbox{#f0f0f0}{(}$，于是取出栈顶。

$$
\large\boxed{\vphantom{|}\#}\boxed{\vphantom{|}(\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}
$$

$\quad 4.$重复这个操作。

$$
\large\boxed{\vphantom{|}\#}\boxed{\vphantom{|}(\kern{5pt}}\boxed{\vphantom{|}[\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}
$$

$$
\large\boxed{\vphantom{|}\#}\boxed{\vphantom{|}(\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}
$$

$$
\large\boxed{\vphantom{|}\#}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}\boxed{\vphantom{|}\textcolor{white}{(}\kern{5pt}}
$$

$\quad 7.$全部读入完毕，我们发现栈里没有括号了（即栈顶为`#`）。判断正确。

如果栈顶不匹配，或者结束后栈顶不为`#`，那么就说明括号序列不正确，此时输出$\rm NO$即可。

---

然后有个小坑，就是字符串的读入。我们需要直接读入整行。

```cpp
int readln(char *s){
    int len=0,c;
    while((c=getchar())!=10&&c!=13&&c!=EOF)
    s[len++]=c;  s[len]=0; return len;
}
```

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
char S[128+3];
int readln(char *s){
    int len=0,c;
    while((c=getchar())!=10&&c!=13&&c!=EOF)
    s[len++]=c;  s[len]=0; return len;
}
int main(){
    int n=qread(); up(1,n,i){
        stack<char> s; s.push('#'); bool flg=true;
        int l=readln(S); up(0,l-1,i){
            if(S[i]==')') if(s.top()!='(') flg=false; else s.pop();
            if(S[i]==']') if(s.top()!='[') flg=false; else s.pop();
            if(S[i]=='('||S[i]=='[') s.push(S[i]);
        }
        if(s.top()!='#'||!flg) puts("No"); else puts("Yes");
    }
    return 0;
}

```
