---
create_time: 1661822058
update_time: 1661822058
title: 题解 【WR2-1C】【「Wdoi-2」魔力的雷云】
board: 1
tag:
- 1
extension:
  problem:
    id: P8542
    type: P
    title: 「Wdoi-2」魔力的雷云
    difficulty: 2147483647
    submitted: true
    accepted: true
---
## 题解

考虑每个 $d_i$ 到底可以给我们提供多少信息。具体而言，从左往右考虑每一块磁铁。每次选择三块磁铁进行讨论。

### 情况一：$\boxed\to\boxed\to\boxed\to$

此时完全无法推断第二块和第三块磁铁的磁力大小，直接忽略。

### 情况二：$\boxed\to\boxed\to\boxed\gets$

- 保留第二块磁铁，总贡献为 $x=p+1+b+c+q$；
- 拿掉第二块磁铁，总贡献为 $y=p+a+c+q$。

做差，发现 $x-y-1=b-a$。可以直接推断出第一块和第二块磁铁的磁力大小。

### 情况三：$\boxed\to\boxed\gets\boxed\gets$

- 保留第二块磁铁，总贡献为 $x=p+a+b+1+q$；
- 拿掉第二块磁铁，总贡献为 $y=p+a+c+q$。

做差，发现 $x-y-1=b-c$。可以直接推断出第二块和第三块磁铁的磁力大小。

### 情况四：$\boxed\to\boxed\gets\boxed\to$

- 保留第二块磁铁，总贡献为 $x=p+a+b+1+b+c+q$；
- 拿掉第二块磁铁，总贡献为 $y=p+q$。

做差，发现 $x-y-1=a+2b+c$。感觉不一定有用阿。但是只要我们知道了 $a$ 或者 $c$ 的大小，就可以计算出剩余磁铁的磁力大小。



---

但是从这些地方，我们可以发现一些结论：

- 如果出现了形如 $\text{AAAAA}$ 形式的方向摆放，最中间的磁铁的磁力大小无需得知。因此可以将所有长度大于 $4$ 的连续段缩成长度为 $4$ 的连续段。
- 如果出现了形如 $\text{ABB}$ 形式的方向摆放，就可以一次性推断出后两块磁铁的磁力。
- 如果出现了形如 $\text{BBA}$ 形式的方向摆放，就可以一次性推断出前两块磁铁的磁力。
- 结合上述三点，对于缩完之后的长度在 $2\sim 4$ 之间的连续段，如果它两端有磁铁，就可以一口气把这一段内所有磁铁的磁力计算出来。
- 那么目前计算不出来磁力的磁铁，肯定都是长度为 $1$ 的互相交错的连续段。他们的两侧就是磁力大小都被计算出来的磁铁，或者是整条磁铁链的顶端。
- 那么结合情形 $3$，可以推知所有磁铁的磁力大小。

---

接着是特殊情况的讨论：

- 如果所有磁铁方向相同，那么所有磁铁的磁力大小都是无关紧要的，可以随便赋值。
- 排除以上一点，肯定会出现不同方向的磁铁。如果磁铁方向呈现了 $\text{ABAB}\cdots$ 的交替情形，那么我们只能枚举某个磁铁的磁力大小来破局。但是你没必要 $\mathcal O(\log n)$ 枚举；事实上，由于情形 $4$，可以发现 $b$ 的可能性是非常有限的。
- 排除以上两点，肯定会出现长度不小于 $2$ 的连续段。可以从这里作为突破口，首先进行链的缩减，接着计算出所有 $2\sim 4$ 段磁铁的磁力大小，接着计算出所有磁铁的磁力大小。

初始时设第一块磁铁方向向左即可。容易发现这不会对结果产生任何影响。不过有可能出现第一块磁铁左右两侧恰好有一块方向和它不同，你却不知道是哪个。那也问题不大，对两种情况分别求解判断合法性即可。

---

如何判断连续段的长度：

- 如果一个磁铁与周围两块磁铁方向都相同，那么拿掉他后，$d$ 只会减小 $1$；
- 如果一个磁铁仅与周围一块磁铁方向不同，那么拿掉他后，$d$ 的减小值模 $3$ 与 $1$ 同余；
- 如果一个磁铁与周围两块磁铁方向都不同，那么拿掉他后，$d$ 的减小值模 $3$ 与 $2$ 同余。

读者可以自行证明。这里不再赘述。

---

如何根据 $a+2b,a\neq b$ 知晓 $a$ 和 $b$ 的值：

- 注意到 $a,b$ 均为 $4$ 的整数次幂，可以设 $a=2^{2u},b=2^{2v}$，相加后为 $2^{2u}+2^{2v+1}$。那么找二进制下两个 $1$，偶数位置的 $1$ 是属于 $a$ 的，奇数位置的 $1$ 是属于 $b$ 的。

如何根据 $a-b,a\neq b$ 知晓 $a$ 和 $b$ 的值：

- 若 $a-b>0$，那么 $b=\text{lowbit}(a-b)$，同时推出 $a=(a-b)+b$。
- 若 $a-b<0$，那么取反后的值为 $b-a>0$，根据上一种情况即可得解。

读者可以自行验证/证明，这里不再赘述。

## 代码

