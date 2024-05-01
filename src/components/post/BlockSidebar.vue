<template>
    <aside class="aside" :class="{ hide }">

        <el-affix :offset="25" target=".aside">
            <section class="toc">
                <h3 style="margin-bottom: 10px">目录</h3>

                <el-scrollbar :max-height="400" class="scrollbar" ref="table">
                    <el-anchor class="toc-list" @change="handleStep">
                        <el-anchor-link v-for="(l1, _) of props.root.child" :key="_" :href="`#${ l1.link }`">
                            {{ l1.title }}

                            <template v-if="l1.child" #sub-link>
                                <el-anchor-link v-for="(l2, _) of l1.child" :key="_" :href="`#${ l2.link }`">
                                    {{ l2.title }}

                                    <template v-if="l2.child" #sub-link>
                                        <el-anchor-link v-for="(l3, _) of l2.child" :key="_" :href="`#${ l3.link }`">
                                            {{ l3.title }}
                                        </el-anchor-link>
                                    </template>
                                </el-anchor-link>
                            </template>
                        </el-anchor-link>
                    </el-anchor>
                </el-scrollbar>
            </section>

            <h3 style="margin-bottom: 10px">随便看看</h3>
        </el-affix>
    </aside>

    <div class="toollist" :class="{ hide }" style="bottom: 200px;">
        <div class="icon">
            <font-awesome-icon :icon="faThumbsUp" />
        </div>
        <div class="icon">
            <font-awesome-icon :icon="faThumbsDown" />
        </div>
    </div>

    <div class="toollist" :class="{ hide }" style="bottom: 150px;">
        <div class="icon">
            <font-awesome-icon :icon="faComment" />
        </div>
    </div>
    <div class="toollist" style="bottom: 100px;" @click="hide = !hide">
        <div class="icon">
            <font-awesome-icon v-if="hide" :icon="faEyeSlash" />
            <font-awesome-icon v-else      :icon="faEye"      />
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import type { HeadlineInfo } from '@dwavelett/rehype-3rd-toc';

import { ElAnchor, ElAnchorLink, ElAffix, ElScrollbar } from 'element-plus';

import { ref } from 'vue';

const props = defineProps<{
    root: HeadlineInfo
}>();

const hide = ref(false);

const table = ref<InstanceType<typeof ElScrollbar> | null>(null);

function handleStep(url: string){
    if(!table.value || !table.value.wrapRef)
        return;

    const tag = table.value.wrapRef.querySelector<HTMLDivElement>('[href="' + url + '"]');

    if(tag){
        const upper = table.value.wrapRef.scrollTop;
        const lower = table.value.wrapRef.scrollTop + table.value.wrapRef.clientHeight;
        const cur = tag.offsetTop;

        if(!(upper <= cur && cur <= lower)){
            table.value.setScrollTop(cur - 100);
        }
    } else {
        table.value.setScrollTop(0);
    }
}

</script>

<style scoped lang="scss">
.toc {
    margin-bottom: 1em;
}

.toc-list {
    --el-text-color-primary: var(--text-minor-color-h);
    --el-text-color-secondary: var(--text-minor-color-p);

    --el-color-primary: var(--text-minor-color-h);

    background-color: rgb(from var(--page-color) r g b / 0.5);
}

.toollist {
    position: fixed;

    right: 40px;

    width: 40px;

    background-color: rgb(from var(--minor-color-l4) r g b / 0.5);
    border: 1px solid var(--minor-color);
    border-radius: 4px;

    transition: opacity 0.2s ease-in-out;

    &.hide {
        opacity: 0;
    }
}

.icon {
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--minor-color-d3);

    cursor: pointer;

    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: rgb(from var(--minor-color) r g b / 0.5);
    }
}

.aside {
    min-width: 300px;

    margin-left: 1em;
    padding: 1.5em 1em;

    box-sizing: border-box;

    background-color: rgb(from var(--minor-color-l2) r g b / 0.25);

    &.hide {
        display: none;
    }
}
</style>