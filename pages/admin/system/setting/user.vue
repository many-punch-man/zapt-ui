<template>
  <!-- Page header -->
  <div class="flex md:flex-row flex-col">
    <UserDeptSidebar />
    <UserList />
  </div>

</template>

<script lang="tsx" setup>
import PageHeader from "~/components/admin/PageHeader.vue";
import BaseCard from "~/components/admin/BaseCard.vue";
import UserDeptSidebar from "~/components/admin/system/setting/UserDeptSidebar.vue";
import UserList from "~/components/admin/system/setting/UserList.vue";

defineOptions({name: 'user'})
</script>
