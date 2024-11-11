<template>
  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <!--  部门的增改-->
    <el-form
        ref="formRef"
        v-loading="formLoading"
        :model="formData"
        :rules="formRules"
        label-width="180px"
    >

      <el-row>
        <el-col :span="12">
          <el-form-item label="Superior department" prop="parentId">
            <el-tree-select
                v-model="formData.parentId"
                :data="deptTree"
                :props="defaultProps"
                check-strictly
                default-expand-all
                placeholder="Please select the superior department"
                value-key="deptId"
            >
            </el-tree-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="code" prop="code">
            <el-input v-model="formData.code" placeholder="Please enter department code"/>
          </el-form-item>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="Dept Name" prop="name">
            <el-input v-model="formData.name" placeholder="Please enter the department name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="sort" prop="sort">
            <el-input-number v-model="formData.sort" :min="0" controls-position="right"/>
          </el-form-item>
        </el-col>

      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="leader" prop="leaderUserId">
            <el-select v-model="formData.leaderUserId" clearable placeholder="Please enter the department leader">
              <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :label=" item.nickname"
                  :value="item.id"
              >

              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Leader phone number" prop="phone">
            <el-input v-model="formData.phone" maxlength="11" placeholder="Please enter the phone number"/>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Email" prop="email">
            <el-input v-model="formData.email" maxlength="50" placeholder="Please enter email"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Status" prop="status">
            <el-select v-model="formData.status" clearable placeholder="Please select status">
              <el-option label="normal" :value="0"/>
              <el-option label="deactivate" :value="1"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitForm">Confirm</el-button>
    </template>

  </Dialog>
</template>

<script lang="tsx" setup>
import {ref} from 'vue'
import type {FormRules} from 'element-plus'
import type {Tree} from "~/types";

defineOptions({name: 'DeptForm'})

const dialogVisible = ref(false)
const dialogTitle = ref('Create Dept')
const formRef = ref()
const formType = ref()

const formLoading = ref(false)
const formRules = reactive<FormRules>({
  parentId: [{required: true, message: 'Not empty', trigger: 'blur'}],
  name: [{required: true, message: 'Not empty', trigger: 'blur'}],
  sort: [{required: true, message: 'Not empty', trigger: 'blur'}],
  email: [{type: 'email', message: 'Please enter the correct email address', trigger: ['blur', 'change']}],
  phone: [
    {pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: 'Please enter the correct mobile phone number', trigger: 'blur'}
  ],
  status: [{required: true, message: 'Not empty', trigger: 'blur'}],
  code:[{required:true, message:'Not empty', trigger:'blur'}]
})

const formData = ref({
  id: undefined,
  code: undefined,
  title: '',
  parentId: undefined,
  name: undefined,
  sort: undefined,
  leaderUserId: undefined,
  phone: undefined,
  email: undefined,
  status: 0
})


const deptTree = ref<Tree[]>([])
const userList = ref<SimpleUserVO[]>([])


const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = type === 'create' ? 'Create Dept' : 'Edit Dept'
  formType.value = type
  resetForm()
  if (id) {
    formLoading.value = true
    try {
      formData.value = await fetchGet("/system/dept/get", {
        params: {
          id
        }
      })
    } finally {
      formLoading.value = false
    }
  }
  // 获取用户列表
  userList.value = await fetchGet<any[]>("/system/user/simple-list")
  // 获取部门树
  await getTree()
}

defineExpose({
  open
})

const emit = defineEmits(['success'])
/** 获得部门树 */
const getTree = async () => {
  deptTree.value = []
  const data = await fetchGet<any[]>("/system/dept/simple-list")
  let dept: Tree = {id: 0, name: '顶级部门', children: []}
  dept.children = handleTree(data)
  deptTree.value.push(dept)
}

const submitForm = async () => {
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  formLoading.value = true
  try {
    const data = formData.value as unknown as DeptVO
    if (formType.value === 'create') {
      await fetchPost("/system/dept/create", {
        body: data
      })
      useMessage().success("Create success!")
    } else {
      await fetchPut("/system/dept/update", {
        body: data
      })
      useMessage().success("Edit success!")
    }
    dialogVisible.value = false
    emit('success')
  } finally {
    formLoading.value = false
  }
}


/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    code: undefined,
    title: '',
    parentId: undefined,
    name: undefined,
    sort: undefined,
    leaderUserId: undefined,
    phone: undefined,
    email: undefined,
    status: 0
  }
  formRef.value?.resetFields()
}

</script>
