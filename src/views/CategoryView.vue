<template>
  <div class="card">
    <div class="add-member">Create Member</div>
    <div class="d-flex">
      <span class="p-float-label">
        <InputText id="username" v-model="value" />
        <label for="username">Username</label>
      </span>
      <Dropdown v-model="selectedCity" :options="title" optionLabel="name" placeholder="All" class="w-full md:w-14rem" />
      <Button onclick="handleSubmit" class="all-submit" type="submit" label="Success" />
    </div>
    <div class="table">
      <TreeTable :value="data" paginator :rows="2" :rowsPerPageOptions="[2, 10, 20, 50]" tableStyle="min-width: 50rem">
        <Column field="id" header="id" expander></Column>
        <Column field="parentCategoryId" header="parentCategoryId"></Column>
        <Column field="nameCategory" header="nameCategory"></Column>
        <Column field="description" header="description"></Column>
        <Column field="createDate" header="createDate"></Column>
        <Column field="isBlock" header="isBlock"></Column>
      </TreeTable>
    </div>
  </div>
</template>
   
<script setup>
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { ref, onMounted } from 'vue';
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
import { useCategoryStore } from '../stores/category.js';

const selectedCity = ref();
const title = ref([
  { name: 'All' },
  { name: 'Name' },
  { name: 'Action' },
])

const handleSubmit = () => {}

const testtable = [
    {
      id: "1",
      parentCategoryId: "null",
      nameCategory: "Bia",
      description: "Siuuuuuuuuuuuuuuuuu",
      createDate: "2023-10-09T09:42:15.558+00:00",
      isBlock: "0",
      children: []
    },
    {
      id: "2",
      parentCategoryId: "null",
      nameCategory: "rượu",
      description: "bia",
      createDate: "2023-10-09T09:56:03.016+00:00",
      isBlock: "0",
      children: [
        {
          id: "3",
          parentCategoryId: "2",
          nameCategory: "rượu 11",
          description: "bia 11",
          createDate: "2023-10-09T09:56:34.365+00:00",
          isBlock: "0",
          children: []
        }
      ]
    },
    {
      id: "4",
      parentCategoryId: "null",
      nameCategory: "banh",
      description: "bóng",
      createDate: "2023-10-09T10:18:30.786+00:00",
      isBlock: "0",
      children: []
    }
  ]

const testtables = useCategoryStore()

onMounted(() => {
  data.value = testtable;
});

onMounted( async () => {
  await testtables.CategoryRequest()
});

const data = ref()

</script>

<style lang="scss" scoped></style>

//create name,image, description,

