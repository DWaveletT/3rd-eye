<template>
    <el-card class="card">
        <h3 class="title">标签</h3>
        <div class="decoration" />

        <div class="tag-list">
            <span class="item" v-for="tag in blogConfig.listTag" :key="tag.id" :style="`--tag-color: ${ tag.color }`" >
                <span class="name">{{ tag.name }}</span>
                <span class="count">100</span>
            </span>
        </div>
    </el-card>
    <el-card class="card">
        <h3 class="title">分类</h3>
        <div class="decoration" />

        <div class="board-list">
            <div class="item" v-for="board in blogConfig.listBoard" :key="board.id">
                <span>{{ board.name }}</span>
                <el-tag>100</el-tag>
            </div>
        </div>
    </el-card>
    <el-card class="card">
        <h3 class="title">归档</h3>
        <div class="decoration" />
    </el-card>
</template>

<script setup lang="ts">
import { ElCard, ElTag } from 'element-plus';

import { useBlogConfig } from '@/stores/config';

import CTag from '@/components/common/CTag.vue';

const blogConfig = useBlogConfig();

</script>

<style scoped lang="scss">
.card {
    &:not(:last-child) {
        margin-bottom: 1em;
    }

    &:hover {
        .decoration {
            width: 100%;
        }
    }

    .decoration {
        width: 0;
        height: 5px;

        transition: width 0.2s ease-in-out;
        border-radius: 10px;

        background-color: var(--main-color);

        margin-bottom: 0.5em;
    }
}

.title {
    margin-top:    -0.5em;
    margin-bottom:  0.2em;
}

.board-list {
    border-top: 2px solid var(--main-color-l5);

    > .item {
        font-weight: lighter;
        display: flex;
        justify-content: space-between;

        color: var(--text-main-color-h);

        padding: 0.3em 0.5em;

        border-bottom: 2px solid var(--main-color-l5);
    }
}

.tag-list {
    margin-left:  -0.5em;
    margin-right: -0.5em;
    
    > .item {
        display: inline-block;
        
        margin: 0.3em;

        border: 1px solid var(--minor-color-l2);

        border-radius: 4px;

        font-size: small;


        > .name {
            padding: 0.3em;
            background-color: var(--tag-color);
            border-top-left-radius:    4px;
            border-bottom-left-radius: 4px;
            color: hsl(from var(--tag-color) h 20 100);
        }

        > .count {
            font-weight: lighter;
            padding: 0.3em;
            border-top-right-radius:    4px;
            border-bottom-right-radius: 4px;
            background-color: var(--minor-color-l5);
            color: var(--text-minor-color-p);
        }
    }
}
</style>