<template>
    <div class="container">
        <Title :title="'编辑区'"></Title>
        <StructField v-model="modelValue" :basic-struct-list="basicStructList"></StructField>
    </div>
</template>

<script setup>
import StructField from './JsonField/StructField.vue'
import Title from './Layout/Title.vue';

const props = defineProps({
    basicStructList: { type: Object, required: true },
})

const modelValue = defineModel() // Vue 3.4 之后的新写法
</script>