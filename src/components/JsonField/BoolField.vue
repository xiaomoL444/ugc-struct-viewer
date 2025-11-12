<template>
    <select v-model="modelValue.value" class="custom-select">
        <option value="True">是</option>
        <option value="False">否</option>
    </select>
    
</template>

<script setup>
const modelValue = defineModel() 
</script>