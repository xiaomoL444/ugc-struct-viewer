<template>
    <div class="fieldComponent">
        <textarea rows="1" ref="ta" @input="() => autoResizeTextarea(ta)" class="textarea" type="text" v-model="modelValue.value"
            placeholder="字符串"></textarea>
    </div>
</template>

<script setup>
const modelValue = defineModel()

import { onMounted, ref,nextTick } from 'vue'

import { autoResizeTextarea } from '../utils/autoResize'

onMounted(() => {
    if (!modelValue.value.value) {
        modelValue.value.value = ''  // 如果是数组类型
    }
})

const ta = ref(null)

nextTick(() => autoResizeTextarea(ta.value))

</script>