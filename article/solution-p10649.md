---
create_time: 1721025413
update_time: 1721025413
title: 题解 P10649 「ROI 2017 Day 1」四轴飞行器编程
board: 1
tag:
- 1
extension:
  problem:
    id: P10649
    type: P
    title: 「ROI 2017 Day 1」四轴飞行器编程
    difficulty: 6
    submitted: true
    accepted: true
---

很有意思的题。

## 题解

先从简单的情形开始考虑。因为原序列一定是一个合法的括号序列，于是第一个字符一定是 $\verb!(!$。要想确定第二个字符，只需要利用一次询问 $\verb!? 1 2!$，如果结果是 $\verb!Yes!$ 那么第二个字符是 $\verb!)!$，否则是 $\verb!(!$。

- 对于 $\verb!)!$ 的情况，说明它与第一个字符组成了一个匹配，我们解决掉了一个子问题，接下来从第三个字符开始解决问题就行；
- 对于 $\verb!(!$ 的情况，说明第一个字符对应的括号下面有一些子括号问题，对于子问题，容易想到可以递归地去解决。

具体而言，我们维护两个变量 $i$ 和 $p$，$i$ 表示当前正在处理第 $i$ 个字符，$p$ 表示目前父括号对左括号的下标。

$$
{\verb!(...)(...)!\operatorname*{\verb!(!}_p\verb!(...)(...)!\operatorname*{\verb!?!}_{i}\verb!???!}
$$

如果查询 $\verb!? p i!$ 结果为 $\verb!Yes!$，说明 $i$ 位置是一个右括号，回溯；否则说明 $i$ 位置是一个左括号，递归地求解 $(i'=i+1,p'=i)$。递归处理完毕后将 $i$ 设置为当前第一个尚未确定的字符的下标。

由于每次询问之后 $i$ 都会增加 $1$，于是总询问次数不超过 $n$。数据范围 $k\ge 2n$ 属于是给多了。

## 参考代码

```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAXN = 1e5 + 3;

bool check(int l, int r){
    cout << "? " << l << " " << r << endl;
    string result;
    cin >> result;

    return result == "Yes";
}

char C[MAXN];

void dfs(int &i, int p){
    while(1){
        if(check(p, i)){
            C[i] = ')', i ++; return;
        } else {
            C[i] = '(', i ++; dfs(i, i - 1);
        }
    }
}

int main(){
    int n;
    cin >> n;
    int i = 1;
    while(i <= n){
        C[i] = '(', i ++; dfs(i, i - 1);
    }
    cout << "! " << C + 1 << endl;
    return 0;
}
