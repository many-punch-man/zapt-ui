<template>
  <div class=" border border-amber-950 p-2 relative w-[400px]" >
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" width="180" />
    </el-table>
  </div>

</template>

<script lang="tsx" setup>
import {ref} from 'vue'

defineOptions({name: 'test'})

definePageMeta({
  layout:"empty"
})


const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
