<template>
    <aside class="aside">

    <el-affix :offset="25" target=".aside">
        <section class="filter">
            <div class="param">
                <h3 class="title">关键词</h3>

                <el-input class="input" v-model="params.keyword" clearable @keydown.enter="emits('search')" />

                <p class="explain">
                    将会从文章标题、作者、标签、摘要里进行匹配。
                </p>
            </div>

            <div class="param">
                <h3 class="title">标签</h3>

                <c-tag v-for="tag in params.tag" :key="tag" :tag="blogConfig.listTag[tag]" closeable @close="delTag(tag)" />

                <el-select v-model="tagNew" placeholder="新增标签" @change="addTag">
                    <el-option v-for="tag in blogConfig.listTag" :key="tag.id" :label="tag.name" :value="tag.id" />
                </el-select>
                <p class="explain">
                    将会匹配拥有所有标签的文章。
                </p>
            </div>

            <div class="param">
                <h3 class="title">类别</h3>

                <el-select v-model="params.board" placeholder="选择类别" clearable>
                    <el-option v-for="board in blogConfig.listBoard" :key="board.id" :label="board.name" :value="board.id" />
                </el-select>
                <p class="explain">
                    将会匹配属于指定类别的文章。
                </p>
            </div>
            
            <div class="param time">
                <h3 class="title">时间</h3>

                <el-date-picker
                    style="width: 100%"
                    v-model="params.time"
                    type="monthrange"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="起始时间"
                    end-placeholder="终止时间"
                    :shortcuts="shortcuts"
                    format="YYYY/MM/DD"
                    value-format="x"
                />
                <p class="explain">
                    将会匹配起止时间之内的文章。
                </p>
            </div>

            <div class="confirm">
                <el-button @click="emits('search')" type="primary" plain>搜索</el-button>
            </div>
        </section>
    </el-affix>
    </aside>
</template>

<script setup lang="ts">
import type { TagId } from '@/interface';

import { ElTag, ElAffix, ElInput, ElButton, ElDatePicker, ElSelect, ElOption } from 'element-plus';

import CTag from '@/components/common/CTag.vue';

import { useBlogConfig } from '@/stores/config';

import type { Params } from './BlockResult.vue';

import { ref } from 'vue';

const blogConfig = useBlogConfig();

const params = defineModel<Params>({ required: true });

const emits = defineEmits(['search']);

const tagNew = ref<TagId | undefined>(undefined);

function addTag(){
    if(tagNew.value !== undefined){
        if(!params.value.tag.includes(tagNew.value))
            params.value.tag.push(tagNew.value);
        tagNew.value = undefined;
    }
}

function delTag(tag: TagId){
    params.value.tag = params.value.tag.filter((id) => id !== tag);
}

const shortcuts = [
  {
    text: '一个月内',
    value: () => {
      const rtime = new Date();
      const ltime = new Date();
      ltime.setTime(ltime.getTime() - 3600 * 1000 * 24 * 30);
      return [ltime, rtime];
    },
  },
  {
    text: '半年以内',
    value: () => {
      const rtime = new Date();
      const ltime = new Date();
      ltime.setTime(ltime.getTime() - 3600 * 1000 * 24 * 180);
      return [ltime, rtime];
    },
  },
  {
    text: '一年以内',
    value: () => {
      const rtime = new Date();
      const ltime = new Date();
      ltime.setTime(ltime.getTime() - 3600 * 1000 * 24 * 365);
      return [ltime, rtime];
    },
  },
]

</script>

<style scoped lang="scss">

.tag {
    color: hsl(from var(--tag-color) h 20 100);
    background-color: var(--tag-color);
}
.filter {
    min-width: min(300px, 30%);

    > .param:not(:last-child) {
        margin-bottom: 0.5em;
    }
}

.confirm {
    display: flex;
    justify-content: flex-end;

    margin-top: 1em;
}

.param {
    > *:not(:last-child) {
        margin-bottom: 0.8em;
    }

    > .title {
        color: var(--text-minor-color-h);
    }

    > .input {
        color: var(--text-minor-color-p);
    }

    > .explain {
        color: var(--text-minor-color-i);
    }
}

.aside {
    width: 300px;

    margin-left: 1em;
    padding: 1.5em 1em;

    box-sizing: border-box;

    background-color: rgb(from var(--minor-color-l2) r g b / 0.25);

    &.hide {
        display: none;
    }
}
</style>