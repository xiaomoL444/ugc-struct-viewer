<template>
    <div class="fieldComponent">
        <input class="input" type="number" step="1" :value="modelValue.value"
            @input="e => modelValue.value = e.target.value">
    </div>
</template>
<script setup>
const modelValue = defineModel() 
</script>