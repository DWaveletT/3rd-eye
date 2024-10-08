---
create_time: 1683264316
update_time: 1683264316
title: 题解 AT_agc036_a 【[AGC036A] Triangle】
board: 1
tag:
- 1
extension:
  problem:
    id: AT_agc036_a
    type: AT
    title: '[AGC036A] Triangle'
    difficulty: 5
    submitted: true
    accepted: true
---

## 题解

注意到对于平面上任意一个三角形，对它进行平移和翻转不会改变其面积。于是总是可以将其中一个点移动到原点 $(0, 0)$ 处而不会使其变得不合法。所以先确定 $(x_1,y_1)=(0,0)$。

当一个点为原点时，就很容易算出三角形面积了。可以将其补成矩形再减去多余的部分，也可以直接使用叉积，得出三角形面积的两倍为：

$$
|(x_2-x_1,y_2-y_1)\times (x_3-x_1,y_3-y_1)|=|x_2y_3-y_2x_3|
$$

那么我们要构造 $(x_2,y_2)$ 和 $(x_3,y_3)$ 使得 $x_2y_3-x_3y_2=S$。

注意到 $S\le 10^{18}$ 很大，而我们可以使用的坐标的范围为 $[0,10^9]$。考虑将 $S$ 看作一个 $10^9$ 进制的数，分解成 $S=a\times 10^9+b$，进而凑成 $S=(a+1)\times 10^9 -(10^9-b)$。当 $S<10^{18}$ 时，$0\le a,b<10^9$ 拆出来的四个数 $(x_2,y_2)=(10^9,1)$，$(x_3,y_3)=(10^9-b,a+1)$ 都在 $[0,10^9]$ 内；当 $S=10^{18}$ 时直接取 $x_2=y_3=10^9$，$x_3=y_2=0$ 即可。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int E09 = 1000000000;
const i64 E18 = 1000000000000000000ll;
int main(){
    i64 S; cin >> S;
    if(S == E18)
        printf("0 0 %d 0 0 %d\n", E09, E09);
    else {
        int a = S / E09;
        int b = S % E09;
        printf("0 0 %d %d %d %d\n", E09, 1, E09 - b, a + 1);
    }
    return 0;
}
