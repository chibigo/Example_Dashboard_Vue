<script setup>
import { ref, onBeforeMount, onUnmounted, watch } from "vue";
import DataTable from "primevue/datatable";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";
import InputNumber from "primevue/inputnumber";
import "vue3-treeselect/dist/vue3-treeselect.css";
import Button from "primevue/button";
import { useProductStore } from "@/stores/product";
import MultiSelect from "primevue/multiselect";
import FileUpload from "primevue/fileupload";
import { useCategoryStore } from "@/stores/category";
import { convertMoney, formatDate, formatDateV2 } from "@/utils";
import Carousel from "primevue/carousel";

const useProduct = useProductStore();
const useCategory = useCategoryStore();
const visible = ref(false);
const optionCategory = ref([]);
const selectCategory = ref();
const title = ref("Add Product");
const typeCreate = ref(true);

const textSearch = ref("");
const dates = ref();

const urlApi = "http://192.168.1.6:8080/api/v1";

const actionType = ref("Create");

const status = ref([
  { name: "All", code: undefined },
  { name: "Active", code: 0 },
  { name: "Block", code: 1 },
]);

const selectedStatus = ref({ name: "All", code: undefined });

const dataProductCreate = ref({
  productCode: "",
  productName: "",
  productUnit: "",
  productImage: "",
  description: "",
  categoryId: [],
  productPrice: 0,
  urlImage: [],
});

onUnmounted(() => {
  useProduct.listProduct = [];
});

onBeforeMount(async () => {
  await useProduct.getListProductAction();
  await useCategory.getListCategory();
  const customCategory = [];

  useCategory.list.map((item) => {
    customCategory.push({
      name: item?.data?.nameCategory,
      idCategory: item?.data?.id,
    });
  });

  optionCategory.value = customCategory;
});

watch(visible, (value) => {
  if (!value) {
    dataProductCreate.value = {
      productCode: "",
      productName: "",
      productUnit: "",
      productImage: "",
      description: "",
      categoryId: [],
      productPrice: 0,
    };
    actionType.value = "Create";
    selectCategory.value = null;
    title.value = "Add Product";
    typeCreate.value = true;
  }
});

const handleCreateProduct = async () => {
  const idCategories = [];
  selectCategory.value.map((id) => {
    idCategories.push(id.idCategory);
  });
  if (actionType.value === "Create") {
    await useProduct.createProductAction({
      ...dataProductCreate.value,
      categoryId: idCategories,
    });
  } else {
    await useProduct.updateProductAction({
      ...dataProductCreate.value,
      categoryId: idCategories,
    });
  }

  visible.value = false;
};

const handleUpdateProduct = (data) => {
  title.value = "Update Product";
  actionType.value = "Update";
  visible.value = true;
  typeCreate.value = false;
  dataProductCreate.value = data;
  let dataCate = [];
  data.categories.map((val) => {
    dataCate = [
      ...dataCate,
      {
        idCategory: val.id,
        name: val.nameCategory,
      },
    ];
  });
  selectCategory.value = dataCate;
};

const handleSearchProduct = async () => {
  let params = "?";
  if (textSearch.value.trim()) {
    params = params + `searchText=${textSearch.value}&`;
  }
  if (selectedStatus.value.code) {
    params = params + `isBlock=${selectedStatus.value.code}&`;
  }
  if (dates.value) {
    params =
      params +
      `startDate=${formatDateV2(
        dates.value[0],
      )} 00:00:00&endDate=${formatDateV2(dates.value[1])} 23:59:59`;
  }

  await useProduct.getListProductAction(params);
};

const onAdvancedUpload = (e) => {
  const res = JSON.parse(e.xhr.response);
  if (res.success) {
    let image = null;
    res.data.map((e) => {
      image = image + e + ",";
    });
    dataProductCreate.value.productImage =
      dataProductCreate.value.productImage + image;
  }
};

