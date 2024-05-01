import type { Board, Tag, Tool, User } from '@/interface';
import { defineStore } from 'pinia';

import { unified } from 'unified';

import { ref } from 'vue';

export const useBlogConfig = defineStore('blogConfig', () => {
    const blogger: User = {
        id: 0,
        name: '离散小波变换°',
        role: 1,
        avatar: '/blog/avatar.png'
    };

    const listTag: Record<number, Tag> = {
        1: {
            id: 1,
            name: '算法竞赛',
            color: '#20E3D1'
        },
        10: {
            id: 10,
            name: '算法竞赛',
            color: '#20E3D1'
        },
        20: {
            id: 20,
            name: '算法竞赛',
            color: '#20E3D1'
        },
        30: {
            id: 30,
            name: '算法竞赛',
            color: '#20E3D1'
        },
        40: {
            id: 40,
            name: '算法竞赛',
            color: '#20E3D1'
        }
    };

    const listBoard: Record<number, Board> = {
        1: {
            id: 1,
            name: '算法竞赛',
            description: ''
        },
        2: {
            id: 2,
            name: '网页前端',
            description: ''
        },
        3: {
            id: 3,
            name: '网页后端',
            description: ''
        },
        4: {
            id: 4,
            name: '生活',
            description: ''
        },
        10: {
            id: 10,
            name: '闲话',
            description: ''
        },
    };

    const listTool: Record<string, Tool> = {
        'article-editor': {
            id: 'article-editor',
            name: '文章编辑器',
            description: '一个用来编辑本博客文章的编辑器，使用了相同的渲染方式，渲染出来的结果就是展示在文章部分的结果。'
        },
        'test-1': {
            id: 'test-1',
            name: '测试 1',
            description: '用来测试工具显示页面'
        },
        ...Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`test-${i}`, {
            id: `test${i}`,
            name: `测试 ${i}`,
            description: 'a'.repeat(Math.floor(Math.random() * 100))
        }]))
    }

    return { blogger, listTag, listBoard, listTool };
})
export const useUserConfig = defineStore('userConfig', () => {
    const colorTheme = ref<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);

    return { colorTheme };
})