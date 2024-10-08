---
create_time: 1669510738
update_time: 1669510738
title: '题解 P8876 【[传智杯 #5 初赛] H-二人的世界】'
board: 1
tag:
- 1
extension:
  problem:
    id: P8876
    type: P
    title: '[传智杯 #5 初赛] H-二人的世界'
    difficulty: 8
    submitted: true
    accepted: true
---
### 题解

搜索题。

注意一个重要性质：**水流之间可视为互不干扰的**。虽然确实有强度更大的水流可以覆盖强度更小的水流这样的设定，但容易发现强度更大的水流，可以流到的空间，包含了强度更小的水流。

（感性理解一下）

于是可以考虑，从高到低计算每个高度有哪些位置是有水流的。下面定义结构体 $\text{Pos2}$ 用来存储二维坐标，结构体 $\text{Pos3}$ 用来存储三维坐标。

- 先开一个 $\text{map}\lang \text{Pos3},\text{bool}\rang$ 存一下整个空间里有哪些位置是有实体方块的，记作 $B$。
- 再开一个 $\text{map}\lang \text{Pos2},\text{bool}\rang$ 存一下当前高度有哪些方块是有水方块的，记作 $W$。

对于输入进来的每个实体方块 $(x,y,h)$，都塞到 $B$ 里。$B(x,y,h)\gets\text{true}$；对于起始水方块的位置 $(x_0,y_0)$，塞到 $W$ 里，$W(x_0,y_0)\gets\text{true}$。

首先将所有实体方块按照 $h$ 值的大小由大到小排序，枚举每个高度 $h$。记高度为 $h$ 的方块组成的集合为 $B_h$，那么 $W$ 中的水柱可能会有一些流到了 $B_h$ 里的某些方块上，发生了扩散。**从 $\bm {B_h}$ 出发**，算出这些会发生扩散的二维坐标位置，放到队列 $P$ 里。当然，如果 $(x,y)$ 位置会发生扩散，那就代表扩散完后 $(x,y,h)$ 位置肯定没有水方块，于是 $W$ 里要删除 $(x,y)$ 位置。

为什么不枚举 $W$ 内的坐标来确定有哪些位置会发生扩散？因为这么做复杂度是 $\mathcal O(|W|\log |W|)$ 的，而枚举 $B_h$ 内的坐标复杂度是 $\mathcal O(|B_h|\log |B|)$ 的。前者容易构造出一个 $|W|$ 较大，并且不同的高度够多的数据，将时间复杂度卡到 $\mathcal O(n^2)$，是不可以的。后者则是正确的复杂度。

现在我们要对 $P$ 里的水流进行扩散了。为了扩散，我们需要知道第 $h$ 层每个点到达目标位置的最短距离。对于 $P$ 里的每个位置都算一次这个距离，复杂度达到了 $\mathcal O(|P|\log|P|\cdot |B_h|\log|B|)$，这是不可接受的。

但是可以发现，这一层实际有用的目标位置（紧挨在一个实体方块旁边）是不多的，个数是 $\mathcal O(|B_h|)$ 级别。考虑找到这些有用的目标位置，放到队列 $Q$ 里。怎么找目标位置呢？还是要枚举 $B_h$ 内的坐标，检查一下它四周是不是没有实体方块。如果没有实体方块那就丢 $Q$ 里。可以去重，不去重应该也没啥问题。如果想要去重，那还要开一个 $\text{map}\lang \text{Pos2},\text{bool}\rang$（记为 $V$）存一下有那些位置已经放进 $Q$ 里了。

当 $Q$ 初始值求好后，就可以宽度优先搜索，计算出 $B_h$ 内每个点到达目标结点的最短长度。这样时间复杂度降为了 $\mathcal O(|B_h|\log |B|)$。

- 先要开一个 $\text{map}\lang \text{Pos2},\text{int}\rang$ 存一下每一个位置到达目标位置的最短距离，记为 $D$。
- 还要开一个 $\text{map}\lang \text{Pos2},\text{int}\rang$ 存一下 $P$ 里面每个位置它的水方块的强度，记为 $K$。

