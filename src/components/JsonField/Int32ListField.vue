<template>
    <div v-for="(item, index) in modelValue.value" :key="index">
        <input type="number" step="1" v-model="modelValue.value[index]">
        <AddOrRemoveButtons v-model="modelValue.value" :index="index" :default-value="'0'"></AddOrRemoveButtons>
    </div>
    <AppendButton v-model="modelValue.value" :default-value="'0'"></AppendButton>
</template>

<script setup>
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue';
import AppendButton from '../ListOperation/AppendButton.vue';
import Int32Field from './Int32Field.vue';
const modelValue = defineModel() 
</script>