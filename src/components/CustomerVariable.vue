<template>
    <div class="container">
        <Title :title="'自定义变量'"></Title>
        <ul>
            <li v-for="item in list" :key="item.id">
                <button @click="selectVariable(item)">选择：{{ item.name }},id:{{ item.basic_struct_id
                    }}</button>
            </li>
        </ul>

        <input type="file" @change="onFileChange" accept=".json" />
        <button @click="clearCache">清除缓存</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Title from './Layout/Title.vue'
const list = ref([])

// 本地缓存 key - 基础结构体
const STORAGE_KEY = 'VariableStruct'

const emit = defineEmits(['onSelect'])

// 页面挂载时读取缓存
onMounted(() => {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached) {
        list.value = JSON.parse(cached)
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

        // 输入是整数
        //设置结构体的ID
        data.basic_struct_id = uuidv4();

        // 更新列表，为列表添加值
        list.value.push(data);

        // 存入缓存
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list.value))
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

const selectVariable = (variable) => {
    console.log("select " + variable);
    emit('onSelect', variable)
}
</script>