接着从 $P$ 里的位置开始进行宽度优先搜索。从 $(x,y)$ 位置可以到达 $(x',y')$ 位置，当且仅当 $(x',y',h+1)$ 位置没有实体方块，并且 $D(x',y')=D(x,y)-1$，并且 $K(x,y)>1$。

当然，如果 $(x,y)$ 位置已经是目标位置，那就令 $W(x,y)\gets \text{true}$。

最后是时间复杂度分析。上面出现的三个过程时间复杂度全部都是 $\mathcal O(|B_h|\log |B|)$，直接求和，得到总时间复杂度为 $\mathcal O(n\log n)$。

### 参考代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l,END##i=r;i<=END##i;++i)
#define dn(r,l,i) for(int i=r,END##i=l;i>=END##i;--i)
using namespace std;
typedef long long i64;
const int INF =2147483647;
struct Pos2{
    int x, y;
    Pos2(int _x = 0, int _y = 0):x(_x), y(_y){}
    const bool operator < (const Pos2 &t) const {
        if(x != t.x) return x < t.x;
        return y < t.y;
    }
    const bool operator > (const Pos2 &t) const {
        if(x != t.x) return x > t.x;
        return y > t.y;
    }
    const bool operator ==(const Pos2 &t) const {
        return x == t.x && y == t.y;
    }
};
struct Pos3{
    int x, y, z;
    Pos3(int _x = 0, int _y = 0, int _z = 0):
        x(_x), y(_y), z(_z){}
    const bool operator < (const Pos3 &t) const {
        if(x != t.x) return x < t.x;
        if(y != t.y) return y < t.y;
        return z < t.z;
    }
    const bool operator > (const Pos3 &t) const {
        if(x != t.x) return x > t.x;
        if(y != t.y) return y > t.y;
        return z > t.z;
    }
    const bool operator ==(const Pos3 &t) const {
        return x == t.x && y == t.y && z == t.z;
    }
};
const int BASE = 13331;
struct Hash{
    unsigned operator ()(const Pos2 t) const{
        return t.x * BASE + t.y;
    }
    unsigned operator ()(const Pos3 t) const{
        return (t.x * BASE + t.y) * BASE + t.z;
    }
};
unordered_map<Pos3, bool, Hash> B;   // 存 (x, y, z) 是否有方块
unordered_map<Pos2, bool, Hash> V;   // 存 (x, y, h + 1) 有没有使用过
unordered_map<Pos2, int , Hash> D;   // 存 (x, y) 的最短路程
unordered_map<Pos2, bool, Hash> W;   // 存 (x, y, h + 1) 位置有没有水方块
unordered_map<Pos2, int , Hash> K;   // 存 (x, y, h + 1) 位置水方块的强度
const int DIR[4][2] = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
const int MAXN = 2e5 + 3;
int n, p, X[MAXN], Y[MAXN], Z[MAXN], I[MAXN];
int qread(){
    int w = 1, c, ret;
    while((c = getchar()) >  '9' || c <  '0') w = (c == '-' ? -1 : 1); ret = c - '0';
    while((c = getchar()) >= '0' && c <= '9') ret = ret * 10 + c - '0';
    return ret * w;
}
bool cmp(int a, int b){ return Z[a] > Z[b]; }
int _x0, _y0;
int main(){
    n = qread(), p = qread(), _x0 = qread(), _y0 = qread();
    W[Pos2(_x0, _y0)] = true;
    up(1, n, i){
        X[i] = qread(), Y[i] = qread(), Z[i] = qread(), I[i] = i;
        B[Pos3(X[i], Y[i], Z[i])] = true;
    }
    sort(I + 1, I + 1 + n, cmp);
    up(1, n, i){
        int h = Z[I[i]], j;
        queue <Pos2> P, Q;
        for(j = i;j <= n && Z[I[j]] == h;++ j){
            int o = I[j], x = X[o], y = Y[o];
            Pos2 u(x, y);
            if(W.count(u))
                P.push(u), K[u] = p, W.erase(u);
            up(0, 3, k){
                int nx = x + DIR[k][0];
                int ny = y + DIR[k][1];
                Pos2 v(nx, ny);
                if(!V.count(v) && !B.count(Pos3(nx, ny, h))
                    && !B.count(Pos3(nx, ny, h + 1)))
                    V[v] = true, D[v] = 0, Q.push(v);
            }
        }
        while(!Q.empty()){
            Pos2 u = Q.front(); Q.pop(); int x = u.x, y = u.y;
            up(0, 3, k){
                int nx = x + DIR[k][0];
                int ny = y + DIR[k][1];
                Pos2 v(nx, ny);
                if(!D.count(v) && B.count(Pos3(nx, ny, h))
                    && !B.count(Pos3(nx, ny, h + 1)))
                    D[v] = D[u] + 1, Q.push(v);
            }
        }
        while(!P.empty()){
            Pos2 u = P.front(); P.pop(); int x = u.x, y = u.y;
            int d = D[u], s = K[u];
            if(!B.count(Pos3{x, y, h})){
                W[u] = true; continue;
            }
            if(s == 1) continue;
            up(0, 3, k){
                int nx = x + DIR[k][0];
                int ny = y + DIR[k][1];
                Pos2 v(nx, ny);
                if( D[v] == d - 1)
                if(!K.count(v) && !B.count(Pos3(nx, ny, h + 1)))
                    K[v] = s - 1, P.push(v);
            }
        }
        i = j - 1, D.clear(), K.clear(), V.clear();
    }
    printf("%u\n", W.size());
    return 0;
}
```

参考代码 $2$：

```java
import java.io.*;
import java.util.*;

