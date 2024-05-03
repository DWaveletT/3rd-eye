<template>
    <header class="header">
        <font-awesome-icon :icon="faHeart" class="heart" size="3x" />
    </header>

    <div class="menu-container">
        <el-affix @scroll="handleScroll" :style="{ 'pointer-events': hide ? 'none' : 'auto' }">
        <el-menu class="menu" mode="horizontal" :ellipsis="false" :class="{ hide, move }" router>
            <el-menu-item class="menu-item" index="/" >
                首页
            </el-menu-item>
            <el-menu-item class="menu-item" index="/archive" >
                查找
            </el-menu-item>
            <el-menu-item class="menu-item" index="/tool" >
                工具
            </el-menu-item>
            <el-menu-item class="menu-item" index="/random" >
                随机
            </el-menu-item>

            <div style="flex-grow: 1;" />

            <div class="search-bar">
                <el-input v-model="keyword">
                    <template #suffix>
                        <font-awesome-icon :icon="faMagnifyingGlass" />
                    </template>
                </el-input>
            </div>
            
            <div style="flex-grow: 2;" />

            <div class="config">
                <font-awesome-icon class="language" :icon="faLanguage" size="xl" />
                <div class="divider" />
                <el-switch class="switcher" v-model="userConfig.colorTheme" size="large">
                    <template #inactive-action>
                        <font-awesome-icon class="star" :icon="faSun" />
                    </template>
                    <template #active-action>
                        <font-awesome-icon class="star" :icon="faMoon" />
                    </template>
                </el-switch>
                <div class="divider" />
                <font-awesome-icon class="github" :icon="faGithub" size="xl" />
            </div>

            <div style="margin-right: 2em;" />
            
        </el-menu>
    </el-affix>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faMagnifyingGlass, faLanguage, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { ElMenu, ElMenuItem, ElAffix, ElInput, ElSwitch } from 'element-plus';

import { ref } from 'vue';

import { useUserConfig } from '@/stores/config';

const userConfig = useUserConfig();

const lastTop = ref(0);

const hide = ref(false);
const move = ref(false);

const keyword = ref('');

function handleScroll(status: { scrollTop: number, fixed: boolean }){
    move.value = status.fixed;

    if(status.scrollTop < lastTop.value || status.scrollTop < 10){
        hide.value = false;
    } else {
        hide.value = true;
    }
    lastTop.value = status.scrollTop;
}

</script>

<style scoped lang="scss">

.header {
    box-sizing: content-box;
    width: 100%;
    height: 15px;

    background: linear-gradient(rgb(from var(--silk-color) r g b / 0.9), rgb(from var(--silk-color) r g b / 0.8));
    border-top:    25px solid var(--back-color);
    border-bottom: 14px solid var(--back-color);

}

.menu {
    --el-menu-text-color: var(--text-main-color-p);
    background: linear-gradient(
        to bottom,
        rgb(from var(--main-color-l2) r g b / 0.4),
        rgb(from var(--main-color-d2) r g b / 0.4)
    );

    border-bottom: 5px solid var(--main-color-d2);

    top: 0;

    transition: top 0.15s ease-in-out;

    &.hide.move {
        top: -100%;
    }
}

.menu-container {
    background-color: var(--main-color-l2);
}

.menu-item {
    font-weight: lighter;
}

.heart {
    z-index: 1;
    color: var(--silk-color);

    position: absolute;
    right: 2em;
    top: 0.1em;
}

.search-bar {
    margin-left: 1em;
    
    width: 20em;

    display: flex;
    align-items: center;

    fill-opacity: 0.5;

    --el-fill-color-blank: rgb(from white r g b / 0.8);
}

.config {
    display: flex;
    align-items: center;

    margin: 0 1em;
}

.github {
    height: 1.2em;
}

.language {
    height: 1.3em;

    color: var(--text-main-color-h);
}

.switcher {
    --el-switch-on-color: #111;
    --el-switch-off-color: #ddd;

    .star {
        color: #F0B23D;
    }
}

.divider {
    background-color: var(--main-color);
    width: 2px;
    height: 1.5em;
    margin: 0 0.8em;
}

</style>