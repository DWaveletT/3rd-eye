---
create_time: 1691063549
update_time: 1691063549
title: 【笔记】平衡树 学习笔记（中）
board: 1
tag:
- 2
---

- [平衡树 学习笔记 上篇](https://www.luogu.com.cn/blog/McHf/study-balanced-tree-1)

## Treap

### 二叉堆科普

（有基础的同学可以直接跳过这部分）

二叉堆是一种形状为完全二叉树的堆。节点从 $1$ 开始编号，编号为 $i$ 的节点父亲（若存在）编号为 $\left\lfloor\dfrac{i}{2}\right\rfloor$，左右儿子（若存在）分别编号为 $2i$ 和 $2i+1$。

- 如果每个结点的权值不大于它的儿子，则将其称为小根堆；
- 如果每个结点的权值不小于它的儿子，则将其称为小根堆。

小根二叉堆示例：

![](https://cdn.luogu.com.cn/upload/image_hosting/l0158gq0.png)

#### 插入操作

现在要插入权值 $w$。令 $\mathit{size}\gets \mathit{size}+1$，将 $W_{\mathit{size}}$ 赋值为 $w$，接着开始调整权值使之符合二叉堆的性质。从 $\mathit{size}$ 位置开始，比较其与父亲节点的大小，若比父亲小，则交换其与父亲的权值。一直向上走，直到父亲权值不小于它，或者走到了根节点。

正确性：

- 显然，由于我们每次交换两个节点，所以整个堆的形态始终是完全二叉树；
- 记当前维护的节点为 $u$，父节点为 $f$，兄弟节点为 $v$，由于插入元素之前堆符合「儿子权值不小于父节点的权值」的性质，所以 $w_v\ge w_f$。如果 $w_u<w_f$，显然也有 $w_u<w_v$，所以交换后 $u$ 的权值一定不大于两个儿子的权值。

#### 取最小值

直接返回 $W_1$ 的值即可。这是由堆的性质所决定的。

#### 删除操作

现在要弹出整个堆的最小值。我们将节点 $1$ 的权值和节点 $\mathit{size}$ 的权值交换，接着删除节点 $\mathit{size}$。接着从 $1$ 出发开始维护权值大小关系。将当前维护的节点 $p$ 与其两个儿子（若存在）的权值 $w_1,w_2$ 进行比较，如果 $w_1,w_2\ge p$ 则完成维护，否则交换 $p$ 与权值较小的那个儿子的权值，接着维护交换权值后的节点。比如，左儿子权值小于右儿子权值小于 $p$ 的权值，则交换 $p$ 和左儿子的权值，下一步令 $p\gets p\times 2$ 继续维护。

---

容易发现，插入和删除操作的复杂度等同于堆的高度，而堆的高度为 $\Theta (\log n)$，所以两者的复杂度均为 $\Theta (1)$；查询最小值操作的复杂度显然为 $\Theta (1)$。

### 用手写二叉堆完成合并果子

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
namespace Heap{
    const int SIZ = (1 << 18) + 3;
    int W[SIZ], s = 0;
    void push(int w){
        W[++ s] = w;
        for(int p = s;p > 1 && W[p >> 1] > W[p];p >>= 1)
            swap(W[p], W[p >> 1]);
    }
    void pop(){
        W[1] = W[s], W[s --] = 0;
        for(int p = 1;;){
            int wl = 2 * p     <= s ? W[p << 1    ] : INF;
            int wr = 2 * p + 1 <= s ? W[p << 1 | 1] : INF;
            if(W[p] < min(wl, wr)) break;
            if(wl < wr) swap(W[p], W[p << 1    ]), p = p << 1    ;
                else    swap(W[p], W[p << 1 | 1]), p = p << 1 | 1;
        }
    }
    int top(){
        return W[1];
    }
}
const int MAXN= 1e4 + 3;
int A[MAXN];
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
int main(){
    int n = qread();
    up(1, n, i){
        A[i] = qread(); Heap :: push(A[i]);
    }
    i64 ans = 0;
    up(1, n - 1, i){
        int a = Heap :: top(); Heap :: pop();
        int b = Heap :: top(); Heap :: pop();
        ans += a + b;
        Heap :: push(a + b);
    }
    printf("%lld\n", ans);
    return 0;
}
```

### 正片

![](https://cdn.luogu.com.cn/upload/image_hosting/mgn3mbj2.png)

Treap 从某种意义上可以看作**二叉排序树**（Tree）和**二叉堆**（Heap）的结合体。这种结构巧妙地运用随机化来保证了整个树的高度。每个节点除了维护该节点所存的值 $w$ 以外，还维护了一个随机权值 $h$。

上图当中，每个节点上半部分写的是 $w$ 值，下半部分写的是 $h$ 值。

- 从 $w$ 角度来看，Treap 是一棵二叉排序树。也就是说，
$$
\max_{v\in L_u}\{w_v\}<w_u< \min_{v\in R_u}\{w_v\}
$$
- 从 $h$ 角度来看，Treap 又是一棵二叉堆。满足如下性质：
$$
h_u>\max\{\max_{v\in L_u}\{h_v\},\max_{v\in R_u}\{h_v\}\}
$$

当确定了一棵 Treap 内所有结点的 $w$ 值，以及 $h$ 值时，Treap 的结构是**确定**的。可以通过如下方式给出构造：

- 因为 $h$ 值满足二叉排序树的关系，父亲节点的 $h$ 值一定小于当前节点的 $h$ 值，所以我们将所有节点按照 $h$ 值的大小关系从小到大排序，依次考虑插入；
- 根节点一定是 $h$ 值最小的节点；
- 后面插入的节点一定是已经插入完成的部分的某个叶子节点，而可以发现，此时它插入的位置一定是唯一的；
- 按照这种方式将所有节点插入完毕，此时 Treap 的形态唯一。

接着，对 Treap 期望树高为 $\mathcal O(\log n)$ 进行一个简要的说明：

节点集合为 $V$（每个节点有一个原始权值 $w$，以及一个随机权值 $h$），Treap 由这些节点唯一确定。

当前这棵树还没有任何元素。由于 $h$ 满足二叉堆的关系，因此根节点一定是 $h$ 最小的节点。由于权值随机生成，因此 $V$ 当中哪个节点作为根节点是等概率随机的。

当根节点确定为 $\mathrm{root}$ 后，根据二叉排序树的性质，$w$ 值比 $w_{\mathrm{root}}$ 小的节点一定在 $\mathrm{root}$ 的左子树里，$w$ 值比 $w_{\mathrm{root}}$ 大的节点一定在 $\mathrm{root}$ 的右子树里。因此按照与 $w_{\mathrm{root}}$ 的大小关系，$V$ 可以被分为两个集合 $L,R$，这两个集合可以递归地构建。

一般地，记 $V$ 的大小为 $n$，那么 $w_{\mathrm{root}}$ 在 $w$ 中的排名 $x$ 应该等概率取得 $1,2,\cdots,n$。选出 $\mathrm{root}$ 以后，划分出的 $L,R$ 集合的大小分别为 $x-1$ 和 $n-x$。

感性理解一下，每次往下走一层，每个集合的大小都期望折半，所以总树高应该为 $\mathcal O(\log n)$。

为了维护 Treap 的性质，需要使用旋转操作。

### 旋转

考虑经典的旋转操作对随机权值产生的影响。

![](https://cdn.luogu.com.cn/upload/image_hosting/v6376y9t.png)

可以发现，经过旋转操作后节点 $a$ 和 $A$ 的随机权值大小关系不变，$b$ 和 $C$ 的随机权值大小关系不变，$a,b$ 和 $B$ 的随机权值大小关系也没有发生变化。发生变化的就是 $a,b$ 之间的权值关系。对应到二叉堆里，相当于我们交换了节点 $a,b$ 的值。

### 插入操作

按照通常二叉搜索树的流程，我们将节点插入到某个叶子的位置 $p$。接着从 $p$ 开始向上维护二叉堆。比较 $p$ 与其父亲随机权值的大小关系，若 $h_p$ 比 $h_f$ 小，则将 $p$ 给 $\mathrm{rotate}$ 上去，直到 $p$ 成为了树根或者随机权值比它父亲的大。

![](https://cdn.luogu.com.cn/upload/image_hosting/62y8uf29.png)

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
    while(!is_root(o) && H[o] < H[F[o]])
        rotate(root, o);
}
```

### 删除操作

删除操作略不同于二叉堆。二叉堆可以让我们直接将要删除的节点与最后一个节点交换再进行调整，但是在 Treap 上，我们没有办法直接交换两个节点。不过，在 Treap 上一个更加灵活的地方在于，我们可以删除任何一个叶子节点，而不像二叉堆一样只能删除编号为 $\mathit{size}$ 的节点。

于是考虑将当前节点变成叶子节点再说。相当于把当前节点的随机权值赋值为无限大，这样就可以把它沉降下去。每次选择两个儿子里随机权值较小的那一个，将其 $\mathrm{rotate}$ 上来，直到当前节点变成了叶子。

![](https://cdn.luogu.com.cn/upload/image_hosting/torqxddz.png)

```cpp
void erase(int &root, int w){
    int x = root, o = x;
    for(;x;o = x, x = X[x][w > W[x]]){
        -- S[x]; if(w == W[x]){ -- C[x], o = x; break;}
    }
    if(C[o] == 0){
        while(X[o][0] || X[o][1]){
            u64 wl = X[o][0] ? H[X[o][0]] : ULLONG_MAX;
            u64 wr = X[o][1] ? H[X[o][1]] : ULLONG_MAX;
            if(wl < wr){
                int p = X[o][0]; rotate(root, p);
            } else {
                int p = X[o][1]; rotate(root, p);
            }
        }
        if(is_root(o)){
            root = 0;
        } else {
            X[F[o]][is_rson(o)] = 0;
        }
    }
}
```

### 查询 k 小 / 查询排名 / 查询前驱 / 查询后继

因为整棵树的期望树高为 $\mathcal O(\log n)$，因此直接查询就行。

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
mt19937_64 MT(114514);
namespace Treap{
    const int SIZ = 1e6 + 1e5 + 3;
    int F[SIZ], C[SIZ], S[SIZ], W[SIZ], X[SIZ][2], sz;
    u64 H[SIZ];
    bool is_root(int x){ return   F[x]     == 0;}
    bool is_rson(int x){ return X[F[x]][1] == x;}
    int  newnode(int w){
        W[++ sz] = w, C[sz] = S[sz] = 1; H[sz] = MT();
        return sz;
    }
    void pushup(int x){
        S[x] = C[x] + S[X[x][0]] + S[X[x][1]];
    }
    void rotate(int &root, int x){
        int y = F[x], z = F[y];
        bool f = is_rson(x);
        bool g = is_rson(y);
        int &t = X[x][!f];
        if(z){ X[z][g] = x; } else root = x;
        if(t){ F[t]    = y; }
        X[y][f] = t, t = y;
        F[y] = x, pushup(y);
        F[x] = z, pushup(x);
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
        while(!is_root(o) && H[o] < H[F[o]])
            rotate(root, o);
    }
    void erase(int &root, int w){
        int x = root, o = x;
        for(;x;o = x, x = X[x][w > W[x]]){
            -- S[x]; if(w == W[x]){ -- C[x], o = x; break;}
        }
        if(C[o] == 0){
            while(X[o][0] || X[o][1]){
                u64 wl = X[o][0] ? H[X[o][0]] : ULLONG_MAX;
                u64 wr = X[o][1] ? H[X[o][1]] : ULLONG_MAX;
                if(wl < wr){
                    int p = X[o][0]; rotate(root, p);
                } else {
                    int p = X[o][1]; rotate(root, p);
                }
            }
            if(is_root(o)){
                root = 0;
            } else {
                X[F[o]][is_rson(o)] = 0;
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
        return a + 1;
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
        return W[x];
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
    using namespace Treap;
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

## FHQ Treap

_\*神的上升\*_

FHQ Treap 是一种不依赖旋转操作就可以维护整棵 Treap 性质的特殊 Treap。它的核心思想在于，利用期望 $\mathcal O(\log n)$ 复杂度的分裂与合并操作来实现插入和删除。分裂和合并操作同时提供了利用平衡树维护区间操作的办法，其不依赖于均摊分析的复杂度又允许它实现可持久化。

### 按照权值分裂

现在需要将以 $u$ 为根的子树，按照与 $x$ 的大小关系分成两棵树。第一棵树的权值**均不大于** $x$，第二棵树的权值均**严格大于** $x$。

考虑 $x$ 和 $w_u$ 的大小关系。如果 $w_u\le x$，那么 $u$ 连同它的右子树，应该出现在分裂后的第一棵树里；否则 $u$ 连同它的左子树应该在第二棵树里。

考虑递归地实现这个过程。

- 如果 $w_u> x$，也就是 $u$ 和它的右子树的权值均大于 $x$，就将 $u$ 的左子树 $l$ 按照 $x$ 分裂为两棵子树 $a,b$，那么 $a$ 的权值一定不超过 $x$，$b$ 的权值一定超过 $x$。我们把 $u$ 的左儿子设置成 $b$，返回 $\lang a,u\rang$ 即可；
- 如果 $w_u\le x$，也就是 $u$ 和它的左子树的权值均不超过 $x$，此时就把 $u$ 的右子树 $r$ 按照 $x$ 分裂为两棵子树 $a,b$。与上个情况类似，$a$ 的权值不超过 $x$，$b$ 的权值大于 $x$，把 $u$ 的右儿子设置为 $a$，返回 $\lang u,b\rang$。

_**未完待续...**_

