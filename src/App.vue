<template>
  <div class="MainContain">
    <div style="/* text-align: center; */
  display: flex;
  /* justify-content: center; */
  /* 水平居中 */
  align-items: center;
  height: 5vw;
  padding-left: 2vw;">
      <h2 class="title">结构体编辑</h2>
    </div>
    <div class="boxs">
      <AdvancedDataManagement class="boxAdvancedStruct" @on-change="onAdvancedDataStructChange">
      </AdvancedDataManagement>
      <CustomerVariable class="boxVariable" @on-select="onCustomerVariableSelect"></CustomerVariable>
      <JsonEditor class="boxStructField" v-model="structData" :basic-struct-list="advancedDataStruct"></JsonEditor>
        <button @click="downloadJson">📦 导出 JSON</button>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import AdvancedDataManagement from './components/AdvancedDataManagement.vue'
import CustomerVariable from './components/CustomerVariable.vue';
import './styles/global.css'   // ✅ 引入全局 CSS
import JsonEditor from './components/JsonEditor.vue';

const advancedDataStruct = ref([]);
const structData = ref([]);

watch(structData, (newVal) => {
  console.log('structList 变化了！', newVal)
}, { deep: true })

const onAdvancedDataStructChange = (data) => {
  advancedDataStruct.value = data
  console.log(advancedDataStruct.value.find(x => x.basic_struct_id == 1077936129));
};

const onCustomerVariableSelect = (data) => {
  structData.value = { param_type: 'Struct', value: data }
};

function downloadJson() {
  // 1️⃣ 转成格式化 JSON 字符串
  const jsonString = JSON.stringify(structData.value.value, null, 2)
  
  // 2️⃣ 生成 Blob（二进制大对象）
  const blob = new Blob([jsonString], { type: "application/json" })

  // 3️⃣ 创建临时下载链接
  const url = URL.createObjectURL(blob)

  // 4️⃣ 创建一个 <a> 元素来触发下载
  const link = document.createElement('a')
  link.href = url
  link.download = "结构体配置.json" // 默认文件名
  link.click()

  // 5️⃣ 释放资源
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.MainContain {
  position: absolute;
  flex-direction: column;
  display: flex;
  height: 100%;
}

.title {
  font-weight: 700;
  /* 粗体 */
  font-size: 2em;
  /* 放大一点好看 */
  background: linear-gradient(225deg, #6a5acd, #00bfff);
  /* 紫 → 蓝 */
  -webkit-background-clip: text;
  /* 背景裁剪到文字 */
  color: transparent;
  /* 隐藏文字颜色，让渐变显现 */
  -webkit-text-fill-color: transparent;
  /* Safari 兼容 */
}

.boxs {
  display: flex;
  flex-direction: row;
  height: 100%;
  /* 垂直排列 */
  gap: 0.2vw;
}

.boxAdvancedStruct {
  flex: 1;
}

.boxVariable {
  flex: 1;
}

.boxStructField {
  flex: 3;
}
</style>

<style>
/* 全局重置 */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* 根 div 撑满页面 */
#app {
  height: 100%;
  width: 100%;
}
</style>