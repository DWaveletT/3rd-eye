<template>
    <div class="card-container" v-for="post in props.posts" :key="post.id">
        <el-card class="card" shadow="hover">
            <div class="info">
                <div class="title">
                    <div class="head-container" @click="gotoArticle(post.id)">
                        <h2 class="head" style="cursor: pointer;">{{ post.title }}</h2>
                        <div class="decoration" />
                    </div>
                    
                    <div class="tags">
                        <c-tag v-for="tag in post.tag" :key="tag" :tag="blogConfig.listTag[tag]" />
                    </div>
                </div>
                <div class="data">
                    <div class="chart">
                        <font-awesome-icon :icon="faChartBar" />
                        123 字
                        <font-awesome-icon :icon="faClock" />
                        1 分钟
                    </div>

                    <div class="time">
                        <c-date :date="new Date(post.time)" placement="bottom" />
                    </div>
                </div>
            </div>
            
            <div class="goto-picture" v-if="post.banner">
            
            </div>
            <div class="goto-block" @click="gotoArticle(post.id)" v-else>
                <font-awesome-icon :icon="faAngleRight" size="2x" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { Post } from '@/interface';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import {
    faChartBar,
    faClock
} from '@fortawesome/free-regular-svg-icons';

import CTag from '@/components/common/CTag.vue';
import CDate from '@/components/common/CDate.vue';

import { ElCard } from 'element-plus';

import { useBlogConfig } from '@/stores/config';

import { useRouter } from 'vue-router';

const props = defineProps<{
    posts: Record<string, Post>
}>();

const router = useRouter();

const blogConfig = useBlogConfig();


function gotoArticle(id: string){
    router.push({
        name: 'article',
        params: {
            id: id
        }
    });
}

</script>

<style scoped lang="scss">
.card {
    fill-opacity: 0.7;
    color: var(--text-minor-color-p);

    display: block;

    position: relative;

    border: 2px solid var(--minor-color-l4);
    border-top-left-radius:  20px;

    position: relative;
}

.card-container {
    &:not(:last-child){
        margin-bottom: 1em;
    }

    &:hover {
        .card {
            transform: translateX(10px);
        }
    }
}

.title {
    height: 5em;

    margin-top: -0.5em;
    margin-right: 1em;

    > .head-container {
        display: inline-block;
        transition: 0.2s ease-in-out color;

        width: 100%;

        > .head {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;

            text-wrap: nowrap;

        }

        > .decoration {
            position: absolute;
            bottom: 0;
            width: 0;
            height: 2px;

            background-color: var(--minor-color-d2);

            transition: 0.5s ease-in-out width;
        }

        &:hover {
            color: var(--minor-color-d1);

            > .decoration {
                width: 100%;
            }
        }
    }

    > .tags {
        margin-top: 0.2em;

        overflow: overlay;
        text-wrap: nowrap;

        > :not(:last-child){
            margin-right: 0.2em;
        }

        &::-webkit-scrollbar {
            display: none;
        }
    }
}

.data {
    position: absolute;

    bottom: 0;
    left: 0;

    font-size: small;
    font-weight: lighter;

    color: var(--text-minor-color-i);

    display: flex;

    & .chart {
        padding: 0.3em 1em 0.3em 1em;
        background-color: var(--minor-color-l4);
        border-top-right-radius: 10px;
    }

    & .time {
        padding: 0.3em 1em 0.3em 1em;
    }
}

.goto-block {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 2em;

    color: var(--minor-color-l1);
    background: var(--minor-color-d2);

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: color 0.2s ease-in-out;

    &:hover {
        color: var(--minor-color-l5);
    }
}
</style>