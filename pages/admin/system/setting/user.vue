<template>

  <div class="flex md:flex-row flex-col h-full">
    <!-- Page header -->
    <UserDeptSidebar @node-click="handleDeptNodeClick"/>
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
          <el-button type="primary" plain @click="handleAddUser">
            <el-icon class="mr-2">
              <Plus/>
            </el-icon>`
            Add
          </el-button>
        </div>
      </div>

      <div
          class="grow  relative w-full overflow-auto box-border min-h-[300px] md:min-h-[500px] border-b border-slate-200 dark:border-slate-700 ">
        <div class="w-full p-2 absolute box-border block ">
          <el-table :data="list" class=" block" @selection-change="handleSelect">
            <el-table-column type="selection" width="55"/>
            <el-table-column prop="username" label="username" width="180"/>
            <el-table-column prop="nickname" label="nickname" width="180"/>
            <el-table-column prop="sex" label="sex" width="180">
              <template #default="scope">
                {{ scope.row.sex === 1 ? '男' : '女' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="status" width="80"/>
            <el-table-column prop="createTime" label="createTime">
              <template #default="scope">
                {{ formatterData(scope.row.createTime) }}
              </template>
            </el-table-column>
            <el-table-column label="Action" width="300">
              <template #default="{row}">
                <el-button type="primary" plain size="small" @click="handleEdit(row.id)">
                  <el-icon class="mr-2">
                    <Edit/>
                  </el-icon>
                  Edit
                </el-button>
                <el-dropdown class="ml-2">
                  <el-button type="primary"  plain size="small" >
                    <span class="mr-8px"><span class="i-ic-baseline-expand-more"></span></span>
                    More
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="handleResetPasswd(row.id)">
                        <span class="mr-8px"><span class="i-ic-outline-lock-reset" ></span></span>
                        Reset Password
                      </el-dropdown-item>
                      <el-dropdown-item @click="handleDeleteUser(row.id)">
                        <span class="i-ic-baseline-delete-forever mr-8px"></span>
                        Delete User
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
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
    <UserForm ref="userForm" @success="getList"/>


  </div>

</template>

<script lang="tsx" setup>
import UserDeptSidebar from "~/components/admin/system/setting/UserDeptSidebar.vue";
import UserForm from "~/components/admin/system/setting/UserForm.vue";
import {Delete, Download, Edit, Plus, Refresh, Search, Upload} from "@element-plus/icons-vue";
import {ref} from "vue";
import type {PageResult} from "~/types";
import dayjs from "dayjs";
import {useMessage} from "~/composables/useMessage";

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

const formatterData = (date: number): string => {
  return dayjs(date).format("YYYY-MM-DD")
}

const currentSelectDataList = ref<UserVO[]>([])
const handleSelect = (val: any) => {
  currentSelectDataList.value = val
}

const userForm = ref()
const handleAddUser = () => {
  console.log("userForm.value", userForm.value)
  //@ts-ignore
  userForm.value.open('create')
}


const handleEdit = (id: number) => {
  userForm.value.open('edit', id)
}

/**
 * delete user
 */
const handleDeleteUser = (id) => {
  useMessage().confirm("Are you sure to delete the user?").then(
      async () => {
        //delete user
        await deleteUserById(id)
        useMessage().success("Delete Success!")
        await getList()
      }
  ).catch(() => {
    useMessage().info("Cancel delete")
  })
}


const handleResetPasswd = async (id: number) => {
  useMessage().prompt("Do you want to reset password?").then(async ({value}) => {
    console.log(value)
    await fetchPut("/system/user/update-password", {
      body: {
        id,
        password: value
      }
    })
    useMessage().success(`Reset password success, new password is ${value}`)
  }).catch(()=>{
    useMessage().info("Cancel reset password")
  })
}

onMounted(async () => {
  await getList()
})
</script>
