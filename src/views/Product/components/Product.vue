<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

import { ref } from "vue";

const visible = ref(false);
</script>

<template>
  <div class="product">
    <div class="product-add">
      <Button
        @click="visible = true"
        rounded
        type="button"
        severity="success"
        label="Add Product"
        icon="pi pi-plus"
      />
    </div>
    hjkljasjdklajklsjdlals
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    header="Add Product"
    :style="{ width: '60vw' }"
  >
    <div>
      <div class="flex flex-column gap-2">
        <label for="username">Product Code</label>
        <InputText id="username" aria-describedby="username-help" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
.product-main {
  width: 100%;

  .product-add {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
