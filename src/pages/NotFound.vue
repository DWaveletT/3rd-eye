<template>
    <layout-full background="purity">
        <el-card class="main">

            <div class="image">
                404
            </div>

            <div class="info">
                <h2>你来到了不存在的页面……</h2>

                <el-button class="return">返回上页</el-button>
            </div>
            
        </el-card>
    </layout-full>
</template>

<script setup lang="ts">

import LayoutFull from '@/components/layout/LayoutFull.vue';

import { ElCard, ElButton } from 'element-plus';

</script>

<style scoped lang="scss">
.main {
    min-width: 800px;
}

.info {
    color: var(--text-minor-color-h);
    text-align: center;
}

.image {
    font-size: 1000%;
    text-align: center;
}

.return {
    margin-top: 1em;
}
</style>