<template>
    <div class="ElementBlock">
        <div v-if="getBaseStruct(structId) == null">
            <div style="color:black">缺少结构体：id={{ structId }}</div>
        </div>
        <div v-else>
            <div v-for="(item, index) in getBaseStruct(structId).value" :key="index">

                <div v-if="modelValue.value.value[index] == null"> {{ item.key }} {{
                    getTypeNameMap()[item.param_type]
                    }}:无内容，请从编辑器中重新导出变量</div>
                <div v-else>
                    <div class="field"
                        :style="{ flexDirection: (['StructList', 'Struct', 'Dict'].includes(item.param_type)) ? 'column' : 'row' }">
                        <div class="Msg">
                            <div class="title">{{ item.key }} </div>
                            <div>
                                <ParamType :param_type="item.param_type"></ParamType>
                            </div>
                        </div>

                        <component class="compoment" :is="getTypeComponentMap()[item.param_type]"
                            v-model="modelValue.value.value[index]" :basicStructList="basicStructList" />

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.field {
    /* position: relative; */
    background-color: white;
    border-radius: 0.5rem;
    padding: 0.5rem  0;
    margin-top: 0.5rem;
    height: auto;
    display: flex;
    align-items: flex-start;
    flex: 1;
    border: 1px solid #ccc;
    /* 顶部对齐 */
}

.field .Msg {
    display: flex;
    /* 设置为 flex 布局 */
    flex-direction: row;
    /* 水平排列（默认就是 row） */
    gap: 1rem;
    /* 两个 div 间距，可选 */
    align-items: center;
    flex: 1;
}

.field .Msg .title {
    padding-left: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: black;
    /* background: #f0f0f0; */
    /* border: 1px solid #ccc; */
}

.field .compoment {
    width: 100%;
    /* 横向撑满父容器 */
    box-sizing: border-box;
    flex-direction: column;
    flex: 2.5;
    align-items: flex-start;
    /* width: 100%; */
    /* 顶部对齐 */
    /* 子元素间距 */
    /* padding: 16px; */
    /* margin: 1vw; */
    /* 内缩整个容器内容 */
}
</style>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { getTypeComponentMap, getTypeNameMap } from '../utils/typeMap'
import ParamType from '../Layout/ParamType.vue'

const props = defineProps({
    basicStructList: { type: Object, required: true },
})

const modelValue = defineModel() // Vue 3.4 之后的新写法

const structId = computed({
    get() {
        return modelValue.value?.value?.structId
    }
})
const getBaseStruct = (structId) => {
    return props.basicStructList.find(x => x.basic_struct_id == structId);
}

</script>