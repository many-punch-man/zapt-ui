<template>
  <!-- Page header -->
  <PageHeader title="User List" />

  <BaseCard class="">
      <UserDeptSidebar />
      <UserList />
  </BaseCard>

</template>

<script lang="tsx" setup>
import PageHeader from "~/components/admin/PageHeader.vue";
import BaseCard from "~/components/admin/BaseCard.vue";
import UserDeptSidebar from "~/components/admin/system/setting/UserDeptSidebar.vue";
import UserList from "~/components/admin/system/setting/UserList.vue";

defineOptions({name: 'user'})
</script>
