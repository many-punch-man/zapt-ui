<template>
  <div class="flex flex-col justify-between">
    <div>
      <!--搜索框-->
      <div class="m-4 bg-white dark:bg-gray-800 rounded-lg p-4 role-search">
        <el-form
            ref="queryFormRef"
            :inline="true"
            :model="queryParams"
            class="-mb-15px"
            label-width="68px"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input
                v-model="queryParams.name"
                class="!w-240px"
                clearable
                placeholder="请输入角色名称"
                @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item label="角色标识" prop="code">
            <el-input
                v-model="queryParams.code"
                class="!w-240px"
                clearable
                placeholder="请输入角色标识"
                @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" class="!w-240px" clearable placeholder="请选择状态">
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
              搜索
            </el-button>
            <el-button @click="resetQuery">
              重置
            </el-button>
            <el-button
                plain
                type="primary"
                @click="openForm('create')"
            >
              新增
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--  表体-->
      <div class="m-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <el-table v-loading="loading" :data="list">
          <el-table-column align="center" label="角色编号" prop="id"/>
          <el-table-column align="center" label="角色名称" prop="name"/>
          <el-table-column label="角色类型" align="center" prop="type">
            <template #default="scope">
              <DictTag :type="DICT_TYPE.SYSTEM_ROLE_TYPE" :value="scope.row.type"/>
            </template>
          </el-table-column>
          <el-table-column align="center" label="角色标识" prop="code"/>
          <el-table-column align="center" label="显示顺序" prop="sort"/>
          <el-table-column align="center" label="备注" prop="remark"/>
          <el-table-column align="center" label="状态" prop="status">
            <template #default="scope">
              <DictTag :type="DICT_TYPE.COMMON_STATUS" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column
              :formatter="dateFormatter"
              align="center"
              label="创建时间"
              prop="createTime"
              width="180"
          />
          <el-table-column :width="300" align="center" label="操作">
            <template #default="scope">
              <el-button
                  link
                  type="primary"
                  @click="openForm('update', scope.row.id)"
              >
                编辑
              </el-button>
              <el-button
                  link
                  preIcon="ep:basketball"
                  title="菜单权限"
                  type="primary"
                  @click="openAssignMenuForm(scope.row)"
              >
                菜单权限
              </el-button>
              <el-button
                  link
                  preIcon="ep:coin"
                  title="数据权限"
                  type="primary"
                  @click="openDataPermissionForm(scope.row)"
              >
                数据权限
              </el-button>
              <el-button
                  link
                  type="danger"
                  @click="handleDelete(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div>

    </div>
  </div>

</template>

<script lang="tsx" setup>
import {ref} from 'vue'
import {dateFormatter} from "~/utils/formatTime";

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
const list = ref([]) // 列表的数据

const handleQuery = () => {

}

const resetQuery = () => {

}

const openAssignMenuForm = (_row: any) => {

}

const openDataPermissionForm = (_row: any) => {
}

const handleDelete = (_row: any) => {

}

const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}
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
