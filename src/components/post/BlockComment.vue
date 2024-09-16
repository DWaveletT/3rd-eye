<template>
    <div class="comments">
        <c-bubble v-for="i in displays" :key="i.id" :user="i.replyer" style="margin-top: 1em;">
            <template #header>
                <c-username :user="i.replyer" /> / <c-date :date="new Date(i.time)" />
                <div class="reply-operator">
                    <span @click="doReplyUvote(i.id)"><font-awesome-icon :icon="faThumbsUp" />{{ i.uvote }}</span>
                    <span @click="doReplyDvote(i.id)"><font-awesome-icon :icon="faThumbsDown" /> {{ i.dvote }}</span>
                </div>
            </template>
            <template #message>
                <text-render :mark="i.content" class="minor-color" />
            </template>
        </c-bubble>

        <div v-if="displays.length < props.replys.length" class="show-more">
            <div class="divider" />
            <el-button class="button" @click="showMore"> 加载更多 </el-button>
            <div class="divider" />
        </div>
        
        <el-card shadow="hover" style="margin-top: 1em;">
            <text-editor v-model="replyContent" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { Reply, ReplyId } from '@/interface';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import CBubble from '@/components/common/CBubble.vue';
import CDate from '@/components/common/CDate.vue';
import CUsername from '@/components/common/CUsername.vue';

import TextRender from '@/components/text/TextRender.vue';
import TextEditor from '@/components/text/TextEditor.vue';

import { ElCard, ElButton } from 'element-plus';

import { onMounted, ref } from 'vue';

const replyContent = ref('');

const props = defineProps<{
    replys: Reply[]
}>();

const displays = ref<Reply[]>([]);

function showMore(){
    const curLen = displays.value.length;
    const newLen = Math.min(displays.value.length + 10, props.replys.length);

    for(let i = curLen;i < newLen;++ i){
        displays.value.push(props.replys[i]);
    }
}

onMounted(() => {
    showMore();
});

function doReplyUvote(rid: ReplyId){
    console.log(rid, 'do reply like.');
}
function doReplyDvote(rid: ReplyId){
    console.log(rid, 'do reply like.');
}


</script>

<style scoped lang="scss">


.reply-buttons {
    display: flex;
    justify-content: end;
    margin-top: 0.5em;
}

.pagination {
    margin: 1em 0.5em;

    justify-content: flex-end;
}

.info {

    >.info-item {
        display: flex;
        justify-content: space-between;
    }

    > :not(:last-child) {
        margin-bottom: 0.5em;
    }
}

.reply-operator {
    float: right;

    cursor: pointer;

    > :not(:last-child) {
        margin-right: 1em;
    }
}

.post-operator {
    display: flex;

    justify-content: space-between;
    margin-top: 1em;
}

.login-area {
    cursor: pointer;

    background-color: var(--el-color-info-light-9);
    border: 1px solid var(--el-color-info);

    height: 10em;

    border-radius: 4px;

    margin-top: 0.5em;

    display: flex;
    align-items: center;
    justify-content: center;

    >.please-login {
        user-select: none;

        font-size: x-large;
        font-weight: lighter;
    }
}

.show-more {
    display: flex;
    flex-direction: row;

    align-items: center;

    > .button {
        border: none;

        &:not(:hover) {
            
            background-color: transparent;
        }
    }

    
    > .divider {
        flex-grow: 1;

        margin: 0 1em;
        
        height: 1px;
        background-color: var(--main-color);
    }
}

</style>