<template>
    <div v-for="(item, index) in modelValue.value" :key="index">
        <select v-model="modelValue.value[index]">
            <option value="True">是</option>
            <option value="False">否</option>
        </select>
        <AddOrRemoveButtons v-model="modelValue.value" :index="index" :default-value="'False'"></AddOrRemoveButtons>
    </div>
    <AppendButton v-model="modelValue.value" :default-value="'False'"></AppendButton>
</template>

<script setup>
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue';
import AppendButton from '../ListOperation/AppendButton.vue';
const modelValue = defineModel() 
</script>