```cpp
#include<bits/stdc++.h>
#define up(l,r,i) for(int i=l,END##i=r;i<=END##i;++i)
#define dn(r,l,i) for(int i=r,END##i=l;i>=END##i;--i)
using namespace std;
typedef unsigned int       u32;
typedef unsigned long long u64;
typedef long long i64;
const int INF =2147483647;
const int MAXN=1e6+3;
i64 D[MAXN],E[MAXN],A[MAXN]; bool F[MAXN]; int n,O[MAXN];
i64 qread(){
    i64 w=1,c,ret;
    while((c=getchar())> '9'||c< '0') w=(c=='-'?-1:1); ret=c-'0';
    while((c=getchar())>='0'&&c<='9') ret=ret*10+c-'0';
    return ret*w;
}
i64 lowbit(i64 t){return t&-t;}
int countz(i64 t){return __builtin_ctzll(t);}
bool check(){
    A[0]=A[n],F[0]=F[n],A[n+1]=A[1],F[n+1]=F[1];
    i64 d0=n,d1=0,dn=0,dx=0;
    up(1,n,i){
        if(A[i]==-1) continue;
        if(A[i]!=(1ll<<(O[i]<<1))) return false;
        if(A[i]==A[i==1?n:i-1]||A[i]==A[i==n?1:i+1])
            return false;
    }
    up(1,n,i) if(F[i]!=F[i+1]) d0+=A[i]+A[i+1];
    if(d0!=D[0]) return false;
    up(1,n,i){
        dx=d0-1;
        if(F[i  ]!=F[i-1]) dx-=A[i  ]+A[i-1];
        if(F[i  ]!=F[i+1]) dx-=A[i  ]+A[i+1];
        if(F[i-1]!=F[i+1]) dx+=A[i-1]+A[i+1];
        if(dx!=D[i]) return false;
    }
    return true;
}
void find_add(i64 w,i64 &p,i64 &q){ // w=p+2q -> p,q
    i64 a=lowbit(w),b=w-a;
    if(countz(a)&1) q=a/2,p=b; else q=b/2,p=a;
}
void find_min(i64 w,i64 &p,i64 &q){ // w=p- q -> p,q
    if(w>0) q=lowbit( w),p=w+q;
    else    p=lowbit(-w),q=p-w;
}
int N[MAXN],M[MAXN];
void maintain1(){
    up(1,n,i) if(A[i]!=-2&&A[i]!=-1){
            int a=i,b=N[a],c=N[b];
            if(F[a]!=F[b]&&F[a]==F[c]){
                find_add(D[0]-D[b]-A[a]-1,A[c],A[b]);
            }
        }
}
void maintain2(){
    up(1,n,i){
        if(A[i]==-1) O[i]=114514+i; else O[i]=countz(A[i])/2;
    }
}
void showshowway(){
    up(1,n,i){
        printf("%lld, %d\n",A[i],F[i]);
    }
}
bool solve2(){
    up(1,n,i) N[i]=i+1; N[n]=1;
    up(1,n,i) M[i]=i-1; M[1]=n;
    up(2,n,i){
        if(  D[0]-D[i]        ==1) F[i+1]= F[i  ]; else
        if(((D[0]-D[i])%3+3)%3==1) F[i+1]=!F[i-1]; else
        if(((D[0]-D[i])%3+3)%3==2) F[i+1]=!F[i  ];
    }
    F[0]=F[n],F[n+1]=F[1]; bool g=0,h=0;
    up(1,n,i) g|=F[i],h|=F[i]==F[i+1];
    if(g==0){
        up(1,n,i) A[i]=-1; maintain2(); return check();
    } else if(h==0){
        i64 w=D[0]-D[1]-1;
        up(0,20,i){
            bool f=false;
            up(0,20,j){
                up(0,20,k){
                    i64 a=1ll<<(j<<1);
                    i64 b=1ll<<(i<<1);
                    i64 c=1ll<<(k<<1);
                    if(w==a+2*b+c) f=true;
                }
            }
            if(f){
                A[1]=(1ll<<(i<<1));
                maintain1(),maintain1(),maintain2();
                if(check()) return true;
            }
        }
    } else {
        up(1,n,i) if(F[i]!=F[M[i]]){
            int l=i,r=i,p=i;
            for(;F[r]==F[N[r]];r=N[r]); if(l==r) continue;
            find_min(D[0]-D[r]-1,A[r],A[M[r]]);
            find_min(D[0]-D[l]-1,A[l],A[N[l]]);
            for(;F[p]==F[N[p]];p=N[p]) if(A[p]==-2) A[p]=-1;
            if(l<r) i=r; else break;
        }
        maintain1(),maintain1(),maintain2();
        return check();
    }
    return 0;
}
void solve1(bool f){
    up(1,n,i) A[i]=-2,F[i]=-1; F[1]=false,F[2]=f;
    if(solve2()){
        up(1,n,i) printf("%d %d\n",F[i],O[i]); exit(0);
    }
}
i64 p1,p2,q1,q2;
int main(){
    n=qread(); up(0,n,i) D[i]=qread();
    if(n==1){puts("1");exit(0);}
    F[1]=false;
    if(  D[0]-D[1]        ==1)              solve1(false); else
    if(((D[0]-D[1])%3+3)%3==1) solve1(true),solve1(false); else
    if(((D[0]-D[1])%3+3)%3==2) solve1(true)              ;
    return 0;
}
