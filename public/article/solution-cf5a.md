---
create_time: 1586659153
update_time: 1586659153
title: 题解 CF5A 【Chat Server's Outgoing Traffic】
board: 1
tag:
- 1
extension:
  problem:
    id: CF5A
    type: CF
    title: Chat Server's Outgoing Traffic
    difficulty: 2
    submitted: false
    accepted: false
---

## 题目大意

要求统计一个聊天系统的流量总数，共有三个操作：

- $1.$`+<name>`：添加名称叫 `<name>` 的人。
- $2.$`-<name>`：去除名称叫 `<name>` 的人。
- $3.$`<name>:<message>`：名称叫 `<name>` 的人向聊天系统内存在的每个人（包括自己）发送信息 `<message>`。产生的流量是信息长度与聊天系统内人数的乘积。

**保证数据合法**

## 题解

既然没有人用 $\rm Pascal$ 写，那么这里就放一个 $\rm Pascal$ 的题解吧。

$\rm Pascal$ 可以直接用 $\tt readln()$ 读入整行。只需要判断是否到达文件末尾就可以读入多行字符串了。接着就是对读入的字符串进行操作。

题目中有一个很重要的条件，就是添加的人目前必定不在聊天室中，删除的人必定在聊天室中。因此我们不需要考虑加减操作对应的人是否合法，只要遇到 `+` 就让总人数 $+1$，遇到`-`就让总人数 $-1$。

比较关键的是信息长度的统计。我们只需要定位到信息中 `:` 的位置，然后用字符串末尾字符的位置减去它，就可以得到信息的长度。

## 参考代码

```pascal
var s:string; var t,p,l,ans:longint;
begin
t:=0; ans:=0;
while not eof do begin
    readln(s); p:=1; l:=length(s);
    if s[1]='+' then inc(t) else
    if s[1]='-' then dec(t) else begin
        while s[p]<>':' do inc(p);
        ans:=ans+(l-p)*t;
    end;
end;
writeln(ans);
end.
```
