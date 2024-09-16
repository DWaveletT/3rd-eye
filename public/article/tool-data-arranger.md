---
create_time: 1657336503
update_time: 1657336503
title: 数据整理机
board: 1
tag:
- 2
---

## 简介

洛谷大量充斥着格式不规范的数据。所以我写了个简单的处理数据格式的程序。在本地运行，支持简单的模式匹配。

### 使用方法

首先编译源代码，生成可执行文件（比如名为 $\verb!arranger!$）。然后以如下方式运行：

- $\verb!./arranger 模式串1 模式串2 ...!$

例如，

- $\verb!./arranger a.in b.in c.in s.out!$
- $\verb!./arranger "a[1-10].[in|out]"!$
- $\verb!./arranger "[|pre].others.[|suf]"!$

模式匹配在下文会有叙述。

**注意**：这里面尽管内置了格式检查，但是不保证所有错误都能检查出来。

### 数据整理

这个程序主要会对每个被匹配上的文件做以下操作：

- 去除行末空格。
- 去除文末多余换行（使得文末有且仅有一个换行符）。
- $\verb!CRLF!\to \verb!LF!$，也就是将 $\verb!\r\n!$ 全部转换为 $\verb!\n!$。

### 模式匹配

因为笔者太菜，不会实现正则表达式，所以就实现了一个简单的模式匹配功能（应该够用了）。这个模式匹配主要由方括号 $\verb![]!$ 实现。

- 方括号里的竖线会将方括号内部划分为若干块，起到**或**的作用。例如 $\verb![apple|114514|qwaszx|]!$ 会匹配所有 $\verb!apple!$、$\verb!114514!$、$\verb!qwaszx!$，**特别地**，在这个例子里会匹配上空串（因为最后一段没有内容）。又如 $\verb![a1|a2|a3]!$ 会匹配 $\verb!a1!$、$\verb!a2!$、$\verb!a3!$。
- 对于方括号内的每一块，都有两种匹配方式：
  - 第一种，全文匹配。例如 $\verb![bad|apple]!$ 会匹配 $\verb!bad!$ 和 $\verb!apple!$。
  - 第二种，数字填充。例如 $\verb![1-10]!$ 会匹配所有的 $\verb!1!,\verb!2!,\cdots \verb!10!$。但是要注意的是，这里面仅能出现一个短横线，不能有多余空格，并且短横线两端必须是 $\text{int}$ 类型整数（暂不支持负数。真的会有人用负数吗？）不然可能会发生未知错误。此外代码实现中是从左边的数开始一直枚举到右边的数，因此如果左侧的数字大于右侧的数字，那么这一块不能匹配上任何东西（也不会匹配空串）。
- 值得注意的是，竖线与两种匹配方式是可以嵌套的。例如 $\verb![apple|1-10]!$ 将会匹配 $\verb!apple!$、$\verb!1!$、$\verb!2!$……不过方括号不能嵌套（显然）

此外你可以在方括号、短横线、竖线前面加上反斜杠 $\verb!\!$ 用来转义。此时该符号将会被当作普通文本字符处理。反斜杠的转义写法为 $\verb!\\!$。

### 模式匹配

目前支持四个可选参数：

- $\verb!-s!$：不删除行末多余空格。
- $\verb!-e!$：保留文末换行原样，不会增加/删除文末换行。
- $\verb!-w!$：使用 $\verb!CRLF!$ 结尾，即 $\verb!\r\n!$。
- $\verb!-t!$：保留原始文件。转换后的文件名字末尾会加上后缀 $\verb!.tmp!$。

当然你也可以选择其中任意一些参数同时使用。例如，$\verb!./arrange a[1-3].in -s -e!$，此时仅仅只会将 $\verb!\r\n!$ 全部转换为 $\verb!\n!$。

## 源码

