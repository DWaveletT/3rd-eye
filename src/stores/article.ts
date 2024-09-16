import { defineStore } from 'pinia'
import fm from 'front-matter';

import type { Front, Post } from '@/interface';

export const useArticle = defineStore('article', () => {
    let posts: Record<string, Post> | null = null;

    async function readPostList(): Promise<Record<string, Post>> {
        if(posts !== null){
            return posts;
        }

        const file = await (await fetch('/data/articles.json')).text();
        
        const json = JSON.parse(file) as Record<string, Front>;

        posts = {};
        for(const id of Object.keys(json)){
            const front = json[id];

            const post: Post = {
                id: id,
                uvote: 0,
                dvote: 0,

                author: {
                    id: 0,
                    name: '离散小波变换°',
                    role: 1,
                    avatar: '/blog/avatar.png'
                },

                ...front
            };
            

            posts[id] = post;
        }
        return posts;
    }
    
    async function readPostContent(id: string): Promise<string> {
        const file = await (await fetch('/article/' + id + '.md')).text();
        const data = fm<Front>(file);

        return data.body;
    }
    return { readPostList, readPostContent }
});
