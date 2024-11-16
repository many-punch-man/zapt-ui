<template>
  <div>
    <div class="m-4 bg-white dark:bg-gray-800 rounded-lg p-4">
      <el-form
          :model="queryParams"
          :inline="true"
          ref="queryFormRef"
          class="menu-search"
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
          <el-select v-model="queryParams.status" clearable placeholder="Please select status" class="!w-240px">
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
    <div
        class="ml-4 box-border bg-white dark:bg-gray-800 rounded-lg overflow-hidden w-[calc(100vw-16rem-3rem)] h-[calc(100vh-9rem)] ">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
               ref="treeRef"
              v-model:expanded-row-keys="expandedRowKeys"
              :columns="columns"
              :data="tableData"
              :expand-column-key="expandColumnKey"
              @row-expand="onRowExpanded"
              @expanded-rows-change="onExpandedRowsChange"
              :height="height"
              :width="width"
          />
        </template>
      </el-auto-resizer>
    </div>


    <MenuForm ref="formRef" @success="handleQuery"/>
  </div>
</template>

<script lang="tsx" setup>
import type {ExpandedRowsChangeHandler, RowExpandHandler} from "element-plus";
import DictTag from "@/components/DictTag.vue"
import type {CellRendererParams} from "element-plus/es/components/table-v2/src/types";
import MenuForm from "~/components/admin/system/setting/menu/MenuForm.vue";
import type {ShallowRef} from "vue";
import {getAllIds} from "~/utils/tree";

useHead({
  title: 'menu - zapt'
})
defineOptions({name: 'menutemplate'})
const queryParams = reactive({
  pageNo: 1,
  pageSize: 100,
  name: undefined,
  status: undefined
})
const tableData = ref<any[]>([])
const loading = ref(false)
const queryFormRef = ref()
const refreshTable = ref(true)
const isExpandAll = ref(false)

const expandedRowKeys = ref<string[]>([])
const expandColumnKey = 'name'

const columns = [
  {key: 'name', dataKey: 'name', title: '菜单名称', width: 180},
  {key: 'icon', dataKey: 'icon', title: '图标', width: 180},
  {key: 'sort', dataKey: 'sort', title: '排序', width: 180},
  {key: 'permission', dataKey: 'permission', title: '权限标识', width: 180},
  {key: 'component', dataKey: 'component', title: '组件路径', width: 180},
  {key: 'componentName', dataKey: 'componentName', title: '组件名称', width: 180},
  {
    key: 'status', dataKey: 'status', title: '状态', width: 180, cellRenderer: (props: CellRendererParams<number>) => {
      console.log("输出某一行", props.cellData)
      return <DictTag type={DICT_TYPE.COMMON_STATUS} value={props.cellData}/>
    }
  },
  {
    key: 'action', title: '操作', width: 180, cellRenderer: ((props: CellRendererParams<any>) => {
      return <div>
        <el-button link
                   type="primary" onClick={() => openForm('update', props.rowData.id,props.rowData.parentId)}>修改
        </el-button>
        <el-button link
                   type="primary" onClick={() => openForm('create', undefined ,props.rowData.id)}>新增
        </el-button>
        <el-button link
                   type="danger" onClick={() => handleDelete(props.rowData)}>删除
        </el-button>
      </div>
    })
  }
]

// setExpandedKeys

const onRowExpanded = ({expanded}: Parameters<RowExpandHandler>[0]) => {
  console.log('Expanded:', expanded)
}

const onExpandedRowsChange = (
    expandedKeys: Parameters<ExpandedRowsChangeHandler>[0]
) => {
  console.log(expandedKeys)
}


const handleQuery = async () => {
  await getList()
}
const resetQuery = async () => {
  queryParams.pageNo = 1
  queryFormRef.value.resetFields()
  await handleQuery()
}

const getList = async () => {
  loading.value = true
  try {
    const data = await fetchGet<MenuVO[]>("/system/menu/list", {params: queryParams})
    tableData.value = handleTree(data)
  } finally {
    loading.value = false
  }
}

const treeRef = shallowRef()
const toggleExpandAll = () => {
  const temp = getAllIds(tableData.value,{
    id: 'id',
    children: 'children',
    pid: 'parentId'
})
  isExpandAll.value = !isExpandAll.value
  expandedRowKeys.value = isExpandAll.value ? temp : []
}


const formRef = ref()
const openForm = (type: string, id?: any, parentId?: any) => {
  // 打开表单
  formRef.value.open(type, id, parentId)
}

const handleDelete = async ({id}: { id: number }) => {
  // 删除
  await useMessage().confirm("Are you sure you want to delete the Menu?")
  await fetchDelete("/system/menu/delete", {
    params: {
      id
    }
  })
  useMessage().success("Delete success");
  await handleQuery()
}

onMounted(async () => {
  await handleQuery()
})

</script>
<style lang="scss">
.menu-search .el-form-item {
  margin-bottom: 0;
  margin-right: 16px;
}

.menu-search .el-form .el-select {
  width: 100%;
}
</style>

