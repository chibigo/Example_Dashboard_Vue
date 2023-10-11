<template>
  <div class="category">
    <div @click="handleOnclick" class="create-table">
      <Button label="Create Member" severity="success" raised />
      <div class="popup">
        <div class="input-user">
          <label for="username" class="">Username</label>
          <InputText id="username" placeholder="Username" class="p-invalid" />
          <!-- <InlineMessage>Username is required</InlineMessage> -->
        </div>
        <div class="nameCategory">
          <label class="">nameCategory</label>
          <treeselect v-model="value" :multiple="false" :options="options" />
        </div>
        <div class="description">
          <Textarea v-model="value" rows="5" cols="30" />
        </div>
        <div class="btn-group">
          <Button label="Create" severity="success" rounded />
          <Button label="Cancel" severity="secondary" rounded />
        </div>
      </div>
      <div class="overlay"></div>
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
import Textarea from 'primevue/textarea';

const selectedCity = ref();
const title = ref([
  { name: 'All' },
  { name: 'Name' },
  { name: 'Action' },
])

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

const handleOnclick = (e) => {
  e.target.classList.add("active");
}

</script>

<style lang="scss" scoped>
.category {
  position: relative;
  .create-table {
    // position: relative;
    // display: flex;
    // justify-content: center;
    // align-items: center;

    .popup {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: auto;
      height: auto;
      display: none;
      flex-direction: column;
      justify-content: center;
      background-color: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      z-index: 999;

      .input-user{
        display: flex;
        flex-direction: column;
      }
    }

    &.active .popup,
    &.active .overlay {
      display: flex;
    }

    .overlay {
      position: absolute;
      background-color: #000;
      width: 100vw;
      height: 100vh;
      opacity: .3;
      z-index: 998;
      display: none;
    }
  }
}
</style>

//create name,image, description,

