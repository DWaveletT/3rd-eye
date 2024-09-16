---
create_time: 1724730682
update_time: 1724730682
title: 题解 P10985 【[蓝桥杯 2023 国 Python A] 整数变换】
board: 1
tag:
- 1
extension:
  problem:
    id: P10985
    type: P
    title: '[蓝桥杯 2023 国 Python A] 整数变换'
    difficulty: 2
    submitted: true
    accepted: true
---

轻松拿下最优解。

## 题意

设 $S(x)$ 表示 $x$ 在十进制下数位之和。给定正整数 $n$，每次令 $n\gets n-S(n)$，问多少步之后 $n$ 变成 $0$。

数据范围：$1\le n\le 10^9$。

## 题解

存在复杂度 $\mathcal O(\sqrt n\log n)$ 的做法。

考虑将 $n$ 分成两个部分，$n=h\times 10^B + l$，下面代码里取了 $B=4$。注意到因为每次减去的 $S(n)$ 是一个很小的值，所以大多数时候 $h$ 保持不变，$l$ 减小，只有当 $l< S(n)$ 时才会引起 $h$ 减一。

于是我们预处理 $S(h)=i,l=j$ 时，需要多少步才能把 $n$ 减到 $l$ 从 $h$ 借位，记为 $f_{i,j}$。容易得到递推方程：

$$
f_{i,j} = \begin{cases}
f_{i,j-S(n)}+1 & j\ge S(n) \\
1 & j< S(n) \\
\end{cases}
$$

同样地，我们还要记录最后一步减法之后，$l$ 从 $h$ 借位，留下的数字是多少。设为 $g_{i, j}$。因为转移方程和 $f$ 基本一样，这里就不放了，留作读者思考。

接着只要从大到小枚举 $h$，然后利用 $g$ 数组维护 $l$，利用 $f$ 数组统计答案，就做完了。

因为 $S(n)=\mathcal O(\log n)$，所以 $i$ 只用开到 $\mathcal O(\log n)$ 级别。于是总复杂度为 $\mathcal O(\sqrt n \log n)$。

## 参考代码

```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 1e4 + 3;
const int MAXW = 1e5 + 3;
const int MAXM = 100 + 3;

int H[MAXM][MAXN][2];
int W[MAXW];

int main(){
    int n;
    cin >> n;
    int h = n / 10000;
    int l = n % 10000;

    for(int i = 1;i <= 100000;++ i){
        W[i] = W[i / 10] + i % 10;
    }

    for(int i = 0;i <= 100;++ i){
        for(int j = 0;j <= 9999;++ j){
            int t = i + W[j];

            if(t > j){
                H[i][j][0] = 1;
                H[i][j][1] = j - t + 10000;
            } else {
                H[i][j][0] = H[i][j - t][0] + 1;
                H[i][j][1] = H[i][j - t][1];
            }
        }
    }

    int ans = 0;
    for(int i = h;i >= 0;-- i){
        ans += H[W[i]][l][0];
        l    = H[W[i]][l][1];
    }
    cout << ans - 1 << endl;
    
    return 0;
}
