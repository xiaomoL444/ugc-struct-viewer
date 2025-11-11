<template>
    <input type="number" step="1" v-model="modelValue.value">
</template>
<script setup>
const modelValue = defineModel() 
</script>