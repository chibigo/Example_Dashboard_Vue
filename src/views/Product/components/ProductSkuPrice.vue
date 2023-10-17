<script setup>
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { useProductStore } from '@/stores/product'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputSwitch from 'primevue/inputswitch'
import Calendar from 'primevue/calendar'
import { convertMoney, formatDate, formatDateV2 } from '@/utils'
import router from '@/router'

const useProduct = useProductStore()
const dataProductSkuCreate = ref({
  nameSale: '',
  price: 0
})
const status = ref([
  { name: 'All', code: undefined },
  { name: 'Active', code: 0 },
  { name: 'Block', code: 1 }
])
const optionProduct = ref(null)
const selectProduct = ref(null)
const selectEditProduct = ref(null)
const visible = ref(false)
const modalProductSku = ref('')
const editProductSku = ref({
  nameSale: '',
  price: '',
  productSkuCode: ''
})
const filterSelect = status.value.find(
  item => item.code == router.currentRoute.value.query.isSale
)
const selectedStatus = ref(filterSelect || null)
const valueSearch = ref('')
const dates = ref()

onMounted(() => {
  useProduct.getListProductSkuAction()
})

const handleShowModalCreateProductSku = () => {
  visible.value = true
  modalProductSku.value = 'create'
  getOptionProduct()
}

const getOptionProduct = () => {
  const options = useProduct.listProduct.map(item => {
    return { name: item.productName, code: item.productCode }
  })
  optionProduct.value = options
}

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

const handleCreateProductSku = async () => {
  if (
    selectProduct.value &&
    dataProductSkuCreate.value.nameSale &&
    dataProductSkuCreate.value.price > 0
  ) {
    visible.value = false
    await useProduct.createProductSkuAction({
      productCode: selectProduct.value.code,
      nameSale: dataProductSkuCreate.value.nameSale,
      price: dataProductSkuCreate.value.price,
      slug: convertToSlug(dataProductSkuCreate.value.nameSale)
    })
    selectProduct.value = null
    dataProductSkuCreate.value = { nameSale: '', price: 0 }
  } else {
    Swal.fire('Please enter complete information', '', 'warning')
  }
}

