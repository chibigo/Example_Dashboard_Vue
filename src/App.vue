<template>
  <RouterView class="router-view"/>
</template>
<script setup>
import { RouterView } from 'vue-router'
import SidebarMenu from './components/SidebarMenu.vue';
import Header from './components/Header.vue';
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
