<template>
    <el-tag type="info" v-if="props.tag" class="tag" :hit="false" :style="`--tag-color: ${props.tag.color}`">{{ props.tag.name }}</el-tag>
    <el-tag type="info" v-else>未知标签</el-tag>
</template>

<script setup lang="ts">
import type { Tag } from '@/interface';

import { ElTag } from 'element-plus';

const props = defineProps<{
    tag: Tag | null | undefined
}>();

</script>

<style scoped lang="scss">
.tag {
    color: hsl(from var(--tag-color) h 20 100);
    background-color: var(--tag-color);
}
</style>