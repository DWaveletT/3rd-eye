
<template>
    <RouterView :class="{
        'color-theme-light': !userConfig.colorTheme,
        'color-theme-dark' :  userConfig.colorTheme
    }" />

    <el-backtop />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { ElBacktop } from 'element-plus';

import { useUserConfig } from './stores/config';
import { useUtil } from './stores/util';
import { onMounted } from 'vue';

const userConfig = useUserConfig();

const util = useUtil();

onMounted(() => {
    window.addEventListener('visibilitychange', () => {
        if(document.visibilityState === 'hidden'){
            document.title = '少女休憩中……';
        } else {
            document.title = util.getTitle().value;
        }
    })
})

</script>

<style scoped lang="scss">

</style>
