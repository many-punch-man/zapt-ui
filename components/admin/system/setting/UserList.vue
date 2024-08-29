<template>
  <div class="grow flex flex-col justify-between">

    <!--search -->
    <div class="py-6 border-b border-slate-200 dark:border-slate-700">
      <el-form
          ref="form"
          label-width="80px"
          class="flex flex-wrap"
      >
        <el-form-item label="Name" class="grow-0 ">
          <el-input placeholder="Name"></el-input>
        </el-form-item>

        <div class="hidden md:block">
          <el-form-item label="Account" class="grow-0">
            <el-input placeholder="account"></el-input>
          </el-form-item>
        </div>

        <div class="hidden md:block">
          <el-form-item label="Status" class="grow-0">
            <el-input placeholder="Status"></el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button>
            <el-icon class="mr-2">
              <Search/>
            </el-icon>
            Search
          </el-button>
          <el-button>
            <el-icon class="mr-2">
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
            Import
          </el-button>

          <el-button type="success" plain>
            <el-icon class="mr-2">
              <Upload/>
            </el-icon>
            Import
          </el-button>

        </el-form-item>
      </el-form>
    </div>

    <div class="grow">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>

    </div>
    <div>
      翻页器
    </div>

  </div>
</template>

<script lang="tsx" setup>
import {ref} from 'vue'
import {Bottom, Brush, Delete, Download, Plus, Refresh, Search, Upload} from "@element-plus/icons-vue";

defineOptions({name: 'UserList'})

const tableData = ref([])


</script>
