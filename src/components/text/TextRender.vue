<template>
    <div ref="html" class="markdown" @codecopy="handleCopy" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMarkdown, type ProcessorOption } from '@/stores/markdown';

import { ElMessage } from 'element-plus';

const props = defineProps<{
    mark: string,
    options?: ProcessorOption
}>();

const html = ref<HTMLElement>(null!);

const markdown = useMarkdown();

onMounted(() => {
    const processor = markdown.getProcessor(props.options);

    processor.process(props.mark)
        .catch((e) => { console.log(e); })
        .then((result) => {
            html.value.innerHTML = String(result);
        })
});

function handleCopy(e: Event){
    const code = (e.target as HTMLElement)?.attributes.getNamedItem("data")?.value || null;
    
    if(code){
        navigator.clipboard.writeText(code).then(
            () => {
                ElMessage({
                    message: '复制成功',
                    type: 'success',
                })
            },
            () => {
                ElMessage({
                    message: '复制失败',
                    type: 'error',
                })
            },
        );
    }
}

</script>

<style scoped lang="scss">
.article {
    background-color: rgba(255, 255, 255, 0.2);

    border-radius: 2px;
}
</style>