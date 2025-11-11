<template>
  <div class="container">
    <Title :title="'高级数据管理的结构体'"></Title>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item.name }},id:{{ item.basic_struct_id }}
      </li>
    </ul>

    <input type="file" @change="onFileChange" accept=".json" />
    <button @click="clearCache">清除缓存</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Title from './Layout/Title.vue'

const list = ref([])

// 本地缓存 key - 基础结构体
const STORAGE_KEY = 'BasicStruct'

const emit = defineEmits(['onChange'])

// 页面挂载时读取缓存
onMounted(() => {
  const cached = localStorage.getItem(STORAGE_KEY)
  if (cached) {
    list.value = JSON.parse(cached)
    emit('onChange', list.value)//刷新数据
    console.log('从缓存加载数据')
  }
})

// 文件选择事件
const onFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const text = await file.text()
    const data = JSON.parse(text)

    //键入ID
    let inputId = prompt(`请输入「 ${data.name} 」的 ID:`, '')
    // 如果用户取消了 prompt，退出
    if (inputId == null || !(/^\d+$/.test(inputId)) || inputId.length != 10) {
      alert('请输入有效10位长度的整数ID！')
      return
    }
    if (list.value.some(item => item.basic_struct_id == inputId)) {
      alert('已存在该id的结构体！请重新添加')
      return
    }

    // 输入是整数
    //设置结构体的ID
    data.basic_struct_id = inputId;

    // 更新列表，为列表添加值
    list.value.push(data);

    // 存入缓存
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.value))
    emit('onChange', list.value)//刷新数据
    console.log('已读取文件并缓存')
  } catch (err) {
    console.error('读取文件失败:', err)
    alert('JSON 文件格式错误')
  }
}

// 清除缓存
const clearCache = () => {
  localStorage.removeItem(STORAGE_KEY)
  list.value = []
  console.log('已清除缓存')
}
</script>
