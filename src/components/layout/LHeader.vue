<template>
    <header class="header">
        <font-awesome-icon :icon="faHeart" class="heart" size="3x" />
    </header>

    <div class="menu-container">
        <el-affix @scroll="handleScroll">
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
            
        </el-menu>
    </el-affix>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { ElMenu, ElMenuItem, ElAffix, ElInput } from 'element-plus';

import { ref } from 'vue';

import { useAuth } from '@/stores/auth';

const auth = useAuth();

const lastTop = ref(0);

const hide = ref(false);
const move = ref(false);

const showLogin = ref(false);

const keyword = ref('');

function handleScroll(status: { scrollTop: number, fixed: boolean }){
    move.value = status.fixed;

    if(status.scrollTop < lastTop.value){
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

    transition: transform 0.1s ease-in-out;

    &.hide.move {
        transform: translateY(-100%);
    }
}

.menu-container {
    background-color: var(--main-color-l2);
}

.menu-item {
    font-weight: light;
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

</style>