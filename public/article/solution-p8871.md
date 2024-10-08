---
create_time: 1669510991
update_time: 1669510991
title: '题解 P8871 【[传智杯 #5 初赛] C-莲子的排版设计学】'
board: 1
tag:
- 1
extension:
  problem:
    id: P8871
    type: P
    title: '[传智杯 #5 初赛] C-莲子的排版设计学'
    difficulty: 3
    submitted: true
    accepted: true
---
### 题解

读入题。暴风吸入输入数据里给定的所有字符，存到数组里，统计有多少个换行符，确定输入文件的总行数 $m$。由此计算出最后一个行号的长度 $s=\lfloor\lg m+1\rfloor$（数学库里可以直接调用 $\lg$，当然你也可以随便用什么途径算出每个数的长度）。

然后就是模拟了。对于第 $i$ 行，

- 计算出 $i$ 的长度 $t=\lfloor\lg i+1\rfloor$。
- 输出 $s-t$ 个空格，再输出 $i$，然后输出 $1$ 个空格。
- 从第 $i-1$ 个换行的位置开始，一直到第 $i$ 个换行，把中间的字符全部输出。这样第 $i$ 行就做完了。

时间复杂度为 $\mathcal O(|S|)$，其中 $|S|$ 是输入的所有字符的个数。

### 参考代码 

版本 $1$：

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
const int MAXN= 2e4 + 3;
char S[MAXN], c; int l, m;
int main(){
    m = count(S + 1 , S + 1 + fread(S + 1, 1, MAXN, stdin), '\n');
    int s = log10(m) + 1 + 1e-9, p = 0;
    up(1, m, i){
        int t = log10(i) + 1 + 1e-9;
        for(int j = 1;j <= s - t;++ j) putchar( ' '); printf("%d ", i);
        for(p = p + 1;S[p] != 10;++ p) putchar(S[p]); putchar('\n');
    }
    return 0;
}
```

版本 $2$：

```java
import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

public class Main {
    
    public static List<String> list = new ArrayList<>();

    public static int getBit(int x) {
        int cnt = 0;
        while (x > 0) {
            x /= 10;
            ++cnt;
        }
        return cnt;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            list.add(scanner.nextLine());
        }
        int size = list.size();
        int len = getBit(size);
        for (int i = 0; i < size; ++i) {
            System.out.printf("%" + len + "d %s\n", i + 1, list.get(i));
        }
    }
}
