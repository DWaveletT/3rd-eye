import { defineStore } from 'pinia';

import { type Processor, unified } from 'unified';

import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { h } from 'hastscript';

import rehypeAutoLinkHeadings from 'rehype-autolink-headings';

import rehypeHighlight from 'rehype-highlight';

import rehype3rdToc from '@dwavelett/rehype-3rd-toc';
import rehype3rdCopyCode from '@dwavelett/rehype-3rd-copy-code';

import remarkNoHtml from '@/plugins/remark-no-html';

import type { HeadlineInfo } from '@dwavelett/rehype-3rd-toc';

export interface ProcessorOption {
    headline?: {
        prefix: string,
        output: HeadlineInfo,
    }
}

export const useMarkdown = defineStore('markdown', () => {
    function getProcessor(options?: ProcessorOption): Processor {
        const processor = unified();

        // 将 markdown 解析为 mdast
        processor.use(remarkParse);

        // 不允许使用 HTML
        processor.use(remarkNoHtml);

        // 处理数学公式相关 token
        processor.use(remarkMath);

        // 将 mdast 转换为 hast
        processor.use(remarkRehype);

        // 添加新的引用块效果
        // processor.use(rehype3rdNotice);

        if(options?.headline){
    
            // 给标题级别添加上 id
            processor.use(rehype3rdToc, {
                prefix: options.headline.prefix,
                output: options.headline.output
            });

        }

        // 使用 KaTeX 渲染数学公式
        processor.use(rehypeKatex);

        if(options?.headline){

            // 给标题级别添加上链接
            processor.use(rehypeAutoLinkHeadings, {
                behavior: 'wrap',
                content(node) {
                    return [
                        h('svg.link', {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 448 512",
                            comment: "Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."
                        }, [
                            h('path', {
                                fill: 'currentColor',
                                d: 'M192 32h64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352H288V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H192c-88.4 0-160-71.6-160-160s71.6-160 160-160z'
                            })
                        ]),
                        h('span.headline', node.children)
                      ]
                }
            });
        }
        
        // 复制代码功能
        processor.use(rehype3rdCopyCode, {
            content() {
                return h('svg', {
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 448 512',
                    comment: 'Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.',
                    style: {
                        width: '1.2em',
                        height: '1.2em'
                    }
                }, [
                    h('path', {
                        fill: 'currentColor',
                        d: 'M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z'
                    })
                ]);
            }
        });

        // 渲染代码块
        processor.use(rehypeHighlight);

        // 将 hast 序列化
        processor.use(rehypeStringify);

        // 冻结 processor
        processor.freeze();

        return processor;
    }

    return { getProcessor };
});
