<template>
    <div v-for="(item, index) in modelValue.value" :key="index">
        <input type="text" v-model="modelValue.value[index]">
        <AddOrRemoveButtons v-model="modelValue.value" :index="index" :default-value="getDefaultValue()"></AddOrRemoveButtons>
    </div>
    <AppendButton v-model="modelValue.value" :default-value="getDefaultValue()"></AppendButton>
</template>

<script setup>
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue';
import AppendButton from '../ListOperation/AppendButton.vue';
import StringField from './StringField.vue';

const modelValue = defineModel() 

function getDefaultValue(){
return JSON.parse(JSON.stringify(''));
}
</script>