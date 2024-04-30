<template>
    <layout-full>
        <main class="main">
            <el-row :gutter="20">
                <el-col :span="8">
                    <tool-card v-for="tool in lists[0]" :key="tool.id" :tool="tool">
                        {{ tool.name }}
                    </tool-card>
                </el-col>
                <el-col :span="8">
                    <tool-card v-for="tool in lists[1]" :key="tool.id" :tool="tool">
                        {{ tool.name }}
                    </tool-card>
                </el-col>
                <el-col :span="8">
                    <tool-card v-for="tool in lists[2]" :key="tool.id" :tool="tool">
                        {{ tool.name }}
                    </tool-card>
                </el-col>
            </el-row>
        </main>
    </layout-full>
</template>

<script setup lang="ts">
import type { Tool, ToolId } from '@/interface';

import LayoutFull from '@/components/layout/LayoutFull.vue';

import { ElRow, ElCol } from 'element-plus';

import ToolCard from '@/components/tool/ToolCard.vue';

import { useBlogConfig } from '@/stores/config';

import { computed } from 'vue';

const blogConfig = useBlogConfig();

const tools = blogConfig.listTool;

const lists = computed(() => {
    const list1: Record<ToolId, Tool> = {};
    const list2: Record<ToolId, Tool> = {};
    const list3: Record<ToolId, Tool> = {};

    console.log(Object.fromEntries(Array.from({ length: 20 }, (_, i) => ['test-' + i, {
        id: 'test' + i,
        name: '测试' + i,
        description: 'a'.repeat(Math.floor(Math.random() * 100))
    }])));

    for(const id in tools){
        console.log(id);
        
        const rand = Math.ceil(Math.random() * 3);

        switch(rand){
            case 1:  list1[id] = tools[id]; break;
            case 2:  list2[id] = tools[id]; break;
            default: list3[id] = tools[id]; break;
        }
    }

    console.log(tools);

    return [list1, list2, list3];
})


</script>

<style scoped lang="scss">
.main {
    margin: 1em 0;
    width: min(1080px, 90%);
}

.card {
    &:not(:last-child) {
        margin-bottom: 2em;
    }
}
</style>