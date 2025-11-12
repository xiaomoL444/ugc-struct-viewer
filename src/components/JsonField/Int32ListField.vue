<template>
    <div class="fieldListContain">
        <div class="fieldListElement" v-for="(item, index) in modelValue.value" :key="index">
            <div class="fieldComponent">
                <input class="input" type="number" step="1" v-model="modelValue.value[index]">
                <AddOrRemoveButtons v-model="modelValue.value" :index="index" :default-value="'0'"></AddOrRemoveButtons>
            </div>
        </div>
        <AppendButton v-model="modelValue.value" :default-value="'0'"></AppendButton>
    </div>
</template>

<script setup>
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue';
import AppendButton from '../ListOperation/AppendButton.vue';
const modelValue = defineModel() 
</script>