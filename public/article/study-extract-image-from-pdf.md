---
create_time: 1702099578
update_time: 1702099578
title: 【笔记】从 pdf 里面提取图片
board: 1
tag:
- 2
---

如果一份 pdf 里面有很多图片，怎么提取？

## $\verb!.png!/\verb!.jpg!$ 情况

往 $\text{pdf}$ 里面插入 $\verb!.png!$ 或者 $\verb!.jpg!$ 图片是比较通常的情况。在编译时通常会把图片放在源代码目录下，使用 $\verb!includegrapics!$ 指令导入图片。生成后的图片会被插入到 $\verb!pdf!$ 里边。

对于这种情况，部分 $\text{pdf}$ 阅读器（比如 $\text{Adobe Reader}$）可以直接选中并复制出来。不过也有一些阅读器（比如 Chrome 自带的阅读功能）不支持选中图片。此外，如果 pdf 当中图片较多，一个个复制粘贴也比较麻烦。

然后用 $\verb!pdfimages.exe!$ 做题直接秒了。

## 矢量图情况

这个比较麻烦。首先由于 $\verb!.svg!$ 等图片格式不太支持直接插入到 $\text{pdf}$ 里面，因此通常是先用工具转换成 $\verb!.pdf!$ 格式再插入。另外一种常见的情况是，直接在源代码里面编写绘图代码（比如用 $\textrm{Ti{\it k}Z}$），这样生成的图片直接出现在 $\text{pdf}$ 里面。

对于这类图片，就相当于“函数源代码进过编译器处理后生成一堆汇编指令”一样，不再像是 $\verb!.png!$ 格式那样可以很容易地提取出来。

于是我自己能想到的做法是，使用 $\verb!pdfseparate.exe!$ 把 $\text{pdf}$ 拆成很多页，然后对于每一页有图片的文件人工处理，也就是拿 $\verb!pdfcrop.exe!$ 硬搞，把图片剪出来。因为 $\verb!pdfcrop.exe!$ 支持自定义裁剪区域，或者让它自己找裁剪区域（也就是剪掉外圈空白部分），所以实际效果还可以。但是如果文档本身有背景色，可能就不容易处理了。而且这种方法比（非）较（常）低效。
