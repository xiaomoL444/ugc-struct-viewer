<template>
    <div v-if="getBaseStruct(structId) == null">
        缺少结构体：id={{ structId }}
    </div>
    <div v-else>
        <div v-for="(item, index) in modelValue.value.value" :key="index">
            <StructField v-model="modelValue.value.value[index]" :basicStructList="basicStructList"></StructField>
            <AddOrRemoveButtons v-model="modelValue.value.value" :index="index" :default-value="getDefaultValue()">
            </AddOrRemoveButtons>
        </div>
        <AppendButton v-model="modelValue.value.value" :default-value="getDefaultValue()"></AppendButton>
    </div>
</template>

<script setup>

import { ref, computed, onMounted, reactive } from 'vue'
import { getTypeComponentMap, getTypeNameMap } from '../utils/typeMap'
import StructField from './StructField.vue'
import AppendButton from '../ListOperation/AppendButton.vue'
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue'

const props = defineProps({
    basicStructList: { type: Object, required: true },
})

const modelValue = defineModel() // Vue 3.4 之后的新写法

const structId = computed({
    get() {
        return modelValue.value.value?.structId
    }
})
const getBaseStruct = (structId) => {
    return props.basicStructList.find(x => x.basic_struct_id == structId);
}

function getDefaultValue() {
    return reactive({
        param_type: 'Struct',
        value: {
            structId: modelValue.value.value.structId,
            type: 'Struct',
            value: getBaseStruct(modelValue.value.value.structId).value.map(item => ({ ...item.value })) ?? [...[]]
        }
    })
}

</script>