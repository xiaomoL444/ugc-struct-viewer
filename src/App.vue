<template>
  <Toaster />
  <div v-if="host === 'www.pigest.top'">
    <!-- 整个页面使用全屏 flex + center 对齐 -->
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <!-- 内容容器 -->
      <div class="text-center">
        <!-- 大标题 -->
        <h1 class="text-5xl font-bold text-red-600 mb-6">
          该网页已迁移至新域名
        </h1>

        <!-- 新域名链接 -->
        <p class="text-lg mb-6">
          访问新网站：
          <a :href="newDomain" target="_blank" class="text-blue-600 underline">{{ newDomain }}</a>
        </p>

        <!-- 复制缓存提示 -->
        <div class="mb-6">
          <p class="text-gray-700 mb-2">
            你可以点击下面按钮，将缓存数据复制下来，迁移到新域名：
          </p>
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" @click="copyCache">
            复制缓存数据
          </button>

          <p>{{ SaveData }}</p>
        </div>

        <!-- 复制状态提示 -->
        <p v-if="copied" class="text-green-600 mt-2">缓存数据已复制到剪贴板！</p>
      </div>
    </div>
  </div>


  <div v-else class="MainContain" style="background-color: white;" :hidden='true'>
    <div style="/* text-align: center; */
  display: flex;
  /* justify-content: center; */
  /* 水平居中 */
  align-items: center;
    flex: 1.2;
  padding-left: 2rem;   background: linear-gradient(90deg, #6a5acd, #00bfff);">
      <img src="/images/7.ico" style="height: 2.5rem; width: 2.5rem; margin-right: 1rem;"></img>
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
        <UserBadge :avatar="img" name="从旧域名迁移数据" :function="ImportFormOldDomain" />
        <UserBadge
          avatar="https://images.weserv.nl/?url=https://i1.hdslb.com/bfs/face/b94d505e6be9b2504f6fa23c0030751b23f54e5f.jpg"
          name="creater:戀祈" link="https://space.bilibili.com/609872107" :openInNewTab="true" />
        <UserBadge
          avatar="https://images.weserv.nl/?url=https://i1.hdslb.com/bfs/face/d5ef4327d11e8ea4be6f089a491cdf94bd95c2e0.jpg"
          name="Special Thanks:小猪之最ThePig" link="https://space.bilibili.com/381671770" :openInNewTab="true" />
        <VideoListModal modalTitle="精选视频" :videos="[
          { cover: getPic('http://i0.hdslb.com/bfs/archive/0b50eeef314e719bf2473c4127bde63d12b7eae6.jpg'), title: '你一定会用得上的UGC对话框模版地图 /对话/剧情/rpg/解密/免费分享/千星奇域/UGC', link: 'https://www.bilibili.com/video/BV1fYsGz1EpA/?share_source=copy_web&vd_source=812e2c82e7fedf05055036fee2e3a635' },
          { cover: getPic('http://i0.hdslb.com/bfs/archive/34197a8078f426b4c7507c1ce3397f5ed86b4ea4.jpg'), title: '拯救你的特效！全特效在线预览工具！【原神千星奇域】', link: 'https://www.bilibili.com/video/BV1nt1YBGEKH/?share_source=copy_web&vd_source=812e2c82e7fedf05055036fee2e3a635' },
          { cover: getPic('http://i1.hdslb.com/bfs/archive/837a503a2114d115914070e7d015a0c31e17da0b.jpg'), title: '「千星奇域黑科技01」无法传送造物？别急！我有方案！', link: 'https://www.bilibili.com/video/BV19YsbzSErW/?share_source=copy_web&vd_source=812e2c82e7fedf05055036fee2e3a635' },
          { cover: getPic('http://i2.hdslb.com/bfs/archive/c010571a052616b68ea3dcbcdf936495a3d524fc.jpg'), title: '「千星奇域黑科技02」无需计算！以邪修的方式在服务器获取角色挂接点的位置信息！/如何获取跟随运动器物体的位置/获取角色的实时位置', link: 'https://www.bilibili.com/video/BV1Bdspz6Egy/?share_source=copy_web&vd_source=812e2c82e7fedf05055036fee2e3a635' }
        ]" />
        <!-- <button @click="downloadJson">📦 导出 JSON</button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import AdvancedDataManagement from './components/AdvancedDataManagement.vue'
