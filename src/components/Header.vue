<template>
  <div class="wrap-head">
    <div class="page_header_search">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText  placeholder="Search" />
      </span>
    </div>
    <div class="page_header_loader"></div>
    <div class="content_header">
      <I18nDropComp/>
      <ProfileDropComp />
      <NoticationDropComp />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import ProfileDropComp from "./HeaderComponent/ProfileDropComp.vue";
import NoticationDropComp from "./HeaderComponent/NoticationDropComp.vue";
import I18nDropComp from "./HeaderComponent/I18nDropComp.vue";
</script>

<style scoped lang="scss">
.wrap-head {
  padding: 20px 30px;
  height: 80px;
  box-shadow: 6px 0px 13px -4px rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content_header {
  display: flex;
  column-gap: 8px;
}
</style>
