<template>
    <layout-side background="purity">
        <template #main>
            <block-result v-model="params" ref="engine" />
        </template>
        <template #aside>
            <block-filter v-model="params" @search="engine?.doSearch()" />
        </template>
    </layout-side>
</template>

<script setup lang="ts">

import LayoutSide from '@/components/layout/LayoutSide.vue';
import BlockResult from '@/components/archive/BlockResult.vue';
import BlockFilter from '@/components/archive/BlockFilter.vue';

import { type Params } from '@/components/archive/BlockResult.vue';

import { ref } from 'vue';

const params = ref<Params>({
    keyword: '',
    tag: [],
    time: [0, Infinity]
});

const engine = ref<InstanceType<typeof BlockResult> | null>();


</script>

<style lang="scss">


</style>