const handleRemoveImage = (index) => {
  let listImage = dataProductCreate.value.productImage.split(",");
  listImage.splice(index, 1);
  dataProductCreate.value.productImage = listImage.join();
  dataProductCreate.value.urlImage.splice(index, 1);
};
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
    <div class="search-product mb-4">
      <div>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="textSearch" placeholder="Search" />
        </span>
      </div>
      <div>
        <Dropdown
          v-model="selectedStatus"
          :options="status"
          optionLabel="name"
          placeholder="Select a City"
          class="w-full md:w-14rem"
        />
      </div>
      <div>
        <Calendar
          :showIcon="true"
          placeholder="Select Time"
          v-model="dates"
          selectionMode="range"
          :manualInput="false"
        />
      </div>
      <div>
        <Button
          label="Search"
          @click="handleSearchProduct"
          severity="success"
          raised
        />
      </div>
    </div>
    <div class="mt-3">
      <DataTable
        paginator
        :loading="useProduct.loading"
        :rows="10"
        :value="useProduct.listProduct"
        showGridlines
        tableStyle="min-width: 50rem"
      >
        <Column field="index" header="#">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column header="Action" style="width: 10%">
          <template #body="slotProps">
            <div class="flex">
              <Button
                @click="handleUpdateProduct(slotProps.data)"
                size="small"
                icon="pi pi-pencil"
                text
                rounded
                severity="success"
                aria-label="Filter"
              />
              <Button
                size="small"
                icon="pi pi-lock"
                text
                rounded
                severity="warning"
                aria-label="Filter"
              />
              <Button
                size="small"
                icon="pi pi-trash"
                text
                rounded
                severity="danger"
                aria-label="Filter"
              />
            </div>
          </template>
        </Column>
        <Column field="productCode" header="Product Code"></Column>
        <Column field="productName" header="Product Name"></Column>
        <Column field="categories" header="Category">
          <template #body="slotProps">
            <div class="flex gap-2 flex-column">
              <Tag
                v-for="val in slotProps.data.categories"
                severity="success"
                :value="val.nameCategory"
              ></Tag>
            </div> </template
        ></Column>
        <Column field="productUnit" header="Unit"></Column>
        <Column field="productPrice" header="Price">
          <template #body="slotProps">
            {{ convertMoney(slotProps.data.productPrice) }}
          </template>
        </Column>
        <Column header="Crate Date">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.createDate) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    :header="title"
    :style="{ width: '60vw' }"
  >
    <div class="product-modal-add mb-3">
      <div class="item-add flex flex-column gap-2">
        <label for="username">Product Code</label>
        <InputText
          :disabled="!typeCreate"
          id="username"
          v-model="dataProductCreate.productCode"
          aria-describedby="username-help"
        />
      </div>
      <div class="item-add flex flex-column gap-2">
        <label for="username">Product Name</label>
        <InputText
          id="username"
          v-model="dataProductCreate.productName"
          aria-describedby="username-help"
        />
      </div>
      <div class="item-add flex flex-column gap-2">
        <label for="username">Unit</label>
        <InputText
          id="username"
          v-model="dataProductCreate.productUnit"
          aria-describedby="username-help"
        />
      </div>
      <div class="item-add flex flex-column gap-2">
        <label for="username">Product Price</label>
        <InputNumber
          id="username"
          v-model="dataProductCreate.productPrice"
          aria-describedby="username-help"
        />
      </div>
      <div class="item-add flex flex-column gap-2">
        <label for="username">Category</label>
        <MultiSelect
          v-model="selectCategory"
          display="chip"
          :options="optionCategory"
          optionLabel="name"
          placeholder="Select Category"
          :maxSelectedLabels="3"
        />
      </div>
    </div>
    <div class="mt-2">
      <span class="mb-2">Description</span>
      <Editor
        v-model="dataProductCreate.description"
        editorStyle="height: 200px"
      />
    </div>
    <div class="mt-2" v-if="dataProductCreate.urlImage?.length > 0">
      <span class="mb-2">Image Product</span>
      <Carousel
        :value="dataProductCreate.urlImage"
        :numVisible="3"
        :numScroll="3"
      >
        <template #item="slotProps">
          <div
            class="border-1 surface-border border-round m-2 text-center py-5 px-3"
          >
            <img
              class="image-preview"
              :src="urlApi + slotProps.data"
              alt="1232"
            />
            <div class="mt-2">
              <Button
                @click="handleRemoveImage(slotProps.index)"
                icon="pi pi-trash"
                size="small"
                severity="danger"
                rounded
              />
            </div>
          </div>
        </template>
      </Carousel>
    </div>
    <div class="mt-2">
      <span class="mb-2">Upload Image Product</span>
      <FileUpload
        name="file"
        :url="urlApi + '/upload/image'"
        @upload="onAdvancedUpload"
        :multiple="true"
        accept="image/*"
        :maxFileSize="1000000"
      >
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </FileUpload>
    </div>
    <div class="product-btn-add">
      <Button @click="handleCreateProduct" label="Save" severity="success" />
      <Button @click="visible = false" label="Cancel" severity="secondary" />
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
.product {
  width: 100%;

  .product-add {
    display: flex;
    justify-content: flex-end;
  }

  .search-product {
    display: flex;
    div {
      margin-right: 5px;
    }
  }
}

.product-modal-add {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.image-preview {
  width: 100%;
  object-fit: cover;
  height: 200px;
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

<style>
.p-dialog-content::-webkit-scrollbar {
  display: none;
}
</style>
