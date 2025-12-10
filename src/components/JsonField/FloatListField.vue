<template>
    <div class="fieldListContain">
        <div class="fieldListElement" v-for="(item, index) in modelValue.value" :key="index">
            <div class="fieldComponent">
                <input class="input" type="number" step="0.01" :value="modelValue.value[index]"
                    @input="e => modelValue.value[index] = e.target.value" placeholder="浮点数">
                <AddOrRemoveButtons v-model="modelValue.value" :index="index" :default-value="getDefaultValue">
                </AddOrRemoveButtons>
            </div>

        </div>
        <AppendButton v-model="modelValue.value" :default-value="getDefaultValue"></AppendButton>
    </div>
</template>

<script setup>
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue';
import AppendButton from '../ListOperation/AppendButton.vue';
const modelValue = defineModel()

function getDefaultValue() {
    return '0.00';
}
</script>