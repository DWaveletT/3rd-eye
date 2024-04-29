<template>
    <footer class="footer">
        <div class="decoration" />

        <div class="info">

        </div>
    </footer>
</template>

<script setup lang="ts">

import { ElFooter } from 'element-plus';

</script>

<style scoped lang="scss">

.decoration {
    border-top:    20px solid var(--main-color-l3);
    border-bottom: 10px solid var(--silk-color);
}

.footer {
    width : 100%;
    height: 100px;

    background: var(--back-color);
}

</style>