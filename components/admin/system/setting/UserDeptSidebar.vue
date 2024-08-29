<template>
  <div class="
        md:block md:overflow-auto
        border-b md:border-b-0 md:border-r
        border-slate-200 dark:border-slate-700
        min-w-60 md:space-y-3
        py-2 px-2
        md:px-3 md:py-3
        relative

"
  >
    <!--dropdown backdrop (mobile only)-->
    <div class="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
         :class="dropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true" @click.stop="dropdownOpen = false"></div>

    <!--Hamburger button-->
    <div class="md:hidden flex flex-row justify-between ">

      <div class="">
        {{"root"}}
      </div>

      <button class="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 hamburger" ref="hamburger" :class="{ active: dropdownOpen }" aria-controls="mobile-nav"
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
    <div class=" hidden md:flex flex-nowrap flex-col overflow-x-scroll no-scrollbar">
      <el-tree
          :props="defaultProp"
      :data="treeData">

      </el-tree>
    </div>
  </div>

</template>

<script lang="tsx" setup>
defineOptions({name: 'UserDeptSidebar'})

const dropdownOpen = ref(false)

const defaultProp = {
  children: 'children',
  label: 'name'
}
const treeData = ref(
    [
      {
        id: 0,
        name: 'Root',
        children: [
          {
            id: 1,
            name: 'Dept1',
            children: [
              {
                id: 2,
                name: 'Dept1-1',
                children: [
                  {
                    id: 3,
                    name: 'Dept1-1-1',
                  },
                  {
                    id: 4,
                    name: 'Dept1-1-2',
                  },
                ],
              },
              {
                id: 5,
                name: 'Dept1-2',
              },
            ],
          },
          {
            id: 6,
            name: 'Dept2',
          },
        ],
      }
    ])

</script>
