<template>
    <div class="fieldListContain">
        <div class="fieldListElement" v-for="(item, index) in modelValue.value" :key="index">
            <div class="fieldComponent">
                <textarea rows="1" :ref="el => textareas[index] = el" @input="() => autoResizeTextarea(textareas[index])" class="textarea"
                    type="text" v-model="modelValue.value[index]" placeholder="字符串"></textarea>
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

import { onMounted, ref, nextTick } from 'vue'
import { autoResizeTextarea } from '../utils/autoResize';

const modelValue = defineModel()

function getDefaultValue() {
    return ' ';
}

const textareas = ref([]) // 这里会收集每个 textarea 的 DOM

// 初始化时让每个 textarea 自动伸展
nextTick(() => {
    textareas.value.forEach(el => autoResizeTextarea(el))
})

</script>