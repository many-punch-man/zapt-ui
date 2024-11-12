<template>
  <div>
    <!--  注意，页面一定只能拥有一个根节点。-->

    <!--  header search form -->
    <div class="m-4 bg-white dark:bg-gray-800 rounded-lg p-4">
      <el-form
          :model="queryParams"
          :inline="true"
          ref="queryFormRef"
          class="dept-search"
      >
        <el-form-item label="Name" prop="name">
          <el-input
              v-model="queryParams.name"
              placeholder="Please enter the department name"
              clearable
              @keyup.enter="handleQuery"
              class="!w-240px"
          />
        </el-form-item>

        <el-form-item label="Status" prop="status">
          <el-select v-model="queryParams.status" clearable placeholder="Please select status">
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
            <el-icon class="mr-5px">
              <span class="i-ic-outline-search"></span>
            </el-icon>
            Search
          </el-button>
          <el-button @click="resetQuery">
            <el-icon class="mr-5px">
              <span class="i-ic-baseline-refresh"></span>
            </el-icon>
            Reset
          </el-button>
          <el-button
              type="primary"
              plain
              @click="openForm('create')"
          >
            <el-icon class="mr-5px">
              <span class="i-ic-add"></span>
            </el-icon>
            Add
          </el-button>
          <el-button type="danger" plain @click="toggleExpandAll">
            <el-icon class="mr-5px">
              <span class="i-ic-baseline-sort"></span>
            </el-icon>
            Unfold/Fold
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--  表体-->
    <div class="m-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
      <el-table
          :data="tableData"
          row-key="id"
          :default-expand-all="isExpandAll"
          v-loading="loading"
          v-if="refreshTable"
      >
        <el-table-column label="code" prop="code"/>
        <el-table-column label="name" prop="name"/>
        <el-table-column prop="leader" label="leader">
          <template #default="scope">
            {{ scope.row.leaderUserName }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="status">
          <template #default="scope">
            <DictTag :type="DICT_TYPE.COMMON_STATUS" :value="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="action" align="center">
          <template #default="scope">
            <el-button
                link
                type="primary"
                @click="openForm('update', scope.row.id)"
            >
              Modify
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
    <DeptForm ref="deptFormRef" @success="getList"/>
  </div>
</template>

<script lang="tsx" setup>
import {ref} from 'vue'
import {useMessage} from "~/composables/useMessage";
import DeptForm from "~/components/admin/system/setting/dept/DeptForm.vue";

defineOptions({name: 'department'})

const handleStoreTest = () => {
  useDictStore().setDictMap()
}

const handleReset = () => {
  useDictStore().resetStore()
}


const tableData = ref<any[]>([])
const loading = ref(false)
const isExpandAll = ref(false)
const queryFormRef = ref()
const refreshTable = ref(true) // 重新渲染表格状态

const queryParams = reactive({
  pageNo: 1,
  pageSize: 100,
  name: undefined,
  status: undefined
})

const deptFormRef = ref()
const openForm = (type: string, id?: number) => {
  deptFormRef.value.open(type, id)
}

const handleDelete = async (id: number) => {
  await useMessage().confirm("Are you sure you want to delete the department?")
  await fetchDelete("/system/dept/delete", {
    params: {
      id
    }
  })
  useMessage().success("Delete success");
  await getList()
}

const handleQuery = async () => {
  await getList()
}

const resetQuery = () => {
  queryParams.pageNo = 1
  queryFormRef.value.resetFields()
  handleQuery()
}

const toggleExpandAll = () => {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTable.value = true
  })
}

const getList = async () => {
  loading.value = true
  try {
    const data = await fetchGet<any[]>("/system/dept/list", {params: queryParams})
    tableData.value = handleTree(data)
    console.log("表格数据", tableData.value)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await handleQuery()
})

</script>

<style lang="scss" scoped>
//use deep selector to override element-plus style
//:deep(.el-form-item ) {
//  margin-bottom: 0;
//  margin-right: 16px;
//}
//
//:deep(.el-form .el-select) {
//  width: 100%;
//}
</style>

<style lang="scss">
.dept-search .el-form-item {
  margin-bottom: 0;
  margin-right: 16px;
}

.dept-search .el-form .el-select {
  width: 100%;
}
</style>