<template>
    <layout-home>
        <div class="main">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-affix :offset="70" target=".main" :z-index="99">
                        <div class="lpart">
                            <block-intro :posts="posts" />
                        </div>
                    </el-affix>
                </el-col>
                <el-col class="mpart" :span="12">
                    <block-article :posts="posts" />
                </el-col>
                <el-col :span="6">
                    <el-affix target=".main" :z-index="99">
                        <div class="rpart">
                            <block-guide :posts="posts" />
                        </div>
                        
                    </el-affix>
                </el-col>
            </el-row>
        </div>
    </layout-home>
</template>

<script setup lang="ts">

import LayoutHome from '@/components/layout/LayoutHome.vue';

import BlockIntro from '@/components/home/BlockIntro.vue';
import BlockGuide from '@/components/home/BlockGuide.vue';
import BlockArticle from '@/components/home/BlockArticle.vue';

import { ElRow, ElCol, ElAffix } from 'element-plus';

import { useArticle } from '@/stores/article';
import type { Post } from '@/interface';
import { onMounted, ref } from 'vue';

const article = useArticle();
const posts = ref<Record<string, Post> >({});

onMounted(() => {
    article.readPostList().then(( result ) => {
        posts.value = result
    });
})


</script>

<style scoped lang="scss">

.main {
    margin: 1.5em 0;

    max-width: 1320px;

    flex-grow: 1;
}

.rpart {
    overflow: scroll;
    max-height: 100vh;

    &::-webkit-scrollbar {
        display: none;
    }
}

</style>