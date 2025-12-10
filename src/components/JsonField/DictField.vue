<template>
    <div class="ElementBlock">
        <div class="fieldListContain" style="flex-direction: column;">
            <div class="fieldListElement" v-for="(item, index) in modelValue.value.value" :key="index">
                <div style="  display: flex;  flex-direction:row;     align-items: normal ;padding-right: 1rem;">
                    <div style="display: flex;  flex-direction:row; flex:1;">
                        <div style="flex:1">
                            <div style="color:black" v-if="modelValue.value.value[index].key == null">无内容，请从编辑器中重新导出变量
                            </div>
                            <div v-else>
                                <component :is="getTypeComponentMap()[item.key.param_type]"
                                    v-model="modelValue.value.value[index].key" :basicStructList="basicStructList" />
                            </div>
                        </div>
                        <div style="flex: 4;">
                            <div style="color:black" v-if="modelValue.value.value[index].value == null">无内容，请从编辑器中重新导出变量
                            </div>
                            <div v-else>
                                <component :is="getTypeComponentMap()[item.value.param_type]"
                                    v-model="modelValue.value.value[index].value" :basicStructList="basicStructList" />
                            </div>
                        </div>

                    </div>
                    <AddOrRemoveButtons v-model="modelValue.value.value" :index="index"
                        :default-value="getDefaultValue">
                    </AddOrRemoveButtons>
                </div>

            </div>
        </div>
        <AppendButton v-model="modelValue.value.value" :default-value="getDefaultValue"></AppendButton>
    </div>
</template>

<style scrop>
.component {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}
</style>
<script setup>
import { ref, watch, reactive } from 'vue'
import { getTypeNameMap, getTypeComponentMap } from '../utils/typeMap';
import AppendButton from '../ListOperation/AppendButton.vue';
import AddOrRemoveButtons from '../ListOperation/AddOrRemoveButtons.vue';


const modelValue = defineModel()

const props = defineProps({
    basicStructList: { type: Object, required: true },
})

function getDefaultValueMap() {
    return JSON.parse(JSON.stringify({
        String: '',
        StringList: '',
        Int32: '0',
        Int32List: '',
        Float: '0.00',
        FloatList: '',
        Bool: 'False',
        BoolList: '',
        Vector3: '0,0,0',           // 也可以改成数组 [0,0,0]
        Vector3List: '',            // 数组内可放 '0,0,0'
        Entity: 0,
        EntityList: '',
        Guid: '0',
        GuidList: '',
        ConfigReference: '0',
        ConfigReferenceList: '',
        EntityReference: '0',
        EntityReferenceList: '',
        Army: '0',
        ArmyList: '',
        Struct: reactive({
            structId: modelValue.value.value.value_structId,
            type: 'Struct',
            value: getBaseStruct(modelValue.value.value.value_structId)?.value.map(item => item.value) ?? []
        }),
        StructList: reactive({
            structId: modelValue.value.value.value_structId,
            value: getDefaultStructListValue()
        }),
        // Dict: () => ({ type: 'Dict', key_type: '', value_type: '', value: [] })//不可能添加Dic的家人
    }));
}

function getBaseStruct(structId) {
    return props.basicStructList.find(x => x.basic_struct_id == structId);
}

function getDefaultStructListValue() {
    return reactive([]);
}

function getDefaultValue() {
    return reactive({
        key: { param_type: modelValue.value.value.key_type, value: getDefaultValueMap()[modelValue.value.value.key_type] },
        value: { param_type: modelValue.value.value.value_type, value: getDefaultValueMap()[modelValue.value.value.value_type] }
    });
}

</script>