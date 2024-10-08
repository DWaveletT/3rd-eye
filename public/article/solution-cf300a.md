---
create_time: 1589113893
update_time: 1589113893
title: 题解 CF300A 【Array】
board: 1
tag:
- 1
extension:
  problem:
    id: CF300A
    type: CF
    title: Array
    difficulty: 3
    submitted: false
    accepted: false
---
## 题目大意

$n$ 个数，要求分成三个集合 $A,B,C$，使得：

$$
\prod _ {x\in A} x<0,\prod _ {x\in B} x >0 ,\prod _ {x\in C} x =0
$$

**保证有解**。

## 题解

这里提供一个代码非常简单的解法吧。

- 观察集合 $A$，我们发现，只需要塞一个负数就行了。
- 观察集合 $B$，我们发现，我们需要塞一个正数**或者两个负数**。
- 集合 $C$ 有一个好处：**任何多出来的数，都可以塞到** $\bm C$ **里面去**。

题目保证有解。那么，倘若我们给这些数排个序，最小的数**必定是负数**，于是可以直接扔到 $A$ 里面去；如果最大的数是正数，就可以直接扔到 $B$ 里面去，否则选择第二小的数和第三小的数，因为题目保证有解，说明**此时至少有两个负数**。剩下的全部丢到 $C$ 里面，因为剩下的数肯定有 $0$。同样，是因为题目有解。

于是，我们就能根据**保证有解**这个条件，得出一个非常简短的代码。

## 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l;i<=r;i++)
#define dn(l,r,i) for(int i=l;i>=r;i--)
using namespace std;
const int MAXN =100+3;
int n,A[MAXN];
int main(){
    scanf("%d",&n); up(1,n,i) scanf("%d",&A[i]);
    sort(A+1,A+1+n),printf("1 %d\n",A[1]);
    if(A[n]<=0){
        printf("2 %d %d\n%d",A[2],A[3],n-3);
        up(4,n,i) printf(" %d",A[i]);
    } else{
        printf("1 %d\n%d",A[n],n-2);
        up(2,n-1,i) printf(" %d",A[i]);
    }
    puts("");
    return 0;
}
