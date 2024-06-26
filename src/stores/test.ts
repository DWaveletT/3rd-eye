import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User, Board, Post, Reply } from '@/interface';

export const useTestdata = defineStore('testdata', () => {
    const testUser = ref<User[]>([
        {
            id: 1,
            name: '琪露诺',
            role: 1
        } as User,
        {
            id: 2,
            name: '灵梦',
            role: 2
        } as User,
        {
            id: 3,
            name: '大妖精',
            role: 1
        } as User,
        {
            id: 4,
            name: '魔理沙',
            role: 1
        } as User,
        {
            id: 5,
            name: '爱丽丝',
            role: 1
        } as User,
    ]);

    const testBoard = ref<Board[]>([
        {
            id: 1,
            name: '雾之湖',
            description: '妖怪之山山脚的大湖'
        },
        {
            id: 2,
            name: '红魔馆',
            description: '建立在雾之湖附近的洋馆'
        },
        {
            id: 3,
            name: '博丽神社',
            description: '位于幻想乡极东大结界的边境上的神社'
        },
        {
            id: 4,
            name: '迷途之家',
            description: '位于妖怪之山山中的一个被荒废了的小村落'
        },
        {
            id: 5,
            name: '白玉楼',
            description: '位于冥界中央的一座带庭院的大型宅邸'
        },
    ])

    const testPost = ref<Post[]>([
        {
            id: 'cirno',
            time: 123456,
            
            auth: testUser.value[0],

            tag: [1, 2, 3],
        
            board: 1,
        
            title: '咱是最强的',
            summary: '不服来战',
        
            like: 999,
            dislike: 0,
        },
        {
            id: 'reimu',
            time: 123457,
            
            auth: testUser.value[1],

            tag: [10, 20, 30],
        
            board: 3,
        
            title: '博丽神社开张',
            summary: '不来参拜就打爆你的狗头',
        
            like: 100,
            dislike: 9961,
        },
        {
            id: 'test',
            time: 123456,
            
            auth: testUser.value[0],

            tag: [],
        
            board: 1,
        
            title: '程式测试',
            summary: '',
        
            like: 1010101,
            dislike: 0,
        },
    ]);

    const testReply = ref<Reply[]>([
        {
            id: 1000,
            time: 10001,
            replyer: testUser.value[2],
            post: 'cirno',
            content: '琪露诺好帅',
            like: 5,
            dislike: 1
        },
        {
            id: 1001,
            time: 10001,
            replyer: testUser.value[0],
            post: 'cirno',
            content: '哼哼',
            like: 0,
            dislike: 0
        },
        {
            id: 1002,
            time: 10001,
            replyer: testUser.value[0],
            post: 'cirno',
            content: '我可是最强的妖精',
            like: 999,
            dislike: 0
        },
        {
            id: 1003,
            time: 10001,
            replyer: testUser.value[0],
            post: 'cirno',
            content: '即使是那个博丽灵梦也不能拿我怎么样',
            like: 999,
            dislike: 0
        },
        {
            id: 1004,
            time: 10001,
            replyer: testUser.value[1],
            post: 'cirno',
            content: '嗯？',
            like: 0,
            dislike: 0
        },
        {
            id: 1005,
            time: 10001,
            replyer: testUser.value[0],
            post: 'cirno',
            content: '城管我错了！！！！！！',
            like: 0,
            dislike: 0
        },
        ...Array.from({ length: 100 }, (_, i) => {
            return {
                id: 2000 + i,
                time: 100000 + i,
                replyer: testUser.value[3],
                post: 'test',
                content: '# 我要刷屏\n\n# 我要刷屏\n\n# 我要刷屏',
                like: Math.floor(Math.random() * 10),
                dislike: Math.floor(Math.random() * 10)
            };
        })
    ]);

    return { testUser, testBoard, testPost, testReply };
});

export const useTestmock = defineStore('testmock', () => {
    
});