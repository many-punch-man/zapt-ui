<template>
  <div class="grow flex flex-col justify-between relative bg-white dark:bg-gray-800">

    <!--search -->
    <div class="py-6 border-b border-slate-200 dark:border-slate-700">
      <el-form
          ref="form"
          label-width="80px"
          class="flex flex-wrap"
      >
        <el-form-item label="Name" class="grow-0 ">
          <el-input placeholder="Name"></el-input>
        </el-form-item>

        <div class="hidden md:block">
          <el-form-item label="Account" class="grow-0">
            <el-input placeholder="account"></el-input>
          </el-form-item>
        </div>

        <div class="hidden md:block">
          <el-form-item label="Status" class="grow-0">
            <el-input placeholder="Status"></el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button>
            <el-icon class="mr-2">
              <Search/>
            </el-icon>
            Search
          </el-button>
          <el-button>
            <el-icon class="mr-2">
              <Refresh/>
            </el-icon>
            Reset
          </el-button>
          <el-button type="primary" plain>
            <el-icon class="mr-2">
              <Plus/>
            </el-icon>
            Add
          </el-button>
          <el-button type="warning" plain>
            <el-icon class="mr-2">
              <Delete/>
            </el-icon>
            Delete
          </el-button>

          <el-button type="success" plain>
            <el-icon class="mr-2">
              <Download/>
            </el-icon>
            Export
          </el-button>

          <el-button type="warning" plain>
            <el-icon class="mr-2">
              <Upload/>
            </el-icon>
            Import
          </el-button>

        </el-form-item>
      </el-form>
    </div>

    <div class="grow  relative w-full overflow-auto box-border min-h-[300px] md:min-h-[500px] border-b border-slate-200 dark:border-slate-700 ">
      <div class="w-full p-2 absolute box-border block ">
        <el-table :data="list" class=" block" >
          <el-table-column prop="username" label="Date" width="180" />
          <el-table-column prop="nickname" label="Date" width="180" />
          <el-table-column prop="email" label="Date" width="180" />
          <el-table-column prop="mobile" label="Date" width="180" />
          <el-table-column prop="sex" label="Date" width="180" >
            <template #default="scope">
              {{ scope.row.sex === 1 ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Date" width="180" />
          <el-table-column prop="createTime" label="Date" width="180" />
        </el-table>
      </div>
    </div>
    <div class="p-2 box-border flex justify-end">
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>

  </div>
</template>

<script lang="tsx" setup>
import {ref} from 'vue'
import {Bottom, Brush, Delete, Download, Plus, Refresh, Search, Upload} from "@element-plus/icons-vue";
import type {PageResult} from "~/types";

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


onMounted(async () => {
  await getList()
})

</script>
