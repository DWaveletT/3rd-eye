<template>
    <div class="full-container">
        <l-header />

        <div class="main-container" :class="`background-${ props.background }`">
            <main class="main">
                <slot name="main" />
            </main>
            <slot name="aside" />
        </div>
        <l-footer />
    </div>
</template>

<script setup lang="ts">

import LHeader from './LHeader.vue';
import LFooter from './LFooter.vue';

const props = withDefaults(defineProps<{
    background?: "purity" | "picture"
}>(), {
    background: "purity"
})

</script>

<style scoped lang="scss">

.full-container {
    display: flex;
    flex-direction: column;

    min-height: 100vh;
}

.main-container {
    display: flex;
    justify-content: center;

    flex-direction: row;

    flex-grow: 1;

    &.background-purity {
        background-color: var(--page-color);
    }

    &.background-picture {
        background-image: url("https://img.paulzzh.com/touhou/random");
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }
}

</style>