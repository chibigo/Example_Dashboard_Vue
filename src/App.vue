<template>
  <div id="root">
    <SidebarMenu class="sidebar"/>
    <div class="page">
      <Header />
      <RouterView class="router-view"/>
    </div>
  </div>
</template>
<script setup>
import {RouterView } from 'vue-router'
import SidebarMenu from './components/SidebarMenu.vue';
import Header from './components/Header.vue';
</script>

<style scoped>
#root {
  display: grid;
  grid-template-areas: 'sidebar router-view';
  grid-template-columns: auto 1fr;
  font-family: sans-serif;
}

.sidebar {
  grid-area: 'sidebar';
}

.router-view {
  grid-area: 'router-view';
  padding: 30px;
}
</style>
