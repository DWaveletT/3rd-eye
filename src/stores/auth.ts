import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/interface';

export const useAuth = defineStore('auth', () => {
    const isLoggedIn = ref(false);
    const currentUser: User = {
        id: 0,
        name: '尚未登录',
        role: 0,
        avatar: ''
    };

    return { isLoggedIn, currentUser }
});
