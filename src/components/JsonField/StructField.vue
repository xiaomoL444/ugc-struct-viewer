<template>
    <div class="ElementBlock">
        <div v-if="getBaseStruct(structId) == null">
            缺少结构体：id={{ structId }}
        </div>
        <div v-else>

            <div v-for="(item, index) in getBaseStruct(structId).value" :key="index">
                <div v-if="modelValue.value.value[index] == null"> {{ item.key }} {{ getTypeNameMap()[item.param_type]
                    }}:无内容，请从编辑器中重新导出变量</div>
                <div v-else>
                    {{ item.key }} {{ getTypeNameMap()[item.param_type] }}:
                    <component :is="getTypeComponentMap()[item.param_type]" v-model="modelValue.value.value[index]"
                        :basicStructList="basicStructList" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { getTypeComponentMap, getTypeNameMap } from '../utils/typeMap'

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

</script>