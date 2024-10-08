---
create_time: 1669510865
update_time: 1669510865
title: '题解 P8872 【[传智杯 #5 初赛] D-莲子的物理热力学】'
board: 1
tag:
- 1
extension:
  problem:
    id: P8872
    type: P
    title: '[传智杯 #5 初赛] D-莲子的物理热力学'
    difficulty: 5
    submitted: true
    accepted: true
---
### 题解

贪心题。

假设 $m$ 次操作后，剩下来的数字的值域为 $[l,r]$。那么原来 $a$ 数列里，所有**严格小于** $l$ 的数字肯定都被操作了，同时所有**严格大于** $r$ 的数字肯定也被操作了。

设 $a$ 里面一共有 $u$ 个数严格小于 $l$；有 $v$ 个数严格大于 $r$。

**断言**：所需要的操作次数至少为 $u+v+\min(u,v)$，并且可以取到。

**证明**：如果一个位置在操作后，它的值还在 $[l,r]$ 之外，那么后面某个时候肯定还要把它进行操作。容易发现，至少前 $\min(u,v)$ 次操作肯定都无法让结果变到 $[l,r]$ 内。因此执行完这至少 $\min(u,v)$ 次操作后肯定还要再把这 $u+v$ 个数都操作一遍，这是容易做到的（通过 $\min(u,v)$ 次操作，你总能把此时值域的下界提升到 $l$ 或者把上界降低到 $r$）。所以最优决策肯定不会小于 $u+v+\min(u,v)$ 次。

那么这题怎么做呢？

直接将 $a$ 数组从小到大排序。考虑枚举 $l=a_i$，计算出最小的 $r=a_j$，一定有 $(i-1)+(n-j)+\min(i-1,n-j)\le m$。容易发现随着 $i$ 的增大，$j$ 肯定是单调不减的。因此首先预处理 $j=1$，接着随着 $i$ 的增大找到可以满足条件的最小的 $j$。显然当 $i> \min(n,m+1)$ 时就不存在这样的 $j$ 了。

时间复杂度为 $\mathcal O(n\log n)$，瓶颈在于排序。


### 参考代码

版本 $1$：

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
int qread(){
    int w=1,c,ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
const int MAXN = 1e5 + 3;
int A[MAXN], ans = INF;
int main(){
    int n = qread(), m = qread();
    up(1, n, i) A[i] = qread();
    sort(A + 1, A + 1 + n);
    int j = 1;
    up(1, min(n, m + 1), i){
        j = max(i, j);
        while((i - 1) + (n - j) + min(i - 1, n - j) > m) ++ j;
        ans = min(ans, A[j] - A[i]);
    }
    printf("%d\n", ans);
    return 0;
}
```

版本 $2$：

```java
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    
    public static int[] a = new int[100005];

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt(), m = scanner.nextInt();
        for (int i = 1; i <= n; ++i)
            a[i] = scanner.nextInt();
        Arrays.sort(a, 1, n + 1);
        int j = 1, ans = Integer.MAX_VALUE;
        for (int i = 1; i <= Math.min(n, m + 1); ++i) {
            j = Math.max(j, i);
            while((i - 1) + (n - j) + Math.min(i - 1, n - j) > m) 
                ++j;
            ans = Math.min(ans, a[j] - a[i]);
        }
        System.out.println(ans);
    }
}
