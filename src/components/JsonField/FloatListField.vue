<template>
    <div class="fieldListContain">
        <div class="fieldListElement" v-for="(item, index) in modelValue.value" :key="index">
            <div class="fieldComponent">
                <input class="input" type="number" step="0.01" v-model="modelValue.value[index]" placeholder="浮点数">
                <AddOrRemoveButtons v-model="modelValue.value" :index="index" :default-value="'0.00'">
                </AddOrRemoveButtons>
            </div>

        </div>
        <AppendButton v-model="modelValue.value" :default-value="'0.00'"></AppendButton>
    </div>
</template>

<script setup>
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue';
import AppendButton from '../ListOperation/AppendButton.vue';
const modelValue = defineModel() 
</script>