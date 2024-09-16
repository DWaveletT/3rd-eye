---
create_time: 1692584703
update_time: 1692584703
title: 【笔记】高精度整数
board: 1
tag:
- 2
---

常见的整型只能存储大小有限的数字。比如 $\text{int}$ 通常只能存下最大 $2^{31}-1$ 大小的数字，$\text{long long}$ 通常只能存下最大 $2^{63}-1$ 大小的数字。为了能存储下更大的数字，比如 $10^{1000}$，需要实现高精度。

高精度的基本思路是使用数组存储数值的每一位，将针对于整数的操作变成针对整数数组的操作。因为高精度整数的数值通常很大，因此分析复杂度时用 $n$ 表示这个整数的位数。

某些简单的运算法则，比如加法和减法，按照竖式模拟即可在 $\mathcal O(n)$ 的优秀复杂度下实现；乘法，则已经需要使用多项式科技才可以做到 $\mathcal O(n\log n)$；更进一步地，除法、开根则需要在多项式的基础上使用牛顿迭代法，至于更加复杂的操作，诸如 $\exp,\ln$，以及三角函数值的求解，则需要更深一层的数学原理来实现。

总而言之，高精度是一门很深刻的学问。如果出题人在并非迫不得已的情形下刻意刁难选手写高精度，通常是精神出了问题。请帮助其就医。

## 高精度整型的存储

我们使用 $\mathrm{vector\lang int\rang}$ 存储数值，常见思路是去存储每一个位上表示的数字。把大整数看作 $\mathsf{BASE}$ 进制的数，数组的每个元素存储其在 $\mathsf{BASE}$ 进制下的数码。因为我们通常需要将结果以十进制的方式输入输出，而进行一般的高精度进制转换时间复杂度较大，所以使用的进制数 $\mathsf{BASE}$ 最好是 $10$ 的次幂。

代码实现里取了 $\mathsf{BASE}=10^9$，这样可以防止在进行加减法时产生溢出，同时可以尽可能地减小常数的开销。记 $\kappa=\lg \mathsf{BASE}=9$。

此外，尽管数学习惯上我们将「第 $i$ 位数字」认为是从高位往低位数的第 $i$ 个数码，但是存储在数组里我们将第 $i$ 位元素存储为从低位往高位数的第 $i+1$ 位数码（数组下标从 $0$ 开始）。尽管这种存储方式并不能减小运算时的时间复杂度，但是可以降低代码的编写难度。这是因为这样存储可以让对应下标存储的元素对应的位也相同。

