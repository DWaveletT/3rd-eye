---
create_time: 1721231616
update_time: 1721231616
title: 题解 P2216 【[HAOI2007] 理想的正方形】
board: 1
tag:
- 1
extension:
  problem:
    id: P2216
    type: P
    title: '[HAOI2007] 理想的正方形'
    difficulty: 6
    submitted: true
    accepted: true
---

存在 $\mathcal O(ab)$ 的简单分块做法。

## 题解

为了叙述方便，下文中用 $n,m$ 表示大矩阵的行数与列数，$k$ 表示需要求出的正方形矩阵的边长。并且下标从 $0$ 开始，用 $(i, j)$ 表示第 $i+1$ 行第 $j+1$ 列的元素。

将大矩阵按照边长为 $k$ 分块，位置为 $(i, j)$ 的格子被分在了编号为 $(\lfloor i/k\rfloor, \lfloor j/k\rfloor)$ 的块内。这样做的好处是，每一个查询大小为 $k\times k$ 的子矩阵范围最大值/最小值的询问，要么恰好为某一整块，要么被分成了四个部分，分别是四个块的右下、左下、右上、左上。

计算一个矩阵的二维前缀 $\min/\max$ 是容易的。以计算一个矩阵左上前缀 $\min$ 为例，设 $f_{x,y}$ 表示 $\min_{0\le i\le x,0\le j\le y}\{a_{i,j}\}$，容易有 $f_{x,y} = \min(f_{x-1,y},f_{x,y-1},a_{x,y})$，不过需要特殊处理一下 $(x,y)$ 位置恰好落在边界的情况。

做完一个块的左上/左下/右上/右下的二维前缀 $\min/\max$ 只需要 $\mathcal O(k^2)$ 的复杂度。一共有 $\mathcal O(nm/k^2)$ 块。于是总复杂度为 $\mathcal O(nm)$。

不过因为每个块都要做四次前缀 $\min/\max$，常数还是比较大的，并且代码实现上需要一些技巧，否则可能代码会很长。

## 参考实现

```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 1e3 + 3;
int A[MAXN][MAXN];
int B[MAXN][MAXN];
int C[MAXN][MAXN];
int M[MAXN][MAXN], N[MAXN][MAXN];

int main(){
    int n, m, k;
    cin >> n >> m >> k;

    for(int i = 0;i < n;++ i){
        for(int j = 0;j < m;++ j){
            cin >> A[i][j];
            M[i][j] =  1e9;
            N[i][j] = -1e9;
        }
    }
    for(int i = 0;i <= (n - 1) / k;++ i){
        for(int j = 0;j <= (m - 1) / k;++ j){
            int u = i * k, v = min(n - 1, u + k - 1);
            int l = j * k, r = min(m - 1, l + k - 1);

            vector <tuple<int, int, int, int, int, int> > T = {
                { u, v, l, r, - k + 1, - k + 1 },
                { u, v, r, l, - k + 1, 0 },
                { v, u, l, r, 0, - k + 1 },
                { v, u, r, l, 0, 0 }
            };

            for(auto [l1, r1, l2, r2, d1, d2]: T){
                int t1 = 0, t2 = 0;

                t1 = r1 > l1 ? 1 : -1;
                t2 = r2 > l2 ? 1 : -1;
                for(int a = l1;a != r1 + t1;a += t1){
                    for(int b = l2;b != r2 + t2;b += t2){
                        B[a][b] = C[a][b] = A[a][b];
                        if(a != l1)
                            B[a][b] = min(B[a][b], B[a - t1][b]),
                            C[a][b] = max(C[a][b], C[a - t1][b]);
                        if(b != l2)
                            B[a][b] = min(B[a][b], B[a][b - t2]),
                            C[a][b] = max(C[a][b], C[a][b - t2]);
                        if(a + d1 >= 0 && b + d2 >= 0)
                            M[a + d1][b + d2] = min(M[a + d1][b + d2], B[a][b]),
                            N[a + d1][b + d2] = max(N[a + d1][b + d2], C[a][b]);
                    }
                }
            }
        }
    }

    int ans = 1e9;
    for(int i = 0;i < n - k + 1;++ i){
        for(int j = 0;j < m - k + 1;++ j){
            ans = min(ans, N[i][j] - M[i][j]);
        }
    }
    cout << ans << endl;
    return 0;
}
