<template>
    <div class="result-area">
        <el-card class="result">
            <div v-show="searching">
                <c-pray />
            </div>
            <div v-show="!searching">
                <div class="result-header">
                    <div>
                        <h2 style="
                            color: var(--text-minor-color-h);
                            display: inline-block;
                        ">搜索结果</h2>

                        <span style="
                            margin-left: 0.5em;
                            color: var(--text-minor-color-i);
                        ">共 {{ result.length }} 条</span>
                    </div>

                    <div>
                        <el-select placeholder="排序方式" v-model="order" @change="doChangeOrder" style="width: 100px;">
                            <el-option label="默认" value="default" />
                            <el-option label="最新文章" value="time-new" />
                            <el-option label="最旧文章" value="time-old" />
                        </el-select>
                    </div>
                </div>
                
                <el-pagination
                    :total="result.length" :page-size="20" v-model:current-page="page"
                    layout="prev, pager, next" 
                    hide-on-single-page
                    background 
                    class="pagination"
                />

                <div class="result-container">
                    <div class="item" v-for="{ post } in resultShow" :key="post.id">
                        <div class="header">
                            <div class="title-container">
                                <span class="title" @click="router.push('/article/' + post.id)">{{ post.title }}</span>
                            </div>
                            <div class="tag-list">
                                <span class="tag" v-for="tag in post.tag" :key="tag">
                                    {{ blogConfig.listTag[tag]?.name || '未知标签' }}
                                </span>
                            </div>
                            <div class="author">
                                {{ post.author.name }} / <c-date :date="new Date(post.create_time)" />
                            </div>
                        </div>
                        <div class="abstract-container" @click="router.push('/article/' + post.id)">
                            <div class="abstract">
                                {{ post.abstract }}
                            </div>
                            <div class="decoration" />
                        </div>
                    </div>
                </div>
                
                <el-pagination
                    :total="result.length" :page-size="20" v-model:current-page="page"
                    layout="prev, pager, next" 
                    hide-on-single-page
                    background 
                    class="pagination"
                />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">

import type { BoardId, Post, TagId } from '@/interface';
import { ElCard, ElSelect, ElOption } from 'element-plus';
import { ElPagination } from 'element-plus';

import { useArticle } from '@/stores/article';
import { useBlogConfig } from '@/stores/config';

import CPray from '@/components/common/CPray.vue';
import CDate from '@/components/common/CDate.vue';

import { useRouter } from 'vue-router';

import { onMounted, ref, computed } from 'vue';


const router = useRouter();

export interface Result{
    weight: number, post: Post
}

export interface Params{
    keyword: string,
    tag: TagId[],
    board?: BoardId,
    time: [number, number]
};

const result  = ref<Result[]>([]);
const page = ref(1);

const order = ref<'default' | 'time-new' | 'time-old'>('default');

const resultShow = computed(() => {
    const result0: Result[] = [];

    const lpage = Math.max(page.value * 20 - 20, 0);
    const rpage = Math.min(page.value * 20     , result.value.length);

    for(let i = lpage;i < rpage;i ++){
        result0.push(result.value[i]);
    }
    return result0;
})

const article = useArticle();
const blogConfig = useBlogConfig();

const params = defineModel<Params>({ required: true });

function getTagText(tags: TagId[]){
    let result = '';
    for(const tagId of tags){
        result += (blogConfig.listTag[tagId]?.name || '') + '#';
    }
    return result;
}

const searching  = ref(false);

// function sleep(time: number){
//     return new Promise(resolve => setTimeout(resolve, time));
// }

async function doSearch(){
    searching.value = true;
    const articles = await article.readPostList();
    searching.value = false;

    result.value = [];
    
    for(const id in articles){
        const post = articles[id];

        if(params.value.board && post.board !== params.value.board)
            continue;

        if(params.value.time && !(params.value.time[0] <= post.create_time && post.create_time <= params.value.time[1]))
            continue;

        let ok = true;
        for(let tag of params.value.tag)
            if(!post.tag.includes(tag)){
                ok = false;
                break;
            }
        if(ok === false)
            continue;

        let val = 1;

        const text = post.title + '#' + post.author + '#' + post.abstract + '#' + getTagText(post.tag);
        
        let cur = 0, last = -1;
        for(let i = 0;i < text.length;i ++){
            if(text[i] === params.value.keyword[cur]){
                cur ++;
                if(i === last + 1){
                    val += 3;
                } else {
                    val += 1;
                }
                last = i;
                if(cur === params.value.keyword.length)
                    break;
            }
        }
        if(cur === params.value.keyword.length){
            result.value.push({ weight: val / Math.sqrt(text.length + 1), post: post });
        }
    }

    if(order.value === 'default')
        result.value.sort((a, b) => b.weight - a.weight);
    else 
    if(order.value === 'time-old')
        result.value.sort((a, b) => a.post.create_time - b.post.create_time);
    else
    if(order.value === 'time-new')
        result.value.sort((a, b) => b.post.create_time - a.post.create_time);
}

function doChangeOrder(){
    if(order.value === 'default')
        result.value.sort((a, b) => b.weight - a.weight);
    else 
    if(order.value === 'time-old')
        result.value.sort((a, b) => a.post.create_time - b.post.create_time);
    else
    if(order.value === 'time-new')
        result.value.sort((a, b) => b.post.create_time - a.post.create_time);
}

defineExpose({ doSearch });

onMounted(() => {
    doSearch();
});

</script>

<style scoped lang="scss">
:global(.main) {
    width: min(720px, 80%);
    margin: 1em 0.5em;
}

.result-header {
    display: flex;
    justify-content: space-between;

    margin-bottom: 1em;
}

.result-container {
    margin: 0 -0.5em;
}

.item {
    display: flex;

    height: 5.5em;

    padding: 0.7em 0;

    &:nth-of-type(odd){
        background-color: var(--minor-color-l5);
    }

    > .header {
        padding: 0 0.5em;
        width: 40%;

        > .title-container {
            color: var(--text-minor-color-h);
            font-weight: lighter;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            padding-bottom: 0.2em;

            > .title {
                transition: color 0.2s ease-in-out;
                cursor: pointer;

                &:hover {
                    color: var(--minor-color);
                }
            }
        }

        > .tag-list {
            color: var(--text-minor-color-p);

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .tag:not(:last-child)::after {
                content: ' | ';
            }
        }

        > .author {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            color: var(--text-minor-color-p);
        }
    }
    > .abstract-container {

        position: relative;

        color: var(--text-minor-color-i);
        border-left: 1px dashed var(--minor-color);
        padding-left: 0.5em;

        width: 60%;
        height: 100%;

        > .abstract {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient:vertical;

            overflow: hidden;

            cursor: pointer;
            transition: color 0.2s ease-in-out;

        }

        > .decoration {
            position: absolute;

            right: 0;
            top: 0;

            width: 5px;
            height: 0;

            background-color: var(--minor-color);

            transition: height 0.2s ease-in-out;

            margin-left: -0.5em;
        }

        &:hover {
            color: var(--minor-color-d1);

            > .decoration {
                height: 100%;
            }
        }
    }
}

.pagination {
    margin: 1em 0;
    justify-content: flex-end;
}
</style>