---
create_time: 1720420319
update_time: 1720420319
title: 由乃OI做题记录
board: 1
tag:
- 2
---

## P4117 [Ynoi2018] 五彩斑斓的世界

假设我们进行的修改操作是全局的。可以用一个桶存下每种权值的出现次数 $h_i$。同时，设当前全局最小值为 $\mathit{minv}$，最大值是 $\mathit{maxv}$。

对于修改操作，有以下两种策略：

- 将所有 $i\ge x$ 的 $h_i$ 加到 $h_{i-x}$ 上面去；
- 将所有 $i< x$ 的 $h_i$ 加到 $h_{i+x}$ 上面去，接着给全局维护一个减标记 $\mathit{tag}$，将 $\mathit{tag}$ 加上 $x$（此时 $\mathit{minv}$ 和 $\mathit{maxv}$ 显然也要同步维护）。

我们希望均摊下来总复杂度是 $\mathcal{O}(v)$ 的，所以需要考虑一下什么时候用策略一，什么时候用策略二。策略一对 $h$ 的修改次数是 $\mathcal O(\mathit{maxv}-x)$，修改后 $\mathit{maxv}$ 变为 $\mathit{maxv}-x$，$\mathit{minv}$ 变为 $\min(\mathit{minv}, \mathit{maxv}-x)$；策略二对 $h$ 的修改次数是 $\mathcal O(x-\mathit{minv})$，修改后 $\mathit{maxv}$ 变为 $\max(\mathit{maxv}-x,\mathit{minv}+x)$。

因为我们同时有 $\mathit{maxv}$ 和 $\mathit{minv}$ 两个变量，很难计算。考虑将情况简化一些（类比于数学上的“放缩”），直接令 $\mathit{minv}=0$，只关心 $\mathit{maxv}$ 的情况，并用它来做均摊分析，也就是拿 $\mathit{maxv}$ 的减小量去摊还 $h$ 的操作次数。

- 策略一 $\mathit{maxv}$ 的减小量为 $x$，操作次数为 $\max(0,\mathit{maxv}-x)$；
- 策略二 $\mathit{maxv}$ 的减小量为 $\mathit{maxv}-\max(x,\mathit{maxv}-x)$，操作次数为 $x$；

考虑按照 $x$ 和 $2x$ 来进行分界。具体而言，

- 当 $\mathit{maxv}<x$ 时，无需操作；
- 当 $x\le \mathit{maxv} < 2x$ 时，执行策略一，减小量为 $x$，操作次数为 $\mathcal O(x)$；
- 当 $2x\le \mathit{maxv}$ 时，执行策略二，减小量为 $x$，操作次数为 $\mathcal O(x)$。

于是我们成功用 $\mathit{maxv}$ 的减小量均摊掉了操作次数。而 $\mathit{maxv}$ 是 $\mathcal O(v)$ 级别，于是总均摊复杂度是 $\mathcal O(v)$。

然而原题是区间操作。于是考虑分块。对于整块的操作依然可以利用均摊分析，不过需要简要分析一下零散操作。零散操作可能不会让 $\mathit{maxv}$ 减小，对于 $h$ 的维护直接暴力地 $\mathcal O(B)$ 重构。对于后续操作，由于 $\mathit{maxv}$ 并没有增加，于是均摊分析依然是正确的。

好不容易搞完了修改操作，还需要研究查询操作。

查询操作同样分为整块查询和零散查询。对于整块查询，只需要使用 $h$ 数组即可，然而零散操作需要我们确切的知道到底哪些位置的值等于 $x$。使用桶无法维护这么多的信息。

不过可以注意到，我们进行的 $h_{i-x}\gets h_{i-x}+ h_{i},h_i=0$ 操作本质相当于合并了两个集合。于是我们可以利用并查集每次合并两个集合。当进行零散查询时，暴力地枚举 $h_x$ 集合下每个元素的位置，判断是否在 $[l,r]$ 区间内即可。

