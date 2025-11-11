<template>
    <input type="number" step="0.01" v-model="modelValue.value">
</template>
<script setup>
const modelValue = defineModel() 
</script>