<template>
  <RouterView class="router-view" />
</template>
<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
<style>
.p-overflow-hidden {
  --scrollbar-width: 0px !important;
}
</style>
