<script setup>
import { onMounted, ref, onBeforeMount } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Editor from 'primevue/editor'
import InputNumber from 'primevue/inputnumber'
import 'vue3-treeselect/dist/vue3-treeselect.css'
import Button from 'primevue/button'
import Treeselect from 'vue3-treeselect'
import { updateImage } from '@/api/uploadFile'
import { createProduct } from '@/api/product'
import { useProductStore } from '@/stores/product'
import MultiSelect from 'primevue/multiselect'
import { useCategoryStore } from '@/stores/category'

// const options = ref([
//   {
//     id: "1",
//     label: "Bia",
//   },
//   {
//     id: "2",
//     label: "Rượu",
//     children: [
//       {
//         id: "21",
//         label: "Rượu Hoa Anh Túc",
//       },
//       {
//         id: "22",
//         label: "Rượu Cần",
//       },
//     ],
//   },
//   {
//     id: "4",
//     label: "Banh",
//   },
// ]);
const useProduct = useProductStore()
const useCategory = useCategoryStore()
const value = ref('')
const visible = ref(false)
const images = ref([])
const filesData = ref([])
const optionCategory = ref([])
const selectCategory = ref()

const dataProductCreate = ref({
  productCode: '',
  productName: '',
  productUnit: '',
  productImage: '',
  description: '',
  categoryId: [],
  productPrice: 0
})

onBeforeMount(async () => {
  await useProduct.getListProductAction()
  await useCategory.getListCategory()
  const customCategory = []

  useCategory.list.map(item => {
    customCategory.push({
      name: item?.data?.nameCategory,
      idCategory: item?.data?.id
    })
  })

  optionCategory.value = customCategory
})

const onDragOver = event => {
  event.preventDefault()
}

const handleFileUpload = event => {
  const files = event.target.files
  processFiles(files)
}

let formdata = new FormData()

const handleFileDrop = event => {
  event.preventDefault()
  formdata.append('file', event.target.files)
  const files = event.dataTransfer.files
  processFiles(files)
}

const processFiles = files => {
  filesData.value = files
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const reader = new FileReader()
    reader.onload = e => {
      images.value.push({
        name: file.name,
        url: e.target.result,
        type: file.type,
        isSuccess: false
      })
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = index => {
  images.value.splice(index, 1)
}

const handleCreateProduct = async () => {
  const idCategories = []

  selectCategory.value.map(id => {
    idCategories.push(id.idCategory)
  })

  visible.value = false

  await useProduct.createProductAction({
    ...dataProductCreate.value,
    categoryId: idCategories
  })
}
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
    <div class="mt-3">
      <DataTable
        paginator
        :rows="10"
        :value="useProduct.listProduct"
        showGridlines
        tableStyle="min-width: 50rem"
      >
        <Column field="productCode" header="Product Code"></Column>
        <Column field="productName" header="Product Name"></Column>
        <Column field="categories" header="Category">
          <template #body="slotProps">
            <div>
              <p v-for="val in slotProps.data.categories">
                {{ val.nameCategory }}
              </p>
            </div>
          </template></Column
        >
        <Column field="productUnit" header="Unit"></Column>
        <Column field="productPrice" header="Price"></Column>
        <Column field="productPrice" header="Action"></Column>
      </DataTable>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    header="Add Product"
    :style="{ width: '60vw' }"
  >
    <div class="product-modal-add mb-3">
      <div class="item-add flex flex-column gap-2">
        <label for="username">Product Code</label>
        <InputText
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
    <div class="mt-2">
      <span class="mb-2">Product Image</span>
      <div
        class="dropzone mt-2"
        @dragover.prevent="onDragOver"
        @drop.prevent="handleFileDrop"
      >
        <p>Drag and drop images here</p>
        <div class="input_upload">
          <input
            type="file"
            name="file"
            ref="myFiles"
            id="file"
            accept="image/*"
            @change="handleFileUpload"
            class="inputfile"
            data-multiple-caption="{count} files"
            multiple
          />
          <label for="file"><i class="pi pi-paperclip"></i> Choose file</label>
        </div>
      </div>
      <div class="image-container">
        <div
          class="item_image"
          v-for="(image, index) in images.reverse()"
          :key="index"
        >
          <div class="image">
            <img :src="image.url" :alt="image.name" />
          </div>
          <div class="btn_group">
            <button class="btn btn_remove" @click="removeImage(index)">
              <i class="pi pi-trash"></i>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="product-btn-add">
      <Button @click="handleCreateProduct" label="Create" severity="success" />
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

.dropzone {
  border: 2px dashed #ccc;
  text-align: center;
  padding: 20px;
  cursor: pointer;
}

.dropzone p {
  font-size: 18px;
  color: #b9b9b9;
  margin-bottom: 12px;
}

.input_upload {
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .inputfile + label {
    padding: 3px 8px;
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: #4fc08d;
    display: inline-block;
    border-radius: 8px;
  }
  .inputfile:focus + label,
  .inputfile + label:hover {
    opacity: 0.8;
  }
  .inputfile + label {
    cursor: pointer;
  }
  .inputfile:focus + label {
    outline: 1px dotted #4fc08d;
  }
}

.image-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  padding: 20px 0;
  .item_image {
    margin: 0 auto;
    border: 1px solid #4fc08d;
    border-radius: 8px;
    .image {
      width: 260px;
      height: 200px;
      padding: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        display: block;
      }
    }
    .btn_group {
      display: flex;
      justify-content: center;
      column-gap: 8px;
      margin: 10px 0 10px 0;
      .btn {
        border: 1px solid;
        padding: 8px 12px;
        background-color: transparent;
        border-radius: 8px;
        cursor: pointer;
      }
      .btn_download {
        border-color: #00bfff;
        color: #00bfff;
        &:hover {
          background-color: #00bfff;
          color: #fff;
        }
      }
      .btn_remove {
        color: #ff3300;
        border-color: #ff3300;
        &:hover {
          background-color: #ff3300;
          color: #fff;
        }
      }
    }
  }
}
</style>
