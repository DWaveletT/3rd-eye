<template>
    <el-card class="card" shadow="hover">
        <div class="header">
            <h3>{{ props.tool.name }}</h3>
        </div>

        <div class="content">
            {{ props.tool.description }}
        </div>

        <div class="footer">
            点击进入
        </div>

    </el-card>
</template>

<script setup lang="ts">
import type { Tool } from '@/interface';
import { ElCard } from 'element-plus';

const props = defineProps<{
    tool: Tool
}>();
</script>

<style scoped lang="scss">

.card {
    border: 1px solid var(--minor-color-d1);

}

.header {
    margin: calc(var(--el-card-padding) * (-1));
    margin-bottom: 1em;

    padding: 0.5em 1em;

    background-color: var(--minor-color-l5);
    color: var(--text-minor-color-h);

    font-weight: lighter;
}

.content {
    margin: 0.2em 0;

    word-wrap: break-word;
}

.footer {
    margin: calc(var(--el-card-padding) * (-1));
    margin-top: 1em;

    background-color: var(--minor-color-l5);
    color: var(--text-minor-color-h);

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.4em 0;
}
</style>