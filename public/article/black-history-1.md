---
create_time: 1549695844
update_time: 1549695844
title: 那些简单粗暴修饰代码的技巧
board: 1
tag:
- 2
---

## 前言
本文主要写~~**(扯)**~~了许许多多作者在编程生活中遇到的各种各样感觉能使代码显得非常$\color{Red}\texttt{高(有)(逼)大(格)上}$的谜之技巧。由于内容非常简单，我相信阅读起来应该不会感到难受hh

### 其中有很多东西广为人知，如果你知道请不要打作者~~

## 目录
### 1.提高代码运行效率
$\color{white}\texttt{233}\color{black}\texttt{2.O2优化}$

$\color{white}\texttt{233}\color{black}\texttt{3.指针}\to\texttt{数组模拟}$

$\color{white}\texttt{233}\color{black}\texttt{1.inline}$

# 正文
## 提高代码运行效率

很多时候，当我们实在想不出某条题目正解$\texttt{(尤其在考试时)}$，往往会试图用暴力骗分。除了玄学优化，常数优化也很重要。毕竟，多过一个$point$说不定就能$Ag\to Au$。因此，掌握一些简单技巧很重要。

### 1.O2优化

~~**开O2其实挺赖皮的哈哈**~~
  
$O2$优化，~~俗称氧气~~，是我们的$C++$编译器中一个编译选项。用了它，编译器就会尽可能提高程序运行效率~~$[$当然也会造成类似编译速度减慢、占用空间变大之类问题$]$~~，在速度方面会有较大提升。
手动开$O2$，只要写下这样一个代码：
```
#pragma G++ optimize(2)
```

至于O3优化，尽管也能提升运行效率，但是用的不多。
### 2.数组模拟指针
研究(实践)表明，很多时候用数组模拟指针，可以得到意想不到的结果~~

当我们写这样的代码：
```cpp
int *p=new int;
...
delete p;
```
其实，我们完全可以开一个足够大的数组(先称为内存池)，当我们想要获取新的存储空间，完全可以写一个简单函数，返回某一个空的内存池上的下标。这样，就可以避免反复申请内存空间导致的无意义的时间浪费~

**这时就有人要问了:万一我想释放内存，这样会不会出锅？**

我们可以用这样一个简单粗暴的代码：
```
int data[MAXS+3],lft[MAXS+3]; //内存池及可使用的内存
int p1=1,p2=MAXS;
void init(){
	for(int i=1;i<=MAXS;i++)
    lft[i]=i;
int nw{
	return lft[p1++];
}
void dlt(int ads){
	lft[p2%MAXS+1]=ads;
}
```
我们新建一个数组$lft$存储下一个可用地址，那么"释放内存"就可以将多出来的内存的地址塞入$lft$数组

### 3.inline 大法
$inline$是一个非常玄学的东西。$\texttt{百度}$描述:

**$inline$是$C++$关键字，在函数声明或定义中函数返回类型前加上关键字inline，即可以把函数指定为内联函数**

~~至于内联函数是什么我也不知道，反正很高大上就是了~~

总之，他可以减少常数。

## 那些
