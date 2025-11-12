<template>
    <div v-bind:class="['fieldComponent','balckmode-suit']" >
        {{ modelValue.value }}
    </div>

</template>
<script setup>
const modelValue = defineModel() 
</script>