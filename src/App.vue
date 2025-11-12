<template>
  <div class="MainContain" style="background-color: white;">
    <div style="/* text-align: center; */
  display: flex;
  /* justify-content: center; */
  /* 水平居中 */
  align-items: center;
    flex: 1.2;
  padding-left: 2rem;   background: linear-gradient(90deg, #6a5acd, #00bfff);">
      <h2 class="title">结构体编辑</h2>
    </div>
    <div class="boxs">
      <AdvancedDataManagement v-model="SaveData.advancedDataStruct" class="boxAdvancedStruct"
        @on-change="onAdvancedDataStructChange">
      </AdvancedDataManagement>
      <CustomerVariable v-model="SaveData.structData" class="boxVariable" @on-select="onCustomerVariableSelect">
      </CustomerVariable>
      <JsonEditor v-on:on-download="downloadJson" class="boxStructField" v-model="structData"
        :basic-struct-list="SaveData.advancedDataStruct">
      </JsonEditor>
      <div class="user-badge-container">
        <UserBadge
          avatar="https://images.weserv.nl/?url=https://i1.hdslb.com/bfs/face/b94d505e6be9b2504f6fa23c0030751b23f54e5f.jpg"
          name="creater:戀祈" link="https://space.bilibili.com/609872107" :openInNewTab="true" />
        <UserBadge
          avatar="https://images.weserv.nl/?url=https://i1.hdslb.com/bfs/face/d5ef4327d11e8ea4be6f089a491cdf94bd95c2e0.jpg"
          name="PowerBy:小猪之最ThePig" link="https://space.bilibili.com/381671770" :openInNewTab="true" />
        <VideoListModal modalTitle="精选视频" :videos="[
          { cover: './images/video1.png', title: '你一定会用得上的UGC对话框模版地图 /对话/剧情/rpg/解密/免费分享/千星奇域/UGC', link: 'https://www.bilibili.com/video/BV1fYsGz1EpA/?share_source=copy_web&vd_source=812e2c82e7fedf05055036fee2e3a635' },
          { cover: '/images/video2.png', title: '拯救你的特效！全特效在线预览工具！【原神千星奇域】', link: 'https://www.bilibili.com/video/BV1nt1YBGEKH/?share_source=copy_web&vd_source=812e2c82e7fedf05055036fee2e3a635' },
          { cover: '/images/video3.png', title: '「千星奇域黑科技01」无法传送造物？别急！我有方案！', link: 'https://www.bilibili.com/video/BV19YsbzSErW/?share_source=copy_web&vd_source=812e2c82e7fedf05055036fee2e3a635' }
        ]" />
        <!-- <button @click="downloadJson">📦 导出 JSON</button> -->
      </div>

    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import AdvancedDataManagement from './components/AdvancedDataManagement.vue'
import CustomerVariable from './components/CustomerVariable.vue';
import './styles/global.css'   // ✅ 引入全局 CSS
import JsonEditor from './components/JsonEditor.vue';
import UserBadge from './components/Label/UserBadge.vue';
import VideoListModal from './components/Label/VideoListModal.vue';

const STORAGE_KEY = 'xiaomoL444-Save'

const SaveData = ref({ advancedDataStruct: [], structData: [] });

const variableSelect = ref(-1);
const structData = ref();


// 页面挂载时读取缓存
onMounted(() => {
  const cached = localStorage.getItem(STORAGE_KEY)
  if (cached) {
    SaveData.value = JSON.parse(cached)
    console.log('从缓存加载数据')
  }
})

watch(variableSelect, () => {
  structData.value = {
    param_type: 'Struct', value: SaveData.value.structData[variableSelect.value]
  }
})
watch(SaveData, (newVal) => {
  console.log('structList 变化了！', newVal)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SaveData.value))
}, { deep: true })

const onAdvancedDataStructChange = (data) => {
  advancedDataStruct.value = data
};

const onCustomerVariableSelect = (index) => {
  variableSelect.value = index
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
  link.download = "结构体-" + structData.value.value.name + "-" + structData.value.value.basic_struct_id + ".json" // 默认文件名
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
  /* 上下排列 */
}

.title {
  font-weight: 700;
  /* 粗体 */
  font-size: 2rem;
  /* 放大一点好看 */
  /* background: linear-gradient(0deg, #6a5acd, #00bfff); */
  /* 紫 → 蓝 */
  background-color: white;
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
  flex: 18;
  /* gap: 0.2vw; */
  overflow-y: auto;
  /* 超出自己高度出现滚动条 */
}

.boxAdvancedStruct {
  flex: 1;
}

.boxVariable {
  flex: 1;
}

.boxStructField {
  flex: 4;
}
</style>

<style>
/* 全局重置 */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'MyFont'
}

/* 根 div 撑满页面 */
#app {
  height: 100%;
  width: 100%;
}

.user-badge-container {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: row;
  /* 改成 row 就能横排 */
  gap: 8px;
  /* 间距 */
  align-items: flex-end;
}
</style>
