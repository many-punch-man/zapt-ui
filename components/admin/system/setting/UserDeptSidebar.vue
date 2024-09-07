<template>
  <div class="
        md:block md:overflow-auto
        border-b md:border-b-0 md:border-r
        border-slate-200 dark:border-slate-700
        min-w-60 md:space-y-3
        py-2 px-2
        md:px-3 md:py-3
        relative
        bg-white dark:bg-gray-800
"
  >
    <!--dropdown backdrop (mobile only)-->
    <div class="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
         :class="dropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"
         @click.stop="dropdownOpen = false"></div>

    <!--Hamburger button-->
    <div class="md:hidden flex flex-row justify-between ">

      <div class="">
        {{ "root" }}
      </div>

      <button class="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 hamburger" ref="hamburger"
              :class="{ active: dropdownOpen }" aria-controls="mobile-nav"
              :aria-expanded="dropdownOpen" @click="dropdownOpen = !dropdownOpen">
        <span class="sr-only">Menu</span>
        <svg class="w-6 h-6 fill-current text-gray-500 hover:text-gray-300 transition duration-150 ease-in-out"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="5" width="16" height="2" rx="1"/>
          <rect x="4" y="11" width="16" height="2" rx="1"/>
          <rect x="4" y="17" width="16" height="2" rx="1"/>
        </svg>
      </button>
    </div>

    <!--dept tree selector (mobile and client only)-->
    <client-only>
      <Transition
          enter-active-class="transition ease-out duration-200 transform"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-out duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <div v-show="dropdownOpen" class="">
          <!-- // todo 这里以后在做 -->
        </div>

      </Transition>
    </client-only>


    <!--这里展示部门树-->
    <div class=" hidden md:flex flex-nowrap flex-col overflow-x-scroll no-scrollbar md:h-[800px]">
      <el-auto-resizer>
        <template #default="{ height }">
          <el-tree-v2
              ref="treeRef"
              :props="defaultProp"
              :data="deptList"
              :height="height"
              :expand-on-click-node="false"
              highlight-current
              @node-click="handleNodeClick"
              class="no-scrollbar"
          >
          </el-tree-v2>
        </template>
      </el-auto-resizer>

    </div>
  </div>

</template>

<script lang="tsx" setup>
import type {Tree} from "~/types";
import {type ElTree, ElTreeV2} from "#components";

defineOptions({name: 'UserDeptSidebar'})

const emits = defineEmits(['node-click'])

/** 处理部门被点击 */
const handleNodeClick = async (row: { [key: string]: any }) => {
  emits('node-click', row)
}

const dropdownOpen = ref(false)

const defaultProp = {
  children: 'children',
  label: 'name'
}

const deptList = ref<Tree[]>([])
const expandedRowKeys = ref<any[]>([])
const treeRef = ref<InstanceType<typeof ElTreeV2>>()


/** 获得部门树 */
const getTree = async () => {
  const res = await fetchGet<any[]>("/system/dept/simple-list")
  deptList.value = []
  deptList.value.push(...handleTree(res))
}

const getChildrenIds = (tree: any[]) => {
  const ids: any[] = []
  tree.forEach((item) => {
    if (item.children && item.children.length) {
      ids.push(item.id)
      ids.push(...getChildrenIds(item.children))
    }
  })
  return ids
}


/** 基于名字过滤 */
const filterNode = (name: string, data: Tree) => {
  if (!name) return true
  return data.name.includes(name)
}

const calcHeight = computed(() => {
  return document.documentElement.clientHeight - 120
})

onMounted(async () => {
  await getTree()
  expandedRowKeys.value = getChildrenIds(deptList.value)
  //@ts-ignore
  treeRef.value.setExpandedKeys(expandedRowKeys.value)
})

</script>
