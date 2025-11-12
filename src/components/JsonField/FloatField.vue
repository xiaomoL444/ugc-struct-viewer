<template>
    <div class="fieldComponent">
        <input class="input" type="number" step="0.01" v-model="modelValue.value" placeholder="浮点数">
    </div>
</template>
<script setup>
const modelValue = defineModel() 
</script>