public class Main {
    public static class Vec2d {
        public int x, y;

        public Vec2d(int x, int y) {
            this.x = x;
            this.y = y;
        }

        @Override
        public int hashCode() {
            return Arrays.hashCode(new int[] {x, y});
        }

        public boolean equals(Vec2d vec2d) {
            return this.x == vec2d.x && this.y == vec2d.y;
        }
        @Override
        public boolean equals(Object vec2d) {
            if (!(vec2d instanceof Vec2d))
                return false;
            return this.x == ((Vec2d) vec2d).x && this.y == ((Vec2d) vec2d).y;
        }
    }

    public static class Vec3d {
        public int x, y, z;

        public Vec3d(int x, int y, int z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        @Override
        public int hashCode() {
            return Arrays.hashCode(new int[] {x, y, z});
        }
        public boolean equals(Vec3d vec2d) {
            return this.x == vec2d.x && this.y == vec2d.y && this.z == vec2d.z;
        }
        @Override
        public boolean equals(Object vec2d) {
            if (!(vec2d instanceof Vec3d))
                return false;
            return this.x == ((Vec3d) vec2d).x && this.y == ((Vec3d) vec2d).y && this.z == ((Vec3d) vec2d).z;
        }
    }

    public static class Scanner {
        public BufferedReader in;
        public StringTokenizer tok;

        public String next() {
            hasNext();
            return tok.nextToken();
        }

        public String nextLine() {
            try {
                return in.readLine();
            } catch (Exception e) {
                return null;
            }
        }

        public long nextLong() {
            return Long.parseLong(next());
        }

        public int nextInt() {
            return Integer.parseInt(next());
        }

        public PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

        public boolean hasNext() {
            while (tok == null || !tok.hasMoreTokens()) try {
                tok = new StringTokenizer(in.readLine());
            } catch (Exception e) {
                return false;
            }
            return true;
        }

        public Scanner(InputStream inputStream) {
            in = new BufferedReader(new InputStreamReader(inputStream));
        }
    }

    public static Map<Vec3d, Boolean> isblock = new HashMap<>();
    public static Map<Vec2d, Boolean> isused = new HashMap<>();
    public static Map<Vec2d, Integer> dist = new HashMap<>();
    public static Map<Vec2d, Boolean> iswater = new HashMap<>();
    public static Map<Vec2d, Integer> strwater = new HashMap<>();


    public static final int[] dx = {1, -1, 0, 0}, dy = {0, 0, 1, -1};

