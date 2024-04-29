<template>
    <el-card class="card">
        <div class="banner">
            <div class="decoration" />

            <c-avatar class="avatar" :user="blogConfig.blogger" :size="160" />
        </div>

        <div class="introduce">
            <h3 class="name">{{ blogConfig.blogger.name }}</h3>

            <ul class="description">
                <li><font-awesome-icon class="icon" :icon="faBook" />哈尔滨工业大学就读</li>
                <li><font-awesome-icon class="icon" :icon="faCode" />算竞爱好者（OI&ACM）</li>
                <li><font-awesome-icon class="icon" :icon="faGamepad" />车万爱好者（STG 沙包）</li>
            </ul>
        </div>

        <el-divider />

        <div class="more">
            <el-button class="button">关于</el-button>
            <el-button class="button">友链</el-button>

            <div class="social">
                <a class="item" href="https://github.com/DwaveletT/">
                    <font-awesome-icon class="icon" size="lg" :icon="faGithubAlt" />
                </a>
                <a class="item" href="https://space.bilibili.com/115337372">
                    <font-awesome-icon class="icon" size="lg" :icon="faBilibili" />
                </a>
                <el-tooltip placement="bottom" content="3104439613">
                    <div class="item" @click="copyQQ">
                        <font-awesome-icon class="icon" size="lg" :icon="faQq" />
                    </div>
                </el-tooltip>
                <a class="item" href="https://www.luogu.com.cn/user/68344">
                    <img class="icon" src="/blog/luogu.png" />
                </a>
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faBook,
    faCode,
    faGamepad
} from '@fortawesome/free-solid-svg-icons';

import {
    faGithubAlt,
    faBilibili,
    faQq
} from '@fortawesome/free-brands-svg-icons';

import { ElCard, ElDivider, ElButton, ElTooltip, ElMessage } from 'element-plus';

import CAvatar from '@/components/common/CAvatar.vue';

import { useBlogConfig } from '@/stores/config';

const blogConfig = useBlogConfig();

function copyQQ(){
    navigator.clipboard.writeText('3104439613').then(
        () => {
            ElMessage({
                message: '复制成功',
                type: 'success'
            })
        },
        () => {
            ElMessage({
                message: '复制失败',
                type: 'error'
            })
        }
    );
}
</script>

<style scoped lang="scss">

.banner {
    box-sizing: content-box;
    position: relative;

    height: 9em;
    
    margin-top:   calc(var(--el-card-padding) * (-1));
    margin-left:  calc(var(--el-card-padding) * (-1));
    margin-right: calc(var(--el-card-padding) * (-1));
    margin-bottom: 3em;

    background-color: var(--main-color-d5);

    display: flex;
    justify-content: center;

    .avatar {
        border: 5px solid var(--main-color-d5);

        background-color: var(--main-color-l2);

        position: absolute;
        bottom: -2.5em;

        transition: 5.0s ease-in-out transform;

        &:hover {
            transform: rotate(360deg);
        }
    }

    > .decoration {
        position: absolute;
        top: 100%;
        height: 0;
        width: 100%;

        transition: height 0.1s ease-in-out;
    }
}

.card:hover {
    .banner > .decoration {
        height: 0.5em;
        background: linear-gradient(to bottom, var(--main-color-d5), var(--main-color-l1));
    }
}

.introduce {
    .name {
        color: var(--text-main-color-h);

        text-align: center;
    }

    .description {
        color: var(--text-minor-color-p);
        min-width: 80%;
        margin-top: 1em;

        list-style-type: none;

        padding-left: 2em;
        
        > li {
            position: relative;

            display: flex;
            align-items: center;
        }

        > li:not(:last-child) {
            margin-bottom: 0.5em;
        }

        .icon {
            position: absolute;
            left: -1.5em;

            width: 20px;
            height: 16px;
        }
    }
}

.more {
    .button {
        display: block;
        width: 100%;

        border-radius: 20px;

        margin: 0;
    }

    .button:not(:last-child) {
        margin-bottom: 0.5em;
    }

    .social {
        margin-top: 1em;

        display: flex;
        justify-content: center;

        .item {
            width: 2em;
            height: 2em;

            display: flex;
            justify-content: center;
            align-items: center;

            border-radius: 20%;

            color: var(--minor-color-d1);
            background-color: var(--minor-color-l4);

            .icon {
                max-width:  1.3em;
                max-height: 1.3em;
            }

            transition:
                0.2s ease-in-out color,
                0.2s ease-in-out background-color;

            &:hover {
                color: var(--minor-color-l4);
                background-color: var(--minor-color-d1);
            }
        }

        .item:not(:last-child){
            margin-right: 0.5em;
        }
    }
}
</style>