<template>
  <div class="category">
    <div class="wrap-top">
      <div class="form-search">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText placeholder="Search" />
        </span>
        <Dropdown
          :options="title"
          optionLabel="name"
          placeholder="All"
          class="w-full md:w-14rem"
        />
        <Button
          onclick="handleSubmit"
          class="all-submit"
          type="submit"
          label="Submit"
          severity="success"
        />
      </div>
      <div class="create">
        <Button
          @click="visible = true"
          rounded
          type="button"
          severity="success"
          label="Add Product"
          icon="pi pi-plus"
        >
          Create Category
        </Button>
      </div>
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      :header="titlePopup"
      :style="{ width: '60vw' }"
    >
      <form @submit.prevent="handleCreateCategory">
        <div class="popup">
          <div class="category-modal-add">
            <div class="input-user flex flex-column gap-2 mb-3">
              <label class="parentCategoryId">Parent Category</label>
              <div class="card flex justify-content-center">
                <TreeSelect
                  v-model="selectCategoryParent"
                  :options="optionCategory"
                  placeholder="Select Item"
                  class="w-full"
                />
              </div>
              <!-- <InlineMessage>Username is required</InlineMessage> -->
            </div>
            <div class="parentId flex flex-column gap-2 mb-3">
              <label class="">Name Category</label>
              <InputText v-model="dataForm.nameCategory" id="nameCategory" autocomplete="off" required />
            </div>
          </div>
          <div class="description flex flex-column gap-2 mb-3">
            <label>description</label>
            <Textarea
              rows="10"
              cols="30"
              v-model="dataForm.description"
              required
              style="max-height: 300px; min-height: 200px"
            />
          </div>
          <div class="btn-group">
            <Button type="submit" :label="nameAction" severity="success" rounded />
            <Button
              @click="visible = false"
              label="Cancel"
              severity="secondary"
              rounded
            />
          </div>
        </div>
      </form>
    </Dialog>
    <div class="table">
      <TreeTable
        :value="category.list"
        paginator
        :rows="10"
        :rowsPerPageOptions="[2, 10, 20, 50]"
        tableStyle="min-width: 60rem"
      >
        <Column field="id" header="Id" expander></Column>
        <Column field="parentCategoryId" header="Parent categoryId"> </Column>
        <Column field="nameCategory" header="Name category"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="action" header="Action">
          <template #body="slotProps">
            <div class="flex btn_group">
              <Button
                @click="handleUpdateCategory(slotProps.node.data)"
                class="btn_event"
                size="small"
                icon="pi pi-pencil"
                severity="success"
                text
                raised
                rounded
                aria-label="Filter"
              />
              <Button
                @click="handleActionCategory(slotProps.node.data, TypeAction.DELETE)"
                class="btn_event"
                size="small"
                icon="pi pi-trash"
                severity="danger"
                text
                raised
                rounded
                aria-label="Cancel"
              />
            </div>
          </template>
        </Column>
        <Column field="createDate" header="Create date">
          <template #body="slotProps">
            {{ formatDate(slotProps.node.data.createDate) }}
          </template>
        </Column>
      </TreeTable>
    </div>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import TreeTable from "primevue/treetable";
import Dialog from "primevue/dialog";
import Column from "primevue/column";
import Textarea from "primevue/textarea";
import { ref, onBeforeMount,watch } from "vue";
import { useCategoryStore } from "../../stores/category";
import { formatDate } from "../../utils/index";
import TreeSelect from "primevue/treeselect";
import { useForm } from "vee-validate";
import { TypeAction } from "@/utils/typeAction";
import Swal from "sweetalert2";

const visible = ref(false);
const category = useCategoryStore();
const selectCategoryParent = ref();
const optionCategory = ref(null);
const titlePopup = ref('Add Category')
const nameAction = ref('Create')
const dataForm = ref({
  nameCategory:"",
  description:""
})

const { handleSubmit, useFieldModel, errors, resetForm } = useForm();

onBeforeMount(async () => {
  await category.getListCategory();

  const customCategory = [];

  category.list.map((item, index) => {
    customCategory.push({
      key: index,
      id: item.data.id,
      label: item.data.nameCategory,
      children: item.children.map((itemChild, indexChild) => {
        return {
          key: `${index}-${indexChild}`,
          id: itemChild.data.id,
          label: itemChild.data.nameCategory,
        };
      }),
    });
  });
  optionCategory.value = customCategory;
});

const handleCreateCategory = handleSubmit(async () => {
  let getParentCategoryId = null;
  if (selectCategoryParent.value) {
    const valueParentSelect = Object.keys(selectCategoryParent.value)[0];
    getParentCategoryId = optionCategory.value.filter(
      (item) => item.key == valueParentSelect
    )[0].id;
  }

  visible.value = false;
  resetForm();
  await category.actionCreateCategory({
    ...dataForm.value,
    parentCategoryId: getParentCategoryId,
  });
});

const title = ref([{ name: "All" }, { name: "ParentId" }, { name: "Name" }]);

const handleUpdateCategory = (data) => {
  titlePopup.value = 'Update Category'
  nameAction.value = 'Update'
  visible.value = true
  dataForm.value = data
  let dataSelect = []
  const valueSelectItem = optionCategory.value.find(val => val.id === data.parentCategoryId)
  console.log(valueSelectItem)
  if (valueSelectItem) {
    dataSelect = [
      ...dataSelect,
      { 
        key:valueSelectItem.id,
        label:valueSelectItem.label
      },
    ]
    selectCategoryParent.value = dataSelect
  }
};

const handleActionCategory = async (data,type) => {
  const categoryId = data.id
  if(type == TypeAction.DELETE){
    Swal.fire({
        text: `Do you want delete category { ${data.nameCategory} } ?`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await category.blockDeleteCategory(categoryId,type);
        } else if (result.isDenied) {
          await Swal.fire("Changes are not saved", "", "info");
        }
      });
  }
}

watch(visible, (value) => {
  if(!value){
    dataForm.value = {
      nameCategory:'',
      description:''
    }
    selectCategoryParent.value = null;
    titlePopup.value = 'Add Category'
    nameAction.value = 'Create'
  }
})
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

.category-modal-add {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
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
.p-treeselect-items-wrapper {
  max-height: 200px !important;
}

.p-inputtext {
  width: 100% !important;
}
.btn_group {
  column-gap: 10px;
}
</style>