```cpp
#include<bits/stdc++.h>
using namespace std;
const int MAXN =1e5+3;
char S[MAXN], T[MAXN];
bool flag1, flag2, flag3, flag4;
void order(char * filename){
    FILE *rd, *tp; char c;
    if((rd = fopen(filename, "rb")) == NULL) return;
    fprintf(stderr, "Now pocessing [%s]\n", filename);
    tp = fopen("tmpfile", "wb");
    int cnt_space = 0, cnt_enter = 0;
    while((c = fgetc(rd)) != EOF){
        if(c == ' ' && !flag1) ++ cnt_space;                else 
        if(c == '\n'         ) ++ cnt_enter, cnt_space = 0; else
        if(c == '\r') continue; else{
            for(int i = 0;i < cnt_enter; ++ i)
                {if(flag3) fputc('\r', tp); fputc('\n', tp);}
            for(int i = 0;i < cnt_space; ++ i)
                fputc(' ' , tp);
            fputc(c, tp);
            cnt_space = cnt_enter = 0;
        }
    }
    if(!flag2) {if(flag3) fputc('\r', tp); fputc('\n', tp);}
    else {
        for(int i = 0;i < cnt_enter; ++ i)
            {if(flag3) fputc('\r', tp); fputc('\n', tp);}
    }
    fclose(tp), fclose(rd);
    tp = fopen("tmpfile", "rb");
    if(flag4){
        rd = fopen(strcat(filename, ".tmp"), "wb");
    } else rd = fopen(filename, "wb");
    while((c = fgetc(tp)) != EOF){
        fputc(c, rd);
    }
    fclose(tp), fclose(rd);
    remove("tmpfile");
}
void dfs(int steps, int pointer, int tot){
    for(int i = steps;i < tot;++ i){
        if(S[i] == '['){
            int ed = 0, lst = i; int t = pointer;
            for(int j = i;j < tot; ++ j)
                if(S[j] == ']') {ed = j; break;}
            if(ed == 0){
                fprintf(stderr, "Format error when pocessing [%s]\n", S);
                exit(0);
            }
            for(int j = lst;j <= ed; ++ j){
                if(S[j] == '|' || S[j] == ']'){
                    int l = lst, r = j, f = 0;
                    for(int k = l + 1;k < r; ++ k)
                        if(S[k] == '-') ++ f;
                    if(f > 1){
                        fprintf(stderr, "Format error when pocessing [%s]\n", S);
                        exit(0);
                    } else if (f == 1){
                        int a = 0, b = 0, k = l;
                        for(++ k;k < r;++ k){
                            if(isdigit(S[k]))
                                a = a * 10 + S[k] - '0'; else break;
                            }
                        for(++ k;k < r;++ k){
                            if(isdigit(S[k]))
                                b = b * 10 + S[k] - '0'; else break;
                        }
                        for(k = a;k <= b;++ k){
                            int w = k;
                            if(w == 0){
                                T[t ++] = '0';
                            } else {
                                int u = 1000000000;
                                if(w < 0) T[t ++] = '-', w = -w;
                                while(u) if(w >= u){
                                    while(u){
                                        T[t ++] = w / u + '0', w %= u, u /= 10;
                                    }
                                } else u /= 10;
                            }
                            dfs(ed + 1, t, tot);
                            t = pointer;
                        }
                    } else {
                        for(int k = l + 1;k < r; ++ k)
                            if(S[k] != 0) T[t ++] = S[k];
                        dfs(ed + 1, t, tot);
                        t = pointer;
                    }
                    lst = j;
                }
            }
            return;
        } else if(S[i] == 0) continue;
        else T[pointer ++] = S[i];
    }
    T[pointer] = 0;
    for(int i = 0;i < pointer; ++ i){
        if(T[i] == 1) T[i] = '\\';
        if(T[i] == 2) T[i] = '[' ;
        if(T[i] == 3) T[i] = ']' ;
        if(T[i] == 4) T[i] = '|' ;
        if(T[i] == 5) T[i] = '-' ;
    }
    fprintf(stderr, "Match [%s]\n", T);
    order(T);
}
int main(int argc,char *argv[]){
    int n=argc;
    for(int i = 1;i < n;++ i){
        if(argv[i][0] == '-'){
            int l = strlen(argv[i]);
            if(l == 2){
                if(argv[i][1] == 's') flag1 = true;
                if(argv[i][1] == 'e') flag2 = true;
                if(argv[i][1] == 'w') flag3 = true;
                if(argv[i][1] == 't') flag4 = true;
            } else fprintf(stderr, "Unknown argument [%s]\n", argv[i]);
        }
    }
    for(int i = 1;i < n;++ i) if(argv[i][0] != '-'){
        int l = strlen(argv[i]);
        memcpy(S, argv[i], l);
        for(int j = 0;j < l;++ j){
            if(S[j] == '\\'){
                if(S[j + 1] == '\\') S[j + 1] = 1;
                if(S[j + 1] == '[' ) S[j + 1] = 2;
                if(S[j + 1] == ']' ) S[j + 1] = 3;
                if(S[j + 1] == '|' ) S[j + 1] = 4;
                if(S[j + 1] == '-' ) S[j + 1] = 5;
                S[j] = 0; ++j;
            }
        }
        dfs(0, 0, l);
    }
    return 0;
}
```

## 更新记录

- $\text{2022.7.9}$：修了模式匹配的时候转义字符出现的小问题。
