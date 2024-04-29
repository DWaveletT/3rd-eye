<template>
    <layout-side background="purity">
        <template #main>
            <template v-if="post === null">
                
            </template>
            <template v-else>
                <block-article :root="root" :post="post" />
            </template>

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

import { ElDivider } from 'element-plus';

import { onMounted, ref } from 'vue';

import { useUtil } from '@/stores/util';

import { useMarkdown } from '@/stores/markdown';
import { useTestdata } from '@/stores/test';

import type { Post } from '@/interface';

import type { HeadlineInfo } from '@/plugins/rehype-3rd-toc';

const markdown = useMarkdown();
const testdata = useTestdata();

const util = useUtil();

const post = ref<Post | null>(null);

const root = ref<HeadlineInfo>({
    level: 0,
    title: '文章',
    link: '#',
    child: []
});

onMounted(() => {
    const id = util.parseParamString("id");

    if(id) {
        markdown.readPost("/article/" + id + ".md").then((result) => {
            post.value = result;
        });
    }

});

</script>

<style scoped lang="scss">
:global(.main) {
    max-width: 800px;
    margin: 1em 0.5em;
}
</style>