---
create_time: 1691491582
update_time: 1691491582
title: 【笔记】平衡树 学习笔记（下）
board: 1
tag:
- 2
---

- [平衡树 学习笔记 中篇](https://www.luogu.com.cn/blog/McHf/study-balanced-tree-2)

## 红黑树

![](https://cdn.luogu.com.cn/upload/image_hosting/vfuu9t98.png)

红黑树是满足以下五个性质的二叉排序树：

1. 每个节点被染成了红色或者黑色；
2. 空叶子节点被染成了黑色；
3. 树的根节点被染成了黑色；
4. 红色节点的儿子节点是黑色的；
5. 从根节点到任意一个空叶子节点，走过的黑色节点数相同。

上图中用 $\colorbox{black}{\textsf{\textcolor{white}N}}$ 表示空叶子节点。从根结点出发到每个空叶子节点，经过的黑色节点数均为 $2$ 个。

性质 $4,5$ 保证了整棵树的复杂度。

我们设从根节点到空叶子节点经过恰好 $n$ 个黑色节点，且根节点颜色为黑色/红色的红黑树，它的最小大小分别为 $f(n)$ 和 $g(n)$。容易得到递推式：

容易得到递推式：

$$
\begin{aligned}
f(n)&=2\min (f(n-1),g(n-1))+1 \\
g(n)&=2f(n)+1
\end{aligned}
$$

那么一定有 $g(n)=2f(n)+1> f(n)$，所以 $f(n)$ 的表达式可以写成 $f(n)=2f(n-1)+1$。那么 $f(n)+1=2(f(n-1)+1)$，同时根据 $g(0)=1,f(1)=3$，容易得到：

$$
f(n)=2^{n+1}+1,\ n\ge 1
$$

另外，由于红色节点的儿子节点一定是黑色节点，所以当空叶节点到根节点的黑色节点的个数为 $n$ 时，这条路径上红色节点的个数一定不超过 $n$。所以整棵树的高度一定不超过 $2n$。

再结合上 $f(n)=2^{n+1}+1$，所以对于一棵大小为 $m$ 的红黑树，它的树高一定是 $\Theta(\log m)$ 的。

有了复杂度的保证，我们的任务就是在插入/删除某个节点后，用恰当的复杂度去维护红黑树的性质。

### 插入节点

假设当前要插入的节点的权值为 $w$。

如果红黑树此时为空，那么新建一个黑色节点作为根，并将权值赋值为 $w$ 即可。

如果红黑树上已经有某个节点的权值为 $w$，令其计数器加一；否则，沿着树根找到应该插入的位置 $u$（应当是某个叶子），新建节点，初始颜色设置为红色。

插入节点后，「红色节点的儿子为黑色节点」的性质可能被破坏，因此需要从 $u$ 开始向上维护。我们需要实现函数 $\mathrm{maintain1}(u)$ 来对红色节点 $u$ 进行维护。此时，整棵红黑树**只有两种可能**不满足性质：

- $u$ 是根节点（违反了根节点颜色为黑色的性质）；
- $u$ 的**父亲** $v$ 是红色（违反了红色节点儿子为黑色的性质）。

换言之，$\text{maintain1(u)}$ 的时候我们假定除了 $u$ 和它的父亲节点之间的关系外，其他的部分全部符合性质。

```cpp
void insert(int &root, int w){
    if(root == 0) {root = newnode(w), H[root] = BK; return;}
    int x = root, o = x;
    for(;x;o = x, x = X[x][w > W[x]]){
        ++ S[x]; if(w == W[x]){ ++ C[x], o = x; break;}
    }
    if(W[o] != w){
        if(w < W[o]) X[o][0] = newnode(w), F[sz] = o, o = sz;
        else         X[o][1] = newnode(w), F[sz] = o, o = sz;
        maintain1(root, o);
    }
}
```

### 情形 1：$u$ 是树根

![](https://cdn.luogu.com.cn/upload/image_hosting/b62i1cne.png)

即第一种可能，直接染成黑色即可。

以下情形 $u$ 均不为根节点。记 $v$ 为 $u$ 的父节点。

### 情形 2：$v$ 是黑色

![](https://cdn.luogu.com.cn/upload/image_hosting/84obkqv1.png)

以下情形 $v$ 的颜色为红色。那么 $v$ 一定会有父亲节点（因为根节点一定是黑色），记 $w$ 为 $v$ 的父节点。由于 $v$ 是红色，因此 $w$ 一定是黑色。另外，对于 $v$ 而言，一定存在一个兄弟节点（可能是空叶子节点，按照定义，空叶子节点的颜色为黑色）。将 $v$ 的兄弟节点记为 $h$。

### 情形 3：$h$ 是红色

![](https://cdn.luogu.com.cn/upload/image_hosting/kansifxs.png)

可以将 $v,h$ 均染成黑色，接着把爷节点 $w$ 染色为红色。此时 $w$ 与它的父亲（若存在）之间可能不满足性质，因此需要递归维护 $w$。

此时在剩下来的讨论情况中，$u,v,h,w$ 的颜色都已经被确定下来了。唯一还没有被确定下来的是 $v,u,w$ 之间的结构。

- 记 $f$ 表示 $u$ 是否是 $v$ 的右儿子，若是，则 $f$ 为真：
- 记 $g$ 表示 $v$ 是否是 $w$ 的右儿子，若是，则 $g$ 为真。

### 情形 4：$f \neq g$

![](https://cdn.luogu.com.cn/upload/image_hosting/pa9qrf44.png)

此时不太方便维护。但是我们可以把 $u$ 向上旋转一层而不破坏「根到空叶子节点的黑色节点个数相等」的性质。将 $u$ 旋转后，对于 $v$ 而言，就成了下文所示情形 $5$ 的状态。

### 情形 5：$f = g$

![](https://cdn.luogu.com.cn/upload/image_hosting/kqp73d31.png)

在这种情形下，我们需要把 $v$ 旋转上去一层取代掉 $w$ 的位置；此时根到空叶子节点上经过的黑色节点数可能不等，因此需要重新染色。将 $v$ 染成黑色，$w$ 染成红色，则可以发现，从根到每个空叶子节点走过的黑色节点数再次相等。

如上图所示，在左上角的图中，从 $w$ 到 $\mathrm{A,B,C,D,E}$ 分别经过了 $1,2,2,1,1$ 个黑色节点；旋转+染色过后，从 $v$ 到达 $\mathrm{A,B,C,D,E}$ 经过的黑色节点数仍然是 $1,2,2,1,1$。因此合法。

完成了上述五种情况的讨论后，我们在 $\mathcal O(\log n)$ 复杂度下完成了插入操作后红黑树的维护。

```cpp
void maintain1(int &root, int u){
    if(F[  u ] == 0) return H[  u ] = BK, void();   // Case 1
    if(H[F[u]] == 0) return;                        // Case 2
    int v = F[u], w = F[v];
    bool f = is_rson(u);
    bool g = is_rson(v);
    int x = X[w][!g];
    if(H[x] == RD){ // Case 3
        H[x] = BK, H[v] = BK, H[w] = RD;
        maintain1(root, w);
    } else {
        // Case 4 :
        if(f != g)
            rotate(root, u), swap(u, v), f = !f;

        // Case 5 :
        rotate(root, v);
        H[w] = RD, H[v] = BK;
    }
}
```

### 删除节点

~~_由于大多数时候我们让理应被删除的节点保留在树上不会导致复杂度退化，所以可以直接将计数器已经变为 $0$ 的节点保留在树上，还能极大降低码量。_~~

删除节点的讨论比插入节点更加困难。不过我们先可以从简单情形出发。

### 大情形 0：$u$ 是树上唯一的节点

直接删除即可。

### 大情形 1：$u$ 同时有左右儿子

与普通的二叉搜索树相同，可以将它上面的值与它右子树内**权值最小**的节点交换。这样交换以后，二叉搜索树的权值要求仍然符合。同时我们要删除的节点儿子的情况就转移成了「有且仅有一个儿子」或者「没有任何一个儿子」之一。也就是转化成了下文所述的大情况 $2$ 或者大情况 $3$。

```cpp
if(X[o][0] != 0 && X[o][1] != 0){
    int y = X[o][1];
    while(X[y][0]) y = X[y][0];
    swap(C[o], C[y]);
    swap(W[o], W[y]);
    for(int p = y;p != o;p = F[p])
        pushup(p);
    pushup(o), o = y;
}
```

### 大情形 2：$u$ 有且仅有一个儿子

断言：$u$ 的颜色**一定是黑色**，且 $u$ 的唯一儿子的颜色**一定是红色**。

记 $u$ 的唯一儿子的编号为 $s$。

- 如果 $u$ 的颜色是红色，那么根据「红色节点的儿子一定是黑色」的性质，$s$ 的颜色一定是黑色。由于 $u$ 的另一个儿子为空，而「根节点到每个空叶子节点经过的黑色节点个数相同」，那么根节点到 $u$ 的空儿子经过的黑色节点数，一定会小于根节点经过 $s$ 到达 $s$ 子树内某个空儿子的个数，矛盾；
- 确定 $u$ 的颜色是黑色，如果 $s$ 的颜色是黑色，那么根节点到 $u$ 的空叶子节点经过的黑色节点数一定小于根节点经过 $s$ 到达某个空叶子节点经过的黑色节点数，矛盾。

现在 $u$ 是黑色，只有一个儿子，而 $s$ 是红色，那么可以直接将 $s$ 染黑，接着把 $u$ 删除。

```cpp
if(X[o][0] == 0 && X[o][1] == 0){
    if(F[o] == 0) root = 0;
    else {
        if(H[o] == BK)
            maintain2(root, o);
        X[F[o]][is_rson(o)] = 0;
    }
}
```

### 大情形 3：$u$ 没有任何一个儿子

如果 $u$ 的颜色是红色，显然可以直接删除。

否则，把 $u$ 删除以后，从根节点到达 $u$ 原来位置经过的黑色节点个数就会比到达其他空叶子节点经过的黑色节点个数少 $1$。因此需要进行维护。

现在希望执行 $\mathrm{maintain2}(u)$ 来让根节点经过 $u$ 到达 $u$ 的空叶子节点经过的黑色节点数比不经过 $u$ 到达空叶子节点经过的黑色节点数增加 $1$。这样子删除掉 $u$ 以后就可以完成维护了。

为此，我们按照如下表述定义 $\mathrm{maintain2}(t)$ 操作：

- 记当前处理的子树是 $t$；
- 记当前从根节点到达 $t$ 子树内每一个空叶子节点经过的黑色节点数是 $x$；
- 记当前从根节点到达 $t$ 子树外每一个空叶子节点经过的黑色节点数是 $y$；
- 显然初始时 $x=y$。现在希望通过执行一系列旋转 / 染色操作将 $x-y$ 的值变成 $1$。

此外，我们还给 $\mathrm{maintain2}(t)$ 操作加上了一些约束：

- 由于我们开始维护的 $u$ 是一个叶子节点，需要在维护后被删除，所以我们仍然希望在维护结束后，$u$ 还是叶子节点；
- 另外，$t$ 的颜色一定是黑色。否则总是可以直接将它染黑来完成维护。

```cpp
else {
    int s = X[o][0] ? X[o][0] : X[o][1];
    H[s] = BK;
    F[s] = F[o];
    if(F[o])
        X[F[o]][is_rson(o)] = s,
        pushup(F[o]);
    else
        root = s;
}
```

### 删除部分完整代码

```cpp

void erase(int &root, int w){
    int sss = S[root];
    int x = root, o = x;
    for(;x;o = x, x = X[x][w > W[x]]){
        -- S[x]; if(w == W[x]){ -- C[x], o = x; break;}
    }
    if(C[o] == 0){
        if(X[o][0] != 0 && X[o][1] != 0){
            int y = X[o][1];
            while(X[y][0]) y = X[y][0];
            swap(C[o], C[y]);
            swap(W[o], W[y]);
            for(int p = y;p != o;p = F[p])
                pushup(p);
            pushup(o), o = y;
        }
        if(X[o][0] == 0 && X[o][1] == 0){
            if(F[o] == 0) root = 0;
            else {
                if(H[o] == BK)
                    maintain2(root, o);
                X[F[o]][is_rson(o)] = 0;
            }
        } else {
            int s = X[o][0] ? X[o][0] : X[o][1];
            H[s] = BK;
            F[s] = F[o];
            if(F[o])
                X[F[o]][is_rson(o)] = s,
                pushup(F[o]);
            else
                root = s;
        }
    }
}
```

### 小情形 1：$u$ 是树根

![](https://cdn.luogu.com.cn/upload/image_hosting/smvi3bxu.png)

此时已经完成维护，直接返回即可。

```cpp
// Case 1 :
if(F[u] == 0) return;
```

---

![](https://cdn.luogu.com.cn/upload/image_hosting/5cacga1x.png)

在接下来的情况中，由于 $u$ 的颜色是黑色，所以 $u$ 一定会有一个非空的兄弟节点 $h$。我们还需要考虑 $h$ 的两个儿子 $a,b$（可以为空叶子节点）。其中，$h\leftrightarrow a$ 的儿子关系，与 $v\leftrightarrow u$ 的儿子关系相同。在图上，$u,a$ 同样是其父亲的左儿子，所以我们称 $a$ 是「与 $u$ 同向」的。相应地，称 $b$ 是「与 $u$ 反向」的。

```cpp
int v = F[u]; bool f = is_rson(u);
int h = X[v][!f];
int a = X[h][ f];
int b = X[h][!f];
```

在分类讨论之前，我们先罗列一下所有可能的染色情况：

$$
\begin{cases}
v\text{ is }{\color{black}\bullet}
\begin{cases}
h\text{ is }{\color{black}\bullet}\kern{5.5pt}
\begin{cases}
a\text{ is }{\color{black}\bullet} \begin{cases}
b\text{ is }{\color{black}\bullet} \quad \text{Case 2}\Rightarrow\mathit{depth}\gets\mathit{depth}-1 \\
b\text{ is }{\color{red}  \bullet} \quad \text{Case 6}\Rightarrow\textsf{End}
\end{cases} \\
a\text{ is }{\color{red}  \bullet} \begin{cases}
b\text{ is }{\color{black}\bullet} \quad \text{Case 5}\Rightarrow\text{Case 6}\\
b\text{ is }{\color{red}  \bullet} \quad \text{Case 6}\Rightarrow\textsf{End}
\end{cases}
\end{cases}
\\
h\text{ is }{\color{red}  \bullet}\kern{5.5pt} \Rightarrow a\text{ is }{\color{black}\bullet},b\text{ is }{\color{black}\bullet} \quad \text{Case 3}\Rightarrow\text{Case 4/5/6}
\end{cases}
\\
v\text{ is }{\color{red}  \bullet} \Rightarrow h\text{ is }{\color{black}\bullet} \begin{cases}
a\text{ is }{\color{black}\bullet} \begin{cases}
b\text{ is }{\color{black}\bullet} \quad \text{Case 4}\Rightarrow\textsf{End}\\
b\text{ is }{\color{red}  \bullet} \quad \text{Case 6}\Rightarrow\textsf{End}
\end{cases} \\
a\text{ is }{\color{red}  \bullet} \begin{cases}
b\text{ is }{\color{black}\bullet} \quad \text{Case 5}\Rightarrow\text{Case 6}\\
b\text{ is }{\color{red}  \bullet} \quad \text{Case 6}\Rightarrow\textsf{End}
\end{cases}
\end{cases}\\
\end{cases}
$$

### 小情形 2：$v,h,a,b$ 均为黑色

![](https://cdn.luogu.com.cn/upload/image_hosting/ulo36bok.png)

将 $h$ 染红，接着就只需要 $\mathrm{maintain2}(v)$。因为每一次深度都能减一，所以最多递归 $\log n$ 层。

```cpp
// Case 2 :
if(H[a] == BK && H[b] == BK && H[h] == BK && H[v] == BK){
    H[h] = RD;
    maintain2(root, v);
    return;
}
```


### 小情形 3：$h$ 为红色

![](https://cdn.luogu.com.cn/upload/image_hosting/nwevfxib.png)

此时 $v,a,b$ 必须要是黑色，否则不符合性质。

这时，通过把 $h$ 旋转上去，再将 $v$ 染红、$h$ 染黑，可以将情形向下转移。

但是要注意的是，由于树上发生了旋转，结构发生了变化，因此 $\bm{v,h,a,b}$ **的值要同步更新**。即，

- $h\gets a$；
- $a$ 重新赋值为 $h$ 的「与 $u$ 同向」的儿子；
- $a$ 重新赋值为 $h$ 的「与 $u$ 反向」的儿子。

```cpp
// Case 3 :
if(H[h] == RD){
    rotate(root, h);
    H[h] = BK;
    H[v] = RD;
    h = a;
    a = X[h][ f];
    b = X[h][!f];
}
```


### 小情形 4：$v$ 为红色，$a,b$ 为黑色

![](https://cdn.luogu.com.cn/upload/image_hosting/91ln2akq.png)

通过一次染色，完成维护。

```cpp
// Case 4 :
if(H[v] == RD && H[a] == BK && H[b] == BK){
    H[v] = BK;
    H[h] = RD;
    return;
}
```


### 小情形 5：$h$ 为黑色，$a$ 为红色，$b$ 为黑色

![](https://cdn.luogu.com.cn/upload/image_hosting/lcb5fn1d.png)

我们需要先把 $a$ 旋转上去，再将 $a$ 染黑，将 $h$ 染红。接着，情形 $5$ 将会被转移成情形 $6$。同样地，${v,h,a,b}$ 的值要同步更新。

- $h\gets a$；
- $a$ 重新赋值为 $h$ 的「与 $u$ 同向」的儿子；
- $a$ 重新赋值为 $h$ 的「与 $u$ 反向」的儿子。

在操作之前，从 $v$ 出发到达 $A,B,C,D,E,F$ 经过的黑色节点数分别是：

- $\mathit{color}+1$；
- $\mathit{color}+1$；
- $\mathit{color}+1$；
- $\mathit{color}+1$；
- $\mathit{color}+2$；
- $\mathit{color}+2$。

操作之后，这些值变成了：

- $\mathit{color}+1$；
- $\mathit{color}+1$；
- $\mathit{color}+1$；
- $\mathit{color}+1$；
- $\mathit{color}+2$；
- $\mathit{color}+2$。

```cpp
// Case 5 :
if(H[a] == RD && H[b] == BK){
    rotate(root, a);
    H[a] = BK;
    H[h] = RD;
    h = a;
    a = X[h][ f];
    b = X[h][!f];
}
```


### 小情形 6：$h$ 为黑色，$b$ 为红色

![](https://cdn.luogu.com.cn/upload/image_hosting/iy38olh7.png)

这是最后一种情形。我们需要先把 $h$ 旋转上去，再将 $h,v$ 的颜色互换。**注意节点 $\bm b$ 也要染成黑色**。

在操作之前，从 $v$ 出发到达 $A,B,C,D,E,F$ 经过的黑色节点数分别是：

- $\mathit{color}_1+1$；
- $\mathit{color}_1+1$；
- $\mathit{color}_1+1+\mathit{color}_2$；
- $\mathit{color}_1+1+\mathit{color}_2$；
- $\mathit{color}_1+1$；
- $\mathit{color}_1+1$。

操作之后，这些值变成了：

- $\mathit{color}_1+2$；
- $\mathit{color}_1+2$；
- $\mathit{color}_1+1+\mathit{color}_2$；
- $\mathit{color}_1+1+\mathit{color}_2$；
- $\mathit{color}_1+1$；
- $\mathit{color}_1+1$。

所以是符合维护要求的。

```cpp
// Case 6 :
{
    rotate(root, h);
    swap(H[h], H[v]);
    H[b] = BK;
    return;
}
```


### 完整代码

```cpp
#include<bits/stdc++.h>
#define up(l, r, i) for(int i = l, END##i = r;i <= END##i;++ i)
#define dn(r, l, i) for(int i = r, END##i = l;i >= END##i;-- i)
using namespace std;
typedef long long i64;
const int INF = 2147483647;
namespace RBT{
    #define BK 0
    #define RD 1 
    const int SIZ = 1e5 + 1e6 + 3;
    int sz, X[SIZ][2], C[SIZ], S[SIZ], W[SIZ], F[SIZ];
    bool H[SIZ];
    bool is_root(int x){ return   F[x]     == 0;}
    bool is_rson(int x){ return X[F[x]][1] == x;}
    void pushup(int t){
        S[t] = S[X[t][0]] + S[X[t][1]] + C[t];
    }
    int newnode(int w){
        ++ sz;
        X[sz][0] = 0, X[sz][1] = 0;
        C[sz] = S[sz] = 1;
        W[sz] =  w,
        H[sz] = RD;
        return sz; 
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
    void maintain1(int &root, int u){
        if(F[  u ] == 0) return H[  u ] = BK, void();   // Case 1
        if(H[F[u]] == 0) return;                        // Case 2
        int v = F[u], w = F[v];
        bool f = is_rson(u);
        bool g = is_rson(v);
        int x = X[w][!g];
        if(H[x] == RD){ // Case 3
            H[x] = BK, H[v] = BK, H[w] = RD;
            maintain1(root, w);
        } else {
            // Case 4 :
            if(f != g)
                rotate(root, u), swap(u, v), f = !f;

            // Case 5 :
            rotate(root, v);
            H[w] = RD, H[v] = BK;
        }
    }
    void insert(int &root, int w){
        if(root == 0) {root = newnode(w), H[root] = BK; return;}
        int x = root, o = x;
        for(;x;o = x, x = X[x][w > W[x]]){
            ++ S[x]; if(w == W[x]){ ++ C[x], o = x; break;}
        }
        if(W[o] != w){
            if(w < W[o]) X[o][0] = newnode(w), F[sz] = o, o = sz;
            else         X[o][1] = newnode(w), F[sz] = o, o = sz;
            maintain1(root, o);
        }
    }
    void maintain2(int &root, int u){
        // Case 1 :
        if(F[u] == 0) return;

        int v = F[u]; bool f = is_rson(u);
        int h = X[v][!f];
        int a = X[h][ f];
        int b = X[h][!f];

        // Case 2 :
        if(H[a] == BK && H[b] == BK && H[h] == BK && H[v] == BK){
            H[h] = RD;
            maintain2(root, v);
            return;
        }

        // Case 3 :
        if(H[h] == RD){
            rotate(root, h);
            H[h] = BK;
            H[v] = RD;
            h = a;
            a = X[h][ f];
            b = X[h][!f];
        }

        // Case 4 :
        if(H[v] == RD && H[a] == BK && H[b] == BK){
            H[v] = BK;
            H[h] = RD;
            return;
        }

        // Case 5 :
        if(H[a] == RD && H[b] == BK){
            rotate(root, a);
            H[a] = BK;
            H[h] = RD;
            h = a;
            a = X[h][ f];
            b = X[h][!f];
        }

        // Case 6 :
        {
            rotate(root, h);
            swap(H[h], H[v]);
            H[b] = BK;
            return;
        }
    }
    void erase(int &root, int w){
        int sss = S[root];
        int x = root, o = x;
        for(;x;o = x, x = X[x][w > W[x]]){
            -- S[x]; if(w == W[x]){ -- C[x], o = x; break;}
        }
        if(C[o] == 0){
            if(X[o][0] != 0 && X[o][1] != 0){
                int y = X[o][1];
                while(X[y][0]) y = X[y][0];
                swap(C[o], C[y]);
                swap(W[o], W[y]);
                for(int p = y;p != o;p = F[p])
                    pushup(p);
                pushup(o), o = y;
            }
            if(X[o][0] == 0 && X[o][1] == 0){
                if(F[o] == 0) root = 0;
                else {
                    if(H[o] == BK)
                        maintain2(root, o);
                    X[F[o]][is_rson(o)] = 0;
                }
            } else {
                int s = X[o][0] ? X[o][0] : X[o][1];
                H[s] = BK;
                F[s] = F[o];
                if(F[o])
                    X[F[o]][is_rson(o)] = s,
                    pushup(F[o]);
                else
                    root = s;
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
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}

int main(){
    using namespace RBT;
    int n = qread(), m = qread(), root = 0;
    up(1, n, i){
        int a = qread(); insert(root, a);
    }
    int lastans = 0, ans = 0;
    up(1, m, i){
        int op = qread(), x = qread() ^ lastans;
        switch(op){
            case 1 : insert(root, x); break;
            case 2 : erase (root, x); break;
            case 3 : ans ^= (lastans = find_rank(root, x)); break;
            case 4 : ans ^= (lastans = find_kth (root, x)); break;
            case 5 : ans ^= (lastans = find_pre (root, x)); break;
            case 6 : ans ^= (lastans = find_suc (root, x)); break;
        }
    }
    printf("%d\n", ans);
    return 0;
}
