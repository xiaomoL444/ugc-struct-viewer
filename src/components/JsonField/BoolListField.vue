<template>
    <div class="fieldListContain">
        <div class="fieldListElement" v-for="(item, index) in modelValue.value" :key="index">
            <div class="fieldComponent">
                <div style="display: flex; width: 100%; gap: 0.5rem;">
                    <select style="flex: 1;" v-model="modelValue.value[index]" class="custom-select">
                        <option value="True">是</option>
                        <option value="False">否</option>
                    </select>
                    <AddOrRemoveButtons  v-model="modelValue.value" :index="index" :default-value="'False'">
                    </AddOrRemoveButtons>
                </div>
            </div>
        </div>
        <AppendButton v-model="modelValue.value" :default-value="'False'"></AppendButton>
    </div>
</template>

<script setup>
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue';
import AppendButton from '../ListOperation/AppendButton.vue';
const modelValue = defineModel() 
</script>