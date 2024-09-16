---
create_time: 1691243065
update_time: 1691243065
title: 【笔记】比较好看的配图的上传随笔
board: 1
tag:
- 2
---

## 个人生成图片的通常流程

_TeX Live，启动！_

打开 VS Code，小写一下代码，

```latex
\documentclass[border=10pt,tikz]{standalone}
\usepackage{tikz}
\usetikzlibrary{graphdrawing, graphs, shadows}
\usegdlibrary{trees}
\begin{document}
    \begin{tikzpicture}[
        rd/.style = {
            draw = black,
            fill = red,
            font = \color{white}\bf,
            circle, minimum size = .8cm,
            drop shadow
        },
        bk/.style = {
            draw = black,
            fill = black,
            font = \color{white}\bf,
            circle, minimum size = .8cm,
            drop shadow
        },
        nl/.style = {
            draw = black,
            fill = black!80,
            font = \color{white}\sf,
            rectangle,
            minimum width  = .4cm,
            minimum height = .4cm,
            drop shadow
        },
        ti/.style = {
            draw = orange,
            fill = orange!30,
            isosceles triangle,
            inner sep = 0,
            anchor = apex,
            minimum height = 2cm,
            minimum width  = 1cm,
            shape border rotate = 90
        }
    ]
        \clip (-7, -8) rectangle (7, 0.5);
        \graph[
            binary tree layout,
            level distance   = 1.5cm,
            sibling distance = 0.6cm
        ]{
            21[bk] -- {
                6[bk] -- {
                    3[bk] -- {
                        t1[nl, as = N],
                        5[rd] -- {
                            t2[nl, as = N],
                            t3[nl, as = N]
                        }
                    } ,
                    13[bk] -- {
                        9[rd] -- {
                            t4[nl, as = N],
                            t5[nl, as = N]
                        } ,
                        14[rd] -- {
                            t6[nl, as = N],
                            t7[nl, as = N]
                        }
                    }
                } ,
                71[bk] -- {
                    40[rd] -- {
                        23[bk] -- {
                            t8[nl, as = N],
                            t9[nl, as = N]
                        } ,
                        55[bk] -- {
                            41[rd] -- {
                                t10[nl, as = N],     
                                t11[nl, as = N]      
                            } ,
                            66[rd] -- {
                                t12[nl, as = N],     
                                t13[nl, as = N]      
                            }
                        }
                    } ,
                    75[bk] -- {
                        t14[nl, as = N],
                        99[rd] -- {
                            t15[nl, as = N],
                            t16[nl, as = N]
                        }
                    }
                }
            }
        };
    \end{tikzpicture}
\end{document}
```

然后用 $\text{Lua\LaTeX}$ 编译（用它进行编译可以完全发挥 $\mathrm{Ti\mathit  kZ}$ 的功能，毕竟 $\mathrm{Ti\mathit  kZ}$ 有一部分功能就是以 $\text{Lua}$ 源码写的）。就可以得到图片的 $\text{pdf}$ 格式文件。

_由于洛谷不支持居中，所以我现在的做法是通过 clip 控制命令来在图片两侧留出充足空格，这样放在网页上就能占满全宽，达到居中的显示效果。_

顺带一提，$\LaTeX$ 已经被我玩成绘图工具了。最近写 $\LaTeX$ 源码基本上都是在搞各种配图。在此膜拜一下神级绘图宏包 $\text{Ti{\it k}Z}$。

## 图片上传

