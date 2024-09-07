<template>
  <!-- Page header -->
  <div class="flex md:flex-row flex-col h-full">
    <UserDeptSidebar @node-click="handleDeptNodeClick" />
    <!--<UserList />-->

    <div class="grow flex flex-col justify-between relative bg-white dark:bg-gray-800">
      <!--search -->
      <div class="py-6 border-b border-slate-200 dark:border-slate-700">
        <el-form
            ref="form"
            label-width="80px"
            class="flex flex-wrap"
        >
          <el-form-item label="Name" class="grow-0 ">
            <el-input placeholder="Name" v-model="queryParams.username"></el-input>
          </el-form-item>

          <div class="hidden md:block">
            <el-form-item label="Status" class="grow-0">
              <el-input placeholder="Status" v-model="queryParams.status"></el-input>
            </el-form-item>
          </div>



        </el-form>
        <div class="flex flex-wrap gap-3 mr-3">
          <el-button @click="getList">
            <el-icon class="mr-2">
              <Search/>
            </el-icon>
            Search
          </el-button>
          <el-button>
            <el-icon class="mr-2" @click="resetQueryParam">
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
        </div>
      </div>

      <div class="grow  relative w-full overflow-auto box-border min-h-[300px] md:min-h-[500px] border-b border-slate-200 dark:border-slate-700 ">
        <div class="w-full p-2 absolute box-border block ">
          <el-table :data="list" class=" block" @selection-change="handleSelect" >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="username" label="username" width="180" />
            <el-table-column prop="nickname" label="nickname" width="180" />
            <el-table-column prop="sex" label="sex" width="180" >
              <template #default="scope">
                {{ scope.row.sex === 1 ? '男' : '女' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="status" width="180" />
            <el-table-column prop="createTime" label="createTime"  >
              <template #default="scope">
                {{ formatterData(scope.row.createTime)}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="p-2 box-border flex justify-end">
        <Pagination :total="total"
                    v-model:page="queryParams.pageNo"
                    v-model:limit="queryParams.pageSize"
                    @pagination="getList"
                    />
      </div>
    </div>

  </div>

</template>

<script lang="tsx" setup>
import PageHeader from "~/components/admin/PageHeader.vue";
import BaseCard from "~/components/admin/BaseCard.vue";
import UserDeptSidebar from "~/components/admin/system/setting/UserDeptSidebar.vue";
import UserList from "~/components/admin/system/setting/UserList.vue";
import {Delete, Download, Plus, Refresh, Search, Upload} from "@element-plus/icons-vue";
import {ref} from "vue";
import type {PageResult} from "~/types";
import dayjs from "dayjs";

defineOptions({name: 'user'})

const queryParams = ref({
  deptId: null,
  username: null,
  mobile: null,
  status: null,
  createTime: null,
  pageNo: 1,
  pageSize: 15
})

const handleDeptNodeClick = async (row: any) => {
  queryParams.value.deptId = row.id
  await getList()
}



const list = ref<UserVO[]>([])
const total = ref(0)

const getList = async () => {
  const data = await fetchGet<PageResult<UserVO>>("/system/user/page", {
    params: queryParams.value
  })

  list.value = data.list
  total.value = data.total
}

const resetQueryParam = () => {
  queryParams.value = {
    deptId: null,
    username: null,
    mobile: null,
    status: null,
    createTime: null,
    pageNo: 1,
    pageSize: 15
  }
}

const formatterData = (date:number):string =>{
  return dayjs(date).format("YYYY-MM-DD")
}

const handleSelect = (val: any) => {
  console.log(val)
}

onMounted(async () => {
  await getList()
})
</script>
