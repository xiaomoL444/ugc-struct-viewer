<template>
    <div class="fieldListContain">
        <div class="fieldListElement" v-for="(item, index) in modelValue.value" :key="index">
            <div class="fieldComponent">
                <input class="input" type="text" v-model="modelValue.value[index]" placeholder="字符串">
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
    return ' ';
}
</script>