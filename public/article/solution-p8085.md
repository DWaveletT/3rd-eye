---
create_time: 1675160183
update_time: 1675160183
title: 题解 【P8085 [COCI2011-2012#4] KRIPTOGRAM】
board: 1
tag:
- 1
extension:
  problem:
    id: P8085
    type: P
    title: '[COCI2011-2012#4] KRIPTOGRAM'
    difficulty: 8
    submitted: true
    accepted: true
---
## 题解

考虑使用哈希。

我们记明文中第 $i$ 个单词到上一个单词的距离是 $a_i$，密文中第 $i$ 个单词到上一个单词的距离是 $b_i$。特别地，如果前面没有出现过相同单词，则将距离记作 $-1$。例如，对于样例 $3$，明文和密文分别可以转化为如下形式：

- 明文转换前：$[\mathtt{a, b, c, x, c, z, z, a, b, c}]$；
- 明文转换后：$[-1,-1,\underline{-1,-1,2,-1,1,7},7,7]$；
- 密文转换前：$[\mathtt{prvi, dr, prvi, tr, tr, x}]$；
- 密文转换后：$[-1,-1,2,-1,1,-1]$。

如果明文当中某个子串等于密文，那么这个子串生成的序列应该是和密文序列相同的。不过我们不能直接对明文生成的序列进行区间哈希。因为明文当中某些单词的上一个单词的位置在区间之外，转换后有值，而密文里对应位置是 $-1$。

解决起来其实非常简单：只需要在滑动窗口的时候维护这个子串的哈希值即可。当窗口滑过某个单词，就把这个单词右侧第一次出现的与它相同的单词对应的元素变成 $-1$。仍然拿样例 $3$ 举例，

- 第一个子串：$[\underline{-1,-1,-1,-1,2,-1},1,7,7,7]$；
- 第二个子串：$[-1,\underline{-1,-1,-1,2,-1,1},\textcolor{red}{-1},7,7]$，第一个单词 $\verb!a!$ 已经移出窗口，于是将它右侧第一个 $\verb!a!$ 的位置换成 $-1$；
- 第三个子串：$[-1,-1,\underline{-1,-1,2,-1,1,-1},\textcolor{red}{-1},7]$；第二个单词 $\verb!b!$ 已经移出窗口，于是将它右侧第一个 $\verb!b!$ 的位置换成 $-1$；
- 第四个子串：$[-1,-1,-1,\underline{-1,\textcolor{red}{-1},-1,1,-1,-1},7]$；第三个单词 $\verb!b!$ 已经移出窗口，于是将它右侧第一个 $\verb!c!$ 的位置换成 $-1$；
- 第五个子串：$[-1,-1,-1,-1,\underline{-1,-1,1,-1,-1,7}]$。

维护的时候，如果需要变成 $-1$ 的那个元素的位置在当前子串所处的区间 $[l,r]$ 内，就将子串的哈希值 $h$ 减去原来这个元素的贡献值，再加上变成 $-1$ 后的贡献值。如果在 $[l,r]$ 外就不用管。别的维护和一般的区间哈希相似。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 1e6 + 3;
int L1[MAXN], R1[MAXN];
int L2[MAXN], R2[MAXN];
int A[MAXN], B[MAXN], n, m;
typedef unsigned int       u32;
typedef unsigned long long u64;
const u64 BAS = 13331;
u64 H[MAXN], P[MAXN];
map <string, int> M;
int main(){
    string t;
    while(cin >> t && t != "$"){
        R1[M[t]] = ++ n, L1[n] = M[t], M[t] = n;
    }
    M.clear();
    while(cin >> t && t != "$"){
        R2[M[t]] = ++ m, L2[m] = M[t], M[t] = m;
    }
    for(int i = 1;i <= n;++ i) if(!R1[i]) R1[i] = INF;
    for(int i = 1;i <= m;++ i) if(!R2[i]) R2[i] = INF;
    for(int i = 1;i <= n;++ i) A[i] = L1[i] ? i - L1[i] : -1;
    for(int i = 1;i <= m;++ i) B[i] = L2[i] ? i - L2[i] : -1;
    u64 h0 = 0, h = 0; P[0] = 1;
    for(int i = 1;i <= m;++ i) P[i] = P[i - 1] * BAS;
    for(int i = 1;i <= m;++ i)
        h0 = h0 * BAS + B[i], h  = h  * BAS + A[i];
    if(h == h0) printf("%d\n", 1), exit(0);
    for(int i = m + 1;i <= n;++ i){
        h = h * BAS + A[i], h = h - A[i - m] * P[m];
        if(R1[i - m] <= i){
            h = h - A[R1[i - m]] * P[i - R1[i - m]];
            A[R1[i - m]] = -1;
            h = h + A[R1[i - m]] * P[i - R1[i - m]];
        } else if(R1[i - m] <= n) A[R1[i - m]] = -1;
        if(h == h0) printf("%d\n", i - m + 1), exit(0);
    }
    return 0;
}
