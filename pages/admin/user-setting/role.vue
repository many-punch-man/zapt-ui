<template>
  <div class="flex flex-col justify-between h-full">
    <div class="grow flex flex-col">
      <!--搜索框-->
      <div class="m-4 bg-white dark:bg-gray-800 rounded-lg p-4 role-search base-transition">
        <el-form
            ref="queryFormRef"
            :inline="true"
            :model="queryParams"
            class="-mb-15px"
            label-width="68px"
        >
          <el-form-item label="Name" prop="name">
            <el-input
                v-model="queryParams.name"
                class="!w-240px"
                clearable
                placeholder="Please enter name"
                @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item label="code" prop="code">
            <el-input
                v-model="queryParams.code"
                class="!w-240px"
                clearable
                placeholder="Please enter code"
                @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item label="Status" prop="status">
            <el-select v-model="queryParams.status" class="!w-240px" clearable placeholder="Please select status">
              <el-option
                  v-for="dict in getIntDictOptions(DICT_TYPE.COMMON_STATUS)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button @click="handleQuery">
              Search
            </el-button>
            <el-button @click="resetQuery">
              Reset
            </el-button>
            <el-button
                plain
                type="primary"
                @click="openForm('create')"
            >
              Add
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--  表体-->
      <div class="m-4 mt-0 bg-white dark:bg-gray-800 rounded-lg overflow-hidden base-transition grow">
        <el-table v-loading="loading" :data="list">
          <el-table-column align="center" label="id" prop="id"/>
          <el-table-column align="center" label="Name" prop="name"/>
          <el-table-column label="Type" align="center" prop="type">
            <template #default="scope">
              <DictTag :type="DICT_TYPE.SYSTEM_ROLE_TYPE" :value="scope.row.type"/>
            </template>
          </el-table-column>
          <el-table-column align="center" label="code" prop="code"/>
          <el-table-column align="center" label="sort" prop="sort"/>
          <el-table-column align="center" label="Remark" prop="remark"/>
          <el-table-column align="center" label="Status" prop="status">
            <template #default="scope">
              <DictTag :type="DICT_TYPE.COMMON_STATUS" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column
              :formatter="dateFormatter"
              align="center"
              label="Create Time"
              prop="createTime"
              width="180"
          />
          <el-table-column :width="300" align="center" label="Action">
            <template #default="scope">
              <el-button
                  link
                  type="primary"
                  @click="openForm('update', scope.row.id)"
              >
                Edit
              </el-button>
              <el-button
                  link
                  preIcon="ep:basketball"
                  title="Menu permissions"
                  type="primary"
                  @click="openAssignMenuForm(scope.row)"
              >
                Menu permissions
              </el-button>
              <el-button
                  link
                  preIcon="ep:coin"
                  title="Data permissions"
                  type="primary"
                  @click="openDataPermissionForm(scope.row)"
              >
                Data permissions
              </el-button>
              <el-button
                  link
                  type="danger"
                  @click="handleDelete(scope.row.id)"
              >
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <div
          class="p-2 box-border flex justify-end m-4 mt-0 bg-white dark:bg-gray-800 rounded-lg overflow-hidden base-transition">
        <Pagination :total="total"
                    v-model:page="queryParams.pageNo"
                    v-model:limit="queryParams.pageSize"
                    @pagination="getList"
        />
      </div>
    </div>

    <RoleForm ref="formRef" @success="handleQuery"/>
    <RoleAssignMenuForm ref="assignMenuForm"  @success="getList" />
  </div>

</template>

<script lang="tsx" setup>
useHead({
  title: 'role - zapt'
})
import {ref} from 'vue'
import {dateFormatter} from "~/utils/formatTime";
import RoleForm from "~/components/admin/system/setting/role/RoleForm.vue";
import RoleAssignMenuForm from "~/components/admin/system/setting/role/RoleAssignMenuForm.vue";


defineOptions({name: 'role'})
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  code: '',
  name: '',
  status: undefined,
  createTime: []
})

const queryFormRef = ref() // 搜索的表单
const loading = ref(false) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref<RoleVO[]>([]) // 列表的数据

const handleQuery = async () => {
  await getList()
}

const resetQuery = async () => {
  queryParams.pageNo = 1
  queryFormRef.value.resetFields()
  await handleQuery()
}

// 授权菜单
const assignMenuForm = ref()
const openAssignMenuForm = (row: any) => {
  assignMenuForm.value.open(row)
}

const openDataPermissionForm = (_row: any) => {
}

const handleDelete = (id: number) => {
  useMessage().confirm("Are you sure to delete the role?")
      .then(
          async () => {
            await fetchDelete('/system/role/delete', {params: {id}})
            useMessage().success("Delete Success!")
            await getList()
          }
      )
}

const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}


const getList = async () => {
  loading.value = true
  try {
    const data = await fetchGet<PageResult<RoleVO>>('system/role/page', {
      params: queryParams
    })
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await getList()
})
</script>

<style lang="scss">
.role-search .el-form-item {
  margin-bottom: 0;
  margin-right: 16px;
}

.role-search .el-form .el-select {
  width: 100%;
}
</style>
