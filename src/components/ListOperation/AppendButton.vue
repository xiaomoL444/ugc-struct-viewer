<template>
    <button v-on:click="modelValue.push(defaultValue)">追加元素</button>
</template>

<script setup>
const modelValue = defineModel()//传入一个列表

const props = defineProps({
    defaultValue: { type: Object, required: true }
});
</script>
