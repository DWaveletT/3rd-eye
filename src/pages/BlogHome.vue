<template>
    <layout-home>
        <div class="main">
            <el-row :gutter="15">
                <el-col class="lpart" :span="6">
                    <block-intro />
                </el-col>
                <el-col class="mpart" :span="12">
                    <block-article :posts="testdata.testPost" />
                </el-col>
                <el-col class="rpart" :span="6">
                    <block-guide />
                </el-col>
            </el-row>
        </div>
    </layout-home>
</template>

<script setup lang="ts">

import LayoutHome from '@/components/layout/LayoutHome.vue';

import BlockIntro from '@/components/home/BlockIntro.vue';
import BlockGuide from '@/components/home/BlockGuide.vue';
import BlockArticle from '@/components/home/BlockArticle.vue';

import { ElRow, ElCol } from 'element-plus';

import { useTestdata } from '@/stores/test';
const testdata = useTestdata();


</script>

<style scoped lang="scss">

.main {
    max-width: 1320px;

    flex-grow: 1;
}


</style>