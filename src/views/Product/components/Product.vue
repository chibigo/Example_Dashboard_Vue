<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";
import InputNumber from "primevue/inputnumber";
import Treeselect from 'vue3-treeselect';
import 'vue3-treeselect/dist/vue3-treeselect.css';

import { ref } from "vue";
const value = ref("");
const visible = ref(false);

const options = [
  {
    id: '1',
    label: 'Bia',
  },
  {
    id: '2',
    label: 'Rượu',
    children: [
      {
        id: '21',
        label: 'Rượu Hoa Anh Túc',
      },
      {
        id: '22',
        label: 'Rượu Cần',
      },
    ],
  },
  {
    id: '4',
    label: 'Banh',
  },
];

</script>

<template>
  <div class="product">
    <div class="product-add">
      <Button @click="visible = true" rounded type="button" severity="success" label="Add Product" icon="pi pi-plus" />
    </div>
  </div>
  <Dialog v-model:visible="visible" modal header="Add Product" :style="{ width: '60vw' }">
    <div class="product-modal-add">
      <div class="item-add flex flex-column gap-2">
        <label for="username">Product Code</label>
        <InputText id="username" aria-describedby="username-help" />
      </div>
      <div class="item-add flex flex-column gap-2">
        <label for="username">Product Name</label>
        <InputText id="username" aria-describedby="username-help" />
      </div>
      <div class="item-add flex flex-column gap-2">
        <label for="username">Unit</label>
        <InputText id="username" aria-describedby="username-help" />
      </div>
      <div class="item-add flex flex-column gap-2">
        <label for="username">Product Price</label>
        <InputNumber id="username" aria-describedby="username-help" />
      </div>
      <div class="item-add flex flex-column gap-2">
        <label for="username">Product Price</label>
        <treeselect :multiple="false" :options="options" />
      </div>
    </div>
    <div class="mt-2">
      <span class="mb-2">Description</span>
      <Editor v-model="value" editorStyle="height: 320px" />
    </div>
    <div class="mt-2">
      <span class="mb-2">Product Image</span>
    </div>
    <div class="product-btn-add">
      <Button label="Create" severity="success" />
      <Button @click="visible = false" label="Cancel" severity="secondary" />
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

.product-modal-add {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.product-btn-add {
  margin-top: 10px;
  display: flex;
  justify-content: end;

  button {
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>
