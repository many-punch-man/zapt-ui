<template>
  <div class="flex flex-col justify-between h-full">
    <!--搜索框和主体-->
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
          <el-form-item label="name" prop="name">
            <el-input
                v-model="queryParams.name"
                placeholder="Please enter name"
                clearable
                @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item label="code" prop="code">
            <el-input
                v-model="queryParams.code"
                placeholder=" Please enter code"
                clearable
                @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item label="status" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
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
              <span class="i-ic-baseline-search mr-5px"></span>Search
            </el-button>
            <el-button @click="resetQuery"><span class="i-ic-baseline-refresh mr-5px"></span> reset
            </el-button>
            <el-button
                type="primary"
                plain
                @click="openForm('create')"
            >
              <span class="i-ic-baseline-add mr-5px"></span> Add
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--  表体-->
      <div class="m-4 mt-0 bg-white dark:bg-gray-800 rounded-lg overflow-hidden base-transition grow">
        <el-table v-loading="loading" :data="list">
          <el-table-column label="id" align="center" prop="id"/>
          <el-table-column label="name" align="center" prop="name"/>
          <el-table-column label="code" align="center" prop="code"/>
          <el-table-column label="sort" align="center" prop="sort"/>
          <el-table-column label="remark" align="center" prop="remark"/>
          <el-table-column label="status" align="center" prop="status">
            <template #default="scope">
              <DictTag :type="DICT_TYPE.COMMON_STATUS" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column
              label="createTime"
              align="center"
              prop="createTime"
              width="180"
              :formatter="dateFormatter"
          />
          <el-table-column label="Action" align="center">
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
    <!--  分页-->
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

    <PostForm ref="formRef" @success="getList" />
  </div>
</template>

<script lang="tsx" setup>
import PostForm from "~/components/admin/system/setting/post/PostForm.vue";

useHead({
  title: 'positions - zapt'
})
defineOptions({name: 'position'})

const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  code: '',
  name: '',
  status: undefined
})
const loading = ref(false)
const list = ref<PostVO[]>([])
const total = ref()

const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

const handleQuery = async () => {
  await getList()
}

const queryFormRef = ref()
const resetQuery = async () => {
  queryFormRef.value.resetFields()
  await handleQuery()
}

const getList = async () => {
  loading.value = true
  try {
    const data = await fetchGet<PageResult<PostVO>>('/system/post/page', {params: queryParams})
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

const handleDelete = (id: number) => {
  useMessage().confirm("Are you sure to delete the position?")
      .then(
          async () => {
            await fetchDelete('/system/post/delete', {params: {id}})
            useMessage().success("Delete Success!")
            await getList()
          }
      ).catch(() => {
    useMessage().info("Cancel delete")
  })
}

onMounted(async () => {
  await getList()
})

</script>
