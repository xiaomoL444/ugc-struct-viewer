<template>
    <button :class="['button', 'operate-button']" class="button" style="--btn-bg: #00008050; --btn-bg-hover: #000080CC;"
        v-on:click="modelValue.push(defaultValue)">追加元素</button>
</template>

<style scoped>
.button {
    margin: 0 0.8rem;
    width: 7.5rem;
}
</style>

<script setup>
const modelValue = defineModel()//传入一个列表

const props = defineProps({
    defaultValue: { type: Object, required: true }
});
</script>
