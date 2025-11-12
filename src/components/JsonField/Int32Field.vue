<template>
    <div class="fieldComponent">
        <input class="input" type="number" step="1" v-model="modelValue.value">
    </div>
</template>
<script setup>
const modelValue = defineModel() 
</script>