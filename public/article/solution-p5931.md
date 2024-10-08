---
create_time: 1676259174
update_time: 1676259174
title: 题解 【P5931 [清华集训2015]灯泡】
board: 1
tag:
- 1
extension:
  problem:
    id: P5931
    type: P
    title: '[清华集训2015] 灯泡'
    difficulty: 6
    submitted: true
    accepted: true
---

## 推导

假设人后面没有墙，设此时投射到地面上的影子长度为 $x$。容易发现 $x$ 的取值范围是 $\left[0,D\times \dfrac{h}{H-h}\right]$。因为当 $x$ 比较小的时候影子不会被投到墙上，此时一直远离灯肯定是更优的，所以可以一直远离到影子恰好投影到墙上的时刻。于是我们希望研究的 $x$ 的取值范围实际是：

$$
\left[D\times \dfrac{h}{H},D\times \dfrac{h}{H-h}\right]
$$

现在加入了这堵墙。那么投射到地面上的影子长度就没有 $x$ 了。设少去的那一部分影子的长度为 $y$，容易发现：

$$
y=x\times\dfrac{H}{h}-D
$$

那么根据相似可以得到投射到墙上的那部分影子长度就是 $y\times \dfrac{h}{x}$。得到影子的总长度：

$$
L=(x-y)+y\times \dfrac{h}{x}=-\left(\dfrac{H-h}{h}\times x+Dh\times \dfrac{1}{x}\right)+(H+d)
$$

大概长得像个对勾函数，也就是单峰的。如果峰不在定义域里就直接取两端点的最大值就行，否则最大值在 $x=h\times \sqrt{\dfrac{D}{H-h}}$ 时取得，值为 $H + D - 2 \times \sqrt{D \times (H - h)}$。

由于 $x$ 在两个端点处的取值有自己的几何意义（一个是影子恰好落在墙上，一个是整个人贴在墙上），所以容易直接根据几何意义算出来而不用代公式。可以发现，影子刚好落在墙上时影子长度就是 $D\times \dfrac{h}{H}$，人贴在墙上时长度就是 $h$。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
int main(){
    int T; scanf("%d", &T); while(T --){
        long double H, h, D;
        scanf("%Lf%Lf%Lf", &H, &h, &D);
        long double l = D * h / H;
        long double r = D * h / (H - h);
        long double x0 = h * sqrtl(D / (H - h));
        if(l <= x0 && x0 <= r)
            printf("%.3Lf\n", H + D - 2 * sqrtl(D * (H - h)));
        else printf("%.3Lf\n", max(D / H * h, h));
    }
    return 0;
}
