<template>
    <el-tooltip
        :content="props.date.toLocaleDateString() + ' ' + props.date.toLocaleTimeString()"
        :placement="props.placement"
    >{{
        (props.date.getMonth() + 1).toString() + ' 月 ' + 
         props.date.getDate()      .toString() + ' 日'
    }}</el-tooltip>
</template>

<script setup lang="ts">

import { ElTooltip } from 'element-plus';

const props = withDefaults(defineProps<{
    date: Date,
    placement?: string
}>(), {
    placement: 'top'
});

</script>

<style scoped lang="scss">
</style>