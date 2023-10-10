<template>
  <div class="category">
    <div class="create-table">
      <Button label="Create Member" severity="success" raised />
      <div class="popup">
        <div class="flex flex-wrap align-items-center mb-3 gap-2">
          <label for="username" class="p-sr-only">Username</label>
          <InputText id="username" placeholder="Username" class="p-invalid" />
          <!-- <InlineMessage>Username is required</InlineMessage> -->
        </div>
        <div id="app">
          <treeselect v-model="value" :multiple="true" :options="options" />
        </div>
      </div>
    </div>
    <div class="d-flex mb-5 ">
      <span class="p-float-label">
        <!-- <InputText id="username" v-model="value" /> -->
        <label for="username">Username</label>
      </span>
      <Dropdown v-model="selectedCity" :options="title" optionLabel="name" placeholder="All" class="w-full md:w-14rem" />
      <Button onclick="handleSubmit" class="all-submit" type="submit" label="Success" severity="success" />
    </div>
    <div class="table">
      <TreeTable :value="dataTable" paginator :rows="10" :rowsPerPageOptions="[2, 10, 20, 50]"
        tableStyle="min-width: 50rem">
        <Column field="id" header="id" expander></Column>
        <Column field="parentCategoryId" header="parentCategoryId"></Column>
        <Column field="nameCategory" header="nameCategory"></Column>
        <Column field="description" header="description"></Column>
        <Column field="createDate" header="createDate">
          <template #body="slotProps">
            {{ formatDate(slotProps.node.data.createDate) }}
          </template>
        </Column>
        <Column field="isBlock" header="Status"></Column>
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
import { formatDate } from "../utils/index";
import Treeselect from 'vue3-treeselect';
import 'vue3-treeselect/dist/vue3-treeselect.css';
const selectedCity = ref();
const title = ref([
  { name: 'All' },
  { name: 'Name' },
  { name: 'Action' },
])

const datapopup = [
  {
    title: "Username",
    description: ""
  }
]

const handleSubmit = () => { }

const testtable = [
  {
    data: {
      id: "1",
      parentCategoryId: "null",
      nameCategory: "Bia",
      description: "Siuuuuuuuuuuuuuuuuu",
      createDate: "2023-10-09T09:42:15.558+00:00",
      isBlock: "0",
      children: []
    },
  },
  {
    data: {
      id: "2",
      parentCategoryId: "null",
      nameCategory: "rượu",
      description: "bia",
      createDate: "2023-10-09T09:56:03.016+00:00",
      isBlock: "0",
    },
    children: [
      {
        data: {
          id: "3",
          parentCategoryId: "2",
          nameCategory: "rượu 11",
          description: "bia 11",
          createDate: "2023-10-09T09:56:34.365+00:00",
          isBlock: "0",
          children: []
        },
      }
    ]
  },
  {
    data: {
      id: "4",
      parentCategoryId: "null",
      nameCategory: "banh",
      description: "bóng",
      createDate: "2023-10-09T10:18:30.786+00:00",
      isBlock: "0",
      children: []
    },
  }
]

const testtables = useCategoryStore()

onMounted(() => {
  dataTable.value = testtable;
});

onMounted(async () => {
  await testtables.getListCategory()
});

const dataTable = ref()

</script>

<style lang="scss" scoped>
// .category {
//   .create-table {
//     float: right;
//   }
// }
</style>

//create name,image, description,

