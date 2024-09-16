<template>
    <el-card class="article" shadow="never">
        <template v-if="props.post !== undefined && props.mark !== undefined">
            <div class="header">
                <div class="title-container">
                    <div class="title-wrapper">
                        <h1>{{ props.post.title }}</h1>
                        <div class="underline" />
                    </div>
                </div>

                <div class="article-info">
                    创建时间：<c-date :date="new Date(props.post.create_time * 1000)" /><br>
                    更新时间：<c-date :date="new Date(props.post.update_time * 1000)" />
                </div>
            </div>

            <el-divider />
            
            <text-render :options="{
                headline: {
                    prefix: 'article-',
                    output: root
                }
            }" :mark="props.mark" style="opacity: 1;" class="main-color" />

            <el-divider />

            <div class="footer">

            </div>
        </template>
    </el-card>
</template>

<script setup lang="ts">

import { ElCard, ElDivider } from 'element-plus';

import TextRender from '@/components/text/TextRender.vue';

import CDate from '../common/CDate.vue';

import type { Post } from '@/interface';

import type { HeadlineInfo } from '@dwavelett/rehype-3rd-toc';

const props = defineProps<{
    post: undefined | Post,
    mark: undefined | string
}>();

const root = defineModel<HeadlineInfo>('root', { required: true });

</script>

<style scoped lang="scss">
.article {
    overflow: visible;

    width: auto;

    background-color: rgb(from var(--card-b-color) r g b / 0.75);
    border-color: rgb(from var(--card-f-color) r g b / 0.75);

    padding: 0 1em;

    border-radius: 2px;

    :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
        color: var(--text-main-color-h);
    }
}

.article-info {
    margin-top: 0.5em;
    line-height: 1.5;

    text-align: right;

    opacity: 0.7;

    font-size: small;
}

.title-container {
    display: flex;

    justify-content: center;

    > .title-wrapper {
        > .underline {
            height: 3px;
            background-color: rgb(from var(--main-color-d2) r g b / 0.5);
            width: 0;

            border-radius: 5px;

            transition: width 0.2s ease-in-out;
        }

        &:hover > .underline {
            width: 100%;
        }
    }
}

</style>