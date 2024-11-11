<template>

</template>

<script lang="tsx" setup>
import {ref} from 'vue'
import {Bottom, Brush, Delete, Download, Plus, Refresh, Search, Upload} from "@element-plus/icons-vue";
import type {PageResult} from "~/types";
import dayjs from "dayjs";

defineOptions({name: 'UserList'})




const list = ref<UserVO[]>([])
const total = ref(0)

const getList = async () => {
  const data = await fetchGet<PageResult<UserVO>>("/system/user/page", {
    params: {
      pageNo: 1,
      pageSize: 15
    }
  })

  list.value = data.list
  total.value = data.total
}

const formatterData = (date:number):string =>{
  return dayjs(date).format("YYYY-MM-DD")
}


onMounted(async () => {
  await getList()
})

</script>
