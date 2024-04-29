import type { Board, Tag, User } from '@/interface';
import { defineStore } from 'pinia';

import { unified } from 'unified';

export const useBlogConfig = defineStore('config', () => {
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

    return { blogger, listTag, listBoard };
})
export const useUserConfig = defineStore('config', () => {

})