---
create_time: 1586615508
update_time: 1586615508
title: 题解 CF764A 【Taymyr is calling you】
board: 1
tag:
- 1
extension:
  problem:
    id: CF764A
    type: CF
    title: Taymyr is calling you
    difficulty: 1
    submitted: false
    accepted: false
---

~~没有Python题解？我来水一发~~

---

题解：

由于$1 \le n \le 10^4$，所以只需要每一个时刻是否会有艺术家被杀掉即可。

```pypy3
n,m,z=map(int,input().split())
cnt=0
for i in range(1,z+1):  # 一定要+1，因为python的循环是开区间
    if i>=n and i%n==0 and i>=m and i%m==0:
        cnt=cnt+1
print(cnt)

