---
create_time: 1690811914
update_time: 1690811914
title: 【笔记】平衡树 学习笔记（上）
board: 1
tag:
- 2
---

## 二叉搜索树

在学习搜索树之前，这里简要介绍一下二叉搜索树的概念。

二叉搜索树是一种二叉树的树形数据结构，可以被用来维护有序序列。每个结点的儿子最多有两个，有左儿子、右儿子之分。节点上的权值满足左子树内节点的权值**严格小于**当前节点的权值，当前节点的权值**严格小于**右子树内节点的权值。按照中序遍历整棵二叉树，输出节点上的权值，可以得到其维护的有序序列。

在这里，我们不允许出现两个相同权值的节点。相同权值的处理办法是，在每个节点上开一个计数器 $\mathrm{cnt}$，用于维护这种权值出现的次数。这样处理后可以避免权值关系错乱带来的问题。

![](https://cdn.luogu.com.cn/upload/image_hosting/eqtkjz2o.png)

如上图所示是一棵二叉搜索树。我们将会以它作为例子，讲解二叉搜索树的基本操作。

### 数组定义

下文代码中，$L$ 数组存储每个节点左儿子的编号，$R$ 数组存储每个节点右儿子的编号，特别地，若不存在，则值为 $0$。$C$ 用来保存当前节点上的权值出现的次数，$S$ 用来保存当前子树内所有**权值的个数**（注意，不是节点个数）。$W$ 数组存储每个节点的权值。

```cpp
const int SIZ = 1e5 + 3;
int L[SIZ], R[SIZ], C[SIZ], S[SIZ], W[SIZ];
void pushup(int u){
    S[u] = S[L[u]] + C[u] + S[R[u]];
}
int sz;
int newnode(int w){
    ++ sz;
    L[sz] = R[sz] = 0;
    C[sz] = S[sz] = 1;
    W[sz] = w;
    return sz;
}
```

### 插入操作

假定现在要往根为 $p$ 的子树内插入权值 $w$。分为如下四类：

- $p=0$，即此时该树为空。令 $p\gets \mathrm{newnode}(w)$，返回；
- $w=W_p$：直接令 $C_p\gets C_{p}+1$，同时更新 $S_p\gets S_p+1$ 即可；
- $w< W_p$：说明此时需要向左子树内插入节点。递归调用 $\mathrm{insert}(L_p,w)$；
- $w> W_p$：说明此时需要向右子树内插入节点。递归调用 $\mathrm{insert}(R_p,w)$。

```cpp
void pushup(int u){
    S[u] = S[L[u]] + C[u] + S[R[u]];
}
void insert(int &p, int w){
    if(p == 0){
        p = newnode(w);
    } else {
        if(W[p] == w){
            ++ S[p], ++ C[p];
        } else {
            if(w < W[p]) insert(L[p], w);
                else     insert(R[p], w);
            pushup(p);
        }
    }
}
```

由于插入操作可能会导致该树的根节点发生变化，即如果原来是空树，则树的根节点变成了新建的节点，也就导致 $p$ 的值发生变化。所以在函数调用时加上取地址符号，来正确维护 $L$ 和 $R$ 的值。

同样地，我们在外部给整棵二叉搜索树执行操作时也是从根节点 $\mathrm{root}$ 出发。因此需要维护 $\mathrm{root}$ 的值，在我们调用 $\mathrm{insert}(\mathrm{root})$ 时也可以用这种方式正确维护。

此外，将节点插入到当前节点的某棵子树后，子树权值个数会发生变化。当递归过程结束后，进入的那棵子树的权值个数已经正确完成了维护。于是将当前节点 $\mathrm{pushup}$ 来正确更新 $S$ 的值。

下图展示了向树中插入元素 $70$ 的过程。

![](https://cdn.luogu.com.cn/upload/image_hosting/21ek2z04.png)

插入完毕后，从 $66$ 回溯时会依次发生 $\mathrm{pushup}$ 更新，也就自下而上地维护了 $S$ 的值。

### 删除操作

删除操作在普通的二叉搜索树内比较繁琐（不过在某些平衡树内会变得更加简单，也可能会变得极端复杂）。首先显然要递归找到需要删除的节点的编号 $p$，再进行如下操作：

- 如果 $p$ 是叶子节点，那么删除后 $p$ 子树变为空，同步维护父亲指向它的指针；
- 如果 $p$ 是链上节点，那么删除后 $p$ 连接着的节点就取代了 $p$ 的位置；
- 如果 $p$ 既有左儿子又有右儿子，情况则变得比较复杂。我们选择右子树里的最小值，也就是从右儿子开始一直向左走走到的节点。设该节点为 $q$，将 $p,q$ 的**权值**以及**权值个数**交换（注意不是直接交换两个节点的位置。交换位置需要修改 $p,q$ 的儿子指针，以及它们父亲的儿子指针，讨论量较大）。可以发现，此时二叉树的结构仍然被满足。由于权值交换到了 $q$ 上来，也就回到了应该删除的节点在链上的情形，直接删除即可。


这部分比较抽象，我们结合下面删除 $40$ 的例子进行讲解。

![](https://cdn.luogu.com.cn/upload/image_hosting/a0g0plqy.png)

首先从根结点出发，找到权值为 $40$ 的节点 $p$。此即图中标蓝的路径。

接着需要从 $40$ 出发找到它的后继节点。进入 $40$ 的右子树，接着一路向左走，走到节点 $q$，满足 $W_q=41$。此即图上标红的路径。

我们交换 $p$ 和 $q$ 的权值（节点的序号不变，所以不会修改儿子指针），此时二叉树的性质依然符合。

![](https://cdn.luogu.com.cn/upload/image_hosting/18la6puj.png)

权值 $40$ 被交换到 $q$ 来，那么删除任务就成了删除节点 $q$。此时 $q$ 没有左儿子，所以一定是两种容易的场合之一。直接将 $q$ 的父亲节点的左儿子指针指向 $q$ 的右儿子。

下文代码实现同样分成两部分组成：

```cpp
void erase(int &p, int w){
    if(W[p] == w){
        if(C[p] > 1){
            -- C[p], -- S[p]; return;
        }
        if(L[p] == 0 && R[p] == 0){
            p = 0;
        } else
        if(L[p] == 0 || R[p] == 0){
            p = L[p] | R[p];
        } else {
            replace(R[p], p);
            pushup(p);
        }
    } else {
        if(w < W[p]) erase(L[p], w);
            else     erase(R[p], w);
        pushup(p);
    }
}
```

首先找到权值为 $w$ 的位置。若 $p$ 是叶子或者是链，就可以直接处理，否则进入查找替换的函数过程。

```cpp
void replace(int &o, int p){
    if(L[o]){
        replace(L[o], p);
        pushup(o);
    } else {
        swap(W[o], W[p]);
        swap(C[o], C[p]);
        o = R[o];
    }
}
```

一直向左走，直到没有左儿子。交换 $p$ 和 $q$ 的权值及个数。

在上述函数中，当我们进入了某个节点的某个子树后，由于该子树内的权值个数发生了更新，所以我们从 $q$ 回溯时需要一路 $\mathrm{pushup}$ 上去。

---

到这里，有关二叉搜索树的修改操作就已经都完成了。接下来是查询操作。

### 查询 k 小

假定现在要查询以 $p$ 为根的子树里，权值从小到大第 $k$ 小的权值。这里需要用上先前维护好的 $S$ 和 $C$ 数组。

- 当 $S_{L(p)}\ge k$ 时，说明左子树内有至少 $k$ 个节点比 $p$ 要小，所以答案一定在左子树内。递归地查询左子树。
- 否则，当 $S_{L(p)}+C_p\ge k$ 时，说明 $W_p$ 就是答案，可以直接返回；
- 否则，答案应该在右子树内。此时我们要查询的不是右子树内第 $k$ 小的节点，而是第 $k-S_{L(p)}-C_p$ 小。这是因为，前 $S_{L(p)}$ 小的元素在左子树内，接下来 $C_p$ 小的元素在节点 $p$ 里面。

![](https://cdn.luogu.com.cn/upload/image_hosting/3v91uvn9.png)

```cpp
int find_kth(const int p, int k){
    int a = S[L[p]], b = a + C[p];
    if(a >= k) return find_kth(L[p], k);
    if(b >= k) return W[p];
    return find_kth(R[p], k - b);
}
```

### 查询排名

在这里，权值 $w$ 的排名被定义为「树上比 $w$ 小的元素个数」$+1$。依然是按照 $w$ 和 $W_p$ 的大小关系进行分类。

- 如果 $p=0$，也就是以 $p$ 为根的子树为空，也就没有元素比 $w$ 小。答案就是 $1$。
- 如果 $w< W_p$，说明比 $w$ 小的元素应该都在 $p$ 的左子树内；
- 如果 $w= W_p$，根据二叉搜索树的性质，比 $w$ 小的元素就是左子树内的元素，直接返回 $S_{L(p)}+1$；
- 如果 $w> W_p$，那么 $p$ 上的权值以及 $p$ 左子树内的权值都要比 $w$ 小，所以将答案加上 $S_{L(p)}+C_p$，此外还要统计右子树内比 $w$ 小的元素，所以还要递归处理。

![](https://cdn.luogu.com.cn/upload/image_hosting/73jhbp0o.png)

```cpp
int find_rank(const int p, int k){
    if(p == 0) return 1;
    if(k <  W[p]) return find_rank(L[p], k);
    if(k == W[p]) return S[L[p]] + 1;
    return S[L[p]] + C[p] + find_rank(R[p], k);
}
```

### 查找前驱

我们要找到树上严格比 $w$ 小的元素中，最大的元素的大小。可以先去查询这个最大的元素的排名。有 $\mathrm{getrank}(\mathrm{root},w)-1$ 个元素比 $w$ 小，其中最大的元素排名显然是 $\mathrm{getrank}(\mathrm{root},w)-1$。

```cpp
int find_pre(const int p, int k){
    return find_kth(p, find_rank(p, k) - 1);
}
```

### 查找后继

我们要找到树上严格比 $w$ 大的元素中，最小的元素的大小。与查找前驱的思路类似，设法确定这个最小元素的排名。这个最小元素一定大于 $w$，于是查询 $w+1$ 的排名，返回的结果 $\mathrm{getrank}(\mathrm{root},w+1)$ 就是小于等于 $w$ 的元素个数加上 $1$，这恰好是严格比 $w$ 大且最小的那个元素的排名。

```cpp
int find_suc(const int p, int k){
    return find_kth(p, find_rank(p, k + 1));
}
```

### 完整代码（以模板题为例）

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
namespace BST{
    const int SIZ = 1e5 + 3;
    int L[SIZ], R[SIZ], C[SIZ], S[SIZ], W[SIZ];
    void pushup(int u){
        S[u] = S[L[u]] + C[u] + S[R[u]];
    }
    int sz;
    int newnode(int w){
        ++ sz;
        L[sz] = R[sz] = 0;
        C[sz] = S[sz] = 1;
        W[sz] = w;
        return sz;
    }
    void insert(int &p, int w){
        if(p == 0){
            p = newnode(w);
        } else {
            if(W[p] == w){
                ++ S[p], ++ C[p];
            } else {
                if(w < W[p]) insert(L[p], w);
                    else     insert(R[p], w);
                pushup(p);
            }
        }
    }
    void replace(int &o, int p){
        if(L[o]){
            replace(L[o], p);
            pushup(o);
        } else {
            swap(W[o], W[p]);
            swap(C[o], C[p]);
            o = R[o];
        }
    }
    void erase(int &p, int w){
        if(W[p] == w){
            if(C[p] > 1){
                -- C[p], -- S[p]; return;
            }
            if(L[p] == 0 && R[p] == 0){
                p = 0;
            } else
            if(L[p] == 0 || R[p] == 0){
                p = L[p] | R[p];
            } else {
                replace(R[p], p);
                pushup(p);
            }
        } else {
            if(w < W[p]) erase(L[p], w);
                else     erase(R[p], w);
            pushup(p);
        }
    }
    int find_kth(const int p, int k){
        int a = S[L[p]], b = a + C[p];
        if(a >= k) return find_kth(L[p], k);
        if(b >= k) return W[p];
        return find_kth(R[p], k - b);
    }
    int find_rank(const int p, int k){
        if(p == 0) return 1;
        if(k <  W[p]) return find_rank(L[p], k);
        if(k == W[p]) return S[L[p]] + 1;
        return S[L[p]] + C[p] + find_rank(R[p], k);
    }
    int find_pre(const int p, int k){
        return find_kth(p, find_rank(p, k) - 1);
    }
    int find_suc(const int p, int k){
        return find_kth(p, find_rank(p, k + 1));
    }
    void dfs(int p){
        if(L[p]) dfs(L[p]);
        printf("%d, ", W[p]);
        if(R[p]) dfs(R[p]);
    }
}
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    int n = qread(), r = 0;
    up(1, n, i){
        int op = qread(), x = qread();
        switch(op){
            case 1 : BST :: insert(r, x); break;
            case 2 : BST :: erase (r, x); break;
            case 3 : printf("%d\n", BST :: find_rank(r, x)); break;
            case 4 : printf("%d\n", BST :: find_kth (r, x)); break;
            case 5 : printf("%d\n", BST :: find_pre (r, x)); break;
            case 6 : printf("%d\n", BST :: find_suc (r, x)); break;
        }
    }
    return 0;
}
```

## 平衡树简介

考虑上文所实现的二叉搜索树的时间复杂度。记整棵树当前最深的节点的深度为 $h$，那么六种操作的最坏复杂度均为 $\mathcal O(h)$。

当整棵树的形态退化成链状，比如从小到大/从大到小依次插入每个元素，那么操作的复杂度将会退化成 $\mathcal O(n)$，与暴力无异。

可以发现，影响平衡树复杂度的正是整棵树的树高。为了优化复杂度，我们引入了平衡树的概念，即通过一些限制使得整棵二叉树满足某种性质，通常可以约束树高，来将每次操作的最坏复杂度降至 $\mathcal O(\log n)$ 级别（尽管 Splay 树的均摊分析可以看作某种特例）。

## Splay 树

在介绍 Splay 树之前，先对维护二叉查找树平衡的旋转操作进行讲解。

### 旋转

![](https://cdn.luogu.com.cn/upload/image_hosting/2zabmu4p.png)

如图所示，有节点 $a$ 与其父亲 $b$。我们可以做如上变换，将 $b$ 变成 $a$ 的子节点。容易发现此时仍然满足二叉搜索树的性质。在上图，从左往右的变换成为**右旋（zig）**，从右往左的变换称作**左旋（zag）**。不过在代码实现里，我们不用区分左旋右旋。直接定义 $\mathrm{rotate}(x)$ 表示将节点 $x$ 向上旋转一级，让其父亲节点成为它的儿子节点。

为了实现旋转操作，显然每个节点除了要维护指向儿子的指针以外，还要设置一个指向父亲的指针。在上述旋转操作中，有这样一些事情发生：

- $a$ 原先指向右儿子 $B$ 的指针，现在指向了 $b$；
- $b$ 原先指向左儿子 $a$ 的指针，现在指向了 $B$；
- $b$ 的父亲指向 $b$ 的指针，现在指向了 $a$。

这些是儿子节点发生的变化。此外，

- $a$ 的父亲指针指向了原来的 $b$ 的父亲；
- $b$ 的父亲指针指向了现在的 $a$；
- $a$ 原来的右儿子，它的父亲指针指向了 $b$。

这里指针的赋值操作比较多，也很乱。错误地安排赋值操作的顺序会导致错误。

首先我们修改 $L,R$ 指针的定义，将其合并为 $X$ 数组，$X_{x,0}$ 表示 $x$ 的左儿子，$X_{x,1}$ 表示 $x$ 的右儿子。这样做方便我们根据 $x,y$ 的父子关系进行讨论。

- 定义辅助函数 `bool is_root(int x)` 判断 $x$ 是否为根，即 $x$ 有无父节点；
- 定义辅助函数 `bool is_rson(int x)` 判断 $x$ 是否为右儿子，即检查 $x$ 是不是父节点的右儿子。可以发现，如果存在父节点 $y$，那么 $X_{y,\mathrm{isrson}(x)}=x$。

先判断 $x,y$ 的父子关系，令 $f=\mathrm{isrson}(x)$。接着判断 $y$ 的父亲 $z$ 是否存在。如果存在，令 $g=\mathrm{isrson}(y)$，同时将 $X_{z,g}$ 赋值为 $x$，这样祖先节点的指针修改完毕。

接着处理那个将要被挂在 $y$ 下的 $x$ 的子树 $X_{x,\neg f}$。如果其存在，将其父亲节点设置为 $y$；接着，设置 $X_{y,f}$ 为 $X_{x,\neg f}$，$X_{x,\neg f}$ 设置为 $y$。

最后处理 $x$ 和 $y$。将 $x$ 的父亲设置为 $z$，将 $y$ 的父亲设置为 $x$，自下而上 $\mathrm{pushup}$ 一下即可。

上述过程比较乱，步骤也不唯一。建议自行模拟推导理解整个过程。

```
void rotate(int x){
    int y = F[x], z = F[y];
    bool f = is_rson(x);
    bool g = is_rson(y);
    int &t = X[x][!f];
    if(z){ X[z][g] = x; }
    if(t){ F[t]    = y; }
    X[y][f] = t, t = y;
    F[y] = x, push_up(y);
    F[x] = z, push_up(x);
}
```

### Splay

Splay 操作是 Splay 树的精华。$\mathrm{splay}(x)$ 的作用是将节点 $x$ 一路**旋转到树根**。其间的旋转操作就是使用 $\mathrm{rotate}$ 函数实现。

下图中，我们当前 Splay 的节点是 $a$。一共有六种情形，分为以下四种情况：

#### $a$ 已经是根

无需进行任何操作。

#### zig / zag

![](https://cdn.luogu.com.cn/upload/image_hosting/jt1ds8is.png)

当 $a$ 的父节点 $b$ 是树根，我们可以通过一步旋转将 $a$ 提升到树根的位置。

#### zig-zig / zag-zag

![](https://cdn.luogu.com.cn/upload/image_hosting/un4isk1d.png)

当 $a,b,c$ 连成一条线时，**规定**按照如下方式旋转：

- 先将 $a$ 的父节点 $b$ 向上旋转一级；
- 再将 $a$ 向上旋转一级，此时 $a$ 取代了 $c$ 原本的位置，也就在整个过程中提升了两级。

#### zig-zag / zag-zig

![](https://cdn.luogu.com.cn/upload/image_hosting/92ukk7fx.png)

当 $a,b,c$ 没有连成一条线，也就是 $a,b$ 的父子关系与 $b,c$ 的父子关系不同，规定按照如下方式旋转：

- 先将 $a$ 向上旋转一级；
- 再将 $a$ 向上旋转一级，同样地，$a$ 在整个过程中提升了两级，取代了 $c$ 的位置。

为什么我们要按照「$a,b$ 的父子关系」与「$b,c$ 的父子关系」是否相等进行讨论？为什么不能一路 $\mathrm{rotate}(a)$？事实上，这种规定用来保证它的复杂度。

### 时间复杂度

Splay 的时间复杂度是均摊 $\mathcal O(\log n)$ 的。换言之，假如我们执行了充分多次 $\mathrm{splay}$ 操作，这些操作的平均复杂度是 $\mathcal O(\log n)$。

为了证明 Splay 的复杂度，我们需要引入势能的概念。势能可以描述为与当前状态有关的某个辅助变量。这里举一个有关队列的例子：

> 维护一个队列 $q$。两种操作。
> - 操作 $1$：弹出队列尾部的 $k$ 个元素，保证弹出前队列的长度不小于 $k$；
> - 操作 $2$：向队列尾部插入一个元素。

直接暴力执行每种操作，那么操作 $1$ 的复杂度是 $\mathcal O(k)$，操作 $2$ 的复杂度是 $\mathcal O(1)$。咋一看，执行 $m$ 次操作的最坏复杂度是 $\mathcal O(mk)$，但只要稍微思考一下，就可以发现由于序列的插入操作一定不超过 $m$ 次，而弹出的总次数一定不会超过插入的次数，因此总复杂度是 $\mathcal O(m)$。

我们定义这个队列的势能 $\Phi$ 为整个序列的长度。操作 $1$ 会使得势能减小 $k$，操作 $2$ 会使得势能增加 $k$。我们将势能的变化量加上该操作本身的时间复杂度。也就是对两种操作进行这样的修改，

- 操作 $1$ 复杂度修改为 $\mathcal O(k)+\Delta \Phi=\mathcal O(k)-k=\mathcal O(0)$；
- 操作 $2$ 复杂度修改为 $\mathcal  O(1)+\Delta\Phi=\mathcal O(1)+1=\mathcal O(1)$。

一共 $m$ 次操作后，得到的复杂度变成了 $m\cdot \mathcal O(1)+\Delta \Phi=\mathcal O(m)$。

最后我们可以认为操作 $1$ 的均摊复杂度成了 $\mathcal O(0)+\dfrac{\mathcal O(m)}{m}=\mathcal O(1)$。

为什么可以认为 $\mathcal O(k)-k=\mathcal O(0)$？这是因为，势能是我们引入的虚拟量，它的单位可以任意乘上某个常数。$\mathcal O(k)$ 也可以看作单位运算的常数倍乘上 $k$。比如说，假定操作 $1$ 相当于执行了 $100k$ 次单位运算，那么我们就可以把势能的单位也乘上 $100$，比如定义新的 $\Phi$ 是 $q$ 的长度的 $100$ 倍，这样 $\mathcal O(k)-\Delta \Phi$ 就可以视作 $\mathcal O(1)$。相应的，引起势能增加的操作 $2$，$\Delta \Phi+\mathcal O(1)$ 也能看做 $\mathcal O(1)$。

通过这种方式，我们把复杂度和势能的改变量建立了联系。也就是计算复杂度和势能改变量的和作为某种新的复杂度（由于势能可能减少很多而该操作的复杂度不太大，因此这种和甚至可以是负数）。也就是为下文证明 Splay 复杂度做铺垫。

---

我们定义 $\varphi(i)=\log S_i$，$\Phi=\sum \varphi(i)=\sum \log S_i$，即每棵子树取完对数后的结果求和作为 $\Phi$ 值。想到为什么这样定义 $\Phi$ 并不直观，但我们暂且这样定义。

容易发现，对于任意形态的树，它的 $\Phi$ 值都不会超过 $\mathcal O(n\log n)$。这是因为 $\sum \log S_i\le \sum \log n=n\log n$。因此，在 $m$ 次操作前后，整棵 Splay 树势能的变化量的绝对值都不会超过 $\mathcal O(n\log n)$。

接着来分析 $\mathrm{splay}$ 函数的三种情形下，势能的变化量。

#### zig / zag

![](https://cdn.luogu.com.cn/upload/image_hosting/jt1ds8is.png)

子树 $A,B,C$ 内每个节点对 $\Phi$ 的贡献显然不会产生影响。因此我们只考虑 $a,b$ 势能的变化量加上旋转操作的复杂度 $\mathcal O(1)+\varphi'(a)+\varphi'(b)-\varphi(a)-\varphi(b)$。容易发现 $\varphi(b)=\varphi'(a)$。

$$
O(1)+\varphi'(a)+\varphi'(b)-\varphi(a)-\varphi(b)=\mathcal O(1)+\varphi'(a)-\varphi(b)\le \mathcal O(1)+\varphi'(a)-\varphi(a)
$$

#### zig-zig / zag-zag

由于两者对称，因此仅举 zig-zig 为例。

![](https://cdn.luogu.com.cn/upload/image_hosting/un4isk1d.png)

观察到 $\varphi(c)=\varphi'(a)$，仅考虑 $a,b$ 两点。

$$
\begin{aligned}
\mathcal O(1)+\varphi'(b)+\varphi'(c)-\varphi(a)-\varphi(b)< \mathcal O(1)+\varphi'(a)+\varphi'(c)-2\varphi(a)
\end{aligned}
$$

注意到这样的性质：$S'_{a}=S'_c+S_a$。于是有 $S_a'^2=S_a^2+S_c'^2+2S'_cS_a>2S_aS_c'$。两边取对数，得到 $2\log S_a'>\log 2+\log S_a+\log S_c'$。也就可以得到 $2\varphi'(a)>\log 2+\varphi(a)+\varphi'(c)$。所以继续推导上式，

$$
\mathcal O(1)+\varphi'(a)+\varphi'(c)-2\varphi(a)< \mathcal O(1)-\log 2+3\varphi'(a)-3\varphi(a)=3(\varphi'(a)-\varphi(a))
$$

#### zig-zag / zag-zig

接着是最后部分。

![](https://cdn.luogu.com.cn/upload/image_hosting/92ukk7fx.png)

同样地，写出表达式：

$$
\mathcal O(1)+\varphi'(c)+\varphi'(b)-\varphi(a)-\varphi(b)<\mathcal O(1)+\varphi'(c)+\varphi'(b)-2\varphi(a)
$$

依然是考虑用 $\varphi'(a)$ 去取代 $\varphi'(c)+\varphi'(b)$，以及需要凑出来一个常数项用来抵消掉 $\mathcal O(1)$。

- $\varphi'(a)=\log (A+B+C+D+3)$；
- $\varphi'(b)=\log (B+C+1)$；
- $\varphi'(c)=\log (A+D+1)$。

设 $B+C+1=X,A+D+1=Y$，方便整理式子。那么

$$
\begin{aligned}
2\varphi'(a)&=\log (X+Y+1)^2\\
&>\log (X+Y)^2 \\
&=\log (X^2+Y^2+2XY) \\
&\ge \log(2XY)\\
&=\log 2+\log X+\log Y\\
&=\log 2+\varphi'(b)+\varphi'(c)
\end{aligned}
$$

所以，zig-zag / zag-zig 的情形，复杂度可以放缩成 $2(\varphi'(a)-\varphi(a))$。

---

zig / zag 是整个 $\mathrm{splay}$ 最后一步进行的操作。对于其他旋转操作，由于我们一直在将节点 $a$ 向上面旋转，并且我们将复杂度都放缩成了只和 $\varphi(a),\varphi'(a)$ 有关的表达式，那么整个 $\mathrm{splay}$ 过程，它的复杂度就可以变成 $\mathcal O(1)+(\varphi'(a)-\varphi(a))+(\varphi''(a)-\varphi'(a))+\cdots+(\varphi^{(m)}(a)-\varphi^{(m-1)}(a))=\varphi^{(m)}(a)-\varphi(a)+\mathcal O(1)$。因为在最后，$a$ 被旋转到了树根，所以 $\varphi^{(m)}(a)=\log n$。所以总均摊复杂度是 $\mathcal O(\log n)$ 的。

又因为整个 $m$ 次操作后，$\Phi$ 的变化总量不超过 $n\log n$，把这个势能升高的贡献继续均摊到每次 $\mathrm{splay}$ 上，最终得到它的复杂度还是 $\mathcal O(\log n)$。

接着我们将 $\mathrm{splay}$ 的复杂度绑定上 Splay 树的插入删除查找上面。也就是说，假如我们最后一次访问到的节点是 $x$，那么在访问结束后，$\mathrm{splay}(x)$ 一次（显然，这个 $\mathrm{splay}$ 操作的复杂度与访问 $x$ 的复杂度是相同的），就可以将所有操作的复杂度都均摊成 $\mathcal O(\log n)$。

---

由于 Splay 树的形态在操作后会发生变化，所以下文不再使用递归写法。同时，由于 Splay 需要维护每个结点的父亲指针，所以在一些具体细节上更加需要注意。

### 插入

与二叉搜索树的插入基本相同。插入节点后记得设置新的节点的父亲指针。同时，插入完毕后将其 $\mathrm{splay}$ 到树根。

```cpp
void insert(int &root, int w){
    if(root == 0) {root = newnode(w); return;}
    int x = root, o = x;
    for(;x;o = x, x = X[x][w > W[x]]){
        ++ S[x]; if(w == W[x]){ ++ C[x], o = x; break;}
    }
    if(W[o] != w){
        if(w < W[o]) X[o][0] = newnode(w), F[sz] = o, o = sz;
        else         X[o][1] = newnode(w), F[sz] = o, o = sz;
    }
    splay(root, o);
}
```

### 删除

删除操作比二叉搜索树简单一点，但是新增加了一些细节。

首先找到需要删除的节点。将其旋转到树根。

如果其上计数器值大于 $1$，减去 $1$ 即可。否则，则需要将该节点删除。

- 如果该节点无左右儿子，则直接删除，树根设置为 $0$；
- 如果该节点有一个儿子，则将其设置为新的树根。注意，要把它的父指针置为零；
- 否则，情况会变得复杂一点。我们需要合并它的左右儿子。具体做法是，将左子树权值最大的节点旋转到左子树的树根，此时该节点一定没有右儿子（因为它是权值最大的节点，一定不会有节点权值比它大）。然后将其右儿子设置为右子树的树根，同时维护右子树树根的父亲变为它。

![](https://cdn.luogu.com.cn/upload/image_hosting/8i9gwiy8.png)

**注意儿子指针和父亲指针的维护是否正确**。~~不然就会像我一样卡上一年~~。

```cpp
void erase(int &root, int w){
    int val = S[root];
    int x = root, o = x;
    for(;x;o = x, x = X[x][w > W[x]]){
        -- S[x]; if(w == W[x]){ -- C[x], o = x; break;}
    }
    splay(root, o);
    if(C[o] == 0){
        if(X[o][0] == 0 || X[o][1] == 0){
            int u = X[o][0] | X[o][1];
            if(u != 0) F[root = u] = 0;
        } else {
            int p = X[o][0]; F[p] = 0;
            int q = X[o][0];
            while(X[q][1]) q = X[q][1];
            splay(p, q);
            X[q][1] = X[o][1];
            F[X[o][1]] = q;
            pushup(q);
            root = q;
        }
    }
}
```

### 查询 k 小 / 查询排名 / 查询前驱 / 查询后继

因为是查询操作，不会导致节点的增加或者减少，所以与二叉搜索树基本相同。区别在于查询完毕后要记得 $\mathrm{splay}$。

```cpp
int  find_rank(int &root, int w){
    int x = root, o = x, a = 0;
    for(;x;){
        if(w <  W[x])
            o = x, x = X[x][0];
        else {
            a += S[X[x][0]];
            if(w == W[x]){
                o = x; break;
            }
            a += C[x];
            o = x, x = X[x][1];
        }
    }
    splay(root, o); return a + 1;
}
int  find_kth(int &root, int w){
    int x = root, o = x, a = 0;
    for(;x;){
        if(w <= S[X[x][0]])
            o = x, x = X[x][0];
        else {
            w -= S[X[x][0]];
            if(w <= C[x]){
                o = x; break;
            }
            w -= C[x];
            o = x, x = X[x][1];
        } 
    }
    splay(root, o); return W[x];
}
int  find_pre(int &root, int w){
    return find_kth(root, find_rank(root, w) - 1);
}
int  find_suc(int &root, int w){
    return find_kth(root, find_rank(root, w + 1));
}
```

### 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
typedef unsigned int       u32;
typedef unsigned long long u64;
namespace Splay{
    const int SIZ = 1e6 + 1e5 + 3;
    int F[SIZ], C[SIZ], S[SIZ], W[SIZ], X[SIZ][2], sz;
    bool is_root(int x){ return   F[x]     == 0;}
    bool is_rson(int x){ return X[F[x]][1] == x;}
    int  newnode(int w){
        W[++ sz] = w, C[sz] = S[sz] = 1, F[sz] = 0;
        return sz;
    }
    void pushup(int x){
        S[x] = C[x] + S[X[x][0]] + S[X[x][1]];
    }
    void rotate(int x){
        int y = F[x], z = F[y];
        bool f = is_rson(x);
        bool g = is_rson(y);
        int &t = X[x][!f];
        if(z){ X[z][g] = x; }
        if(t){ F[t]    = y; }
        X[y][f] = t, t = y;
        F[y] = x, pushup(y);
        F[x] = z, pushup(x);
    }
    void splay(int &root, int x){
        for(int f = F[x];f = F[x], f;rotate(x))
            if(F[f]) rotate(is_rson(x) == is_rson(f) ? f : x);
        root = x;
    }
    void insert(int &root, int w){
        if(root == 0) {root = newnode(w); return;}
        int x = root, o = x;
        for(;x;o = x, x = X[x][w > W[x]]){
            ++ S[x]; if(w == W[x]){ ++ C[x], o = x; break;}
        }
        if(W[o] != w){
            if(w < W[o]) X[o][0] = newnode(w), F[sz] = o, o = sz;
            else         X[o][1] = newnode(w), F[sz] = o, o = sz;
        }
        splay(root, o);
    }
    void erase(int &root, int w){
        int val = S[root];
        int x = root, o = x;
        for(;x;o = x, x = X[x][w > W[x]]){
            -- S[x]; if(w == W[x]){ -- C[x], o = x; break;}
        }
        splay(root, o);
        if(C[o] == 0){
            if(X[o][0] == 0 || X[o][1] == 0){
                int u = X[o][0] | X[o][1];
                if(u != 0) F[root = u] = 0;
            } else {
                int p = X[o][0]; F[p] = 0;
                int q = X[o][0];
                while(X[q][1]) q = X[q][1];
                splay(p, q);
                X[q][1] = X[o][1];
                F[X[o][1]] = q;
                pushup(q);
                root = q;
            }
        }
    }
    int  find_rank(int &root, int w){
        int x = root, o = x, a = 0;
        for(;x;){
            if(w <  W[x])
                o = x, x = X[x][0];
            else {
                a += S[X[x][0]];
                if(w == W[x]){
                    o = x; break;
                }
                a += C[x];
                o = x, x = X[x][1];
            }
        }
        splay(root, o); return a + 1;
    }
    int  find_kth(int &root, int w){
        int x = root, o = x, a = 0;
        for(;x;){
            if(w <= S[X[x][0]])
                o = x, x = X[x][0];
            else {
                w -= S[X[x][0]];
                if(w <= C[x]){
                    o = x; break;
                }
                w -= C[x];
                o = x, x = X[x][1];
            } 
        }
        splay(root, o); return W[x];
    }
    int  find_pre(int &root, int w){
        return find_kth(root, find_rank(root, w) - 1);
    }
    int  find_suc(int &root, int w){
        return find_kth(root, find_rank(root, w + 1));
    }
}
int qread(){
    int w=1,c,ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    using namespace Splay;
    int n = qread(), m = qread(), root = 0;
    up(1, n, i){
        int a = qread(); insert(root, a);
    }
    int last_ans = 0, ans = 0;
    up(1, m, i){
        int op = qread(), x = qread() ^ last_ans;
        switch(op){
            case 1 : insert(root, x); break;
            case 2 : erase (root, x); break;
            case 3 : ans ^= (last_ans = find_rank(root, x)); break;
            case 4 : ans ^= (last_ans = find_kth (root, x)); break;
            case 5 : ans ^= (last_ans = find_pre (root, x)); break;
            case 6 : ans ^= (last_ans = find_suc (root, x)); break;
        }
    }
    printf("%d\n", ans);
    return 0;
}
```
