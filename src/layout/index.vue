<template>
  <div id="root">
    <SidebarMenu class="sidebar"/>
    <div class="page">
      <Header />
      <RouterView class="wrapper-page" />
    </div>
  </div>
</template>

<script setup>
import SidebarMenu from '@/components/SidebarMenu.vue';
import Header from '@/components/Header.vue';
</script>

<style scoped>

#root {
  font-family: sans-serif;
}


.wrapper-page {
  padding: 30px;
}

.page {
  margin-left: 280px;
}
</style>