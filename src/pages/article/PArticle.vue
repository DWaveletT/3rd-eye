<template>
    <layout-side background="purity">
        <template #main>
            <block-article :root="root" :post="post" :mark="mark" />

            <el-divider />
            
            <block-comment :replys="testdata.testReply" />
        </template>
        <template #aside>
            <block-sidebar :root="root" />
        </template>
    </layout-side>
</template>

<script setup lang="ts">

import LayoutSide from '@/components/layout/LayoutSide.vue';

import BlockArticle from '@/components/post/BlockArticle.vue';
import BlockComment from '@/components/post/BlockComment.vue';
import BlockSidebar from '@/components/post/BlockSidebar.vue';

import { ElDivider, ElNotification } from 'element-plus';

import { onMounted, ref } from 'vue';

import { useUtil } from '@/stores/util';

import { useTestdata } from '@/stores/test';
import { useArticle } from '@/stores/article';

import type { Post } from '@/interface';

import type { HeadlineInfo } from '@dwavelett/rehype-3rd-toc';

const article = useArticle();

const testdata = useTestdata();

const util = useUtil();

const post = ref<Post | undefined>(undefined);
const mark = ref<string | undefined>(undefined);

const root = ref<HeadlineInfo>({
    level: 0,
    title: '文章',
    link: '#',
    child: []
});

async function doGetPost(id: string){
    article.readPostList().then((posts) => {
        post.value = posts[id];
        util.setTitle(post.value.title + ' | 第三只眼');
    }).catch((e) => {
        ElNotification({
            type: 'error',
            message: '文章列表获取失败：' + String(e)
        });
    });

    article.readPostContent(id).then((content) => {
        mark.value = content;
    }).catch((e) => {
        ElNotification({
            type: 'error',
            message: '文章内容获取失败：' + String(e)
        });
    });
}

onMounted(() => {
    const id = util.parseParamString("id");

    if(!id){
        ElNotification({
            type: 'error',
            message: '不正确的文章地址'
        });
    } else {
        doGetPost(id);
    }
});

</script>

<style scoped lang="scss">
:global(.main) {
    width: min(720px, 80%);
    margin: 1em 0.5em;
}
</style>