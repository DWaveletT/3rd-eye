<template>
    
    <div class="tag" :style="`--tag-color: ${ props.tag.color }`" >
        <div class="name">{{ tag.name }}</div>
        <div v-if="props.closeable" class="close">
            <font-awesome-icon :icon="faXmark" size="lg" @click="emits('close')" />
        </div>
        <div v-if="props.countable" class="count">{{ props.count }}</div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import type { Tag } from '@/interface';

const emits = defineEmits(['close']);

const props = withDefaults(defineProps<{
    tag?: Tag,
    count?: number,
    closeable?: boolean,
    countable?: boolean
}>(), {
    tag: () => {
        return {id: -1, name: '未知标签', color: 'var(--info-color)'};
    },
    count: 0,
    closeable: false,
    countable: false
});

</script>

<style scoped lang="scss">

.tag {
    display: inline-flex;
    align-items: center;

    border: 1px solid var(--minor-color-l2);

    border-radius: 4px;
    overflow: hidden;

    font-size: x-small;
    margin: 0.2em;

    > .name {
        display: inline-block;
        padding: 0.4em 0.8em;
        height: 100%;
        background-color: var(--tag-color);
        color: hsl(from var(--tag-color) h 20 100);
    }

    > .count {
        display: inline-block;
        padding: 0.4em 0.8em;
        height: 100%;
        background-color: var(--minor-color-l5);
        color: var(--text-minor-color-p);
    }

    > .close {
        margin-right: 0.8em;
    }
}
</style>