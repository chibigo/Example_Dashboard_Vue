<template>
  <div class="category">
    <div class="wrap-top">
      <div class="form-search">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="value1" placeholder="Search" />
        </span>
        <Dropdown v-model="selectedCity" :options="title" optionLabel="name" placeholder="All"
          class="w-full md:w-14rem" />
        <Button onclick="handleSubmit" class="all-submit" type="submit" label="Submit" severity="success" />
      </div>
      <div class="create">
        <Button @click="visible = true" rounded type="button" severity="success" label="Add Product" icon="pi pi-plus">
          Create Category
        </Button>
      </div>
    </div>
    <Dialog v-model:visible="visible" modal header="Add Category" :style="{ width: '60vw' }">
      <form @submit.prevent="handleCreateCategory">
        <div class="popup">
          <div class="input-user flex flex-column gap-2 mb-3">
            <label class="parentCategoryId">Parent Category</label>
            <div class="card flex justify-content-center">
              <TreeSelect v-model="selectedValue" :options="nodes" placeholder="Select Item" class="md:w-20rem w-full" />
          </div> 
            <!-- <InlineMessage>Username is required</InlineMessage> -->
          </div>
          <div class="parentId flex flex-column gap-2 mb-3">
            <label class="">Name Category</label>
            <InputText v-model="nameCategory" id="nameCategory"  required />
          </div>
          <div class="description flex flex-column gap-2 mb-3">
            <label>description</label>
            <Textarea rows="5" cols="30" v-model="description" required />
          </div>
          <div class="btn-group">
            <Button type="submit" label="Create" severity="success" rounded />
            <Button @click="visible = false" label="Cancel" severity="secondary" rounded />
          </div>
        </div>
      </form>
    </Dialog>
    <div class="table">
      <TreeTable :value="category.list" paginator :rows="10" :rowsPerPageOptions="[2, 10, 20, 50]"
        tableStyle="min-width: 50rem">
        <Column field="id" header="id" expander></Column>
        <Column field="parentCategoryId" header="parentCategoryId">
          
        </Column>
        <Column field="nameCategory" header="nameCategory"></Column>
        <Column field="description" header="description"></Column>
        <Column field="createDate" header="createDate">
          <template #body="slotProps">
            {{ formatDate(slotProps.node.data.createDate) }}
          </template>
        </Column>
      </TreeTable>
    </div>
  </div>
</template>
   
<script setup>
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import TreeTable from 'primevue/treetable';
import Dialog from 'primevue/dialog'
import Column from 'primevue/column';
import Textarea from 'primevue/textarea';
import { ref, onBeforeMount } from 'vue';
import { useCategoryStore } from '../../stores/category';
import { formatDate } from "../../utils/index";
import TreeSelect from 'primevue/treeselect';
import { useForm } from 'vee-validate'

const visible = ref(false)
const category = useCategoryStore()
const selectCategoryParent = ref(null)

const { handleSubmit, useFieldModel, errors, resetForm } = useForm()

const [parentcategoryid,namecategory,description ] = useFieldModel([
  'parentcategoryid',
  'namecategory',
  'description'
])

onBeforeMount(async () => {
  await category.getListCategory()
})

const handleCreateCategory = handleSubmit(async values => {
  console.log(selectCategoryParent)
  // visible.value = false
  // resetForm()
  // await category.actionCreateCategory(values)
})

const title = ref([
  { name: 'All' },
  { name: 'ParentId' },
  { name: 'Name' },
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

</script>

<style lang="scss" scoped>
.category {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 8px;
  margin: 2rem;
}

.btn-group {
  margin-top: 10px;
  display: flex;
  justify-content: center;

  button {
    &:first-child {
      margin-right: 10px;
    }
  }
}

.wrap-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  .form-search {

    .p-input-icon-left,
    .p-inputwrapper {
      margin-right: 1rem;
    }
  }
}
</style>

