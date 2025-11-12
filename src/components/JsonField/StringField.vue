<template>
    <div class="fieldComponent">
        <input class="input" type="text" v-model="modelValue.value" placeholder="字符串">
    </div>
</template>

<script setup>
const modelValue = defineModel()

import { onMounted } from 'vue'

onMounted(() => {
    if (!modelValue.value.value) {
        modelValue.value.value = ''  // 如果是数组类型
    }
})

</script>