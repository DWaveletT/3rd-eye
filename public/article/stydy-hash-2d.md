---
create_time: 1691327188
update_time: 1691327188
title: 【备忘】二维字符串哈希
board: 1
tag:
- 2
---

### 数字哈希

对于一个整数 $x$，定义其哈希函数：

$$
\mathrm{getHash}(x)=x\bmod P
$$

如果 $x$ 在某个较大的区间 $[0,x_{\max}]$ 里面均匀生成，那么 $\mathrm{getHash}(x)$ 的值应该是以几乎相等的概率取得 $0,1,2,\cdots,P-1$ 里的某个值的。对于值相同的 $x$ 和 $y$，一定有 $\mathrm{getHash}(x)=\mathrm{getHash}(y)$；对于值不相同的 $x,y$，若其均匀随机地取得，那么它们哈希值相同的概率应该只有 $\dfrac{1}{P}$。这个是哈希函数的基础。

### 一维字符串哈希

对于一个字符串 $s$，可以将其看作 $256$ 进制的每个数码是 ASCII 值的数字。看作数字之后当然是可以做数字哈希的。

对于一个长数字 $\overline{d_1d_2d_3\cdots d_{n-1}d_n}$，设其进制为 $B$，那我们总是可以先计算出 $\mathrm{getHash}(\overline{d_1d_2d_3\cdots d_{n-1}})$ 的值 $h$，然后将 $h$ 乘上 $B$ 加上 $d_n$ 再对 $D$ 取模。

即，设 $h_m=\mathrm{getHash}(\overline{d_1d_2d_3\cdots d_{m}})$，那么就有 $h_{m+1}=(Bh_m+d_{m+1})\bmod P$。特别地，定义 $h_0=0$。把这里的 $h$ 称作前缀哈希数组，那么根据递推式就能 $\mathcal O(n)$ 计算 $h_1,h_2,\cdots,h_n$ 的值。

然后发现：

$$
\overline{d_1d_2d_3\cdots d_{l-1}d_ld_{l+1}\cdots d_{r-1}d_r}=\overline{d_1d_2d_3\cdots d_{r}}-\overline{d_1d_2d_3\cdots d_{l-1}}\times B^{r-l+1}
$$

那么对等式两边同时对 $P$ 取模，结果肯定也是相等的。所以就可以得到针对一维字符串哈希的结论，

$$
\mathrm{getHash}(\overline{d_ld_{l+1}d_{l+2}\cdots d_{r-1}d_r})=(h_r-h_{l-1}\times B^{r-l+1})\bmod P
$$

因为字符串本质就是大数字，所以，

$$
\mathrm{getHash}({s_ls_{l+1}s_{l+2}\cdots s_{r-1}s_r})=(h_r-h_{l-1}\times B^{r-l+1})\bmod P
$$

另外这个 $B$ 值是可以自己随便取的，甚至比 $256$ 小也没啥事情。通常来说，只要取得不是非常小，都不会有太大问题……

### 二维字符串哈希

现在有一个字符矩阵 $c$，如图所示：

