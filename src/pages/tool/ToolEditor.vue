<template>
    <layout-full>
        <main class="main">
            <el-card class="card">
                <h2 class="title">文章信息</h2>
                <div class="meta">
                    <el-form label-width="auto" >
                        <div style="display: flex;">
                            <el-form-item label="标题" style="width: 50%;">
                                <el-input />
                            </el-form-item>
                            <el-form-item label="作者" style="width: 50%;">
                                <el-input />
                            </el-form-item>
                        </div>
                        <el-form-item label="文章摘要">
                            <el-input resize="none" autosize type="textarea" />
                        </el-form-item>
                        <div style="display: flex;">
                            <el-form-item label="标签" style="width: 50%;">
                                <el-select v-model="front.tag" multiple clearable >
                                    <el-option v-for="tag in blogConfig.listTag" :key="tag.id" :value="tag.id" :label="tag.name" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分类" style="width: 50%;">
                                <el-select v-model="front.board" clearable >
                                    <el-option v-for="board in blogConfig.listBoard" :key="board.id" :value="board.id" :label="board.name" />
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <h2 class="title">文章编辑</h2>
                <div class="container">
                    <div class="toolbar">

                    </div>
                    <div class="editarea">
                        <div class="editor">
                            
                        </div>
                        <div class="viewer">

                        </div>
                    </div>
                </div>

                <div class="export">
                    <el-button type="primary" plain>复制源码</el-button>
                    <el-button type="primary" plain>下载文件</el-button>
                </div>
            </el-card>
        </main>
    </layout-full>
</template>

<script setup lang="ts">
import LayoutFull from '@/components/layout/LayoutFull.vue';
import {
    ElCard,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSelect,
    ElOption
} from 'element-plus';

import { useBlogConfig } from '@/stores/config';
import { ref } from 'vue';
import type { Front } from '@/interface';

const blogConfig = useBlogConfig();

const front = ref<Front>({
    time: 0,
    title: '',
    tag: [],

});

</script>

<style scoped lang="scss">
.main {
    margin: 1em 0;
    width: calc(min(1080px, 90%));
}

.title {
    margin-bottom: 0.5em;
}


.container {
    border: 1px solid var(--minor-color-d1);
    border-radius: 5px;

    overflow: hidden;

    > .toolbar {
        height: 2em;
        border-bottom: 1px solid var(--minor-color);
        background-color: var(--page-color);
    }

    > .editarea {
        min-height: 20em;
    }

    margin-bottom: 1em;
}

.editarea {
    display: flex;

    > .editor {
        flex-grow: 1;
    }
    > .viewer {
        flex-grow: 1;

        border-left: 1px solid var(--minor-color);
    }
}
</style>{
    time: 0,
    title: ''
}{
    key: ((board.id)), valve: ((board.id)), label: ((board.name)),
    value: ''
}{
    key: ((board.id)), valve: ((board.id)), label: ((board.name)),
    value: ''
}