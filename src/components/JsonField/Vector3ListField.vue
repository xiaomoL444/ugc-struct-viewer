<template>
    <div v-for="(item, index) in modelValue.value" :key="index">
        <input type="number" step="0.01" v-model="vecListRef[index][0]" placeholder="X" />
        <input type="number" step="0.01" v-model="vecListRef[index][1]" placeholder="Y" />
        <input type="number" step="0.01" v-model="vecListRef[index][2]" placeholder="Z" />
        <AddOrRemoveButtons v-model="vecListRef" :index="index" :default-value="getDefaultValue()"></AddOrRemoveButtons>
    </div>
    <AppendButton v-model="vecListRef" :default-value="getDefaultValue()"></AppendButton>
</template>

<script setup>
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue';
import AppendButton from '../ListOperation/AppendButton.vue';

import { watch, ref, computed, onMounted } from 'vue'

const modelValue = defineModel()

// ✅ 1. 每次都重新生成独立数组副本
function toVecList(src) {
    return (src || []).map(str => str.split(',').map(num => Number(num)))
}

const vecListRef = ref(toVecList(modelValue.value.value))

// 🔹 监听 vecListRef 改变，同步回父级 JSON

// ✅ 3. 监听 vecListRef 内部变化，写回上层
watch(vecListRef, (newList) => {
    modelValue.value.value = newList.map(vec => vec.join(','))
}, { deep: true })

function getDefaultValue() { return [0, 0, 0] }

// 用于强制刷新组件的 key

onMounted(() => {
    setTimeout(() => {
        vecListRef.value = toVecList(modelValue.value.value)
    }, 10)
})
</script>