在一年前，我[探索过](https://www.luogu.com.cn/blog/over-knee-socks/latex-pdf2svg-ll)怎么在图床里放 svg 格式的文件并显示出来。基本思路是，利用这样两个特性：

- 题目附件可以上传 $\text{svg}$ 文件；
- Markdown 可以接受题目附件的链接并显示图片。

这样就可以绕开洛谷图床上传后的图片会强制转成 $\text{png}$ 格式的限制，可以在各种地方直接放图片。当然这样子的弊端也是比较明显的，一是操作比较麻烦（不能直接拖拽到图床上传了）；二是题目附件上传大小有限制，就相当于图床里的高级空间限制；三是这种方法不一定稳定，而且如果我哪一天整理个人题库误删了比较麻烦。

所以还是回归本源，直接传 $\text{png}$ 吧。

在相当长的一段时间里，我都是直接使用 $\text{pdftocairo}$ 的默认选项，直接把 $\text{pdf}$ 转图片再上传。上传图片的质量，怎么说，有点糊的。

```plain
>>> pdftocairo -png sample.pdf
```

![](https://cdn.luogu.com.cn/upload/image_hosting/pkas7hz4.png)

不过后来我发现，$\text{pdftocairo}$ 有相当多选项的，但是我基本没怎么用过：

```plain
pdftocairo version 22.02.0
Copyright 2005-2022 The Poppler Developers - http://poppler.freedesktop.org
Copyright 1996-2011 Glyph & Cog, LLC
Usage: pdftocairo [options] <PDF-file> [<output-file>]
  -png                   : generate a PNG file
  -ps                    : generate PostScript file
  -eps                   : generate Encapsulated PostScript (EPS)
  -pdf                   : generate a PDF file
  -svg                   : generate a Scalable Vector Graphics (SVG) file
  -print                 : print to a Windows printer
  -printdlg              : show Windows print dialog and print
  -printer <string>      : printer name or use default if this option is not specified
  -printopt <string>     : printer options, with format <opt1>=<val1>[,<optN>=<valN>]*
  -setupdlg              : show printer setup dialog before printing
  -f <int>               : first page to print
  -l <int>               : last page to print
  -o                     : print only odd pages
  -e                     : print only even pages
  -singlefile            : write only the first page and do not add digits
  -r <fp>                : resolution, in PPI (default is 150)
  -rx <fp>               : X resolution, in PPI (default is 150)
  -ry <fp>               : Y resolution, in PPI (default is 150)
  -scale-to <int>        : scales each page to fit within scale-to*scale-to pixel box
  -scale-to-x <int>      : scales each page horizontally to fit in scale-to-x pixels
  -scale-to-y <int>      : scales each page vertically to fit in scale-to-y pixels
  -x <int>               : x-coordinate of the crop area top left corner
  -y <int>               : y-coordinate of the crop area top left corner
  -W <int>               : width of crop area in pixels (default is 0)
  -H <int>               : height of crop area in pixels (default is 0)
  -sz <int>              : size of crop square in pixels (sets W and H)
  -cropbox               : use the crop box rather than media box
  -mono                  : generate a monochrome image file (PNG, JPEG)
  -gray                  : generate a grayscale image file (PNG, JPEG)
  -transp                : use a transparent background instead of white (PNG)
  -antialias <string>    : set cairo antialias option
  -icc <string>          : ICC color profile to use
  -level2                : generate Level 2 PostScript (PS, EPS)
  -level3                : generate Level 3 PostScript (PS, EPS)
  -origpagesizes         : conserve original page sizes (PS, PDF, SVG)
  -paper <string>        : paper size (letter, legal, A4, A3, match)
  -paperw <int>          : paper width, in points
  -paperh <int>          : paper height, in points
  -nocrop                : don't crop pages to CropBox
  -expand                : expand pages smaller than the paper size
  -noshrink              : don't shrink pages larger than the paper size
  -nocenter              : don't center pages smaller than the paper size
  -duplex                : enable duplex printing
  -opw <string>          : owner password (for encrypted files)
  -upw <string>          : user password (for encrypted files)
  -q                     : don't print any messages or errors
  -v                     : print copyright and version info
  -h                     : print usage information
  -help                  : print usage information
  --help                 : print usage information
  -?                     : print usage information
```
这里面比较重要的，一个是 $\verb!-png!$，用来指导它生成 $\text{png}$ 格式文件；接着我注意到了 $\verb!-r!$，可以调整图像的清晰度（默认 $\text{ppi}$ 是 $150$）；最后有个 $\verb!-transp!$，可以发挥 $\text{png}$ 文件一个很 nb 但是经常会被忽略的功能，也就是透明通道。开透明通道配合上博客透明背景是很爽的。

_别的选项我也扒过用途，感觉没啥特别有用的。_

```plain
>>> pdftocairo -png -r 300 -transp sample.pdf
```

![](https://cdn.luogu.com.cn/upload/image_hosting/q6f01w7s.png)

我试过把 $\text{ppi}$ 再调高一点，比如 $500,600$ 或者更高什么的。但似乎洛谷图床会对上传上去的图片进行二次压缩，导致上传上去的图片并没有本质变清晰（我自己的观察方式是去看上传上去的文件的大小，发现提高 $\text{ppi}$ 文件大小反而变小了）。重新下载下来看也没啥区别。又考虑到 $300$ 也够用了，所以现在就开 $300$。

_透明通道，太爽！_

不过显然画图的质量还是需要我个人的绘图水平的。

最近有阅读过 $\text{pgf Manual}$，碰到一些~~奇怪的~~具体需求也尝试在 $\text{stackexchange}$ 上面搜索。感觉学到了不少东西。

然后就是用工具的时候可以多去查查这玩意儿有啥其他功能。比如多翻翻 $\verb!--help!$，说不定就能碰到什么很 nb 但是之前从来没注意过的功能。

其实 $\text{TeXLive}$ 也是。这东西作为 $\LaTeX$ 工具包，除了提供基本的 $\LaTeX$ 编译功能以及相应的一车宏包，还提供了一长串命令行工具，多学学多用的话还是能事半功倍的。