const handleBlockProductSku = async (code, status, name) => {
  Swal.fire({
    text: `Do you want ${status == 0 ? 'block' : 'unblock'} ${name}`
  }).then(async result => {
    if (result.isConfirmed) {
      await useProduct.blockDeleteProductSkuAction({
        productSkuCode: code,
        type: 'BLOCK'
      })
      Swal.fire('Success!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}

const handleShowModalEditProductSku = data => {
  editProductSku.value = {
    nameSale: data.name_sale,
    price: data.price,
    productSkuCode: data.id
  }
  getOptionProduct()
  const getProduct = useProduct.listProduct.find(
    item => item.productCode == data.product_code
  )
  selectEditProduct.value = {
    name: getProduct.productName,
    code: getProduct.productCode
  }
}

const handleEditProductSku = async () => {
  if (
    selectEditProduct.value &&
    editProductSku.value.nameSale &&
    editProductSku.value.price > 0
  ) {
    visible.value = false
    await useProduct.updateProductSkuAction({
      productCode: selectEditProduct.value.code,
      nameSale: editProductSku.value.nameSale,
      price: editProductSku.value.price,
      productSkuCode: editProductSku.value.productSkuCode
    })
  } else {
    Swal.fire('Please enter complete information', '', 'warning')
  }
}

const handleDeleteProductSku = async (id, name) => {
  Swal.fire({
    text: `Do you want delete ${name}`
  }).then(async result => {
    if (result.isConfirmed) {
      await useProduct.blockDeleteProductSkuAction({
        productSkuCode: id,
        type: 'DELETE'
      })
      Swal.fire('Success!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}

const handleSearch = async () => {
  let params = '?'
  if (valueSearch.value.trim()) {
    params = params + `searchText=${valueSearch.value}&`
  }
  if (selectedStatus.value && typeof selectedStatus.value.code == 'number') {
    params = params + `isSale=${selectedStatus.value.code}&`
  }
  if (dates.value) {
    params =
      params +
      `startDate=${formatDateV2(
        dates.value[0]
      )} 00:00:00&endDate=${formatDateV2(dates.value[1])} 23:59:59`
  }
  await useProduct.getListProductSkuAction(params)
}
</script>

<template>
  <div>
    <div class="section-top">
      <div class="create">
        <Button
          @click="handleShowModalCreateProductSku"
          rounded
          type="button"
          severity="success"
          label="Create Product Sku"
          icon="pi pi-plus"
        >
        </Button>
      </div>
      <div class="wrap-search">
        <div>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="valueSearch"
              placeholder="Search"
              class="w-full md:w-12rem"
            />
          </span>
        </div>
        <div>
          <Dropdown
            v-model="selectedStatus"
            :options="status"
            optionLabel="name"
            class="w-full md:w-8rem"
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
            @click="handleSearch"
            severity="success"
            raised
          />
        </div>
      </div>
    </div>
    <div class="mt-3">
      <DataTable
        :value="useProduct.listProductSku"
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        tableStyle="min-width: 60rem"
      >
        <Column field="index" header="#">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column field="product_code" header="Product Code"></Column>
        <Column field="product_name" header="Product Name"></Column>

        <Column field="name_sale" header="Name Sale"></Column>
        <Column field="product_unit" header="Unit"></Column>
        <Column field="product_price" header="Price">
          <template #body="slotProps">
            {{ convertMoney(slotProps.data.price) }}
          </template>
        </Column>
        <Column header="Create Date">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.create_date) }}
          </template>
        </Column>
        <Column header="Status">
          <template #body="slotProps">
            <div>
              <InputSwitch
                :modelValue="slotProps.data.is_sale == 0 ? true : false"
                @click="
                  handleBlockProductSku(
                    slotProps.data.id,
                    slotProps.data.is_sale,
                    slotProps.data.name_sale
                  )
                "
              />
            </div>
          </template>
        </Column>
        <Column header="Action">
          <template #body="slotProps">
            <div>
              <i
                class="pi pi-pencil"
                style="
                  cursor: pointer;
                  margin-right: 10px;
                  font-size: 20px;
                  color: #4fc08d;
                "
                @click="
                  {
                    ;(visible = true), (modalProductSku = 'edit')
                    handleShowModalEditProductSku(slotProps.data)
                  }
                "
              ></i>
              <i
                class="pi pi-trash"
                style="cursor: pointer; font-size: 20px; color: red"
                @click="
                  handleDeleteProductSku(
                    slotProps.data.id,
                    slotProps.data.name_sale
                  )
                "
              ></i>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Create Product Sku"
      :style="{ width: '60vw' }"
      v-if="modalProductSku == 'create'"
    >
      <form @submit.prevent="handleCreateProductSku">
        <div class="product-modal-add-sku">
          <div class="item-add flex flex-column gap-2">
            <label for="username">Product</label>
            <Dropdown
              v-model="selectProduct"
              :options="optionProduct"
              optionLabel="name"
              placeholder="Choose Product"
              style="width: 100%"
              :class="selectProduct ? '' : 'p-invalid'"
              required
            />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Name</label>
            <InputText
              v-model="dataProductSkuCreate.nameSale"
              required
              :class="dataProductSkuCreate.nameSale ? '' : 'p-invalid'"
            />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Price</label>
            <InputNumber
              v-model="dataProductSkuCreate.price"
              required
              :class="dataProductSkuCreate.price > 0 ? '' : 'p-invalid'"
            />
          </div>
        </div>
        <div class="product-btn-add-sku">
          <Button label="Create" severity="success" type="submit" />
          <Button
            @click="visible = false"
            label="Cancel"
            severity="secondary"
            type="button"
          />
        </div>
      </form>
    </Dialog>
    <Dialog
      v-model:visible="visible"
      modal
      header="Edit Product Sku"
      :style="{ width: '60vw' }"
      v-else
    >
      <form @submit.prevent="handleEditProductSku">
        <div class="product-modal-add-sku">
          <div class="item-add flex flex-column gap-2">
            <label for="username">Product</label>
            <Dropdown
              v-model="selectEditProduct"
              :options="optionProduct"
              optionLabel="name"
              placeholder="Choose Product"
              style="width: 100%"
              :class="selectEditProduct ? '' : 'p-invalid'"
              required
            />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Name</label>
            <InputText
              v-model="editProductSku.nameSale"
              required
              :class="editProductSku.nameSale ? '' : 'p-invalid'"
            />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Price</label>
            <InputNumber
              v-model="editProductSku.price"
              required
              :class="editProductSku.price > 0 ? '' : 'p-invalid'"
            />
          </div>
        </div>
        <div class="product-btn-add-sku">
          <Button label="Edit" severity="success" type="submit" />
          <Button
            @click="visible = false"
            label="Cancel"
            severity="secondary"
            type="button"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.create {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: end;
}

.wrap-search {
  display: flex;
  align-items: center;
  gap: 10px;
}
.product-modal-add-sku {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.product-btn-add-sku {
  margin-top: 10px;
  display: flex;
  justify-content: center;

  button {
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>

<style>
.swal2-container {
  z-index: 9999;
}
</style>
