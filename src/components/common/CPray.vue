<template>
    <div class="praying-container">
        <div class="blur-container">
            <div class="praying">
                <div class="loading">
                    <font-awesome-icon :icon="faSpinner" size="3x" />
                </div>

                <div class="message">
                    <div class="title">
                        少女祈祷中……
                    </div>
                    <div class="sub-title">
                        Now loading
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

</script>

<style scoped lang="scss">
.praying-container {
    display: flex;
    justify-content: center;

    margin: 1em;
}

@keyframes loading {
    0% {
        rotate: 0;
    }
    10% {
        rotate: 15deg;
    }
    90% {
        rotate: 345deg;
    }
    100% {
        rotate: 360deg;
    }
}

.praying {
    display: flex;
}


.loading {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 1em;

    animation: loading 2s infinite linear;

    color: var(--minor-color);
}

.message {
    
    > .title {
        font-family: '楷体';
        font-size: xx-large;

        color: white;
        text-shadow: 1px 1px 3px var(--minor-color-d5);
        filter: drop-shadow(6px 3px 4px var(--minor-color));
    }
    > .sub-title {
        font-family: 'Courier New', Courier, monospace;
        font-size: x-large;
        font-stretch: 200%;

        color: var(--text-minor-color-h);
    }
}
</style>