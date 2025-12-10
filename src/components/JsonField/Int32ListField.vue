<template>
    <div class="fieldListContain">
        <div class="fieldListElement" v-for="(item, index) in modelValue.value" :key="index">
            <div class="fieldComponent">
                <input class="input" type="number" step="1" :value="modelValue.value[index]"
                    @input="e => modelValue.value[index] = e.target.value">
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
    return '0';
}
</script>