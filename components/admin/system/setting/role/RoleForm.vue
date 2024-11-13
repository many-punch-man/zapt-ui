<template>
  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <el-form
        ref="formRef"
        v-loading="formLoading"
        :model="formData"
        :rules="formRules"
        label-width="80px"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色标识" prop="code">
        <el-input v-model="formData.code" placeholder="请输入角色标识" />
      </el-form-item>
      <el-form-item label="显示顺序" prop="sort">
        <el-input v-model="formData.sort" placeholder="请输入显示顺序" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" clearable placeholder="请选择状态">
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.COMMON_STATUS)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输备注" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :disabled="formLoading" type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>

<script lang="tsx" setup>
import {ref} from "vue";

defineOptions({name: 'RoleForm'})

const dialogVisible = ref(false)
const dialogTitle = ref('Create Role')
const formLoading = ref(false)
const formRef = ref()
const formType = ref('create')

const formData = ref({
  id: undefined,
  name: '',
  code: '',
  sort: undefined,
  status: 0,
  remark: ''
})
const formRules = ref({})


const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = type === 'create' ? 'Create Role' : 'Edit Role'
  formType.value = type
  resetForm()
  if (id) {
    formLoading.value = true
    try {
      formData.value = await fetchGet<any>("/system/role/get", {params: {id}})
    } finally {
      formLoading.value = false
    }
  }
}

const resetForm = () => {
  formData.value = {
    id: undefined,
    name: '',
    code: '',
    sort: undefined,
    status: 0,
    remark: ''
  }
}

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as RoleVO
    if (formType.value === 'create') {
      await fetchPost("/system/role/create", {
        body: data
      })
      useMessage().success('Create success')
    } else {
      await fetchPut("/system/role/update", {
        body:data
      })
      useMessage().success('Update success')
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

defineExpose({open})

</script>
