---
create_time: 1708844192
update_time: 1708844192
title: 爆改哈吉米
board: 1
tag:
- 2
---

哈吉米是阿米诺斯的意思。

---

群友说有 IPv6 以后不需要内网穿透也能快乐 MC 了。趁着还没开学打算先拿家里的路由器试一试。登录上路由器后把 IPv6 开关打开，结果访问 https://test-ipv6.com/ 还是不行。遂怀疑是哈吉米的原因。

然后查了一下资料，发现修改哈吉米配置需要管理员账号密码（和用户账号密码不同）。

所以就有了下面的一系列操作。

## 前排提示

本文会涉及到计算机网络的一些术语。

因为我在爆改哈吉米之前没有学习过计算机网络课程，所以我全程边干边学，顺便搞明白了哈吉米的一些奇♂技♂淫♂巧。

学艺不精，有些知识我自己就没搞明白，内容多有错误，请多指教。

## 理论学习


### 私网 IP 和公网 IP

百度了一下 IP，发现有五类 IP 地址 A、B、C、D、E，其中用途比较传统的是 A、B、C 类，据说范围如下：

- A 类地址的表示范围为：$0.0.0.0\sim 127.255.255.255$；
- B 类地址的表示范围为：$128.0.0.0\sim 191.255.255.255$；
- C 类地址的表示范围为：$192.0.0.0\sim 223.255.255.255$。
