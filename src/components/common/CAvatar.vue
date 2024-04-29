<template>
    <img class="picture" :src="props.user.avatar || '/blog/avatar0.png'" :width="props.size" :height="props.size">
</template>

<script setup lang="ts">
import type { User } from '@/interface';

const props = withDefaults(defineProps<{
    user: User,
    size?: number
}>(),{
    size: 48
});

</script>

<style lang="scss" scoped>

.picture {
    border-radius: 50%;
}

</style>