![](https://cdn.luogu.com.cn/upload/image_hosting/ikent3p6.png)

然后现在要每次查询一个小矩阵的哈希值。咋做呢？

_你先别急！_

先想着把这东西转化成我们熟悉的一维字符串哈希。也就是说，先把矩阵按照行划分成很多个不同的字符串。就像下面这个样子：

![](https://cdn.luogu.com.cn/upload/image_hosting/0w8l3zkd.png)

那么这个子矩阵应该和好几个字符串都有交。于是对于每一个字符串都应该会有一个哈希值。比如上图所示，与字符串 $S_2,S_3,S_4,S_5,S_6$ 都有交，所以就会产生这样 $5$ 个哈希值。

如果我们对第 $i$ 个字符串生成前缀哈希序列记为 $h_{i,j}$，那么这个时候我们应该对这 $5$ 个字符串分别计算了一下 $h_{i,r}-h_{i,l-1}\times B^{r-l+1}\bmod P$。

对于哈希值序列，我们怎么做哈希？因为哈希值序列本质上也是序列，所以对于序列，直接应用字符串哈希的规则即可！

也就是直接把 $H_2,H_3,\cdots,H_6$ 看作一个 $D$ 进制大整数 $\overline{H_2H_3\cdots H_6}$，然后计算 $\mathrm{getHash}'(\overline{H_2H_3\cdots H_6})$ 的结果就比较显然了。这个 $D$，也是你随便想取什么数字就行；但是模数还是用 $P$，不然不太方便用同余系的性质来化简。

但我们显然是不能枚举「子矩阵行数」这么多个字符串哈希，然后再跑一下裸的哈希的。因为我们知道，$H_i=h_{i,r}-h_{i,l-1}\times B^{r-l+1}\bmod P$，所以不妨直接把这个式子丢到 $\mathrm{getHash}'$ 的计算式子里（what？）反正就是，经过一些感性理解，应该能察觉到，

$$
\begin{aligned}\mathrm{getHash}'(\overline{H_dH_{d+1}\cdots H_u})&=\mathrm{getHash}'(\overline{h_{d,r}h_{d+1,r}\cdots h_{u,r}})\\&-\mathrm{getHash}'(\overline{h_{d,l-1}h_{d+1,l-1}\cdots h_{u,l-1}})\times B^{r-l+1} \bmod P\end{aligned}
$$

然后就注意到，我们完全可以对于每个 $j$，预处理 $\mathrm{getHash}'(h_{i,j})$ 啊！其中，$i=1,2,\cdots,n$。

我们这样定义 $g_{m,j}=\mathrm{getHash}'(\overline{h_{1,j}h_{2,j}h_{3,j}\cdots h_{m,j}})$，那么就一定有 $g_{m+1,j}=g_{m,j}\times D+h_{m+1,j} \bmod P$。这样预处理之后，就容易计算 $\mathrm{getHash}'(\overline{h_{d,r}h_{d+1,r}\cdots h_{u,r}})$ 和 $\mathrm{getHash}'(\overline{h_{d,l-1}h_{d+1,l-1}\cdots h_{u,l-1}})$ 了。

总结一下我们的流程：

- 分别对于 $i=0,1,2,\cdots,n$，预处理 $h_{i,j}$；
- 分别对于 $j=0,1,2,\cdots,m$，预处理 $g_{i,j}$；
- 现在要查询这样一个字符串子矩阵，它的首列为 $l$，尾列为 $r$，首行为 $d$，尾行为 $u$ 它的哈希值。
  - 先计算 $X=\mathrm{getHash}'(\overline{h_{d,r}h_{d+1,r}\cdots h_{u,r}})=g_{u,r}-g_{d-1,r}\times D^{u-d+1} \bmod P$；
  - 再计算 $Y=\mathrm{getHash}'(\overline{h_{d,l-1}h_{d+1,l-1}\cdots h_{u,l-1}})=g_{u,l-1}-g_{d-1,l-1}\times D^{u-d+1} \bmod P$；
  - 然后得到，$H=\mathrm{getHash}'(\overline{H_dH_{d+1}\cdots H_u})=X-Y\times B^{r-l+1}\bmod P$。

预处理的复杂度是 $\mathcal O(nm)$ 的，单次查询的复杂度是 $\mathcal O(1)$ 的。完结散花！

## 例题（迫真）

其实是模拟赛做到的。

题意是，给定大小为 $n\times m$ 的字符矩阵，满足 $1\le n\times m\le 3\times 10^5$。问其中有多少个子矩阵满足将它旋转 $90\degree$ 后与自身相同。

做法很简单，将读入的矩阵旋转 $90\degree$，两个矩阵分别跑一下二维字符串哈希。因为一个子矩阵旋转 $90\degree$ 与自身相同就说明它一定是正方形的，而所有正方形矩阵的个数是不超过 $nm\min (n,m)$ 个的，所以可以暴力枚举，然后判断旋转前后哈希值是否相同。

- 为了防止被卡，我写了双哈希；
- 结果被卡常了，然后加了迫真优化，就是从大到小枚举子矩阵的边长，如果边长奇偶性相同的比它大一圈的子矩阵符合条件，那这个就不用判了。复杂度没有变化，但是常数大约能变小（应该吧……）
- 结果还是被卡了。索性注释掉双哈希其中一个哈希，反正最多就 $nm\min (n,m)$ 个矩阵！而且比较的对数也是这么多对，所以不用考虑生日悖论的影响。
- 结果果真 WA 了。
- 结果换了个模数，过了。笑嘻了。

## 参考代码


```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(l, r, i) for(int i = l, END##i = r;i >= END##i;-- i)
using namespace std;

using i64 = long long;

int qread(){
    int w = 1, c = 0, r = 0;
    while(!isdigit(c = getchar())) w = c == '-' ? -1 : 1; r = c - '0';
    while( isdigit(c = getchar())) r = r * 10 + c - '0';
    return w * r;
}
const int MAXN = 3e5 + 3;
char *S[MAXN]; int *H1[MAXN], *H2[MAXN];
char *T[MAXN]; int *G1[MAXN], *G2[MAXN];
int P[MAXN], Q[MAXN];
int X[MAXN], Y[MAXN];
const int BASE1 = 13331, BASEx = 19260817, MOD1 = 1e9 + 7;
const int BASE2 = 131  , BASEy = 19491001, MOD2 = 1e9 + 9;
int get_hash(const int i, const int j, const int k, int *H[MAXN], const int *U, const int *V, const int MOD){
    int &h1 =       H[i + k - 1][j + k - 1];
    int h2  = 1ll * H[i + k - 1][j     - 1] * U[k] % MOD;
    int &h3 =       H[i     - 1][j + k - 1];
    int h4  = 1ll * H[i     - 1][j     - 1] * U[k] % MOD;
    int ha = (h1 - h2 + MOD) % MOD;
    int hb = (h3 - h4 + MOD) % MOD;
    int h = (ha - 1ll * hb * V[k] % MOD + MOD) % MOD;
    return h;
}
bool *N[MAXN], *M[MAXN];
int main(){
    int n = qread(), m = qread();
    up(0, n + 3, i){
        S[i]  = new char[m + 3];
        H1[i] = new int [m + 3];
        H2[i] = new int [m + 3];
        N[i]  = new bool[m + 3];
        M[i]  = new bool[m + 3];
    }
    up(0, m + 3, i){
        T[i]  = new char[n + 3];
        G1[i] = new int [n + 3];
        G2[i] = new int [n + 3];
    }
    up(1, n, i){
        scanf("%s", S[i] + 1);
    }
    up(1, n, i) up(1, m, j){
        T[j][n - i + 1] = S[i][j];
        N[i][j] = false;
        M[i][j] = false;
    }
    P[0] = 1;
    Q[0] = 1;
    X[0] = 1;
    Y[0] = 1;
    up(1, max(n, m), i){
        P[i] = 1ll * P[i - 1] * BASE1 % MOD1;
        Q[i] = 1ll * Q[i - 1] * BASE2 % MOD2;
    }
    up(1, max(n, m), i){
        X[i] = 1ll * X[i - 1] * BASEx % MOD1;
        Y[i] = 1ll * Y[i - 1] * BASEy % MOD2;
    }
    up(0, m, i) H1[0][i] = 0;
    up(0, m, i) H2[0][i] = 0;
    up(0, n, i) G1[0][i] = 0;
    up(0, n, i) G2[0][i] = 0;
    up(1, n, i){
        H1[i][0] = 0;
        H2[i][0] = 0;
        up(1, m, j){
            H1[i][j] = (1ll * H1[i][j - 1] * BASE1 + S[i][j]) % MOD1;
            H2[i][j] = (1ll * H2[i][j - 1] * BASE2 + S[i][j]) % MOD2;
        }
        up(1, m, j){
            H1[i][j] = (1ll * H1[i - 1][j] * BASEx + H1[i][j]) % MOD1;
            H2[i][j] = (1ll * H2[i - 1][j] * BASEy + H2[i][j]) % MOD2;
        }
    }
    up(1, m, i){
        G1[i][0] = 0;
        G2[i][0] = 0;
        up(1, n, j){
            G1[i][j] = (1ll * G1[i][j - 1] * BASE1 + T[i][j]) % MOD1;
            G2[i][j] = (1ll * G2[i][j - 1] * BASE2 + T[i][j]) % MOD2;
        }
        up(1, n, j){
            G1[i][j] = (1ll * G1[i - 1][j] * BASEx + G1[i][j]) % MOD1;
            G2[i][j] = (1ll * G2[i - 1][j] * BASEy + G2[i][j]) % MOD2;
        }
    }
    
    int ans = 0;
    dn(min(n, m), 1, k){
        up(1, n - k + 1, i) up(1, m - k + 1, j){
            if(k % 2 == 0){
                if(i >= 2 && j >= 2 && N[i - 1][j - 1]){
                    ++ ans; continue;
                }
            } else {
                if(i >= 2 && j >= 2 && M[i - 1][j - 1]){
                    ++ ans; continue;
                }
            }
            int x = j;
            int y = n - i - k + 2;
            int h1 = get_hash(i, j, k, H1, P, X, MOD1);
            int g1 = get_hash(x, y, k, G1, P, X, MOD1);
            if(h1 != g1)
                continue;
            int h2 = get_hash(i, j, k, H2, Q, Y, MOD2);
            int g2 = get_hash(x, y, k, G2, Q, Y, MOD2);
            if(h2 == g2){
                ++ ans;
                if(k % 2 == 0)
                    N[i][j] = true;
                else
                    M[i][j] = true;
            }
        }
    }
    printf("%d\n", ans);
    return 0;
}
