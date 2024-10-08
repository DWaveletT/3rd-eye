---
create_time: 1540098866
update_time: 1540098866
title: CF260B-Ancient Prophesy
board: 1
tag:
- 1
extension:
  problem:
    id: CF260B
    type: CF
    title: Ancient Prophesy
    difficulty: 5.1538
    submitted: true
    accepted: true
---

# 题目大意
给定由数字与**'-'**组成的非空文本串，询问出现最多次数的合法年份是哪个。

合法年份，就是满足$dd-mm-yyyy$结构的年份，比如**13-12-2015**就是合法年份。尤其需要注意的是，形如**01-01-2014**的年份是合法年份，而**1-1-2014**却不是。**【即不足十位要有前导零】**

此外，年数必须要在**2013**至**2015**年之间
# 分析
我想看到题目，大家基本都知道怎么做了吧~~

数据范围在$10^5$以内，而满足条件的字串长度为$10$。显然，我们可以依次取出$s[i$~$i+10-1]$这一段的字符，进行$check$，并用$map$存储每一个年份出现的次数。如何取出一段字符呢？
### 取出字符串
1.也是最简单的方法，直接暴力取出来，代码如下：
```cpp
string cut(string t,int p){
	string ret;
	for(int i=0;i<10;i++)
	ret.push_back(t[i+p]);
	return ret;
}
```
2.既然C++都帮你做好string了，怎么可能没有相关函数呢？
```cpp
string cut(string t,int p){
	return t.substr(p,10);
}
```
3.构造函数也提供了一种初始化方法
```cpp
string cut(string t,int p){
	string ret(t,p,10);
	return ret;
}
```
### 判断合法
观察格式串$dd-mm-yyyy$自然想到先判断**'-'**和数字啦~~
```cpp
if(t[2]!='-'||t[5]!='-') return;
	if(t[0]=='-'||t[1]=='-'||t[3]=='-'||t[4]=='-'||
	   t[6]=='-'||t[7]=='-'||t[8]=='-'||t[9]=='-')
	return;

```
分别取出年月日，判断合法性。注意本题没有闰年，二月份可以大胆判断。~~一直以为2月30天~~
# 代码
```
#include<bits/stdc++.h>
using namespace std;
const int d[13]={0,31,28,31,30,31,30,31,31,30,31,30,31};
map <string,int> mmp;
int ans;
string s,res;
int getnum(char c){
	return c-'0';
}
void check(int p){
	string t(s,p,10);
	if(t.length()<10) return;
	if(t[2]!='-'||t[5]!='-') return;
	if(t[0]=='-'||t[1]=='-'||t[3]=='-'||t[4]=='-'||
	   t[6]=='-'||t[7]=='-'||t[8]=='-'||t[9]=='-')
	return;
	int day=getnum(t[0])*10+getnum(t[1]);
	int mon=getnum(t[3])*10+getnum(t[4]);
	int yea=getnum(t[6])*1000+getnum(t[7])*100+getnum(t[8])*10+getnum(t[9]);
	if(mon<1||mon>12) 		return;
	if(day<1||day>d[mon]) 	return;
	if(yea>2015||yea<2013)	return;
	int num=++mmp[t];
	if(num>ans) ans=num,res=t;
}
int main()
{
 	cin>>s;
 	for(int i=s.length()-10;i>=0;i--)
 	check(i);
 	cout<<res<<endl;
	return 0;
}
