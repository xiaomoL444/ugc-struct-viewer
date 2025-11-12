<template>
    <div class="fieldListContain">
        <div v-bind:class="['fieldListElement', 'balckmode-suit']" v-for="(item, index) in modelValue.value"
            :key="index">
            {{ modelValue.value[index] }}
            <AddOrRemoveButtons v-model="modelValue.value" :index="index" :default-value="'0'"></AddOrRemoveButtons>
        </div>
        <AppendButton v-model="modelValue.value" :default-value="'0'"></AppendButton>
    </div>
</template>

<script setup>
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue';
import AppendButton from '../ListOperation/AppendButton.vue';
const modelValue = defineModel() 
</script>