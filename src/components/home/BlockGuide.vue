<template>
    <el-card class="card">
        <h3 class="title">标签</h3>
        <div class="decoration" />

        <div class="tag-list">
            <c-tag v-for="tag in blogConfig.listTag" :key="tag.id" countable :tag="tag" :count="countTag[tag.id]" />
        </div>
    </el-card>
    <el-card class="card">
        <h3 class="title">分类</h3>
        <div class="decoration" />

        <div class="board-list">
            <div class="item" v-for="board in blogConfig.listBoard" :key="board.id">
                <span>{{ board.name }}</span>
                <el-tag>{{ countBoard[board.id] }}</el-tag>
            </div>
        </div>
    </el-card>
    <el-card class="card">
        <h3 class="title">归档</h3>
        <div class="decoration" />

        <div class="time-list">
            <template v-for="[year, months] in Object.entries(countTime)" :key="year">
                <div class="item year">
                    <div class="info">
                        <div class="time-icon">
                            <div class="timeline" />
                        </div>

                        <div style="margin-right: 0.5em;" />

                        {{ year }} 年

                        <div style="flex-grow: 1;" />

                        <el-tag>{{ months.count }}</el-tag>
                    </div>

                    <div class="expand-icon" @click="expend[year] = !expend[year]">
                        <font-awesome-icon class="icon" :icon="faCaretDown" :class="{ rotate: expend[year]}" />
                    </div>
                </div>

                <template v-if="expend[year]">
                    <div class="item month" v-for="[month, count] in Object.entries(months.month)" :key="month">
                        <div class="info">
                            <div class="time-icon">
                                <div class="timeline" />
                            </div>

                            <div style="margin-right: 0.5em;" />

                            {{ month }} 月

                            <div style="flex-grow: 1;" />

                            <el-tag>{{ count }}</el-tag>
                        </div>

                        <div style="width: 1.9em">
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import type { Post, TagId } from '@/interface';

import { ElCard, ElTag } from 'element-plus';

import CTag from '@/components/common/CTag.vue';

import { useBlogConfig } from '@/stores/config';
import { computed, ref } from 'vue';

const blogConfig = useBlogConfig();

const props = defineProps<{
    posts: Record<string, Post>
}>();

const countTag = computed(() => {
    const result: Record<TagId, number> = {};

    for(const key in blogConfig.listTag){
        result[key] = 0;
    }

    for(const [ , post] of Object.entries(props.posts)){
        for(const [ , tag] of Object.entries(post)){
            if(Object.hasOwn(result, tag)){
                result[tag] = result[tag] + 1;
            }
        }
    }
    return result;
})

const countBoard = computed(() => {
    const result: Record<TagId, number> = {};

    for(const key in blogConfig.listBoard){
        result[key] = 0;
    }

    for(const [ , post] of Object.entries(props.posts)){
        if(Object.hasOwn(result, post.board))
            result[post.board] = result[post.board] + 1
    }
    return result;
})

const countTime = computed(() => {
    const result: Record<number, {
        count: number,
        month: Record<number, number>
    }> = {};
    
    for(const [ , post] of Object.entries(props.posts)){
        const date = new Date(post.time);

        const year  = date.getFullYear();
        const month = date.getMonth() + 1;

        if(result[year] === undefined){
            result[year] = {
                count: 0,
                month: {}
            }
        }

        if(result[year].month[month] === undefined){
            result[year].month[month] = 0
        }

        result[year].count += 1;
        result[year].month[month] += 1;
    }

    return result;
})

const expend = ref<Record<string, boolean> >({});

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

.tag-list {
    margin-left:  -0.5em;
    margin-right: -0.5em;
}

.board-list {
    margin-left:  -0.5em;
    margin-right: -0.5em;

    border-top: 4px solid var(--minor-color-l2);
    border-bottom: 4px solid var(--minor-color-l2);

    background-color: var(--minor-color-l5);

    > .item {
        font-weight: lighter;
        display: flex;
        justify-content: space-between;

        color: var(--text-minor-color-p);

        padding: 0.3em 0.5em;

        border-bottom: 2px solid var(--minor-color-l4);
    }
}

.time-list {
    margin-left:  -0.5em;
    margin-right: -0.5em;

    overflow: hidden;

    border-bottom: 2px solid var(--minor-color);
    
    > .item {
        font-weight: lighter;
        display: flex;
        justify-content: space-between;

        height: 2.5em;

        color: var(--text-minor-color-p);

        padding: 0.4em 0.5em;

        border-bottom: 2px solid var(--minor-color-l4);

        > .info {
            flex-grow: 1;

            display: flex;
            align-items: center;
        }

        > .expand-icon {
            height: 1.4em;
            width: 1.4em;

            margin-left: 0.5em;

            text-align: center;
            border-radius: 2px;

            transition: 0.2s ease-in-out background-color;
            
            cursor: pointer;

            &:hover {
                background-color: var(--minor-color-l2);
            }

            .icon {
                transition: 0.2s ease-in-out transform;
            }

            .rotate {
                transform: rotate(180deg);
            }
        }

        &.year {
            background-color: var(--minor-color-l4);

            .time-icon {
                display: inline-flex;
                justify-content: center;

                height: 0.8em;
                width: 0.8em;

                background-color: var(--minor-color);
                border-radius: 50%;

                > .timeline {
                    margin-top: 0.8em;

                    height: 2em;
                    width: 2px;
                    background-color: var(--minor-color-l2);
                }
            }
        }

        @keyframes expand {
            0% {
                padding: 0 0.5em;
                height: 0;
            }
            100% {
                padding: 0.4em 0.5em;
                height: 2.5em;
            }
        }

        &.month {
            background-color: var(--minor-color-l5);

            animation-name: expand;
            animation-duration: 0.5s;
            
            .time-icon {
                display: inline-flex;
                justify-content: center;

                margin: 0.1em 0.1em;

                height: 0.6em;
                width: 0.6em;

                background-color: var(--minor-color-l2);
                border-radius: 50%;

                > .timeline {
                    height: 2.5em;
                    width: 2px;
                    background-color: var(--minor-color-l2);
                }
            }
        }
    }
}
</style>