    public static int n, k, _x0, _y0;
    public static int[] x = new int[100050], y = new int[100050], z = new int[100050];
    public static List<Integer> var_id = new ArrayList<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        n = scanner.nextInt();
        k = scanner.nextInt();
        _x0 = scanner.nextInt();
        _y0 = scanner.nextInt();
        iswater.put(new Vec2d(_x0, _y0), true);
        for (int i = 1; i <= n; i++) {
            x[i] = scanner.nextInt();
            y[i] = scanner.nextInt();
            z[i] = scanner.nextInt();
            isblock.put(new Vec3d(x[i], y[i], z[i]), true);
            var_id.add(i);
        }
        var_id.sort((x, y) -> z[y] - z[x]);
        List<Integer> id = new ArrayList<>();
        id.add(0);
        for (int i = 0; i < n; ++i)
            id.add(var_id.get(i));
        for (int i = 0; i < 5; ++i)
            id.add(0);
        for (int i = 1; i <= n; i++) {
            int height = z[id.get(i)];
            Queue<Vec2d> p = new LinkedList<>(), q = new LinkedList<>();
            // spread at the same height
            for (int nid = id.get(i); i <= n && z[nid] == height; ) {
                int nx = x[nid], ny = y[nid];
                Vec2d u = new Vec2d(nx, ny);
                if (iswater.getOrDefault(u, false)) {
                    iswater.put(u, false);
                    p.add(u);
                    strwater.put(u, k);
                }
                for (int j = 0; j < 4; j++) {
                    int nx1 = nx + dx[j], ny1 = ny + dy[j];
                    Vec2d v = new Vec2d(nx1, ny1);
                    Vec3d v1 = new Vec3d(nx1, ny1, height);
                    Vec3d v2 = new Vec3d(nx1, ny1, height + 1);
                    if (!isused.getOrDefault(v, false) && !isblock.getOrDefault(v1, false) && !isblock.getOrDefault(v2, false)) {
                        isused.put(v, true);
                        dist.put(v, 0);
                        q.add(v);
                    }
                }
                i++;
                nid = id.get(i);
            }
            i--;
            // spread water in Q
            while (!q.isEmpty()) {
                Vec2d var1 = q.element();
                q.remove();
                int x = var1.x, y = var1.y;
                Vec2d u = new Vec2d(x, y);
                for (int j = 0; j < 4; j++) {
                    int nx = x + dx[j], ny = y + dy[j];
                    Vec2d v = new Vec2d(nx, ny);
                    Vec3d v1 = new Vec3d(nx, ny, height);
                    Vec3d v2 = new Vec3d(nx, ny, height + 1);
                    if (dist.getOrDefault(v, 0) == 0 && isblock.getOrDefault(v1, false) && !isblock.getOrDefault(v2, false)) {
                        dist.put(v, dist.get(u) + 1);
                        q.add(v);
                    }
                }
            }
            //spread water in P
            while (!p.isEmpty()) {
                Vec2d var1 = p.element();
                p.remove();
                int x = var1.x, y = var1.y;
                Vec2d u = new Vec2d(x, y);
                Vec3d u1 = new Vec3d(x, y, height);
                int d = dist.getOrDefault(u, 0), s = strwater.getOrDefault(u, 0);
                if (!isblock.getOrDefault(u1, false)) {
                    iswater.put(u, true);
                    continue;
                }
                if (s == 1)
                    continue;
                for (int j = 0; j < 4; j++) {
                    int nx = x + dx[j], ny = y + dy[j];
                    Vec2d v = new Vec2d(nx, ny);
                    Vec3d v1 = new Vec3d(nx, ny, height + 1);
                    if (dist.getOrDefault(v, 0) == d - 1 && strwater.getOrDefault(v, 0) == 0 && !isblock.getOrDefault(v1, false)) {
                        strwater.put(v, s - 1);
                        p.add(v);
                    }
                }
            }
            isused.clear();
            dist.clear();
            strwater.clear();
        }
        int cnt = 0;
        for (boolean i : iswater.values()) {
            cnt += i ? 1 : 0;
        }
        System.out.println(cnt);
    }
}
