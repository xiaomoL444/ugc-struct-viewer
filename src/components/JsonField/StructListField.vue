<template>
    <div v-if="getBaseStruct(structId) == null">
        <div style="color:black">缺少结构体：id={{ structId }}</div>
    </div>
    <div v-else>
        <div v-for="(item, index) in modelValue.value.value" :key="index">
            <div style="display: flex; flex-direction: row; padding-right: 1rem;align-items: normal;">
                <Collapse style="flex: 1;" :title="'元素块' + itemsWithHash[index].hash">
                    <StructField v-model="modelValue.value.value[index]" :basicStructList="basicStructList">
                    </StructField>
                </Collapse>
                <AddOrRemoveButtons style="padding: 0.8rem 0 0 0.8rem" v-model="modelValue.value.value" :index="index"
                    :default-value="getDefaultValue()">
                </AddOrRemoveButtons>
            </div>
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
import Collapse from '../Layout/Collapse.vue'
import CryptoJS from 'crypto-js'

const itemsWithHash = computed(() =>
    modelValue.value.value.value.map(item => ({
        ...item,
        hash: CryptoJS.SHA256(JSON.stringify(item)).toString().slice(0, 8) // 截短
    }))
)

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