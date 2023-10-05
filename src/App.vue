<template>
  <div id="root">
    <SidebarMenu class="sidebar"/>
    <RouterView class="router-view"/>
  </div>
</template>
<script setup>
import {RouterView } from 'vue-router'
import SidebarMenu from './components/SidebarMenu.vue';
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
  padding: 1rem;
}
</style>
