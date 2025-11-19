<template>
    <div class="fieldComponent">
        <input class="input" type="number" step="0.01" :value="modelValue.value"
            @input="e => modelValue.value = e.target.value" placeholder="浮点数">
    </div>
</template>
<script setup>
const modelValue = defineModel() 
</script>