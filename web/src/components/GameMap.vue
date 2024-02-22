<template>
    <div ref="parent" class="gamemap">
        <canvas ref="canvas" tabindex="0">

        </canvas>
    </div>
</template>

<script>
import {GameMap} from "../assets/scripts/GameMap.js";
import {ref, onMounted} from "vue";
import { useStore } from 'vuex';

export default {
    setup() {
        let parent = ref(null);
        let canvas = ref(null);
        const store = useStore();

        onMounted(() => {
            new GameMap(canvas.value.getContext('2d'), parent.value, store);
        })

        return{
            parent,
            canvas
        }
    }
}
</script>

<style scoped>
    div.gamemap{
        width: 100%;
        height: 100%;
        display: flex;
        /* 水平居中 */
        justify-content: center;
        /* 竖直居中 */
        align-items: center;  
    }
</style>