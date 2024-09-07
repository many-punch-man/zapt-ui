<template>
  <!--用户的新增改查-->
  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <el-form
        ref="formRef"
        v-loading="formLoading"
        :model="formData"
        :rules="formRules"
        label-width="80px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="UserName" prop="NickName">
            <el-input v-model="formData.nickname" placeholder="Please input nickname"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Department" prop="deptId">
            <el-tree-select
                v-model="formData.deptId"
                :data="deptList"
                :props="defaultProps"
                check-strictly
                node-key="id"
                placeholder="Please select department"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Username" prop="username">
            <el-input v-model="formData.username" placeholder="Please input username"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Password" prop="password">
            <el-input v-model="formData.password" type="password" placeholder="Please input password"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Mobile" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="Please input mobile"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Email" prop="email">
            <el-input v-model="formData.email" placeholder="Please input email"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Sex" prop="sex">
            <el-select v-model="formData.sex" placeholder="Please select sex">
              <el-option label="Male" value="0"/>
              <el-option label="Female" value="1"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Position" prop="postIds">
            <el-select v-model="formData.postIds" multiple placeholder="Please select position">
              <el-option
                  v-for="item in postList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id!"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Remark" prop="remark">
            <el-input v-model="formData.remark" type="textarea" placeholder="Please input remark"/>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <template #footer>
      <el-button @click="()=>{dialogVisible = false;resetFormData()}">Cancel</el-button>
      <el-button :disabled="formLoading" type="primary" @click="submitForm">Confirm</el-button>
    </template>
  </Dialog>

</template>

<script lang="ts" setup>
import {ref} from 'vue'
import type {Tree} from "~/types";

defineOptions({name: 'UserForm'})

const dialogVisible = ref(false)

const dialogTitle = ref('Create User')
const formLoading = ref(false)
const formData = ref({
  nickname: '',
  deptId: '',
  mobile: '',
  email: '',
  id: undefined,
  username: '',
  password: undefined,
  sex: undefined,
  postIds: [],
  remark: '',
  status: '',
  roleIds: [],
})
const formRules = ref({})
const formType = ref('create')

/** open dialog */
const open = async (type: string, id?: number) => {
  console.log('open user form open( )')
  dialogVisible.value = true
  dialogTitle.value = type === 'create' ? 'Create User' : 'Edit User'
  formType.value = type
  console.log(dialogVisible.value)
  if (id) {
    console.log(id)
  }
  //todo do something

  // fetch dept list
  // 加载部门树
  deptList.value = handleTree(await fetchGet<DeptVO[]>("/system/dept/simple-list"))
  // fetch post List
  // 加载岗位列表
  postList.value = await fetchGet<PostVO[]>("/system/post/simple-list")

}
defineExpose({open})

const emit = defineEmits(['success'])

const formRef = ref()

const submitForm = async () => {
// 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()

  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as UserVO
    if (formType.value === 'create') {
      await fetchPost("/system/user/create", {
        body: data
      })
      useMessage().success("Create Success")
    } else {
      await fetchPut("/system/user/update", {
        body: data
      })
      useMessage().success("Update Success")
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
    resetFormData()
  }
}


const deptList = ref<Tree[]>([])
const postList = ref<PostVO[]>([])

const resetFormData = () => {
  formData.value = {
    nickname: '',
    deptId: '',
    mobile: '',
    email: '',
    id: undefined,
    username: '',
    password: undefined,
    sex: undefined,
    postIds: [],
    remark: '',
    status: '',
    roleIds: [],
  }
}
</script>
