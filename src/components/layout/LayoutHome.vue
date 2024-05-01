<template>
    <div class="full-container">
        <l-header />

        <div class="main-container">
            <slot />
        </div>

        <l-footer />
    </div>
</template>

<script setup lang="ts">
import LHeader from './LHeader.vue';
import LFooter from './LFooter.vue';

</script>

<style scoped lang="scss">

.full-container {
    display: flex;
    justify-content: center;
    flex-direction: column;

    min-height: 100vh;
}

.main-container {
    display: flex;
    justify-content: center;

    flex-direction: row;

    flex-grow: 1;

    background-color: var(--page-color);
}

</style>