![](https://cdn.luogu.com.cn/upload/image_hosting/yerijy8d.png)

这是存储 $1{,}145{,}141{,}919{,}810$ 的例子。$\mathit{digit}$ 数组的存储值为 $[810,919,141,145,1]$。

此外我们使用一个 $\mathrm{bool}$ 类型的变量 $\mathtt{negative}$ 用于存储该整数是否为负数。

我们用 $\mathrm{digit}$ 数组为空来表示大整数为 $0$。在重载输入输出的时候加上对 $0$ 的特判。

```cpp
const int BIGINT_BASE  = 1000000000;
const int BIGINT_BASEK = 9;

struct bigint{
    /*
        `false` : positive
        `true`  : negative

        When `digits` is empty, then `negative` is forced to be `false`.
    */
    bool negative;

    // Store digits in BASE.
    vector <int> digits;

    bigint() : digits(), negative(false) {}

    /*
        Generate a `bigint` with a string.
        We will check whether `number` is a valid integer.
    */
    bigint(const string number){
        if(number.empty() || (number[0] == '-' && number.size() == 1)){
            cerr << "Not a valid integer" << endl;
            exit(-1);
        }
        if(number[0] == '-')
            negative = true;
        for(int i = number.length();i > negative;i -= BIGINT_BASEK){
            int _value = 0;
            for(int j = 0;j < BIGINT_BASEK;++ j)
                if(i - BIGINT_BASEK + j >= negative){
                    const char &_digit = number[i - BIGINT_BASEK + j];
                    if(!isdigit(_digit)){
                        cerr << "Not a valid integer" << endl;
                        exit(-1);
                    } else {
                        _value = _value * 10 +  _digit - '0';
                    }
                    
                }
            digits.push_back(_value);
        }
        
        // If number equals to 0, than we set `digits` to empty.
        if(digits.size() == 1 && digits[0] == 0){
            negative = false;
            digits.clear();
        }
    }
    
    template <typename I>
    bigint(const I number) { bigint(to_string(number)); }
};



template<typename _CharT, typename _Traits>
    basic_istream<_CharT, _Traits>&
    operator >> (basic_istream<_CharT, _Traits> &_is, bigint &value){
    string _value;
    _is >> _value;
    value = bigint(_value);
    return _is;
}

template<typename _CharT, typename _Traits>
    basic_ostream<_CharT, _Traits>&
    operator << (basic_ostream<_CharT, _Traits> &_os, const bigint value){
    if(value.digits.empty()){
        _os << '0';
    } else {
        if(value.negative)
            _os << '-';
        _os << value.digits.back();
        for(int i = value.digits.size() - 2;i >= 0;-- i)
            _os << setw(BIGINT_BASEK)
                << setfill('0')
                << value.digits[i];
    }
    return _os;
}
```

## 高精度整型的大小比较


### 等于

当且仅当两个整数的符号值与 $\mathrm{digit}$ 数组值都相同时，认为两者相等。

### 大于/小于/大于等于/小于等于

依次进行如下判断：

- 如果符号不同，则为正数的那个更大；
- 如果长度不同，则长度更长的那个更大/更小，结果对符号位取异或；
- 从最高位开始向低位枚举，找到第一个不同的位，根据在这一位上两个数码的大小关系判定两个整数的大小关系；
- 如果没有找到不相等的位，则两个整数相等。

```cpp
const int _Value_three_way_comp(const bigint &a, const bigint &b){
    if(a.digits.size() != b.digits.size())
        return a.digits.size() < b.digits.size() ? -1 : 1;
    for(int i = a.digits.size() - 1;i >= 0;-- i)
        if(a.digits[i] != b.digits[i])
            return a.digits[i] < b.digits[i] ? -1 : 1;
    return 0;
}
const bool operator < (const bigint &a, const bigint &b){
    if(a.negative != b.negative)
        return a.negative;
    return ((a.negative ? -1 : 1) * _Value_three_way_comp(a, b) <  0);
}
const bool operator > (const bigint &a, const bigint &b){
    if(a.negative != b.negative)
        return b.negative;
    return ((a.negative ? -1 : 1) * _Value_three_way_comp(a, b) >  0);
}
const bool operator ==(const bigint &a, const bigint &b){
    if(a.negative != b.negative)
        return false;
    return ((a.negative ? -1 : 1) * _Value_three_way_comp(a, b) == 0);
}
const bool operator <=(const bigint &a, const bigint &b){
    if(a.negative != b.negative)
        return a.negative;
    return ((a.negative ? -1 : 1) * _Value_three_way_comp(a, b) <= 0);
}
const bool operator >=(const bigint &a, const bigint &b){
    if(a.negative != b.negative)
        return b.negative;
    return ((a.negative ? -1 : 1) * _Value_three_way_comp(a, b) >= 0);
}
```

## 高精度加法

当两个高精度整数的符号位相同时进行加法。否则修改后者的符号，并进行减法。

下面讨论加数和被加数符号相同的情况。从低位开始枚举，将加数与被加数的对应数码相加。如果结果大于等于 $\mathsf{BASE}$，则需要进位。用一个变量 $\verb!inc!$ 维护进位。

```cpp
// Ignore the sign of the two bigint.
bigint _Value_plus(const bigint &a, const bigint &b){
    bigint _result;
    int _len = max(a.digits.size(), b.digits.size());
    int _inc = 0;
    for(int i = 0;i < _len;++ i){
        int _value = 0;
        if(i < a.digits.size())
            _value += a.digits[i];
        if(i < b.digits.size())
            _value += b.digits[i];
        _value += _inc;
        if(_value >= BIGINT_BASE)
            _value -= BIGINT_BASE,
            _inc    = 1;
        else 
            _inc    = 0;
        _result.digits.push_back(_value);
    }
    if(_inc)
        _result.digits.push_back(_inc);
    return _result;
}
```

时间复杂度为 $\mathcal O(n/\kappa)$。

## 高精度减法

当两个高精度整数的符号位相同时进行减法。否则修改后者的符号，并进行加法。同时为了便于实现，约定被减数要大于减数，否则要交换两者并讨论一下符号。

下面讨论减数和被减数符号相同且前者不小于后者的情况。与加法运算类似，我们枚举每一位，让被减数的对应数码减掉减数的对应数码。结果可能小于 $0$，此时需要借位，也就是向更高一位借一个 $1$ 来。同样地，使用一个变量 $\verb!dec!$ 用于维护借位。

因为保证了被减数不小于减数，所以不需要考虑改变符号。

```cpp
// Ignore the sign of the two bigint.
// Ensure that `a >= b` is true.
bigint _Value_minus(const bigint &a, const bigint &b){
    bigint _result;
    int _len = max(a.digits.size(), b.digits.size());
    int _dec = 0;
    for(int i = 0;i < _len;++ i){
        int _value = 0;
        if(i < a.digits.size())
            _value += a.digits[i];
        if(i < b.digits.size())
            _value -= b.digits[i];
        _value -= _dec;
        if(_value < 0)
            _value += BIGINT_BASE,
            _dec    = 1;
        else 
            _dec    = 0;
        _result.digits.push_back(_value);
    }
    while(!_result.digits.empty()
        && _result.digits.back () == 0)
        _result.digits.pop_back();
    return _result;
}
```

时间复杂度为 $\mathcal O(n/\kappa)$。

---

根据参与运算的两个元素的符号关系即大小关系进行讨论，完成重载运算符的编写。

```cpp
bigint operator +(const bigint &a, const bigint &b){
    bigint _result;
    if(a.negative != b.negative){
        if(_Value_three_way_comp(a, b) < 0){
            _result = _Value_minus(b, a);
            _result.negative = !a.negative;
        } else {
            _result = _Value_minus(a, b);
            _result.negative =  a.negative;
        }
    } else {
        _result = _Value_plus(a, b);
        _result.negative = a.negative;
    }
    return _result;
}

bigint operator -(const bigint &a, const bigint &b){
    bigint _result;
    if(a.negative != b.negative){
        _result = _Value_plus(a, b);
        _result.negative = a.negative;
    } else {
        if(_Value_three_way_comp(a, b) < 0){
            _result = _Value_minus(b, a);
            _result.negative = !a.negative;
        } else {
            _result = _Value_minus(a, b);
            _result.negative =  a.negative;
        }
    }
    return _result;
}
```

## 高精度乘法

### 竖式乘法

高精度乘法是高精度计算的第一个障碍。虽然我们仍可以朴素地模拟竖式乘法运算，但这么做的时间复杂度将会是 $\mathcal O((n/\kappa)^2)$。它在较小的数据范围下表现良好，但是当数据量较大时则会变得很慢。

本着数据分治的思想，对于比较小的 $n$，仍然使用 $\mathcal O((n/\kappa)^2)$ 的竖式模拟高精度乘法。

```cpp
// Ignore the sign of the two bigint.
// The time complexity of this algorithm is O((n / K)^2).
bigint _Value_multiply1(const bigint &a, const bigint &b){
    bigint _result;
    int _lena = a.digits.size();
    int _lenb = b.digits.size();
    if(_lena == 0 || _lenb == 0)
        return _result;
    _result.digits.resize(_lena + _lenb);
    for(int i = 0;i < _lena;++ i){
        int _inc = 0;
        for(int j = 0;j < _lenb;++ j){
            int _value = 0;
            const int &_digr = _result.digits[i + j];
            const int &_diga = a.digits[i];
            const int &_digb = b.digits[j];
            _value = (_digr + 1ll * _diga * _digb + _inc) % BIGINT_BASE;
            _inc   = (_digr + 1ll * _diga * _digb + _inc) / BIGINT_BASE;
            _result.digits[i + j] = _value;
        }
        if(_inc){
            _result.digits[i + _lenb] += _inc;
        }
    }
    if(_result.digits.back() == 0)
        _result.digits.pop_back();
    return _result;
}
```

### 加法卷积

注意到，我们所要计算的 $C=A\times B$ 可以表示为如下形式：

$$
\begin{aligned}
A&=\sum_{i=0}^{\mathrm{len}(A)-1} a_i\times 10^i \\
B&=\sum_{i=0}^{\mathrm{len}(B)-1} b_i\times 10^i \\
C&=\sum_{i=0}^{\mathrm{len}(A)-1}\sum_{j=0}^{\mathrm{len}(B)-1} a_i b_j\times 10^{i+j} \\
&=\sum_{i+j=k}a_ib_j\times 10^{k}
\end{aligned}
$$

其本质为加法卷积。为了解决加法卷积问题，我们引入离散傅里叶变换。

---

按照如下形式定义一个 $n$ 阶多项式：

$$
F(x)=\sum_{i=0}^{n} f_ix^i
$$

现在对一个 $n-1$ 阶（注意不是 $n$ 阶）的多项式进行离散傅里叶变换。那么需要引入复数即单位根的概念：

- 扩充实数域 $\Bbb R$，定义复数域 $\Bbb C$ 为 $\{a+b\mathrm i \mid a\in \Bbb R, b\in \Bbb R\}$。其中 $\mathrm i$ 满足 $\mathrm i^2=-1$（某种程度上可以理解成 $\sqrt{-1}$）。

两个复数 $z_1=a_1+b_1\mathrm i$，$z_2=a_2+b_2\mathrm i$ 的加法、减法、乘法运算都可以用加法和乘法的结合律、分配律立即得到。除法因为暂时用不到，所以不考虑。

- $z_1+z_2=(a_1+a_2)+(b_1+b_2)\mathrm i$；
- $z_1-z_2=(a_1-a_2)+(b_1-b_2)\mathrm i$；
- $z_1\times z_2=(a_1\times a_2-b_1\times b_2)+(a_1\times b_1+a_2\times b_2)\mathrm i$。

如果把 $z=a + b\mathrm i$ 看作平面上的一个点 $Z(a, b)$，那么可以定义线段 $OZ$ 的长度 $|OZ|$ 为模长 $|z|$，将 $x$ 轴正半轴绕着原点 $O$ 做逆时针旋转至 $OZ$ 转过的角度称为辐角 $\theta$。

根据三角函数 $\sin$ 和 $\cos$ 的定义，可以立即得到 $z=|z|\times (\cos \theta+\mathrm i\sin \theta)$。根据 $\sin$、$\cos$ 以及 $\exp$ 在复数域下的泰勒展开式可以得到 $z=|z|\times \exp (\mathrm i\theta)$。

此外，可以得到关于复数乘法的重要结论：

- 两个复数 $z_1,z_2$ 相乘的结果 $z=z_1\times z_2$ 相当于「模长相乘，辐角相加（如果辐角大于 $2\pi$，则对 $2\pi$ 取模）」。

可以使用 $z=|z|\times (\cos \theta+\mathrm i\sin \theta)$ 结合三角函数的基本公式进行验证，也能使用 $z=|z|\times \exp (\mathrm i\theta)$ 立即得到。这里不做讨论。

![](https://cdn.luogu.com.cn/upload/image_hosting/iqn19hj0.png)

在复平面上定义 $n$ 次单位根，将单位圆（以原点为圆心，半径为 $1$ 的圆）均分成 $n$ 块（像个切糕一样），约定 $\omega_{n,0}=1$，其它单位根依次排列，定义 $\omega_{n,1},\omega_{n,2},\omega_{n,3},\cdots,\omega_{n,n-1}$。

更形式化地说明，

$$
\omega_{n,i}=\cos \dfrac{2\pi i}{n}+\sin \dfrac{2\pi i}{n}\mathrm i=\exp \left(\dfrac{2\pi i}{n}\right)
$$

单位根 $\omega_{n,i}$ 的模长总是 $1$，辐角为 $\dfrac{2\pi i}{n}$。根据 「模长相乘，辐角相加」的结论，立即得到：

$$
\omega_{n,a}\times \omega_{n,b}=\omega_{n,(a+b)\bmod n}
$$

也就是说，$n$ 次单位根的下标在乘法运算里可以看作是模 $n$ 意义下的一个剩余系。

使用单位根定义离散傅里叶变换：

$$
\hat F=\mathsf{FFT}(F)=[F(\omega_{n,0}),F(\omega_{n,1}),F(\omega_{n,2}),\cdots ,F(\omega_{n,n-1})]
$$

也就是 $n$ 个 $n$ 次单位根带入到 $F(z)$ 后进行运算得到的点值。形式化地写出 $\hat F$ 的表达式为：

$$
\hat{f}_i=\sum_{j=0}^{n-1}f_j(\omega _{n,i})^j=\sum_{j=0}^{n-1}f_j \omega_{n,ij\bmod n}
$$

点值有什么用呢？

考虑现在要对两个多项式 $F(x),G(x)$ 进行相乘。即 $H(x)=F(x)\times G(x)$。那么就应该有 $H(\omega_{n,i})=F(\omega_{n,i})\times G(\omega_{n,i})$。也就是说，如果我们得到了 $F,G$ 的离散傅里叶变换后的序列，就可以在 $\mathcal O(n)$ 复杂度下得到 $H$ 的离散傅里叶变换后的值。

接着考察 $H$ 的系数：

$$
h_{k}=\sum_{i+j=k}f_ig_j
$$

也就是我们所需要求出来的加法卷积。

怎么从 $\mathsf{FFT}(H)$ 还原回 $H$？还原的过程称作离散傅里叶逆变换。注意到这样一个事实：

$$
\begin{aligned}
\mathsf{FFT}(\hat F)_i&=\sum_{j=0}^{n-1}\hat F_i (\omega_{n,i})^j\\
&=\sum_{j=0}^{n-1}\left(\sum_{k=0}^{n-1}f_k (\omega _{n,j})^k\right) (\omega_{n,i})^j\\
&=\sum_{k=0}^{n-1}f_k\times \boxed{\sum_{j=0}^{n-1} \omega_{n,(j(k+i))\bmod n}}
\end{aligned}
$$

下面把注意力放到框出来的这个算式上来。

- 当 $k=n-i$ 时，可以得到：
$$
\begin{aligned}\sum_{j=0}^{n-1} \omega_{n,(jk+ij)\bmod n} =\sum_{j=0}^{n-1} \omega_{n,0}\end{aligned}=n
$$
- 当 $k\neq n-i$ 时，$i+k\not \equiv 0\pmod n$。这个问题变得有趣了起来。我们所要计算的 $\sum \omega_{n,j(ki)}$ 本质上是一个等比数列求和，并且公比 $\omega_{n,ki}$ 不为 $1$。可以发现等比数列求和公式在复数下也是成立的，所以就能得到：
$$
\sum_{j=0}^{n-1} \omega_{n,(j(k+i))\bmod n}=\dfrac{1-(\omega_{n,ki})^n}{1-\omega_{n,ki}}=\dfrac{1-\omega_{n,0}}{1-\omega_{n,ki}}=0
$$

所以可以发现，

$$
\mathsf{FFT}(\hat F)_i=nf_{n-i}
$$

下面解决离散傅里叶变换正变换的过程。

为了应用上更多单位根的性质，我们希望 $n$ 是 $2$ 的整数次幂，即 $n=2^k$。因为我们最终要解决的问题其实是加法卷积而非完全体的离散傅里叶变换，所以可以增大 $n$ 的值并在多余部分赋值上 $0$。$n$ 是 $2$ 的次幂的好处是，

$$
\left(\omega _{2^{k},x}\right)^y=\left(\omega _{2^{k-1},x}\right)^{y/2}
$$

假定要根据 $n-1$ 次多项式 $F$ 来计算 $\hat F_{2^k}$。也就是计算 $F(\omega_{n,0}),F(\omega_{n,1}),F(\omega_{n,2}),\cdots,F(\omega_{n,n-1})$。

当 $n=1$ 时，$F(x)=f_0$，$F(\omega_{n,0})=F(1)=f_0$，直接返回就行。下面讨论 $n>1$。

记 $n'=n/2$。仍然是先写出定义式：

$$
\begin{aligned}
F(\omega_{n,i})&=\sum_{j=0}^{n-1} f_j\times \left(\omega_{n,i}\right)^j\\
&=\sum_{j=0,j\text{ is even}}^{n-1} f_j\times \left(\omega_{n', i}\right)^{j/2}+\omega_{n,i}\times \sum_{j=0,j\text{ is odd}}^{n-1} f_j\times \left(\omega_{n', i}\right)^{(j-1)/2}\\
\end{aligned}
$$

如果我们按照下标的奇偶性进行分类，将偶数划分进 $F_0$，奇数划分进 $F_1$，对其分别做离散傅里叶变换得到 $\hat F_{\text{even}}$ 和 $\hat F_{\text{odd}}$，那么当 $i<n'$ 时就有：

$$
F(\omega_{n,i})=\left(\hat F_{\text{even}}\right)_{i}+\omega _{n,i}\times \left(\hat F_{\text{odd}}\right)_{i}
$$

当 $i\ge n'$ 时，因为 $\omega_{n,n'}=-1$，所以，

$$
F(\omega_{n,i})=\left(\hat F_{\text{even}}\right)_{i}-\omega _{n,i}\times \left(\hat F_{\text{odd}}\right)_{i}
$$

所以只需要分别计算出 $\mathsf{FFT}(F_{\text{even}})$ 和 $\mathsf{FFT}(F_{\text{odd}})$ 就可以 $\mathcal O(n)$ 合并答案。

### 快速数论变换

一类特殊的数字 $P\in\{2,4,p^{\alpha},2p^{\alpha}\}$ 存在原根 $g$，满足 $g^{i}\bmod P$ 取遍 $\varphi(P)$ 内的所有值。而众所周知的整数 $998{,}244{,}353$ 因为是一个质数所以存在原根 $g$，其中最小正原根为 $g_{\min}=3$。

在上文的离散傅里叶变换里，我们用到了单位根 $\omega$。回想一下我们都用了哪些性质：

- $\omega_{n,0}=1$；
- $\omega_{n,\ i}\neq 0$；
- $\omega_{2n,2i}=\omega_{n,i}$；
- $\omega_{2n,\ n}=-1$；
- $\omega_{n,a}\times \omega_{n,b}=\omega_{n,ab\bmod n}$。

现在定义 $g_{n,i}=\left(g_{\min}\right)^{\frac{P-1}{n}\times i}$。因为 $n$ 是 $2$ 的次幂，而常见的 $\mathsf{NTT}$ 模数通常形如 $P=2^{k}\times a+1$（比如 $998244353=7\times 17\times 2^{23}+1$），所以指数在 $n$ 不太大时都是合法的。现在把 $g$ 去对应一下 $\omega$ 的性质，发现居然都很符合。

所以快速数论变换本质上相当于将 $\omega$ 替换成了 $g$ 而已。

### 使用快速数论变换计算高精度乘法

取模数 $P=998244353$，这是一个不超过 $2^{30}$ 且 $P-1$ 里 $2$ 的因子非常多的一个质数，有最小正原根 $g_{min}=3$。使用它可以在多项式的阶数小于 $2^{23}$ 的情况下进行加法卷积。

在模意义下进行计算会导致数值对 $P$ 取模，但是高精度乘法的计算结果不能对任何东西取模，所以需要格外注意计算结果的大小。假设对两个长度为 $n$，进制为 $\mathsf {BASE}$ 的大整数作加法卷积，那么卷积的结果的最大值为 $(n/\kappa)\times \mathsf{BASE}^2$。取 $n=2^{23}$，那么 $\mathsf{BASE}$ 最大只能是 $10^1$。

所以我们不再能使用压位高精来减小常数。但是 $\mathcal O(n\log n)$ 的时间复杂度已经十分优秀。

。

。

。

。

。

。

。

。

。

。

。

。


。

。

。

。

