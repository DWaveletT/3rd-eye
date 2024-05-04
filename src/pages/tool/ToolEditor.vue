<template>
    <layout-full>
        <main class="main">
            <el-card class="card">
                <div class="meta">
                    <h2 class="title">文章信息</h2>
                    <el-form label-width="auto" >
                        <el-form-item label="文章标题">
                            <el-input style="max-width: 300px;" />
                        </el-form-item>
                        <el-form-item label="文章摘要">
                            <el-input resize="none" autosize type="textarea" />
                        </el-form-item>
                        <div style="display: flex;">
                            <el-form-item label="标签" style="flex-grow: 1;">
                                标签选择器
                            </el-form-item>
                            <el-form-item label="分类" style="flex-grow: 1;">
                                标签选择器
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
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
                    <el-button type="primary" plain>复制代码</el-button>
                    <el-button type="primary" plain>下载文件</el-button>
                </div>
            </el-card>
        </main>
    </layout-full>
</template>

<script setup lang="ts">
import LayoutFull from '@/components/layout/LayoutFull.vue';
import { ElCard, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
</script>

<style scoped lang="scss">
.main {
    margin: 1em 0;
    width: calc(min(1080px, 90%));
}

.meta {
    > .title {
        margin-bottom: 0.5em;
    }
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
        width: 50%;
    }
    > .viewer {
        width: 50%;

        border-left: 1px solid var(--minor-color);
    }
}
</style>