import CustomerVariable from './components/CustomerVariable.vue';
import './styles/global.css'   // ✅ 引入全局 CSS
import JsonEditor from './components/JsonEditor.vue';
import UserBadge from './components/Label/UserBadge.vue';
import VideoListModal from './components/Label/VideoListModal.vue';
import cloneDeep from 'lodash/cloneDeep'
import 'vue-sonner/style.css'
import { Toaster, toast } from 'vue-sonner'

import img from '@/assets/images/7.ico'
import { getPic } from './components/utils/downloadPic';

const host = window.location.hostname;
const newDomain = 'https://tool.xiaomol444.xyz/UGCStructViewer';
const copied = ref(false)

function copyCache() {

  const cacheData = JSON.stringify(SaveData.value)
  navigator.clipboard.writeText(cacheData)
    .then(() => {
      copied.value = true
      setTimeout(() => copied.value = false, 3000)
    })
    .catch(() => alert('复制失败，请手动复制'))
}



const STORAGE_KEY = 'xiaomoL444-Save'

const SaveData = ref({ advancedDataStruct: [], structData: [] });
const undoStack = ref([])
const redoStack = ref([])
// ✅ 增加一个“是否是手动修改”的标志
let isProgrammaticChange = false

const variableSelect = ref(0);
const structData = computed(() => ({
  param_type: SaveData.value.structData[variableSelect.value]?.type,
  value: SaveData.value.structData[variableSelect.value]
}))


let oldValue = {};
// 页面挂载时读取缓存
onMounted(() => {
  const cached = localStorage.getItem(STORAGE_KEY)
  if (cached) {
    isProgrammaticChange = true;
    SaveData.value = JSON.parse(cached)
    oldValue = JSON.parse(JSON.stringify(SaveData.value));
    console.log('从缓存加载数据')
    nextTick(() => {
      isProgrammaticChange = false;
    });
  }
  window.addEventListener('keydown', handleKey);
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
})
watch(SaveData, (newVal) => {
  console.log('structList 变化了！', newVal)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))//保存值
  // 记录重做
  if (!isProgrammaticChange) {  // 🚫 不记录由撤销/重做引起的修改

    if (oldValue !== null) {
      console.log('记录历史记录');
      undoStack.value.push(cloneDeep(oldValue))
      redoStack.value = [] // 只在用户输入时清空重做
    }
  }
  oldValue = JSON.parse(JSON.stringify(newVal));
}, { deep: true })

function handleKey(e) {
  if (e.ctrlKey && e.key === 'z') {
    e.preventDefault()
    undo()
  } else if (e.ctrlKey && e.key === 'y') {
    e.preventDefault()
    redo()
  }
  else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault() // 阻止浏览器默认保存行为
    // 调用你自己的保存函数
    downloadJson();
  }
}

// 🔹 撤销
function undo() {
  if (undoStack.value.length === 0) {
    toast('无可撤销的内容', { position: 'top-center' })
    return
  }
  const prev = undoStack.value.pop()
  redoStack.value.push(cloneDeep(SaveData.value))
  isProgrammaticChange = true   // ✅ 暂停监听
  SaveData.value = prev
  toast.success('撤回成功,可撤销步骤剩余' + undoStack.value.length, { position: 'top-center' })
  nextTick(() => {
    isProgrammaticChange = false
  });
}

// 🔹 重做
function redo() {
  if (redoStack.value.length === 0) {
    toast('无可复原的内容', { position: 'top-center' })
    return
  }
  const next = redoStack.value.pop()
  undoStack.value.push(cloneDeep(SaveData.value))
  isProgrammaticChange = true   // ✅ 暂停监听
  SaveData.value = next
  toast.success('已复原，可复原步骤剩余' + redoStack.value.length, { position: 'top-center' })
  nextTick(() => {
    isProgrammaticChange = false
  });
}

function ImportFormOldDomain() {
  let input = prompt(`注意：！如果你是从pigest.top/UGCStructViewer（即该工具的前域名）来的，才能使用该功能

  该功能会直接！覆盖该网页的所有配置，当然，你也可以用这个重置本网页的缓存配置
  
  请再次确认你自己在做什么再使用这个功能
  
  请输入pigest.top/UGCStructViewer提供的缓存数据`, '{"advancedDataStruct":[],"structData":[]}')

  if (input == null) return;
  try {
    SaveData.value.advancedDataStruct = JSON.parse(input).advancedDataStruct;
    SaveData.value.structData = JSON.parse(input).structData;
  } catch {
    alert('导入失败！')
  }

}

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
  font-size: 90%;
  /* 让所有 rem 缩小为原来的 0.9 倍 */
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