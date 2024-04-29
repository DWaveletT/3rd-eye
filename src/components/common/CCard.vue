<template>
    <div class="card" :class="`shadow-${ props.shadow }`">
        <slot />
    </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    shadow?: "hover" | "never" | "always"
}>(), {
    shadow: "hover"
})

</script>

<style scoped lang="scss">

.card {
    background-color: var(--card-b-color);
    border: 2px solid var(--card-f-color);
    border-radius: 6px;

    padding: 1em;

    transition: box-shadow 0.2s ease-in-out;

    &.shadow-hover:hover {
        box-shadow: 2px 2px 8px var(--card-f-color);
    }

    &.shadow-always {
        box-shadow: 2px 2px 8px var(--card-f-color);
    }
}

</style>