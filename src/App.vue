
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

const userConfig = useUserConfig();

</script>

<style scoped lang="scss">

</style>
