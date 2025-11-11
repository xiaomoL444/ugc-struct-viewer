<template>
    <button v-on:click="modelValue.splice(index, 1)">-</button>
    <button v-on:click="modelValue.splice(index + 1, 0, defaultValue)">+</button>
</template>

<script setup>
const modelValue = defineModel()//传入一个列表

const props = defineProps({
    index: { type: Number, required: true },
    defaultValue: { type: Object, required: true }
});
</script>
