<template>
    <div class="fieldComponent">
        <div style="display: flex;flex-direction: row; gap: 0.5rem;align-items: center;" class="balckmode-suit">
            X:<input class="input" type="number" step="0.01" v-model="vecRef[0]" placeholder="X" />
            Y:<input class="input" type="number" step="0.01" v-model="vecRef[1]" placeholder="Y" />
            Z:<input class="input" type="number" step="0.01" v-model="vecRef[2]" placeholder="Z" />
        </div>

    </div>

</template>
<script setup>
import { watch, ref, computed } from 'vue'

const modelValue = defineModel()

// 初始化数组
const vecRef = ref(modelValue.value.value
    ? modelValue.value.value.split(',').map(Number)
    : [0, 0, 0]
)

// 监听数组变化，把新值同步回 modelValue.value.value
watch(vecRef, (newVec) => {
    modelValue.value.value = newVec.join(',')
}, { deep: true })
</script>